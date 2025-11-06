<template>
  <div class="campaign-container">
    <div class="campaign-header">
      <h1 class="page-title">CAMPAIGN SAYA</h1>
    </div>

    <div class="campaign-content">
      <!-- Filter Section -->
      <div class="filter-card">
        <div class="filter-row">
          <div class="filter-group">
            <label class="filter-label">Status</label>
            <div class="select-wrapper">
              <select v-model="filters.status" class="filter-select">
                <option value="">Semua Status</option>
                <option value="active">Aktif</option>
                <option value="pending">Menunggu Persetujuan</option>
                <option value="draft">Konsep</option>
                <option value="expired">Berakhir</option>
                <option value="reject">Ditolak</option>
              </select>
              <span class="select-arrow">▼</span>
            </div>
          </div>

          <div class="filter-group">
            <label class="filter-label">Tahun</label>
            <div class="select-wrapper">
              <select v-model="filters.year" class="filter-select">
                <option value="">Semua Tahun</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>
              <span class="select-arrow">▼</span>
            </div>
          </div>

          <button @click="applyFilters" class="btn-search">
            <span class="btn-icon">🔍</span>
            CARI
          </button>
        </div>
      </div>

      <!-- Campaign List -->
      <div class="campaigns-section">
        <div v-if="filteredCampaigns.length === 0" class="empty-state">
          <div class="empty-icon">📋</div>
          <h3 class="empty-title">Belum Ada Campaign</h3>
          <p class="empty-text">Anda belum membuat campaign apapun. Klik tombol "BUAT CAMPAIGN" di bagian atas untuk memulai membuat campaign baru!</p>
        </div>

        <div v-else class="campaigns-grid">
          <div 
            v-for="campaign in filteredCampaigns" 
            :key="campaign.id"
            class="campaign-card"
            :class="`status-${campaign.status}`"
          >
            <div class="card-header-section">
              <div class="campaign-status" :class="`status-badge-${campaign.status}`">
                <span class="status-dot"></span>
                {{ getStatusLabel(campaign.status) }}
              </div>
              <div class="campaign-date">
                <span class="date-icon">📅</span>
                {{ campaign.createdDate }}
              </div>
            </div>

            <div class="campaign-body">
              <h3 class="campaign-title">{{ campaign.title }}</h3>
              <p class="campaign-description">{{ campaign.description }}</p>

              <div class="campaign-meta">
                <div class="meta-row">
                  <span class="meta-label">📍 Lokasi:</span>
                  <span class="meta-value">{{ campaign.location }}</span>
                </div>
                <div class="meta-row">
                  <span class="meta-label">📅 Periode:</span>
                  <span class="meta-value">{{ campaign.period }}</span>
                </div>
                <div class="meta-row">
                  <span class="meta-label">👥 Target Relawan:</span>
                  <span class="meta-value">{{ campaign.target }} orang</span>
                </div>
              </div>

              <div class="campaign-stats">
                <div class="stat-box">
                  <div class="stat-icon">👁️</div>
                  <div class="stat-info">
                    <div class="stat-value">{{ campaign.views }}</div>
                    <div class="stat-label">Dilihat</div>
                  </div>
                </div>
                <div class="stat-box">
                  <div class="stat-icon">👤</div>
                  <div class="stat-info">
                    <div class="stat-value">{{ campaign.applicants }}</div>
                    <div class="stat-label">Pendaftar</div>
                  </div>
                </div>
                <div class="stat-box">
                  <div class="stat-icon">✓</div>
                  <div class="stat-info">
                    <div class="stat-value">{{ campaign.accepted }}</div>
                    <div class="stat-label">Diterima</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="campaign-actions">
              <button 
                v-if="campaign.status === 'draft'" 
                @click="publishCampaign(campaign)" 
                class="btn-action btn-publish"
              >
                <span class="action-icon">🚀</span>
                Publikasikan
              </button>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="filteredCampaigns.length > 0" class="pagination">
          <button 
            class="pagination-btn" 
            @click="prevPage" 
            :disabled="currentPage === 1"
          >
            ‹
          </button>
          <span class="page-info">Halaman {{ currentPage }} dari {{ totalPages }}</span>
          <button 
            class="pagination-btn" 
            @click="nextPage" 
            :disabled="currentPage === totalPages"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentPage = ref(1)
const itemsPerPage = 6

const filters = ref({
  status: '',
  year: ''
})

// Sample campaign data
const campaigns = ref([
  {
    id: 1,
    title: 'Program Relawan Pendidikan Anak Desa',
    description: 'Bergabunglah bersama kami untuk membantu mengajar anak-anak di desa terpencil dengan metode pembelajaran yang menyenangkan dan interaktif.',
    status: 'active',
    location: 'Jakarta Selatan',
    period: '1 Des 2025 - 31 Des 2025',
    target: 20,
    views: 245,
    applicants: 18,
    accepted: 15,
    createdDate: '15 Nov 2025'
  },
  {
    id: 2,
    title: 'Aksi Bersih-Bersih Pantai untuk Lingkungan',
    description: 'Mari bersama-sama membersihkan pantai dari sampah plastik demi mewujudkan lingkungan yang lebih bersih dan sehat untuk masa depan.',
    status: 'pending',
    location: 'Bali',
    period: '10 Des 2025 - 12 Des 2025',
    target: 50,
    views: 189,
    applicants: 32,
    accepted: 0,
    createdDate: '10 Nov 2025'
  },
  {
    id: 3,
    title: 'Misi Relawan Kesehatan untuk Desa Terpencil',
    description: 'Berpartisipasi dalam memberikan pelayanan kesehatan gratis dan edukasi kesehatan kepada masyarakat di desa-desa terpencil.',
    status: 'draft',
    location: 'Papua',
    period: '20 Des 2025 - 27 Des 2025',
    target: 10,
    views: 0,
    applicants: 0,
    accepted: 0,
    createdDate: '12 Nov 2025'
  },
  {
    id: 4,
    title: 'Pelatihan Literasi Digital untuk Ibu-Ibu',
    description: 'Mengajarkan keterampilan dasar komputer dan literasi digital kepada ibu-ibu rumah tangga untuk meningkatkan kemampuan mereka.',
    status: 'active',
    location: 'Bandung',
    period: '5 Des 2025 - 15 Des 2025',
    target: 15,
    views: 312,
    applicants: 25,
    accepted: 15,
    createdDate: '8 Nov 2025'
  },
  {
    id: 5,
    title: 'Kampanye Donor Darah Rutin',
    description: 'Event donor darah massal untuk membantu meningkatkan stok persediaan darah di PMI dan membantu pasien yang membutuhkan.',
    status: 'expired',
    location: 'Surabaya',
    period: '1 Nov 2025 - 3 Nov 2025',
    target: 100,
    views: 456,
    applicants: 87,
    accepted: 80,
    createdDate: '20 Okt 2025'
  }
])

const filteredCampaigns = computed(() => {
  let result = campaigns.value

  if (filters.value.status) {
    result = result.filter(c => c.status === filters.value.status)
  }

  if (filters.value.year) {
    result = result.filter(c => c.createdDate.includes(filters.value.year))
  }

  return result
})

const totalPages = computed(() => {
  return Math.ceil(filteredCampaigns.value.length / itemsPerPage)
})

const getStatusLabel = (status) => {
  const labels = {
    active: 'Aktif',
    pending: 'Menunggu Persetujuan',
    draft: 'Konsep',
    expired: 'Berakhir',
    reject: 'Ditolak'
  }
  return labels[status] || status
}

const applyFilters = () => {
  currentPage.value = 1
  console.log('Filters applied:', filters.value)
}

const publishCampaign = (campaign) => {
  console.log('Publish campaign:', campaign)
  campaign.status = 'pending'
  alert(`Campaign "${campaign.title}" telah berhasil dipublikasikan dan sedang menunggu persetujuan dari admin!`)
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}
</script>

<style scoped>
.campaign-container {
  width: 100%;
}

.campaign-header {
  margin-bottom: 24px;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  color: #f97316;
  margin: 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  letter-spacing: 1px;
}

.campaign-content {
  width: 100%;
}

/* Filter Section */
.filter-card {
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 4px 20px rgba(249, 115, 22, 0.3);
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

.filter-row {
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 16px;
  align-items: end;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.filter-label {
  color: white;
  font-weight: 600;
  font-size: 14px;
}

.select-wrapper {
  position: relative;
}

.filter-select {
  width: 100%;
  padding: 12px 40px 12px 16px;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  background: white;
  color: #1f2937;
  cursor: pointer;
  appearance: none;
  transition: all 0.3s ease;
}

.filter-select:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.3);
}

.select-arrow {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #f97316;
  font-size: 12px;
  pointer-events: none;
}

.btn-search {
  background: #fbbf24;
  color: #1f2937;
  border: none;
  padding: 12px 32px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(251, 191, 36, 0.3);
}

.btn-search:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(251, 191, 36, 0.4);
  background: #f59e0b;
}

.btn-icon {
  font-size: 16px;
}

/* Campaigns Section */
.campaigns-section {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 80px 20px;
}

.empty-icon {
  font-size: 80px;
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
  margin-bottom: 12px;
}

.empty-text {
  color: #6b7280;
  font-size: 16px;
  max-width: 500px;
  margin: 0 auto;
}

/* Campaigns Grid */
.campaigns-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
}

.campaign-card {
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

.campaign-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
  border-color: #f97316;
}

.campaign-card.status-active {
  border-left: 4px solid #10b981;
}

.campaign-card.status-pending {
  border-left: 4px solid #f59e0b;
}

.campaign-card.status-draft {
  border-left: 4px solid #6b7280;
}

.campaign-card.status-expired {
  border-left: 4px solid #ef4444;
}

.campaign-card.status-reject {
  border-left: 4px solid #dc2626;
}

.card-header-section {
  padding: 16px 20px;
  background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);
  border-bottom: 1px solid #fed7aa;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.campaign-status {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.status-badge-active {
  background: #d1fae5;
  color: #065f46;
}

.status-badge-active .status-dot {
  background: #10b981;
}

.status-badge-pending {
  background: #fef3c7;
  color: #92400e;
}

.status-badge-pending .status-dot {
  background: #f59e0b;
}

.status-badge-draft {
  background: #f3f4f6;
  color: #374151;
}

.status-badge-draft .status-dot {
  background: #6b7280;
}

.status-badge-expired {
  background: #fee2e2;
  color: #991b1b;
}

.status-badge-expired .status-dot {
  background: #ef4444;
}

.status-badge-reject {
  background: #fecaca;
  color: #7f1d1d;
}

.status-badge-reject .status-dot {
  background: #dc2626;
}

.campaign-date {
  color: #6b7280;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.date-icon {
  font-size: 14px;
}

.campaign-body {
  padding: 20px;
}

.campaign-title {
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 12px;
  line-height: 1.4;
}

.campaign-description {
  color: #6b7280;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 16px;
}

.campaign-meta {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
  padding: 12px;
  background: #f9fafb;
  border-radius: 8px;
}

.meta-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
}

.meta-label {
  color: #6b7280;
  font-weight: 600;
}

.meta-value {
  color: #1f2937;
}

.campaign-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 16px;
}

.stat-box {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.stat-box:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.2);
}

.stat-icon {
  font-size: 24px;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 18px;
  font-weight: 700;
  color: #f97316;
}

.stat-label {
  font-size: 11px;
  color: #6b7280;
}

.campaign-actions {
  display: flex;
  gap: 8px;
  padding: 16px 20px;
  background: #f9fafb;
  border-top: 1px solid #e5e7eb;
  justify-content: center;
}

.btn-action {
  padding: 10px 24px;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.3s ease;
}

.action-icon {
  font-size: 14px;
}

.btn-publish {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  color: white;
}

.btn-publish:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
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
  width: 40px;
  height: 40px;
  border: 2px solid #fed7aa;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  font-size: 20px;
  color: #f97316;
  transition: all 0.3s ease;
}

.pagination-btn:hover:not(:disabled) {
  background: #f97316;
  color: white;
  border-color: #f97316;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-info {
  color: #6b7280;
  font-size: 14px;
  font-weight: 600;
}

/* Responsive */
@media (max-width: 1024px) {
  .campaigns-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}

@media (max-width: 768px) {
  .filter-row {
    grid-template-columns: 1fr;
  }

  .btn-search {
    width: 100%;
    justify-content: center;
  }

  .campaigns-grid {
    grid-template-columns: 1fr;
  }

  .campaign-stats {
    grid-template-columns: 1fr;
  }

  .campaign-actions {
    flex-wrap: wrap;
  }

  .btn-action {
    flex: 1 1 calc(50% - 4px);
  }
}
</style>
