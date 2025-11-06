<template>
  <div class="certificates-container">
    <div class="page-header">
      <h1 class="page-title">
        <span class="title-icon">🎓</span>
        Sertifikat Online
      </h1>
      <p class="page-subtitle">Kelola dan unduh sertifikat volunteer Anda dengan mudah</p>
    </div>

    <!-- Statistics Section -->
    <div class="stats-section">
      <div class="stat-card">
        <div class="stat-icon total">📜</div>
        <div class="stat-content">
          <div class="stat-value">{{ certificates.length }}</div>
          <div class="stat-label">Total Sertifikat</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon verified">✓</div>
        <div class="stat-content">
          <div class="stat-value">{{ verifiedCount }}</div>
          <div class="stat-label">Terverifikasi</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon downloaded">⬇</div>
        <div class="stat-content">
          <div class="stat-value">{{ downloadedCount }}</div>
          <div class="stat-label">Telah Diunduh</div>
        </div>
      </div>
    </div>

    <!-- Filter & Search Section -->
    <div class="filter-section">
      <div class="search-group">
        <span class="search-icon">🔍</span>
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Cari sertifikat..."
          class="search-input"
          @input="handleSearch"
        />
      </div>

      <div class="filter-group">
        <label class="filter-label">
          <span class="filter-icon">📅</span>
          Tahun
        </label>
        <select v-model="filters.year" class="filter-select" @change="applyFilters">
          <option value="">Semua Tahun</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
        </select>
      </div>

      <div class="filter-group">
        <label class="filter-label">
          <span class="filter-icon">🏷️</span>
          Kategori
        </label>
        <select v-model="filters.category" class="filter-select" @change="applyFilters">
          <option value="">Semua Kategori</option>
          <option value="volunteer">Volunteer</option>
          <option value="training">Training</option>
          <option value="workshop">Workshop</option>
          <option value="event">Event</option>
        </select>
      </div>

      <div class="filter-group">
        <label class="filter-label">
          <span class="filter-icon">📊</span>
          Status
        </label>
        <select v-model="filters.status" class="filter-select" @change="applyFilters">
          <option value="">Semua Status</option>
          <option value="verified">Terverifikasi</option>
          <option value="pending">Menunggu Verifikasi</option>
        </select>
      </div>
    </div>

    <!-- Certificates Section -->
    <div class="certificates-section">
      <div class="section-header">
        <h2 class="section-title">Daftar Sertifikat ({{ filteredCertificates.length }})</h2>
        <button @click="downloadAll" class="btn-download-all">
          <span class="btn-icon">⬇</span>
          <span class="btn-text">Unduh Semua</span>
        </button>
      </div>

      <div v-if="filteredCertificates.length === 0" class="empty-state">
        <div class="empty-icon">📭</div>
        <h3 class="empty-title">Tidak Ada Sertifikat</h3>
        <p class="empty-text">
          {{ searchQuery ? 'Tidak ada sertifikat yang sesuai dengan pencarian Anda' : 'Anda belum memiliki sertifikat. Ikuti kegiatan volunteer untuk mendapatkan sertifikat!' }}
        </p>
      </div>

      <div v-else class="certificates-grid">
        <div 
          v-for="certificate in paginatedCertificates" 
          :key="certificate.id"
          class="certificate-card"
          :class="{ verified: certificate.status === 'verified' }"
        >
          <!-- Certificate Preview -->
          <div class="certificate-preview">
            <div class="certificate-image">
              <img :src="certificate.previewImage" :alt="certificate.title" />
              <div class="preview-overlay">
                <button @click="viewCertificate(certificate)" class="btn-preview">
                  <span class="preview-icon">👁️</span>
                  <span class="preview-text">Lihat</span>
                </button>
              </div>
            </div>
            
            <div v-if="certificate.status === 'verified'" class="verified-badge">
              <span class="badge-icon">✓</span>
              <span class="badge-text">Terverifikasi</span>
            </div>
            
            <div v-else class="pending-badge">
              <span class="badge-icon">⏳</span>
              <span class="badge-text">Pending</span>
            </div>
          </div>

          <!-- Certificate Info -->
          <div class="certificate-info">
            <div class="info-header">
              <span class="certificate-category">{{ getCategoryLabel(certificate.category) }}</span>
              <span class="certificate-code">{{ certificate.code }}</span>
            </div>

            <h3 class="certificate-title">{{ certificate.title }}</h3>
            
            <div class="info-meta">
              <div class="meta-item">
                <span class="meta-icon">📅</span>
                <span class="meta-text">{{ certificate.issueDate }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-icon">🏢</span>
                <span class="meta-text">{{ certificate.issuer }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-icon">⏱️</span>
                <span class="meta-text">{{ certificate.duration }}</span>
              </div>
            </div>

            <div class="certificate-footer">
              <button 
                @click="downloadCertificate(certificate)" 
                class="btn-download"
                :class="{ downloaded: certificate.downloaded }"
              >
                <span class="btn-icon">{{ certificate.downloaded ? '✓' : '⬇' }}</span>
                <span class="btn-text">{{ certificate.downloaded ? 'Terunduh' : 'Unduh' }}</span>
              </button>
              <button @click="shareCertificate(certificate)" class="btn-share">
                <span class="btn-icon">🔗</span>
                <span class="btn-text">Bagikan</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="filteredCertificates.length > 0" class="pagination">
        <button 
          class="pagination-btn" 
          @click="prevPage" 
          :disabled="currentPage === 1"
        >
          ‹
        </button>
        <div class="pagination-info">
          <span class="page-number">{{ currentPage }}</span>
          <span class="page-separator">/</span>
          <span class="page-total">{{ totalPages }}</span>
        </div>
        <button 
          class="pagination-btn" 
          @click="nextPage" 
          :disabled="currentPage === totalPages"
        >
          ›
        </button>
      </div>
    </div>

    <!-- Certificate Modal -->
    <div v-if="selectedCertificate" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button @click="closeModal" class="modal-close">✕</button>
        
        <div class="modal-header">
          <h2 class="modal-title">{{ selectedCertificate.title }}</h2>
          <span class="modal-status" :class="selectedCertificate.status">
            {{ selectedCertificate.status === 'verified' ? '✓ Terverifikasi' : '⏳ Pending' }}
          </span>
        </div>

        <div class="modal-body">
          <div class="certificate-full-preview">
            <img :src="selectedCertificate.previewImage" :alt="selectedCertificate.title" />
          </div>

          <div class="certificate-details">
            <div class="detail-row">
              <span class="detail-label">Nomor Sertifikat:</span>
              <span class="detail-value">{{ selectedCertificate.code }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Kategori:</span>
              <span class="detail-value">{{ getCategoryLabel(selectedCertificate.category) }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Tanggal Terbit:</span>
              <span class="detail-value">{{ selectedCertificate.issueDate }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Penerbit:</span>
              <span class="detail-value">{{ selectedCertificate.issuer }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Durasi Kegiatan:</span>
              <span class="detail-value">{{ selectedCertificate.duration }}</span>
            </div>
            <div v-if="selectedCertificate.description" class="detail-row full">
              <span class="detail-label">Deskripsi:</span>
              <span class="detail-value">{{ selectedCertificate.description }}</span>
            </div>
          </div>

          <div class="modal-actions">
            <button @click="downloadCertificate(selectedCertificate)" class="btn-download-modal">
              <span class="btn-icon">⬇</span>
              Unduh Sertifikat
            </button>
            <button @click="shareCertificate(selectedCertificate)" class="btn-share-modal">
              <span class="btn-icon">🔗</span>
              Bagikan
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = 6
const selectedCertificate = ref(null)

const filters = ref({
  year: '',
  category: '',
  status: ''
})

const certificates = ref([
  {
    id: 1,
    code: 'CERT-2025-001-VL',
    title: 'Sertifikat Volunteer Kampanye Stop Kekerasan Seksual',
    category: 'volunteer',
    issueDate: '25 November 2025',
    issuer: 'Kincir Indonesia',
    duration: '20 Hari',
    status: 'verified',
    downloaded: false,
    previewImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=300&fit=crop',
    description: 'Sertifikat ini diberikan atas partisipasi aktif dalam kampanye penghentian kekerasan seksual di wilayah Jakarta Pusat.',
    year: '2025'
  },
  {
    id: 2,
    code: 'CERT-2025-002-WS',
    title: 'Sertifikat Workshop Fotografi untuk Volunteer',
    category: 'workshop',
    issueDate: '15 November 2025',
    issuer: 'Kincir Indonesia',
    duration: '1 Hari',
    status: 'verified',
    downloaded: true,
    previewImage: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&h=300&fit=crop',
    description: 'Sertifikat penyelesaian workshop fotografi dokumentasi untuk kegiatan volunteer.',
    year: '2025'
  },
  {
    id: 3,
    code: 'CERT-2025-003-TR',
    title: 'Sertifikat Training Disaster Response Team',
    category: 'training',
    issueDate: '20 November 2025',
    issuer: 'Indonesia Disaster Relief',
    duration: '1 Hari',
    status: 'pending',
    downloaded: false,
    previewImage: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=300&fit=crop',
    description: 'Sertifikat pelatihan intensif tim tanggap darurat bencana (menunggu verifikasi).',
    year: '2025'
  },
  {
    id: 4,
    code: 'CERT-2025-004-EV',
    title: 'Sertifikat Gathering Volunteer Tahunan 2025',
    category: 'event',
    issueDate: '30 November 2025',
    issuer: 'Kincir Indonesia',
    duration: '1 Hari',
    status: 'verified',
    downloaded: false,
    previewImage: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop',
    description: 'Sertifikat partisipasi dalam acara gathering tahunan volunteer.',
    year: '2025'
  },
  {
    id: 5,
    code: 'CERT-2024-015-VL',
    title: 'Sertifikat Holiday in the Forest - Photographer',
    category: 'volunteer',
    issueDate: '20 November 2024',
    issuer: 'Kincir Indonesia',
    duration: '21 Hari',
    status: 'verified',
    downloaded: true,
    previewImage: 'https://images.unsplash.com/photo-1471897488648-5eae4ac6686b?w=400&h=300&fit=crop',
    description: 'Sertifikat sebagai fotografer dalam acara Holiday in the Forest.',
    year: '2024'
  },
  {
    id: 6,
    code: 'CERT-2024-016-VL',
    title: 'Sertifikat Aksi Bersih-Bersih Pantai Jakarta',
    category: 'volunteer',
    issueDate: '22 November 2024',
    issuer: 'Save Our Ocean',
    duration: '6 Jam',
    status: 'verified',
    downloaded: false,
    previewImage: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=400&h=300&fit=crop',
    description: 'Sertifikat partisipasi dalam kegiatan pembersihan pantai.',
    year: '2024'
  },
  {
    id: 7,
    code: 'CERT-2024-017-WS',
    title: 'Sertifikat Workshop Pembuatan Konten Media Sosial',
    category: 'workshop',
    issueDate: '26 November 2024',
    issuer: 'Digital Volunteer Network',
    duration: '3 Jam',
    status: 'verified',
    downloaded: true,
    previewImage: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop',
    description: 'Sertifikat penyelesaian workshop pembuatan konten media sosial untuk kampanye.',
    year: '2024'
  },
  {
    id: 8,
    code: 'CERT-2023-045-VL',
    title: 'Sertifikat Bakti Sosial di Panti Asuhan',
    category: 'volunteer',
    issueDate: '15 Desember 2023',
    issuer: 'Berbagi Kasih Foundation',
    duration: '6 Jam',
    status: 'verified',
    downloaded: false,
    previewImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=300&fit=crop',
    description: 'Sertifikat kegiatan bakti sosial di panti asuhan.',
    year: '2023'
  }
])

const filteredCertificates = computed(() => {
  let result = certificates.value

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(cert => 
      cert.title.toLowerCase().includes(query) ||
      cert.code.toLowerCase().includes(query) ||
      cert.issuer.toLowerCase().includes(query)
    )
  }

  // Year filter
  if (filters.value.year) {
    result = result.filter(cert => cert.year === filters.value.year)
  }

  // Category filter
  if (filters.value.category) {
    result = result.filter(cert => cert.category === filters.value.category)
  }

  // Status filter
  if (filters.value.status) {
    result = result.filter(cert => cert.status === filters.value.status)
  }

  return result
})

const verifiedCount = computed(() => {
  return certificates.value.filter(c => c.status === 'verified').length
})

const downloadedCount = computed(() => {
  return certificates.value.filter(c => c.downloaded).length
})

const totalPages = computed(() => {
  return Math.ceil(filteredCertificates.value.length / itemsPerPage)
})

const paginatedCertificates = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredCertificates.value.slice(start, end)
})

const getCategoryLabel = (category) => {
  const labels = {
    volunteer: 'Volunteer',
    training: 'Training',
    workshop: 'Workshop',
    event: 'Event'
  }
  return labels[category] || category
}

const handleSearch = () => {
  currentPage.value = 1
}

const applyFilters = () => {
  currentPage.value = 1
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const viewCertificate = (certificate) => {
  selectedCertificate.value = certificate
}

const closeModal = () => {
  selectedCertificate.value = null
}

const downloadCertificate = (certificate) => {
  certificate.downloaded = true
  alert(`Mengunduh sertifikat: ${certificate.title}`)
}

const shareCertificate = (certificate) => {
  const shareUrl = `https://volunteer.kincir.id/certificate/${certificate.code}`
  navigator.clipboard.writeText(shareUrl)
  alert(`Link sertifikat telah disalin: ${shareUrl}`)
}

const downloadAll = () => {
  const verifiedCerts = certificates.value.filter(c => c.status === 'verified')
  verifiedCerts.forEach(cert => {
    cert.downloaded = true
  })
  alert(`Mengunduh ${verifiedCerts.length} sertifikat terverifikasi`)
}
</script>

<style scoped>
.certificates-container {
  width: 100%;
}

.page-header {
  margin-bottom: 32px;
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 8px 0;
  display: flex;
  align-items: center;
  gap: 12px;
}

.title-icon {
  font-size: 36px;
  animation: swing 2s ease-in-out infinite;
}

@keyframes swing {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(10deg); }
  75% { transform: rotate(-10deg); }
}

.page-subtitle {
  font-size: 16px;
  color: #6b7280;
  margin: 0;
  font-weight: 500;
}

/* Statistics Section */
.stats-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.stat-card {
  background: white;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.3s ease;
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
}

.stat-icon.total {
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
}

.stat-icon.verified {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.stat-icon.downloaded {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;
  line-height: 1;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 13px;
  color: #6b7280;
  font-weight: 600;
}

/* Filter Section */
.filter-section {
  background: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  display: grid;
  grid-template-columns: 2fr repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 32px;
  animation: slideDown 0.5s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.search-group {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  background: white;
  transition: all 0.3s ease;
}

.search-group:focus-within {
  border-color: #f97316;
  box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.1);
}

.search-icon {
  font-size: 20px;
  color: #9ca3af;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  font-weight: 500;
  color: #1f2937;
}

.search-input::placeholder {
  color: #9ca3af;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.filter-label {
  font-size: 13px;
  font-weight: 700;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.filter-icon {
  font-size: 16px;
}

.filter-select {
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  color: #1f2937;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;
}

.filter-select:hover {
  border-color: #f97316;
}

.filter-select:focus {
  border-color: #f97316;
  box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.1);
}

/* Certificates Section */
.certificates-section {
  background: white;
  padding: 28px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #e5e7eb;
}

.section-title {
  font-size: 20px;
  font-weight: 700;
  color: #f97316;
  margin: 0;
}

.btn-download-all {
  padding: 12px 24px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.btn-download-all:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4);
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 80px 20px;
}

.empty-icon {
  font-size: 100px;
  margin-bottom: 20px;
  opacity: 0.5;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.empty-title {
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 12px 0;
}

.empty-text {
  font-size: 16px;
  color: #6b7280;
  margin: 0;
  max-width: 500px;
  margin: 0 auto;
}

/* Certificates Grid */
.certificates-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

.certificate-card {
  background: white;
  border-radius: 16px;
  border: 2px solid #e5e7eb;
  overflow: hidden;
  transition: all 0.3s ease;
  animation: fadeIn 0.5s ease-out;
}

.certificate-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
  border-color: #f97316;
}

.certificate-card.verified {
  border-color: #10b981;
  background: linear-gradient(to bottom, #ecfdf5 0%, white 50px);
}

.certificate-preview {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.certificate-image {
  width: 100%;
  height: 100%;
  position: relative;
}

.certificate-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.certificate-card:hover .certificate-image img {
  transform: scale(1.1);
}

.preview-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.certificate-card:hover .preview-overlay {
  opacity: 1;
}

.btn-preview {
  padding: 12px 24px;
  background: white;
  color: #1f2937;
  border: none;
  border-radius: 30px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.btn-preview:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
}

.preview-icon {
  font-size: 18px;
}

.verified-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  padding: 8px 16px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 700;
  font-size: 13px;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
}

.pending-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  color: white;
  padding: 8px 16px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 700;
  font-size: 13px;
  box-shadow: 0 4px 12px rgba(251, 191, 36, 0.4);
  animation: pulse-badge 2s ease-in-out infinite;
}

@keyframes pulse-badge {
  0%, 100% { 
    transform: scale(1);
    box-shadow: 0 4px 12px rgba(251, 191, 36, 0.4);
  }
  50% { 
    transform: scale(1.05);
    box-shadow: 0 4px 16px rgba(251, 191, 36, 0.6);
  }
}

.certificate-info {
  padding: 20px;
}

.info-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  gap: 8px;
}

.certificate-category {
  background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%);
  color: #4338ca;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.certificate-code {
  font-size: 11px;
  font-weight: 700;
  color: #6b7280;
  font-family: 'Courier New', monospace;
}

.certificate-title {
  font-size: 16px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 16px 0;
  line-height: 1.4;
  min-height: 44px;
}

.info-meta {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #6b7280;
}

.meta-icon {
  font-size: 16px;
}

.meta-text {
  font-weight: 500;
  line-height: 1.4;
}

.certificate-footer {
  padding-top: 16px;
  border-top: 2px solid #e5e7eb;
  display: flex;
  gap: 8px;
}

.btn-download {
  flex: 1;
  padding: 12px 20px;
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
}

.btn-download:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(249, 115, 22, 0.4);
}

.btn-download.downloaded {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.btn-share {
  flex: 1;
  padding: 12px 20px;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.btn-share:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
}

.btn-icon {
  font-size: 16px;
}

.btn-text {
  font-size: 14px;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 2px solid #e5e7eb;
}

.pagination-btn {
  width: 44px;
  height: 44px;
  border: 2px solid #fed7aa;
  background: white;
  border-radius: 10px;
  cursor: pointer;
  font-size: 24px;
  color: #f97316;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pagination-btn:hover:not(:disabled) {
  background: #f97316;
  color: white;
  border-color: #f97316;
}

.pagination-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.pagination-info {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 700;
}

.page-number {
  color: #f97316;
  font-size: 20px;
}

.page-separator {
  color: #9ca3af;
}

.page-total {
  color: #6b7280;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  animation: fadeIn 0.3s ease-out;
  overflow-y: auto;
}

.modal-content {
  background: white;
  border-radius: 20px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: scaleIn 0.3s ease-out;
  position: relative;
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  border: none;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-close:hover {
  background: #dc2626;
  transform: rotate(90deg);
}

.modal-header {
  padding: 32px 32px 16px;
  border-bottom: 2px solid #e5e7eb;
}

.modal-title {
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 12px 0;
  line-height: 1.4;
  padding-right: 40px;
}

.modal-status {
  display: inline-block;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: white;
}

.modal-status.verified {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.modal-status.pending {
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
}

.modal-body {
  padding: 24px 32px 32px;
}

.certificate-full-preview {
  width: 100%;
  margin-bottom: 24px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.certificate-full-preview img {
  width: 100%;
  height: auto;
  display: block;
}

.certificate-details {
  background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 24px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 10px 0;
  border-bottom: 1px solid #fed7aa;
  gap: 16px;
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-row.full {
  flex-direction: column;
  gap: 8px;
}

.detail-label {
  font-size: 14px;
  font-weight: 700;
  color: #6b7280;
  white-space: nowrap;
}

.detail-value {
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  text-align: right;
}

.detail-row.full .detail-value {
  text-align: left;
}

.modal-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.btn-download-modal,
.btn-share-modal {
  padding: 14px 32px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: white;
}

.btn-download-modal {
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  box-shadow: 0 4px 16px rgba(249, 115, 22, 0.4);
  flex: 1;
}

.btn-download-modal:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(249, 115, 22, 0.5);
}

.btn-share-modal {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.4);
  flex: 1;
}

.btn-share-modal:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.5);
}

/* Responsive */
@media (max-width: 768px) {
  .filter-section {
    grid-template-columns: 1fr;
  }

  .stats-section {
    grid-template-columns: 1fr;
  }

  .certificates-grid {
    grid-template-columns: 1fr;
  }

  .section-header {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }

  .btn-download-all {
    width: 100%;
    justify-content: center;
  }

  .modal-body {
    padding: 20px;
  }

  .modal-header {
    padding: 24px 24px 12px;
  }

  .modal-title {
    font-size: 20px;
  }

  .modal-actions {
    flex-direction: column;
  }

  .certificate-footer {
    flex-direction: column;
  }
}
</style>
