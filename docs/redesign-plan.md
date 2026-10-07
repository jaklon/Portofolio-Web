# Rencana redesign — Jascon Interactive Studio

Tanggal review: 6 Oktober 2026. Sumber utama: daftar **For My Page**, 11 simpanan di akun 21st.dev **jasconkembuan9@gmail.com**. Identitas akun, halaman komponen, dan portfolio lokal sudah diperiksa melalui browser. Akses MCP resmi sudah diuji melalui `initialize`, `tools/list`, `get_usage`, `list_bookmark_lists`, dan `get_bookmark_list`. Hasil MCP mengonfirmasi nama daftar serta 11 komponen yang sama.

## Konsep yang direkomendasikan

Portfolio pribadi dengan rasa studio digital: halaman ivory yang lapang, tipografi charcoal, aksen cobalt, panel 3D berwarna gelap, dan detail kaca pada tombol. Identitas Jascon tampil lebih personal melalui nama, karya, dan perjalanan profesional. Web development, AI integration, dan security menjadi tiga bidang yang menghubungkan cerita portfolio.

Hero menggunakan komposisi **Animated Hero + Spline Scene**. Galeri karya mengambil interaksi **Coverflow Carousel**. Keahlian dan bukti pengalaman memakai **Spotlight Card**, sedangkan perjalanan profesional menggunakan **Radial Orbital Timeline**. Semua komponen diselaraskan ke satu sistem warna, ukuran, radius, dan gerak.

Nama konsep, palette, copy hero, dan pemetaan komponen di dokumen ini merupakan usulan desain. Pilihan tersebut belum merupakan desain yang disetujui pengguna.

## Hasil review 11 bookmark

Bookmark yang tersimpan berupa komponen UI yang dapat dirangkai menjadi halaman. Preview dan informasi penggunaan telah ditinjau; audit implementasi penuh dilakukan setelah sumber komponen tersedia. Spotlight Card menunjukkan sumber terkunci, dan tab sumber Text Rewind menampilkan `// no source` saat diperiksa. Browser menunjukkan 1 free copy tersisa; hasil live `get_usage` MCP menunjukkan tier **free** dan **2/2 pengambilan kode tersisa hari ini**. Angka browser dan MCP dicatat sesuai konteks masing-masing. Akses 21st AI belum aktif. Tahap persiapan ini hanya membaca metadata dan penggunaan akun.

| Komponen | Temuan dan kecocokan | Peran dalam rencana |
| --- | --- | --- |
| [Animated Hero](https://21st.dev/@tommyjepsen/components/animated-hero) | Headline dengan pergantian kata dan dua CTA. Metadata menyebut `framer-motion`, `lucide-react`, MIT. | Dasar komposisi hero; copy diubah menjadi identitas Jascon dan bidang kerja. |
| [Spline Scene](https://21st.dev/@serafimcloud/components/splite) | Panel 3D interaktif dengan sorotan cahaya. Metadata menyebut `@splinetool/react-spline`, `@splinetool/runtime`, MIT. | Elemen visual utama hero. Scene final harus sesuai identitas Jascon, dengan poster statis sebagai fallback. |
| [Liquid Glass Button](https://21st.dev/@designali-in/components/liquid-glass-button) | Tombol kaca dengan highlight halus. Dependensi: `@radix-ui/react-slot`, `class-variance-authority`. Field lisensi tidak tampil saat review. | CTA kontak dan tombol sekunder; kontras teks dan perilaku link diperiksa sebelum dipakai. |
| [Coverflow Carousel](https://21st.dev/@ruixen.ui/components/coverflow-carousel) | Cover persegi dengan perspektif, fokus tengah, drag, dan caption yang mengikuti pilihan. Dependensi tertera: `lucide-react`; MIT. | Galeri Selected Work di Home; judul, peran, periode, dan link case study selalu jelas. |
| [Spotlight Card](https://21st.dev/@jahed/components/spotlight-card) | Kartu dengan highlight interaktif; API demo memakai `GlowCard`. Sumber terkunci; field dependensi dan lisensi tidak tampil. | Tiga kartu bidang kerja dan kartu bukti pengalaman. Konten tetap terbaca tanpa hover. |
| [Radial Orbital Timeline](https://21st.dev/@jatin-yadav05/components/radial-orbital-timeline) | Node melingkar yang membuka informasi. Demo memakai data fase proyek. Dependensi tertera: `lucide-react`; MIT. | Journey di About; data diubah menjadi pendidikan dan pengalaman nyata. Mobile memakai timeline vertikal. |
| [Text Rewind](https://21st.dev/@kokonutd/components/text-rewind) | Efek teks bertumpuk dan bergerak. Dependensi tertera: `framer-motion`; MIT. Sumber implementasi belum tersedia di tab yang diperiksa. | Aksen pendek pada judul peralihan menuju karya; gerak sekali saat masuk viewport. |
| [Hero Carousel](https://21st.dev/@crafterui/components/hero-carousel) | Hero editorial dengan filmstrip, background yang mengikuti gambar, wheel/drag/keyboard. Dependensi tertera: `framer-motion`; MIT. | Alternatif untuk pembuka Projects jika media proyek sudah cukup kuat. |
| [Image Stream Hero](https://21st.dev/@ruixen.ui/components/image-stream-hero) | Dua jalur gambar bergerak dari titik tengah dengan perspektif. MIT tertera; daftar dependensi tidak tampil. | Alternatif pembuka galeri yang lebih visual; dipilih sebagai pengganti Hero Carousel bila sesuai media. |
| [Offer Carousel](https://21st.dev/@ravikatiyar162/components/offer-carousel) | Deretan kartu horizontal dengan navigasi, informasi, dan hover. Dependensi: `framer-motion`, `lucide-react`; field lisensi tidak tampil. | Kandidat Related Projects pada case study; label promo demo diganti informasi karya. |
| [Canvas](https://21st.dev/@designali-in/components/canvas) | Hero dengan efek canvas; demo memiliki import `next/link`, `dicons`, dan `renderCanvas`. MIT tertera. | Eksperimen aksen visual pada area Contact setelah performa hero utama memenuhi target. |

Tujuh komponen pertama membentuk arah utama. Empat berikutnya menjadi pilihan untuk halaman lanjutan atau eksperimen. Pemilihan akhir memperhitungkan kualitas sumber, lisensi, media, serta biaya akses kode. Efek hero alternatif dipilih satu per halaman.

## Sistem visual

| Elemen | Usulan |
| --- | --- |
| Background | Ivory `#F5F3EE` |
| Surface | Putih `#FFFFFF`; panel showcase `#17191F` |
| Teks utama | Charcoal `#20232B` |
| Teks pendukung | Slate `#626875` |
| Aksen | Cobalt `#3157E8`; lavender `#C7BFFF` untuk sorotan ringan |
| Tipografi | Manrope yang sudah tersedia; heading pendek, ukuran besar, hierarki jelas |
| Layout | Lebar konten sekitar 1200–1280 px; ruang antarbagian 96–128 px desktop dan 56–72 px mobile |
| Bentuk | Radius kartu 20–28 px; tombol pill; border tipis dan bayangan halus |
| Gerak | Transisi UI 160–240 ms; masuk section 400–600 ms; satu fokus gerak utama pada viewport |

Brand memakai nama **Jascon Kembuan**, dengan monogram sebagai elemen pendukung. Detail teknis proyek tetap tersedia pada case study. Bahasa konten awal mengikuti portfolio yang ada, yaitu Inggris.

## Struktur halaman

### Home `/`

1. **Navigasi:** nama Jascon, Work, About, Contact. Menu ringkas pada mobile.
2. **Hero:** label Software Developer; usulan headline “Building ideas into digital experiences.”; deskripsi singkat Web · AI · Security; tombol View My Work dan Let's Talk. Spline berada di panel kanan desktop dan di bawah copy pada mobile.
3. **Selected Work:** Coverflow menampilkan tiga karya utama yang sudah ditandai featured: Circular Waste Company Profile, Fire Detection NLP Chatbot, dan CISO Security Operations. Sediakan navigasi tombol dan link ke seluruh proyek.
4. **What I Build:** tiga Spotlight Card untuk Web Products, AI Systems, dan Security Thinking, masing-masing dengan contoh kontribusi nyata.
5. **About preview:** narasi singkat dan bukti pengalaman dari data yang ada; ajakan melihat Journey.
6. **Contact:** headline singkat, email, dan LinkedIn. Liquid Glass menjadi aksen CTA. Footer tenang dengan identitas Jascon.

### About `/about`

Profil singkat → Journey → keahlian per bidang → pendidikan dan pencapaian → kontak. Radial Orbital Timeline menampilkan tonggak karier dan pendidikan, disertai panel detail serta urutan tanggal yang bisa dibaca. Hapus metrik “energy” demo agar tidak menampilkan skor keahlian yang tidak berdasar. Pada mobile dan reduced motion, tampilkan timeline vertikal dengan informasi yang sama.

### Projects `/projects`

Pembuka singkat → filter yang sudah ada → katalog tujuh proyek → kontak. Gunakan grid kartu yang konsisten dengan Spotlight. Hero Carousel atau Image Stream dapat menjadi opsi pembuka setelah media proyek tersedia; katalog tetap mudah diakses melalui navigasi biasa.

### Case study `/projects/:slug`

Judul dan ringkasan → peran, periode, status → konteks → kontribusi → stack dan proses delivery → media jika tersedia → proyek terkait. Offer Carousel dapat diadaptasi untuk Related Projects. Case study security mempertahankan batas informasi publik yang tercatat di data proyek.

## Adaptasi teknis dan media

- Pertahankan React, TypeScript, Vite, Tailwind, React Router, serta sumber fakta `src/data/portfolio.ts`. Desain halaman dan komponen presentasi dibangun ulang.
- Gunakan library Motion yang sudah ada jika API kompatibel. Periksa migrasi import `framer-motion` ke `motion/react`; hindari penambahan dua paket animasi yang melakukan pekerjaan sama.
- Periksa alias `@/`, helper `cn`, primitive Card/Button, token shadcn, dan konfigurasi registry saat mengintegrasikan sumber. `components.json` belum ditemukan di proyek saat review.
- Demo yang memakai Next.js, termasuk Canvas, memerlukan adaptasi ke React Router/Vite. Layout demo berukuran tetap seperti `w-[800px]` atau `w-screen h-screen` harus dibuat responsif.
- Lazy-load Spline, gunakan placeholder dengan ukuran tetap, tangani kegagalan scene/WebGL, dan hentikan efek yang tidak terlihat. 3D dan canvas tidak menjadi syarat untuk membaca konten atau memakai CTA.
- Galeri memakai aset proyek yang layak dipublikasikan. Semua `media` proyek yang diperiksa masih kosong. Siapkan cover khusus yang akurat atau screenshot yang diizinkan, beserta alt text dan dimensi. Gambar stok demo dan robot Spline demo hanya menjadi referensi visual.
- Periksa lisensi komponen yang field-nya tidak tampil, lisensi scene 3D, dan hak penggunaan media sebelum integrasi final.

## Tahapan implementasi setelah persiapan

| Tahap | Pekerjaan | Hasil yang diperiksa |
| --- | --- | --- |
| 1. Sumber komponen | Akses akun dan schema MCP sudah diverifikasi. Ambil sumber komponen terpilih sesuai kuota aktual dan simpan lisensinya. Dahulukan Spline Scene dan Coverflow sebagai dua interaksi utama. | Setiap komponen terpilih punya sumber yang dapat digunakan dan dicatat asalnya. |
| 2. Fondasi visual | Tetapkan token, navigasi, tombol, kartu, dan layout responsif; susun wireframe Home dan About. | Komposisi desktop/mobile konsisten dan dapat ditinjau. |
| 3. Home | Bangun hero, Spline/fallback, Coverflow, Spotlight, About preview, dan Contact. | Cerita utama terbaca; galeri menuju case study yang benar; CTA berfungsi. |
| 4. Halaman lanjutan | Bangun About dengan timeline, Projects dengan filter, dan case study; pilih komponen alternatif yang mendukung konten. | Seluruh route dan fakta proyek konsisten. |
| 5. Gerak dan media | Tambahkan Text Rewind secukupnya, cover final, animasi interaksi, loading state, dan fallback. | Gerak mendukung hierarki; layout tetap stabil selama aset dimuat. |
| 6. Verifikasi | Periksa layar kecil sampai desktop, keyboard, kontras, reduced motion, filter, routing, error state, dan ukuran bundle. Jalankan typecheck, lint, test relevan, dan build. | Hasil siap ditinjau sebelum publikasi. |

Target UX: tanpa overflow pada lebar 360 px; fokus keyboard terlihat; tombol sentuh sekitar 44 px; carousel bisa dioperasikan melalui tombol/keyboard; data penting selalu tersedia dalam teks. Target performa pada pengujian terkontrol: LCP sekitar ≤2,5 detik, CLS ≤0,1, dan Lighthouse mobile ≥90 setelah fallback yang sesuai. Nilai ini merupakan target, belum hasil pengukuran.

Keputusan implementasi pengguna: gunakan prompt Spline Scene yang dikirim, ambil tepat satu komponen tambahan dari bookmark, dan buat komponen lainnya sendiri. Coverflow Carousel dipilih dan sudah diambil. Layout hero, tombol kaca, Spotlight Card, Journey, Text Rewind, dan ilustrasi proyek dibuat lokal. Tidak diperlukan menunggu kuota selama beberapa hari.

Hero akan memakai objek 3D diri Jascon. Karena pengguna belum memiliki bahan, tempat dan integrasi scene sudah disiapkan; monogram lokal ditampilkan sementara. Avatar personal akan dipasang setelah model atau scene tersedia.

## Status persiapan

- Selesai: review akun dan 11 bookmark, pemeriksaan portfolio saat ini, konsep dan pemetaan komponen, pendaftaran MCP resmi `21st`, autentikasi memakai API key yang dipasang pengguna, discovery tools, serta pembacaan usage dan daftar For My Page melalui MCP.
- Bukti tersimpan: `docs/21st-usage-check.json`, `docs/21st-bookmark-lists.json`, dan `docs/21st-bookmarks.json`. Inventaris memuat ID komponen resmi untuk retrieval pada tahap implementasi. File-file ini tidak berisi nilai API key.
- Catatan aplikasi: variabel API key sudah tersedia di environment akun Windows. Proses chat yang aktif belum menampilkan tools 21st pada katalog bawaannya saat pengecekan; uji protokol langsung sudah berhasil. Muat ulang koneksi atau buka kembali Codex bila tools belum tampil.
- Implementasi: seluruh halaman dibangun ulang memakai sistem visual ivory/cobalt; tujuh proyek tetap bersumber dari data awal. Coverflow mengutamakan karya featured, lalu menampilkan empat karya lainnya. Journey dibuat sendiri dengan pilihan milestone dan susunan vertikal di ponsel.
- Sumber komponen dan adaptasinya tercatat di `docs/component-sources.md`. Desain awal tersimpan sebagai backup.
- Belum tersedia: avatar personal dan screenshot proyek yang boleh dipublikasikan. Cover proyek memakai ilustrasi konsep buatan sendiri.
- Target Lighthouse/LCP belum diukur; angka target di atas bukan klaim hasil verifikasi.

Referensi koneksi: [21st MCP](https://21st.dev/mcp), [plugin resmi 21st untuk Codex](https://github.com/21st-dev/codex-plugin), dan [dokumentasi MCP Codex](https://learn.chatgpt.com/docs/extend/mcp?surface=cli).
