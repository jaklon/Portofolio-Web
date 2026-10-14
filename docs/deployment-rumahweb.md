# Deployment jascon.my.id di Rumahweb

Paket ini dibuat untuk memasang portofolio di root domain **https://jascon.my.id/**. Folder domain di server boleh bernama apa pun; alamat publiknya harus berada di `/`, bukan `/portfolio/` atau `/dist/`.

## Isi paket

ZIP berisi `index.html`, `.htaccess`, `assets/`, `models/avatar.glb`, wallpaper, logo, preview proyek, `robots.txt`, dan `sitemap.xml`. File website berada langsung di root ZIP; tidak ada folder pembungkus `dist`.

Model 3D dan semua aset dimuat dari hosting yang sama. Node.js, Python, database, dan API key 21st tidak diperlukan di hosting. Python hanya dipakai secara lokal untuk membentuk ZIP.

`PANDUAN-DEPLOYMENT.md`, `manifest.json`, dan file checksum berada di luar ZIP untuk referensi lokal. Upload ZIP website saja.

## Upload melalui cPanel

1. Buka **cPanel → Domains** dan cari `jascon.my.id`. Catat **Document Root** yang ditampilkan. Gunakan folder itu; jangan menganggap semua domain menggunakan `public_html` yang sama. Jangan mengubah folder atau konfigurasi domain-domain lain.
2. Pastikan DNS domain mengarah ke hosting Rumahweb. Jika mengubah DNS, pertahankan record email yang sudah digunakan. Periksa **SSL/TLS Status** atau AutoSSL sampai sertifikat untuk `jascon.my.id` valid. Aktifkan SSL sebelum memasang paket karena `.htaccess` mengarahkan HTTP ke HTTPS. `www` bersifat opsional; jika digunakan, pastikan DNS dan sertifikatnya tersedia juga.
3. Buka **File Manager → Settings → Show Hidden Files (dotfiles)** agar `.htaccess` terlihat. Masuk ke Document Root `jascon.my.id` yang dicatat pada langkah pertama.
4. Jika folder sudah memiliki website atau `.htaccess`, unduh backup dahulu dan simpan di komputer atau di luar document root. Jika folder dibagi dengan website lain, buat folder khusus untuk `jascon.my.id` dan sesuaikan Document Root melalui cPanel/dukungan Rumahweb sebelum memasang paket.
5. Upload `jascon.my.id-YYYY-MM-DD.zip` ke folder domain, lalu pilih **Extract** pada folder itu. Pastikan `index.html` dan `.htaccess` langsung berada di Document Root, bersama folder `assets` dan `models`.
   Paket terbaru menyimpan izin file `644` dan folder `755`. Periksa melalui **Change Permissions**, termasuk `index.html`, `.htaccess`, dan folder aset. Jika menimpa hasil ekstraksi paket lama, hosting mungkin mempertahankan izin sebelumnya; koreksi file ke `644` dan folder ke `755` hanya di Document Root portofolio.
6. Jika ada file halaman default seperti `index.php`/`index.html` dari pemasangan lama, simpan backup lalu pastikan halaman utama yang aktif adalah `index.html` dari paket ini. `.htaccess` lama yang berisi aturan autentikasi atau aturan khusus perlu ditinjau sebelum diganti; paket ini ditujukan untuk folder khusus portofolio.
7. Setelah berhasil, hapus ZIP dari folder publik hosting. Simpan ZIP dan checksum di komputer sebagai paket pemulihan.

## Pemeriksaan setelah upload

- Buka `https://jascon.my.id/` dan pastikan halaman Home tampil.
- Akses **JV Story** tidak tampil di navigasi publik. Tekan dan tahan logo header selama dua detik, atau gunakan Ctrl+Alt+J, lalu buka tombol yang muncul menuju `https://jascon.my.id/jv-story/`. Escape menutup akses tersebut. Pengaman data tetap login Google di aplikasi JV Story. Aplikasi dipasang terpisah di folder `jv-story` dalam Document Root; paket portofolio tidak menyertakan aplikasi atau kredensial database tersebut. Aturan root membiarkan seluruh route `/jv-story/` diproses aplikasi itu sendiri, termasuk API dan media. Pertahankan folder tersebut saat memperbarui portofolio.
- Buka langsung `https://jascon.my.id/about` dan `https://jascon.my.id/projects`, lalu refresh. Keduanya harus menampilkan aplikasi.
- Buka langsung `https://jascon.my.id/projects/circular-waste-company-profile`, lalu refresh. Route ini tetap didukung walaupun folder media juga bernama `projects`.
- Periksa avatar, pergantian wallpaper, gambar proyek, logo toolkit, navigasi, email, LinkedIn, dan tombol salin email. Salin email memerlukan HTTPS dan izin browser.
- Buka `https://jascon.my.id/robots.txt` dan `https://jascon.my.id/sitemap.xml`.
- `http://jascon.my.id/about` harus beralih ke `https://jascon.my.id/about`. Jika `www` diaktifkan, alamatnya diarahkan ke domain tanpa `www`.
- Periksa jaringan browser: JavaScript/CSS berhasil dimuat, `models/avatar.glb` tersedia, dan asset yang tidak ada menghasilkan 404, bukan HTML aplikasi.

## Cache dan pembaruan

HTML menggunakan `no-cache` agar browser memeriksa versi terbaru. Aset Vite dengan hash pada nama file dapat disimpan selama satu tahun; gambar/model dengan nama tetap menggunakan cache satu hari. Modul header/compression diterapkan jika tersedia pada server.

Untuk pembaruan, upload aset baru terlebih dahulu dan `index.html` terakhir. Pertahankan aset hash versi sebelumnya selama transisi agar tab pengunjung yang masih terbuka dapat mengambil modul lamanya. Jika mengganti avatar/gambar dengan nama sama, lakukan hard refresh pada perangkat pemeriksaan atau tunggu masa cache. Hindari cache HTML tambahan yang mengabaikan header `no-cache`.

## Jika ada kendala

- **403 Forbidden:** periksa izin file `644` dan folder `755`, lokasi Document Root, serta keberadaan `index.html` dan `.htaccess`. Paket awal yang dibuat pada 7 Oktober menyimpan metadata izin file `600`; paket koreksi menyimpan file `644` dan folder `755` secara eksplisit. Jika izin/lokasi sudah benar namun 403 tetap muncul, periksa **cPanel → Metrics → Errors** atau minta dukungan Rumahweb memeriksa akses domain. Jangan mengubah izin domain lain.
- **Refresh halaman menghasilkan 404:** periksa `.htaccess` ikut diekstrak, berada di Document Root yang tepat, dan `mod_rewrite`/aturan rewrite didukung oleh hosting.
- **Error 500:** lihat **cPanel → Metrics → Errors**. Sampaikan directive yang ditolak kepada dukungan Rumahweb. Jangan mengubah aturan website lain untuk memperbaiki domain ini.
- **HTTPS gagal:** periksa DNS dan sertifikat AutoSSL terlebih dahulu. Jika nanti menggunakan proxy Cloudflare, gunakan SSL **Full (strict)** dengan sertifikat origin yang valid; mode Flexible dapat membuat redirect HTTPS berulang.
- **Halaman kosong:** periksa file JavaScript/CSS pada tab Network, pastikan paket diekstrak tanpa folder `dist`, dan pastikan tidak ada file lama yang menggantikan `index.html` baru.

## Membuat ulang paket

Jalankan dari folder proyek, dengan Node.js yang sesuai proyek dan Python 3 tersedia:

```text
npm run build
python scripts/package-rumahweb.py
```

Di Windows, `py -3 scripts/package-rumahweb.py` dapat dipakai jika perintah `python` tidak tersedia. Paket, checksum SHA-256, manifest, dan panduan dibuat di `deployment/`. Folder ini diabaikan oleh Git; source konfigurasi dan script tetap dapat dilacak.

Paket diverifikasi secara lokal untuk kelengkapan file, referensi aset HTML, integritas ZIP, checksum, sitemap, serta metadata izin file `644` dan folder `755`. Aturan Apache belum diuji pada server Rumahweb pengguna; DNS, sertifikat, module hosting, dan hasil live perlu diperiksa setelah upload.

Referensi: [deployment React melalui cPanel Rumahweb](https://www.rumahweb.com/journal/deploy-react-js-di-cpanel-hosting/), [Apache mod_rewrite](https://httpd.apache.org/docs/2.4/mod/mod_rewrite.html), dan [Apache mod_headers](https://httpd.apache.org/docs/2.4/mod/mod_headers.html). Panduan Rumahweb memakai Create React App; proyek ini memakai Vite sehingga output-nya `dist`.
