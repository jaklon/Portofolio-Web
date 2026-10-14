"""Package the production build for jascon.my.id, including dotfiles.

Run after npm run build. Requires only Python 3's standard library.
The ZIP contains website files directly at its root, with no dist wrapper.
"""
from datetime import datetime
import hashlib
import json
from pathlib import Path
import re
import shutil
import stat
from xml.sax.saxutils import escape
from zipfile import ZIP_DEFLATED, ZipFile, ZipInfo
from zoneinfo import ZoneInfo, ZoneInfoNotFoundError


ROOT = Path(__file__).resolve().parents[1]
BUILD = ROOT / "dist"
OUTPUT = ROOT / "deployment"
DOMAIN = "https://jascon.my.id"

try:
    stamp = datetime.now(ZoneInfo("Asia/Jakarta")).date().isoformat()
except ZoneInfoNotFoundError:
    # Windows may not have IANA timezone data installed.
    from datetime import timedelta, timezone
    stamp = datetime.now(timezone(timedelta(hours=7))).date().isoformat()

if not (BUILD / "index.html").is_file() or not (BUILD / ".htaccess").is_file():
    raise SystemExit("Missing production build or .htaccess. Run npm run build first.")

files = sorted(path for path in BUILD.rglob("*") if path.is_file())
if any(path.is_symlink() for path in BUILD.rglob("*")):
    raise SystemExit("Unexpected symlink in production build.")

contents = {path.relative_to(BUILD).as_posix(): path.read_bytes() for path in files}
required = ("index.html", ".htaccess", "favicon.svg", "models/avatar.glb")
for name in required:
    if name not in contents:
        raise SystemExit(f"Required deployment file is missing: {name}")
for name in contents:
    if name.startswith(("src/", "node_modules/", "backups/", ".git/")) or Path(name).name.startswith(".env"):
        raise SystemExit(f"Unexpected private/development file: {name}")

# Check the actual bundled JS/CSS entry points before creating the archive.
html = contents["index.html"].decode("utf-8")
for asset in re.findall(r'(?:src|href)="(/[^"?#]+)', html):
    if asset.lstrip("/") not in contents:
        raise SystemExit(f"HTML references a missing file: {asset}")

data = (ROOT / "src/data/portfolio.ts").read_text(encoding="utf-8")
slugs = re.findall(r"\bslug:\s*['\"]([a-z0-9-]+)['\"]", data)
if not slugs or len(set(slugs)) != len(slugs):
    raise SystemExit("Could not read unique project slugs for the sitemap.")
routes = ["/", "/about", "/projects"] + [f"/projects/{slug}" for slug in slugs]
contents["robots.txt"] = f"User-agent: *\nAllow: /\n\nSitemap: {DOMAIN}/sitemap.xml\n".encode()
contents["sitemap.xml"] = (
    '<?xml version="1.0" encoding="UTF-8"?>\n'
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    + "".join(f"  <url><loc>{escape(DOMAIN + route)}</loc></url>\n" for route in routes)
    + "</urlset>\n"
).encode()

OUTPUT.mkdir(exist_ok=True)
archive = OUTPUT / f"jascon.my.id-{stamp}.zip"
directories = sorted({
    parent.as_posix() + "/"
    for name in contents
    for parent in Path(name).parents
    if parent != Path(".")
})


def archive_entry(name, directory=False):
    entry = ZipInfo(name, date_time=datetime.now().timetuple()[:6])
    # cPanel extracts on Linux. Public files must be readable by the web server,
    # and directory traversal requires execute permission. writestr's defaults
    # otherwise store files as 0600, even when packaging from Windows.
    entry.create_system = 3
    mode = (stat.S_IFDIR | 0o755) if directory else (stat.S_IFREG | 0o644)
    entry.external_attr = (mode << 16) | (0x10 if directory else 0)
    entry.compress_type = ZIP_DEFLATED
    return entry


with ZipFile(archive, "w", compression=ZIP_DEFLATED, compresslevel=9) as bundle:
    for name in directories:
        bundle.writestr(archive_entry(name, directory=True), b"", compresslevel=9)
    for name, content in sorted(contents.items()):
        bundle.writestr(archive_entry(name), content, compresslevel=9)

# Verify the entire archive and its root layout, including hidden .htaccess.
with ZipFile(archive) as bundle:
    failure = bundle.testzip()
    if failure or set(bundle.namelist()) != set(contents) | set(directories):
        raise SystemExit(f"Deployment ZIP verification failed: {failure}")
    for name, expected in contents.items():
        if bundle.read(name) != expected:
            raise SystemExit(f"ZIP content mismatch: {name}")
    for entry in bundle.infolist():
        expected_mode = (stat.S_IFDIR | 0o755) if entry.is_dir() else (stat.S_IFREG | 0o644)
        if entry.create_system != 3 or (entry.external_attr >> 16) != expected_mode:
            raise SystemExit(f"Incorrect hosting permissions: {entry.filename}")

digest = hashlib.sha256(archive.read_bytes()).hexdigest()
archive.with_suffix(".zip.sha256").write_text(f"{digest}  {archive.name}\n", encoding="utf-8")
manifest = {
    "domain": DOMAIN,
    "date_jakarta": stamp,
    "archive": archive.name,
    "archive_sha256": digest,
    "file_count": len(contents),
    "directory_count": len(directories),
    "file_permissions": "0644",
    "directory_permissions": "0755",
    "uncompressed_bytes": sum(map(len, contents.values())),
    "archive_bytes": archive.stat().st_size,
    "routes": routes,
    "files": [{"path": name, "bytes": len(content), "sha256": hashlib.sha256(content).hexdigest()}
              for name, content in sorted(contents.items())],
}
(OUTPUT / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
shutil.copyfile(ROOT / "docs/deployment-rumahweb.md", OUTPUT / "PANDUAN-DEPLOYMENT.md")
print(f"Ready: {archive}")
print(f"{len(contents)} files; ZIP {archive.stat().st_size / 1_000_000:.2f} MB; unpacked {manifest['uncompressed_bytes'] / 1_000_000:.2f} MB")
print(f"Verified permissions: {len(contents)} files 0644; {len(directories)} directories 0755")
print(f"Verified SHA-256: {digest}")
