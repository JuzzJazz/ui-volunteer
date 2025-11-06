# Volunteer Registration System - Wahaha MisiihIndonesia

Website pendaftaran volunteer lengkap dengan landing page, form registrasi, dan dashboard untuk Wahaha MisiihIndonesia.

## ✨ Fitur Utama

### 🏠 Landing Page
- Hero section dengan gambar menarik
- Navigasi lengkap dengan multi-level menu
- Section informasi volunteer KinCir
- Feature cards untuk highlight program
- Footer dengan social media links
- Desain responsif dan modern

### 📝 Form Registrasi
- Form pendaftaran volunteer dengan validasi
- Input tanggal lahir dengan dropdown
- Checkbox untuk berbagai kategori sponsor
- Upload file untuk ID Card dan CV
- Validasi form yang komprehensif

### 📊 Dashboard Volunteer
- Profil volunteer
- Daftar events dan opportunities
- Points & badges system
- History aktivitas
- Certificate management

## 🚀 Teknologi Yang Digunakan

- **Vue.js 3** - Framework JavaScript
- **Vite** - Build Tool & Dev Server
- **CSS3** - Styling dengan Grid & Flexbox
- **JavaScript ES6+** - Modern JavaScript

## 📦 Instalasi

1. Clone repository ini
   ```bash
   git clone https://github.com/JuzzJazz/ui-volunteer.git
   cd ui-volunteer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Jalankan development server:
   ```bash
   npm run dev
   ```

4. Buka browser dan akses `http://localhost:5173/`

## 🏗️ Struktur Project

```
src/
├── components/
│   ├── LandingPage.vue               # Landing page utama
│   ├── VolunteerRegistrationForm.vue # Form pendaftaran
│   ├── VolunteerDashboard.vue        # Dashboard volunteer
│   ├── ProfilePage.vue               # Halaman profil
│   ├── EventsPage.vue                # Daftar events
│   ├── OpportunitiesPage.vue         # Volunteer opportunities
│   ├── PointsBadgePage.vue           # Points & badges
│   ├── HistoryPage.vue               # Riwayat aktivitas
│   ├── CertificatesPage.vue          # Sertifikat
│   ├── MyCampaignPage.vue            # Campaign volunteer
│   ├── WriteStoryPage.vue            # Tulis cerita
│   └── ChangePasswordPage.vue        # Ganti password
├── App.vue                           # Komponen root
└── main.js                           # Entry point
```

## 🎨 Fitur Landing Page

- **Navigation Bar**: Menu lengkap dengan language switcher dan icons
- **Hero Section**: Banner besar dengan CTA buttons
- **Volunteer Info**: Section "ToGether, To Other, To Be Better"
- **Features**: Tiga highlight fitur utama program
- **Footer**: Social media links dan quick navigation

## 📝 Form Registrasi

### Input Fields:
- Status (dropdown)
- Tanggal Lahir (3 dropdown: tanggal, bulan, tahun)
- Jenis Kelamin (radio button)
- Email
- Kata Sandi
- Agama
- Kegiatan relawan yang diminati
- Profesi
- Alamat
- Motivasi
- Provinsi
- Kota/Kabupaten

### Checkbox Categories:
Berbagai kategori keahlian volunteer seperti:
- Administrasi
- Akuntansi/Finansial
- Animasi
- Bicara Didepan Umum
- Data Analisis
- Desain Grafis
- Dan banyak lagi...

### File Upload:
- Upload ID Card
- Upload CV (format PDF, DOC, DOCX)
- Link Portfolio (opsional)

### Agreement Checkboxes:
- KTP
- Kebijakan Privasi
- Kebijakan Perlindungan Anak
- Pernyataan Janji

## Scripts

- `npm run dev` - Menjalankan development server
- `npm run build` - Build untuk production
- `npm run preview` - Preview build production

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Catatan

Form ini dibuat untuk mencocokkan desain yang diberikan dengan menggunakan Vue.js 3 dan styling CSS custom untuk memberikan pengalaman pengguna yang optimal.
