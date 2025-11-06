# Volunteer Registration Form

Website form pendaftaran volunteer menggunakan Vue.js yang dibuat berdasarkan desain yang diberikan.

## Fitur

- Form pendaftaran volunteer dengan validasi
- Desain responsif
- Input tanggal lahir dengan dropdown
- Checkbox untuk berbagai kategori sponsor
- Upload file untuk ID Card dan CV
- Validasi form yang komprehensif

## Teknologi Yang Digunakan

- Vue.js 3
- Vite (Build Tool)
- CSS3 dengan Grid dan Flexbox
- JavaScript ES6+

## Instalasi

1. Clone repository ini
2. Install dependencies:
   ```bash
   npm install
   ```

3. Jalankan development server:
   ```bash
   npm run dev
   ```

4. Buka browser dan akses `http://localhost:5173/`

## Struktur Project

```
src/
├── components/
│   └── VolunteerRegistrationForm.vue  # Komponen utama form
├── App.vue                            # Komponen root
└── main.js                           # Entry point
```

## Fitur Form

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
