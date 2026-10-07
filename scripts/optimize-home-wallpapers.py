"""Create responsive web assets from the user's selected wallpapers."""
from pathlib import Path
from PIL import Image, ImageOps

root = Path(__file__).resolve().parent.parent
originals = root / "backups" / "home-wallpaper-originals"
output = root / "public" / "wallpapers"

for wallpaper_id in ("q68jd7", "725oxv", "zpv8ry", "5yp7j8", "lygzqq"):
    source = next(originals.glob(f"{wallpaper_id}.*"))
    with Image.open(source) as original:
        image = ImageOps.exif_transpose(original).convert("RGB")
        for width, suffix in ((1920, ""), (960, "-mobile")):
            resized = image.copy()
            resized.thumbnail((width, width), Image.Resampling.LANCZOS)
            target = output / f"{wallpaper_id}{suffix}.webp"
            resized.save(target, "WEBP", quality=82, method=6)
            print(f"{target.name}: {resized.width} x {resized.height}, {target.stat().st_size // 1024} KB")
