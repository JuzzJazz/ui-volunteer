<template>
  <div class="campaign-container">

    <!-- Welcome Header -->
    <div class="welcome-header">
      <div>
        <h1 class="welcome-title">Selamat Datang, Paul Raymond!</h1>
        <p class="welcome-subtitle">Pantau perkembangan seluruh campaign yang sedang berjalan secara real-time.</p>
      </div>
    </div>

    <!-- Summary Cards -->
    <div class="summary-cards">
      <div class="summary-card">
        <div class="summary-icon icon-orange">🏕️</div>
        <div class="summary-info">
          <div class="summary-label">Total Kampanye Aktif</div>
          <div class="summary-value">{{ totalActive }}</div>
        </div>
      </div>
      <div class="summary-card">
        <div class="summary-icon icon-green">💰</div>
        <div class="summary-info">
          <div class="summary-label">Total Dana Terkumpul</div>
          <div class="summary-value">{{ formatCurrency(totalCollected) }}</div>
        </div>
      </div>
      <div class="summary-card">
        <div class="summary-icon icon-blue">👥</div>
        <div class="summary-info">
          <div class="summary-label">Total Donatur</div>
          <div class="summary-value">{{ totalDonors.toLocaleString('id-ID') }}</div>
        </div>
      </div>
      <div class="summary-card">
        <div class="summary-icon icon-purple">🏆</div>
        <div class="summary-info">
          <div class="summary-label">Kampanye Selesai</div>
          <div class="summary-value">{{ totalFinished }}</div>
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="main-layout">

      <!-- Campaign Table -->
      <div class="table-section">
        <h2 class="section-heading">Update Kampanye Terbaru</h2>

        <div class="campaign-table">
          <div class="table-header">
            <div class="th-check">
              <input type="checkbox" class="check-input" @change="toggleAll" :checked="allSelected" />
            </div>
            <div class="th-title">Judul Kampanye</div>
            <div class="th-progress">Progress</div>
            <div class="th-status">Status Kampanye</div>
          </div>

          <div v-for="campaign in pagedCampaigns" :key="campaign.id" class="table-row"
            :class="{ 'row-selected': selectedIds.includes(campaign.id) }" @click.self="openDetail(campaign)">
            <div class="td-check">
              <input type="checkbox" class="check-input" :checked="selectedIds.includes(campaign.id)"
                @change.stop="toggleSelect(campaign.id)" />
            </div>
            <div class="td-title" style="cursor:pointer" @click="openDetail(campaign)">
              <span class="campaign-name">{{ campaign.title }}</span>
              <span class="campaign-meta-small">📍 {{ campaign.location }} &nbsp;|&nbsp; 📅 {{ campaign.period }}</span>
            </div>
            <div class="td-progress">
              <div class="progress-wrap">
                <div class="progress-track">
                  <div class="progress-bar-fill" :style="{ width: getFundraisingPercent(campaign) + '%' }"></div>
                </div>
                <span class="progress-pct">{{ getFundraisingPercent(campaign) }}%</span>
              </div>
              <div class="progress-amounts">
                <span class="amt-collected">{{ formatCurrency(campaign.collectedAmount) }}</span>
                <span class="amt-sep">/</span>
                <span class="amt-target">{{ formatCurrency(campaign.targetAmount) }}</span>
              </div>
            </div>
            <div class="td-status">
              <span class="status-pill" :class="`pill-${campaign.status}`">
                {{ getStatusLabel(campaign.status) }}
              </span>
              <button v-if="campaign.status === 'draft'" class="btn-publish-sm" @click="publishCampaign(campaign)">🚀
                Publikasikan</button>
            </div>
          </div>

          <div v-if="filteredCampaigns.length === 0" class="table-empty">
            <span>📋 Belum ada kampanye.</span>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="filteredCampaigns.length > itemsPerPage" class="pagination">
          <button class="pagination-btn" @click="prevPage" :disabled="currentPage === 1">‹</button>
          <span class="page-info">{{ currentPage }} / {{ totalPages }}</span>
          <button class="pagination-btn" @click="nextPage" :disabled="currentPage === totalPages">›</button>
        </div>
      </div>

      <!-- Right: Create Campaign Panel -->
      <div class="create-panel">
        <div class="create-card">
          <div class="create-text">
            <h3 class="create-title">Buat Kampanye Baru</h3>
            <p class="create-desc">Mulai penggalangan dana baru dan sebarkan dampak kebaikan hari ini.</p>
          </div>
          <div class="create-illustration">
            <div class="illustration-circle"></div>
            <span class="illustration-emoji">👩‍💼</span>
          </div>
          <button class="btn-create">Buat Campaign Sekarang</button>
        </div>

        <!-- Filter mini -->
        <div class="filter-mini">
          <h4 class="filter-mini-title">Filter Kampanye</h4>
          <div class="filter-mini-group">
            <label class="filter-mini-label">Status</label>
            <div class="select-wrapper">
              <select v-model="filters.status" class="filter-select" @change="applyFilters">
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
          <div class="filter-mini-group">
            <label class="filter-mini-label">Tahun</label>
            <div class="select-wrapper">
              <select v-model="filters.year" class="filter-select" @change="applyFilters">
                <option value="">Semua Tahun</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
              </select>
              <span class="select-arrow">▼</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>

  <!-- ===== DETAIL MODAL ===== -->
  <Transition name="modal-fade">
    <div v-if="detailModal.show" class="modal-backdrop" @click.self="closeDetail">
      <div class="detail-modal">

        <!-- Header -->
        <div class="detail-header">
          <div>
            <span class="detail-status-pill" :class="`pill-${detailModal.campaign?.status}`">
              {{ getStatusLabel(detailModal.campaign?.status) }}
            </span>
            <h2 class="detail-title">{{ detailModal.campaign?.title }}</h2>
            <p class="detail-date">📅 Dibuat pada {{ detailModal.campaign?.createdDate }}</p>
          </div>
          <button class="detail-close" @click="closeDetail">✕</button>
        </div>

        <!-- Body -->
        <div class="detail-body">

          <!-- Fundraising progress -->
          <div class="detail-fund-box">
            <div class="fund-row">
              <span class="fund-label">💰 Dana Terkumpul</span>
              <span class="fund-pct">{{ getFundraisingPercent(detailModal.campaign) }}%</span>
            </div>
            <div class="detail-progress-track">
              <div class="detail-progress-fill" :style="{ width: getFundraisingPercent(detailModal.campaign) + '%' }">
              </div>
            </div>
            <div class="fund-amounts">
              <div class="fund-amount-item">
                <span class="fa-label">Terkumpul</span>
                <span class="fa-value green">{{ formatCurrency(detailModal.campaign?.collectedAmount) }}</span>
              </div>
              <div class="fund-amount-item text-right">
                <span class="fa-label">Target</span>
                <span class="fa-value gray">{{ formatCurrency(detailModal.campaign?.targetAmount) }}</span>
              </div>
            </div>
          </div>

          <!-- Info grid -->
          <div class="detail-info-grid">
            <div class="info-item">
              <span class="info-icon">📍</span>
              <div>
                <div class="info-label">Lokasi</div>
                <div class="info-value">{{ detailModal.campaign?.location }}</div>
              </div>
            </div>
            <div class="info-item">
              <span class="info-icon">📅</span>
              <div>
                <div class="info-label">Periode</div>
                <div class="info-value">{{ detailModal.campaign?.period }}</div>
              </div>
            </div>
            <div class="info-item">
              <span class="info-icon">👥</span>
              <div>
                <div class="info-label">Target Relawan</div>
                <div class="info-value">{{ detailModal.campaign?.target }} orang</div>
              </div>
            </div>
            <div class="info-item">
              <span class="info-icon">✓</span>
              <div>
                <div class="info-label">Diterima</div>
                <div class="info-value">{{ detailModal.campaign?.accepted }} orang</div>
              </div>
            </div>
          </div>

          <!-- Stats -->
          <div class="detail-stats">
            <div class="dstat-box">
              <div class="dstat-icon">👁️</div>
              <div class="dstat-val">{{ detailModal.campaign?.views }}</div>
              <div class="dstat-label">Dilihat</div>
            </div>
            <div class="dstat-box">
              <div class="dstat-icon">👤</div>
              <div class="dstat-val">{{ detailModal.campaign?.applicants }}</div>
              <div class="dstat-label">Pendaftar</div>
            </div>
            <div class="dstat-box">
              <div class="dstat-icon">✅</div>
              <div class="dstat-val">{{ detailModal.campaign?.accepted }}</div>
              <div class="dstat-label">Diterima</div>
            </div>
          </div>

          <!-- Description -->
          <div class="detail-desc-box">
            <div class="detail-desc-label">📝 Deskripsi</div>
            <p class="detail-desc-text">{{ detailModal.campaign?.description }}</p>
          </div>

          <!-- Actions -->
          <div class="detail-actions">
            <button v-if="detailModal.campaign?.status === 'draft'" class="btn-publish-detail"
              @click="publishFromDetail">🚀 Publikasikan Kampanye</button>
            <button class="btn-close-detail" @click="closeDetail">Tutup</button>
          </div>
        </div>

      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentPage = ref(1)
const itemsPerPage = 8
const selectedIds = ref([])

const filters = ref({
  status: '',
  year: ''
})

// Summary stats
const totalActive = ref(190)
const totalCollected = ref(125000000)
const totalDonors = ref(2532)
const totalFinished = ref(50)

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
    createdDate: '15 Nov 2025',
    targetAmount: 10000000,
    collectedAmount: 7500000
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
    createdDate: '10 Nov 2025',
    targetAmount: 5000000,
    collectedAmount: 1200000
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
    createdDate: '12 Nov 2025',
    targetAmount: 8000000,
    collectedAmount: 0
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
    createdDate: '8 Nov 2025',
    targetAmount: 3000000,
    collectedAmount: 3000000
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
    createdDate: '20 Okt 2025',
    targetAmount: 15000000,
    collectedAmount: 15000000
  }
])

const filteredCampaigns = computed(() => {
  let result = campaigns.value
  if (filters.value.status) result = result.filter(c => c.status === filters.value.status)
  if (filters.value.year) result = result.filter(c => c.createdDate.includes(filters.value.year))
  return result
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredCampaigns.value.length / itemsPerPage)))

const pagedCampaigns = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredCampaigns.value.slice(start, start + itemsPerPage)
})

const allSelected = computed(() =>
  pagedCampaigns.value.length > 0 && pagedCampaigns.value.every(c => selectedIds.value.includes(c.id))
)

const toggleAll = () => {
  if (allSelected.value) {
    selectedIds.value = selectedIds.value.filter(id => !pagedCampaigns.value.find(c => c.id === id))
  } else {
    pagedCampaigns.value.forEach(c => { if (!selectedIds.value.includes(c.id)) selectedIds.value.push(c.id) })
  }
}

const toggleSelect = (id) => {
  const idx = selectedIds.value.indexOf(id)
  if (idx === -1) selectedIds.value.push(id)
  else selectedIds.value.splice(idx, 1)
}

const getStatusLabel = (status) => {
  const labels = {
    active: 'Ongoing Campaign',
    pending: 'Review Campaign',
    draft: 'Draft Campaign',
    expired: 'Ended Campaign',
    reject: 'Reject Campaign'
  }
  return labels[status] || status
}

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount)
}

const getFundraisingPercent = (campaign) => {
  if (!campaign.targetAmount || campaign.targetAmount === 0) return 0
  return Math.min(Math.round((campaign.collectedAmount / campaign.targetAmount) * 100), 100)
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
  if (currentPage.value > 1) currentPage.value--
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

// ===== DETAIL MODAL =====
const detailModal = ref({ show: false, campaign: null })

const openDetail = (campaign) => {
  detailModal.value = { show: true, campaign }
}

const closeDetail = () => {
  detailModal.value.show = false
}

const publishFromDetail = () => {
  publishCampaign(detailModal.value.campaign)
  closeDetail()
}
</script>

<style scoped>
/* ===================== BASE ===================== */
.campaign-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* ===================== WELCOME ===================== */
.welcome-header {
  background: white;
  border-radius: 16px;
  padding: 24px 28px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}

.welcome-title {
  font-size: 22px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 6px;
}

.welcome-subtitle {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}

/* ===================== SUMMARY CARDS ===================== */
.summary-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.summary-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  transition: transform 0.2s, box-shadow 0.2s;
}

.summary-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
}

.summary-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  flex-shrink: 0;
}

.icon-orange {
  background: #fff7ed;
}

.icon-green {
  background: #f0fdf4;
}

.icon-blue {
  background: #eff6ff;
}

.icon-purple {
  background: #f5f3ff;
}

.summary-label {
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;
  margin-bottom: 4px;
}

.summary-value {
  font-size: 20px;
  font-weight: 700;
  color: #111827;
}

/* ===================== MAIN LAYOUT ===================== */
.main-layout {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 20px;
  align-items: start;
}

/* ===================== TABLE SECTION ===================== */
.table-section {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}

.section-heading {
  font-size: 16px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 20px;
}

.campaign-table {
  width: 100%;
  border-collapse: collapse;
}

.table-header {
  display: grid;
  grid-template-columns: 36px 1fr 220px 180px;
  gap: 12px;
  padding: 10px 14px;
  background: #f9fafb;
  border-radius: 8px;
  margin-bottom: 4px;
}

.th-check,
.th-title,
.th-progress,
.th-status {
  font-size: 12px;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
}

.table-row {
  display: grid;
  grid-template-columns: 36px 1fr 220px 180px;
  gap: 12px;
  padding: 14px;
  border-bottom: 1px solid #f3f4f6;
  transition: background 0.15s;
  border-radius: 8px;
}

.table-row:hover {
  background: #fafafa;
}

.table-row.row-selected {
  background: #fff7ed;
}

.table-row:last-child {
  border-bottom: none;
}

.td-check {
  display: flex;
  align-items: center;
}

.check-input {
  width: 16px;
  height: 16px;
  accent-color: #f97316;
  cursor: pointer;
}

.td-title {
  display: flex;
  flex-direction: column;
  gap: 4px;
  justify-content: center;
}

.campaign-name {
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  line-height: 1.4;
}

.campaign-meta-small {
  font-size: 12px;
  color: #9ca3af;
}

.td-progress {
  display: flex;
  flex-direction: column;
  gap: 6px;
  justify-content: center;
}

.progress-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
}

.progress-track {
  flex: 1;
  height: 6px;
  background: #e5e7eb;
  border-radius: 99px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #f97316, #fb923c);
  border-radius: 99px;
  transition: width 0.5s ease;
}

.progress-pct {
  font-size: 12px;
  font-weight: 700;
  color: #f97316;
  min-width: 36px;
  text-align: right;
}

.progress-amounts {
  font-size: 11px;
  color: #6b7280;
  display: flex;
  gap: 4px;
  align-items: center;
}

.amt-collected {
  color: #10b981;
  font-weight: 600;
}

.amt-sep {
  color: #d1d5db;
}

.amt-target {
  color: #9ca3af;
}

.td-status {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.status-pill {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}

.pill-active {
  background: #d1fae5;
  color: #065f46;
}

.pill-pending {
  background: #fef3c7;
  color: #92400e;
}

.pill-draft {
  background: #dbeafe;
  color: #1e40af;
}

.pill-expired {
  background: #fee2e2;
  color: #991b1b;
}

.pill-reject {
  background: #fce7f3;
  color: #9d174d;
}

.btn-publish-sm {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  color: white;
  border: none;
  border-radius: 6px;
  padding: 4px 10px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
  font-family: inherit;
}

.btn-publish-sm:hover {
  opacity: 0.85;
}

.table-empty {
  text-align: center;
  padding: 40px;
  color: #9ca3af;
  font-size: 14px;
}

/* ===================== PAGINATION ===================== */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid #e5e7eb;
}

.pagination-btn {
  width: 34px;
  height: 34px;
  border: 1.5px solid #e5e7eb;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  color: #f97316;
  transition: all 0.2s;
}

.pagination-btn:hover:not(:disabled) {
  background: #f97316;
  color: white;
  border-color: #f97316;
}

.pagination-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.page-info {
  font-size: 13px;
  font-weight: 600;
  color: #6b7280;
}

/* ===================== RIGHT PANEL ===================== */
.create-panel {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.create-card {
  background: linear-gradient(135deg, #f97316 0%, #fb923c 60%, #fdba74 100%);
  border-radius: 16px;
  padding: 24px;
  color: white;
  position: relative;
  overflow: hidden;
}

.create-title {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 8px;
}

.create-desc {
  font-size: 13px;
  opacity: 0.9;
  line-height: 1.5;
  margin: 0 0 16px;
}

.create-illustration {
  position: absolute;
  right: -10px;
  top: -10px;
  width: 90px;
  height: 90px;
  opacity: 0.15;
}

.illustration-circle {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
}

.illustration-emoji {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 36px;
  opacity: 3;
}

.btn-create {
  width: 100%;
  background: white;
  color: #f97316;
  border: none;
  padding: 10px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.2s;
  font-family: inherit;
}

.btn-create:hover {
  opacity: 0.9;
}

/* Filter mini */
.filter-mini {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 18px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}

.filter-mini-title {
  font-size: 13px;
  font-weight: 700;
  color: #374151;
  margin: 0 0 14px;
}

.filter-mini-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 12px;
}

.filter-mini-group:last-child {
  margin-bottom: 0;
}

.filter-mini-label {
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
}

.select-wrapper {
  position: relative;
}

.filter-select {
  width: 100%;
  padding: 8px 32px 8px 12px;
  border: 1.5px solid #e5e7eb;
  border-radius: 8px;
  font-size: 13px;
  background: white;
  color: #1f2937;
  cursor: pointer;
  appearance: none;
  transition: border-color 0.2s;
  font-family: inherit;
}

.filter-select:focus {
  outline: none;
  border-color: #f97316;
  box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
}

.select-arrow {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  font-size: 11px;
  pointer-events: none;
}

/* ===================== DETAIL MODAL ===================== */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(3px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.detail-modal {
  background: white;
  border-radius: 20px;
  width: 100%;
  max-width: 560px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  animation: modal-slide-up 0.28s ease-out;
}

@keyframes modal-slide-up {
  from {
    opacity: 0;
    transform: translateY(24px) scale(0.97);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.22s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  padding: 24px 24px 20px;
  border-bottom: 1px solid #f3f4f6;
}

.detail-status-pill {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  margin-bottom: 8px;
}

.detail-title {
  font-size: 17px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 6px;
  line-height: 1.4;
}

.detail-date {
  font-size: 12px;
  color: #9ca3af;
  margin: 0;
}

.detail-close {
  background: #f3f4f6;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 14px;
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.15s;
  color: #6b7280;
}

.detail-close:hover {
  background: #e5e7eb;
}

.detail-body {
  padding: 20px 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Fund box */
.detail-fund-box {
  background: #fff7ed;
  border: 1px solid #fed7aa;
  border-radius: 12px;
  padding: 16px;
}

.fund-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.fund-label {
  font-size: 13px;
  font-weight: 600;
  color: #374151;
}

.fund-pct {
  font-size: 14px;
  font-weight: 700;
  color: #f97316;
}

.detail-progress-track {
  height: 8px;
  background: #fed7aa;
  border-radius: 99px;
  overflow: hidden;
  margin-bottom: 12px;
}

.detail-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #f97316, #fb923c);
  border-radius: 99px;
  transition: width 0.6s ease;
}

.fund-amounts {
  display: flex;
  justify-content: space-between;
}

.fund-amount-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.text-right {
  align-items: flex-end;
}

.fa-label {
  font-size: 11px;
  color: #9ca3af;
  font-weight: 500;
}

.fa-value {
  font-size: 14px;
  font-weight: 700;
}

.fa-value.green {
  color: #10b981;
}

.fa-value.gray {
  color: #6b7280;
}

/* Info grid */
.detail-info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px;
  background: #f9fafb;
  border-radius: 10px;
  border: 1px solid #f3f4f6;
}

.info-icon {
  font-size: 18px;
}

.info-label {
  font-size: 11px;
  color: #9ca3af;
  font-weight: 500;
  margin-bottom: 2px;
}

.info-value {
  font-size: 13px;
  font-weight: 600;
  color: #111827;
}

/* Stats */
.detail-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.dstat-box {
  background: #f9fafb;
  border: 1px solid #f3f4f6;
  border-radius: 10px;
  padding: 14px;
  text-align: center;
}

.dstat-icon {
  font-size: 22px;
  margin-bottom: 6px;
}

.dstat-val {
  font-size: 20px;
  font-weight: 700;
  color: #f97316;
}

.dstat-label {
  font-size: 11px;
  color: #6b7280;
  margin-top: 2px;
}

/* Description */
.detail-desc-box {
  background: #f9fafb;
  border-radius: 10px;
  padding: 14px;
}

.detail-desc-label {
  font-size: 12px;
  font-weight: 700;
  color: #374151;
  margin-bottom: 8px;
}

.detail-desc-text {
  font-size: 13px;
  color: #6b7280;
  line-height: 1.6;
  margin: 0;
}

/* Actions */
.detail-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.btn-publish-detail {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
  font-family: inherit;
}

.btn-publish-detail:hover {
  opacity: 0.88;
}

.btn-close-detail {
  background: #f3f4f6;
  color: #374151;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
  font-family: inherit;
}

.btn-close-detail:hover {
  background: #e5e7eb;
}

/* ===================== RESPONSIVE ===================== */
@media (max-width: 1100px) {
  .summary-cards {
    grid-template-columns: repeat(2, 1fr);
  }

  .main-layout {
    grid-template-columns: 1fr;
  }

  .create-panel {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .create-card,
  .filter-mini {
    flex: 1 1 240px;
  }
}

@media (max-width: 768px) {
  .summary-cards {
    grid-template-columns: repeat(2, 1fr);
  }

  .table-header,
  .table-row {
    grid-template-columns: 36px 1fr;
  }

  .th-progress,
  .th-status,
  .td-progress,
  .td-status {
    display: none;
  }
}
</style>
