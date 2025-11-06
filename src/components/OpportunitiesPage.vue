<template>
  <div class="opportunities-container">
    <div class="page-header">
      <h1 class="page-title">
        <span class="title-icon">🤝</span>
        Peluang Relawan
      </h1>
      <p class="page-subtitle">Temukan kesempatan volunteer yang sesuai dengan minat dan passion Anda</p>
    </div>

    <!-- Filter Section -->
    <div class="filter-section">
      <div class="filter-group">
        <label class="filter-label">
          <span class="filter-icon">📍</span>
          Lokasi
        </label>
        <select v-model="filters.location" class="filter-select">
          <option value="">Semua Lokasi</option>
          <option value="jakarta">Jakarta</option>
          <option value="bandung">Bandung</option>
          <option value="surabaya">Surabaya</option>
          <option value="yogyakarta">Yogyakarta</option>
        </select>
      </div>

      <div class="filter-group">
        <label class="filter-label">
          <span class="filter-icon">🏷️</span>
          Kategori
        </label>
        <select v-model="filters.category" class="filter-select">
          <option value="">Semua Kategori</option>
          <option value="pendidikan">Pendidikan</option>
          <option value="kesehatan">Kesehatan</option>
          <option value="lingkungan">Lingkungan</option>
          <option value="sosial">Sosial</option>
        </select>
      </div>

      <div class="filter-group">
        <label class="filter-label">
          <span class="filter-icon">⏰</span>
          Durasi
        </label>
        <select v-model="filters.duration" class="filter-select">
          <option value="">Semua Durasi</option>
          <option value="short">1-3 Hari</option>
          <option value="medium">1-2 Minggu</option>
          <option value="long">1 Bulan+</option>
        </select>
      </div>

      <button @click="applyFilters" class="filter-btn">
        <span class="btn-icon">🔍</span>
        Cari
      </button>
    </div>

    <!-- Opportunities Grid -->
    <div class="opportunities-section">
      <div class="section-header">
        <h2 class="section-title">Tersedia {{ filteredOpportunities.length }} Peluang</h2>
        <div class="view-toggle">
          <button 
            @click="viewMode = 'grid'" 
            class="toggle-btn"
            :class="{ active: viewMode === 'grid' }"
          >
            ⊞
          </button>
          <button 
            @click="viewMode = 'list'" 
            class="toggle-btn"
            :class="{ active: viewMode === 'list' }"
          >
            ☰
          </button>
        </div>
      </div>

      <div v-if="filteredOpportunities.length === 0" class="empty-state">
        <div class="empty-icon">🔍</div>
        <h3 class="empty-title">Tidak Ada Peluang Ditemukan</h3>
        <p class="empty-text">Coba ubah filter pencarian Anda untuk menemukan peluang volunteer lainnya</p>
      </div>

      <div v-else class="opportunities-grid" :class="{ 'list-view': viewMode === 'list' }">
        <div 
          v-for="opportunity in paginatedOpportunities" 
          :key="opportunity.id"
          class="opportunity-card"
        >
          <!-- Card Image -->
          <div class="card-image">
            <img :src="opportunity.image" :alt="opportunity.title" />
            <div class="image-overlay">
              <span class="overlay-tag">{{ opportunity.tag }}</span>
            </div>
            <div class="points-badge">
              <span class="badge-icon">❤️</span>
              <span class="badge-text">{{ opportunity.points }} Poin</span>
            </div>
          </div>

          <!-- Card Content -->
          <div class="card-content">
            <h3 class="card-title">{{ opportunity.title }}</h3>
            
            <div class="card-meta">
              <div class="meta-item">
                <span class="meta-icon">📅</span>
                <span class="meta-text">{{ opportunity.date }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-icon">📍</span>
                <span class="meta-text">{{ opportunity.location }}</span>
              </div>
            </div>

            <div class="card-footer">
              <button @click="viewDetails(opportunity)" class="btn-detail">
                <span class="btn-text">Detail</span>
                <span class="btn-arrow">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="filteredOpportunities.length > 0" class="pagination">
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

    <!-- Detail Modal -->
    <div v-if="selectedOpportunity" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button @click="closeModal" class="modal-close">✕</button>
        
        <div class="modal-image">
          <img :src="selectedOpportunity.image" :alt="selectedOpportunity.title" />
        </div>

        <div class="modal-body">
          <div class="modal-tag">{{ selectedOpportunity.tag }}</div>
          <h2 class="modal-title">{{ selectedOpportunity.title }}</h2>
          
          <div class="modal-info">
            <div class="info-row">
              <span class="info-label">📅 Tanggal:</span>
              <span class="info-value">{{ selectedOpportunity.date }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">📍 Lokasi:</span>
              <span class="info-value">{{ selectedOpportunity.location }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">❤️ Poin:</span>
              <span class="info-value">{{ selectedOpportunity.points }} Poin</span>
            </div>
          </div>

          <div class="modal-description">
            <h3 class="description-title">Deskripsi</h3>
            <p class="description-text">{{ selectedOpportunity.description }}</p>
          </div>

          <div class="modal-actions">
            <button @click="applyOpportunity" class="btn-apply">
              <span class="btn-icon">✓</span>
              Daftar Sekarang
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const viewMode = ref('grid')
const currentPage = ref(1)
const itemsPerPage = 6
const selectedOpportunity = ref(null)

const filters = ref({
  location: '',
  category: '',
  duration: ''
})

const opportunities = ref([
  {
    id: 1,
    title: 'Volunteer Kampanye Stop Kekerasan Seksual',
    date: 'Kamis, 06 November 2025 - Selasa, 25 November 2025',
    location: 'JAKARTA PUSAT',
    tag: '#VOLUNTEER-KINCIRLAPANGAN',
    points: 30,
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=300&fit=crop',
    description: 'Bergabunglah dalam kampanye penting untuk menghentikan kekerasan seksual. Anda akan terlibat dalam kegiatan edukasi masyarakat, distribusi materi kampanye, dan mengadakan diskusi kelompok tentang pencegahan kekerasan seksual.',
    category: 'sosial',
    duration: 'medium'
  },
  {
    id: 2,
    title: 'Holiday in the Forest - Activation Crew',
    date: 'Kamis, 30 Oktober 2025 - Kamis, 20 November 2025',
    location: 'JAKARTA SELATAN',
    tag: '#VOLUNTEER-KINCIRLAPANGAN',
    points: 50,
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=300&fit=crop',
    description: 'Nikmati pengalaman unik di hutan sambil membantu aktivasi acara outdoor. Tim activation crew akan bertanggung jawab untuk mempersiapkan lokasi, mengkoordinasi peserta, dan memastikan kelancaran acara.',
    category: 'lingkungan',
    duration: 'medium'
  },
  {
    id: 3,
    title: 'Holiday in the Forest - Social Media Crew',
    date: 'Kamis, 30 Oktober 2025 - Kamis, 20 November 2025',
    location: 'JAKARTA SELATAN',
    tag: '#VOLUNTEER-KINCIRLAPANGAN',
    points: 50,
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop',
    description: 'Dokumentasikan momen-momen berharga dari acara Holiday in the Forest melalui social media. Anda akan membuat konten menarik, live update, dan berinteraksi dengan followers untuk meningkatkan awareness acara.',
    category: 'sosial',
    duration: 'medium'
  },
  {
    id: 4,
    title: 'Holiday in the Forest - Photographer Polaroid',
    date: 'Kamis, 30 Oktober 2025 - Kamis, 20 November 2025',
    location: 'JAKARTA SELATAN',
    tag: '#VOLUNTEER-KINCIRLAPANGAN',
    points: 50,
    image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&h=300&fit=crop',
    description: 'Tangkap momen spesial dengan kamera polaroid! Sebagai photographer polaroid, Anda akan mengabadikan senyuman dan kebahagiaan peserta acara, memberikan kenangan instan yang tak terlupakan.',
    category: 'sosial',
    duration: 'medium'
  },
  {
    id: 5,
    title: 'Holiday in the Forest - Photographer',
    date: 'Kamis, 30 Oktober 2025 - Kamis, 20 November 2025',
    location: 'JAKARTA SELATAN',
    tag: '#VOLUNTEER-KINCIRLAPANGAN',
    points: 50,
    image: 'https://images.unsplash.com/photo-1471897488648-5eae4ac6686b?w=400&h=300&fit=crop',
    description: 'Dokumentasikan keindahan alam dan kegiatan volunteer dengan kamera profesional. Hasil foto Anda akan digunakan untuk publikasi dan arsip organisasi.',
    category: 'sosial',
    duration: 'medium'
  },
  {
    id: 6,
    title: 'Holiday in the Forest - Videographer',
    date: 'Kamis, 30 Oktober 2025 - Kamis, 20 November 2025',
    location: 'JAKARTA SELATAN',
    tag: '#VOLUNTEER-KINCIRLAPANGAN',
    points: 50,
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&h=300&fit=crop',
    description: 'Buat video dokumenter yang menginspirasi tentang kegiatan volunteer di hutan. Video Anda akan membantu menyebarkan misi dan nilai-nilai organisasi kepada khalayak luas.',
    category: 'sosial',
    duration: 'medium'
  },
  {
    id: 7,
    title: 'Mengajar Anak-Anak di Desa Terpencil',
    date: 'Senin, 10 November 2025 - Jumat, 28 November 2025',
    location: 'BANDUNG',
    tag: '#VOLUNTEER-KINCIRPENDIDIKAN',
    points: 75,
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=300&fit=crop',
    description: 'Berbagi ilmu dan pengalaman dengan anak-anak di desa terpencil. Kegiatan meliputi mengajar, mendampingi, dan mengembangkan metode pembelajaran yang menyenangkan.',
    category: 'pendidikan',
    duration: 'medium'
  },
  {
    id: 8,
    title: 'Program Donor Darah Massal',
    date: 'Sabtu, 15 November 2025 - Minggu, 16 November 2025',
    location: 'SURABAYA',
    tag: '#VOLUNTEER-KINCIRKESEHATAN',
    points: 20,
    image: 'https://images.unsplash.com/photo-1615461066159-fea0960485d5?w=400&h=300&fit=crop',
    description: 'Bantu menyelamatkan nyawa dengan menjadi relawan di acara donor darah massal. Tugas meliputi registrasi peserta, pendampingan donor, dan edukasi kesehatan.',
    category: 'kesehatan',
    duration: 'short'
  }
])

const filteredOpportunities = computed(() => {
  let result = opportunities.value

  if (filters.value.location) {
    result = result.filter(opp => 
      opp.location.toLowerCase().includes(filters.value.location.toLowerCase())
    )
  }

  if (filters.value.category) {
    result = result.filter(opp => opp.category === filters.value.category)
  }

  if (filters.value.duration) {
    result = result.filter(opp => opp.duration === filters.value.duration)
  }

  return result
})

const totalPages = computed(() => {
  return Math.ceil(filteredOpportunities.value.length / itemsPerPage)
})

const paginatedOpportunities = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredOpportunities.value.slice(start, end)
})

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

const viewDetails = (opportunity) => {
  selectedOpportunity.value = opportunity
}

const closeModal = () => {
  selectedOpportunity.value = null
}

const applyOpportunity = () => {
  alert(`Anda telah mendaftar untuk: ${selectedOpportunity.value.title}`)
  closeModal()
}
</script>

<style scoped>
.opportunities-container {
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
  animation: wave 2s ease-in-out infinite;
}

@keyframes wave {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-10deg); }
  75% { transform: rotate(10deg); }
}

.page-subtitle {
  font-size: 16px;
  color: #6b7280;
  margin: 0;
  font-weight: 500;
}

/* Filter Section */
.filter-section {
  background: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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

.filter-btn {
  padding: 12px 24px;
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
  align-self: flex-end;
}

.filter-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(249, 115, 22, 0.4);
}

.btn-icon {
  font-size: 16px;
}

/* Opportunities Section */
.opportunities-section {
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

.view-toggle {
  display: flex;
  gap: 8px;
}

.toggle-btn {
  width: 40px;
  height: 40px;
  border: 2px solid #e5e7eb;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  transition: all 0.3s ease;
}

.toggle-btn:hover {
  border-color: #f97316;
  color: #f97316;
}

.toggle-btn.active {
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  color: white;
  border-color: #f97316;
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

/* Opportunities Grid */
.opportunities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

.opportunities-grid.list-view {
  grid-template-columns: 1fr;
}

.opportunity-card {
  background: white;
  border-radius: 16px;
  border: 2px solid #e5e7eb;
  overflow: hidden;
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

.opportunity-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
  border-color: #f97316;
}

.card-image {
  width: 100%;
  height: 200px;
  position: relative;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.opportunity-card:hover .card-image img {
  transform: scale(1.1);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, transparent 50%, rgba(0, 0, 0, 0.5) 100%);
  display: flex;
  align-items: flex-end;
  padding: 16px;
}

.overlay-tag {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.points-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  color: white;
  padding: 8px 16px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 700;
  font-size: 14px;
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.4);
}

.badge-icon {
  font-size: 16px;
}

.card-content {
  padding: 20px;
}

.card-title {
  font-size: 16px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 16px 0;
  line-height: 1.4;
  min-height: 44px;
}

.card-meta {
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

.card-footer {
  padding-top: 16px;
  border-top: 2px solid #e5e7eb;
}

.btn-detail {
  width: 100%;
  padding: 12px 20px;
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
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
  box-shadow: 0 4px 12px rgba(251, 191, 36, 0.3);
}

.btn-detail:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(251, 191, 36, 0.4);
}

.btn-arrow {
  font-size: 18px;
  transition: transform 0.3s ease;
}

.btn-detail:hover .btn-arrow {
  transform: translateX(4px);
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
  background: rgba(0, 0, 0, 0.7);
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
  max-width: 600px;
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
  background: rgba(0, 0, 0, 0.5);
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

.modal-image {
  width: 100%;
  height: 300px;
  overflow: hidden;
  border-radius: 20px 20px 0 0;
}

.modal-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-body {
  padding: 32px;
}

.modal-tag {
  display: inline-block;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 16px;
}

.modal-title {
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 24px 0;
  line-height: 1.4;
}

.modal-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);
  border-radius: 12px;
  margin-bottom: 24px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.info-label {
  font-weight: 600;
  color: #6b7280;
}

.info-value {
  font-weight: 700;
  color: #1f2937;
}

.modal-description {
  margin-bottom: 24px;
}

.description-title {
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 12px 0;
}

.description-text {
  font-size: 15px;
  color: #6b7280;
  line-height: 1.7;
  margin: 0;
}

.modal-actions {
  display: flex;
  justify-content: center;
}

.btn-apply {
  padding: 14px 40px;
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  color: white;
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
  box-shadow: 0 4px 16px rgba(249, 115, 22, 0.4);
}

.btn-apply:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(249, 115, 22, 0.5);
}

/* Responsive */
@media (max-width: 768px) {
  .filter-section {
    grid-template-columns: 1fr;
  }

  .filter-btn {
    align-self: stretch;
  }

  .opportunities-grid {
    grid-template-columns: 1fr;
  }

  .section-header {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }

  .modal-body {
    padding: 24px;
  }

  .modal-title {
    font-size: 20px;
  }
}
</style>
