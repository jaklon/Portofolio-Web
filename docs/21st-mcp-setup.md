# Setup MCP 21st.dev

Status 6 Oktober 2026: server **21st** telah ditambahkan dan dikonfirmasi melalui `codex mcp get 21st`. Koneksi memakai Streamable HTTP ke `https://21st.dev/api/mcp` dan membaca bearer token dari `API_KEY_21ST`. Setelah pengguna memasang key, autentikasi dan panggilan tool baca berhasil diverifikasi pada endpoint resmi.

Email **jasconkembuan9@gmail.com** sudah dikonfirmasi pada menu akun 21st.dev di Chrome. Email mengidentifikasi akun yang diinginkan; akses MCP memakai API key dari akun tersebut.

## Aktifkan akses akun

1. Buka [API keys 21st.dev](https://21st.dev/settings/api-keys) pada akun tersebut.
2. Jalankan ini di terminal PowerShell lokal:

   ```powershell
   powershell -File "D:\Jascon\web-portofolio\scripts\connect-21st.ps1"
   ```

3. Masukkan API key pada prompt tersembunyi. Jangan kirim key melalui chat. Skrip melakukan `initialize`, `tools/list`, dan pembacaan `get_usage` pada endpoint resmi; jika pemeriksaan gagal, skrip tidak menyimpan key.
4. Setelah pemeriksaan berhasil, skrip menyimpan `API_KEY_21ST` pada environment akun Windows. Tutup lalu buka kembali Codex agar variabel baru terbaca.
5. Periksa daftar MCP di Codex dan uji tool baca akun/bookmark. Gunakan schema yang benar-benar diumumkan server.

Skrip telah diperiksa sintaks PowerShell-nya. Langkah autentikasi di atas sudah dilakukan pengguna. Verifikasi berikutnya berhasil: `initialize`, `tools/list`, `get_usage`, `list_bookmark_lists`, dan `get_bookmark_list`. Server mengumumkan nama `21st`, versi `0.1.1`, dan protokol `2025-03-26`. Daftar **For My Page** berisi **11 komponen**, cocok dengan bookmark browser. `get_usage` menunjukkan tier free, **2/2 kuota pengambilan kode tersisa hari ini**, dan 21st AI generation belum aktif.

Bukti tanpa credential tersimpan di `docs/21st-usage-check.json`, `docs/21st-bookmark-lists.json`, dan `docs/21st-bookmarks.json`. Belum ada komponen yang diinstal, di-unlock, atau digenerate oleh proses persiapan ini.

Katalog tools bawaan chat yang aktif belum menampilkan server baru saat diperiksa; pengujian dilakukan melalui protokol MCP langsung dengan credential dari environment Windows. Muat ulang koneksi atau buka kembali Codex bila tools belum tampil dalam chat.

## Konfigurasi yang terdaftar

```toml
[mcp_servers.21st]
url = "https://21st.dev/api/mcp"
bearer_token_env_var = "API_KEY_21ST"
```

Konfigurasi ini berada pada pengaturan global Codex. Credential disediakan melalui environment; dokumen dan proyek tidak menyimpan nilainya.

## Bila ada kendala

- Server terdaftar tetapi autentikasi gagal: periksa key berasal dari akun yang benar dan Codex dibuka setelah environment diperbarui.
- Server tidak terlihat dalam chat yang sedang berjalan: muat ulang koneksi MCP atau buka kembali Codex sebelum menguji tools.
- Code unlock/copy ditolak: periksa penggunaan aktual melalui tools akun. Halaman browser menunjukkan 1 free copy tersisa ketika ditinjau. Batas browser dan MCP harus diperiksa pada konteks masing-masing.
- Perubahan schema atau respons server: sesuaikan skrip dengan schema live sebelum menyimpan key; jangan mengasumsikan pendaftaran server berarti autentikasi berhasil.

Sumber: [panduan 21st MCP](https://21st.dev/mcp), [konfigurasi plugin resmi 21st](https://github.com/21st-dev/codex-plugin), [pengaturan MCP Codex](https://learn.chatgpt.com/docs/extend/mcp?surface=cli).
