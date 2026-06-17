<template>
  <div class="admin-claim-container">
    <div class="page-header">
      <div class="header-icon">🎁</div>
      <div>
        <h1 class="page-title">Claim Reward</h1>
        <p class="page-subtitle">Kelola klaim reward dari relawan</p>
      </div>
    </div>

    <div class="content-wrapper">
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon pending">⏳</div>
          <div class="stat-info">
            <span class="stat-label">Pending Claim</span>
            <span class="stat-value">{{ pendingClaims.length }}</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon approved">✅</div>
          <div class="stat-info">
            <span class="stat-label">Approved</span>
            <span class="stat-value">{{ approvedClaims.length }}</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon rejected">❌</div>
          <div class="stat-info">
            <span class="stat-label">Rejected</span>
            <span class="stat-value">{{ rejectedClaims.length }}</span>
          </div>
        </div>
      </div>

      <div class="table-container">
        <div class="table-header">
          <h2 class="table-title">Daftar Klaim Reward</h2>
          <div class="table-actions">
            <div class="search-box">
              <span class="search-icon">🔍</span>
              <input type="text" v-model="searchQuery" placeholder="Cari nama relawan..." />
            </div>
            <select v-model="statusFilter" class="filter-select">
              <option value="all">Semua Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div class="table-responsive">
          <table class="claims-table">
            <thead>
              <tr>
                <th>Nama Relawan</th>
                <th>Reward</th>
                <th>Poin Digunakan</th>
                <th>Tanggal Klaim</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="filteredClaims.length === 0">
                <td colspan="6" class="empty-state">
                  Belum ada klaim reward yang ditemukan.
                </td>
              </tr>
              <tr v-for="claim in filteredClaims" :key="claim.id">
                <td>
                  <div class="volunteer-info">
                    <div class="avatar">{{ claim.volunteerName.charAt(0).toUpperCase() }}</div>
                    <div class="volunteer-details">
                      <span class="volunteer-name">{{ claim.volunteerName }}</span>
                      <span class="volunteer-email">{{ claim.volunteerEmail }}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <span class="reward-name">{{ claim.rewardTitle }}</span>
                </td>
                <td>
                  <span class="points-badge">❤️ {{ claim.pointsUsed }}</span>
                </td>
                <td class="claim-date">{{ claim.claimDate }}</td>
                <td>
                  <span class="status-badge" :class="claim.status">
                    {{ getStatusLabel(claim.status) }}
                  </span>
                </td>
                <td>
                  <div class="action-buttons">
                    <button v-if="claim.status === 'pending'" class="btn-action approve" @click="approveClaim(claim)" title="Setujui">✅</button>
                    <button v-if="claim.status === 'pending'" class="btn-action reject" @click="rejectClaim(claim)" title="Tolak">❌</button>
                    <button class="btn-action view" @click="viewClaimDetail(claim)" title="Lihat Detail">👁️</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Detail Modal -->
    <Transition name="modal-fade">
      <div v-if="detailModal.show" class="modal-backdrop" @click.self="closeDetailModal">
        <div class="detail-modal">
          <div class="modal-header">
            <h3 class="modal-title">Detail Klaim Reward</h3>
            <button class="modal-close-btn" @click="closeDetailModal">✕</button>
          </div>
          <div class="modal-body">
            <div v-if="selectedClaim" class="detail-content">
              <div class="detail-section">
                <h4 class="section-title">Data Relawan</h4>
                <div class="detail-row">
                  <span class="label">Nama:</span>
                  <span class="value">{{ selectedClaim.volunteerName }}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Email:</span>
                  <span class="value">{{ selectedClaim.volunteerEmail }}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Poin Saat Ini:</span>
                  <span class="value">{{ selectedClaim.volunteerCurrentPoints }}</span>
                </div>
              </div>
              <div class="detail-section">
                <h4 class="section-title">Reward yang Diklaim</h4>
                <div class="detail-row">
                  <span class="label">Nama Reward:</span>
                  <span class="value">{{ selectedClaim.rewardTitle }}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Poin Digunakan:</span>
                  <span class="value">❤️ {{ selectedClaim.pointsUsed }}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Tanggal Klaim:</span>
                  <span class="value">{{ selectedClaim.claimDate }}</span>
                </div>
              </div>
              <div v-if="selectedClaim.status === 'pending'" class="detail-section">
                <h4 class="section-title">Tindakan</h4>
                <div class="action-row">
                  <button class="btn-approve" @click="approveClaim(selectedClaim)">Setujui Klaim</button>
                  <button class="btn-reject" @click="rejectClaim(selectedClaim)">Tolak Klaim</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const statusFilter = ref('all')
const detailModal = ref({ show: false })
const selectedClaim = ref(null)

const claims = ref([
  {
    id: 1,
    volunteerName: 'Hana Volunteer',
    volunteerEmail: 'hana@example.com',
    volunteerCurrentPoints: 1200,
    rewardTitle: 'Trip Volunteer Eksklusif: Mengajar di Pulau Komodo',
    pointsUsed: 2500,
    claimDate: '2025-06-10',
    status: 'pending'
  },
  {
    id: 2,
    volunteerName: 'Budi Santoso',
    volunteerEmail: 'budi@example.com',
    volunteerCurrentPoints: 800,
    rewardTitle: 'T-Shirt Eksklusif Relawan Wahana Visi',
    pointsUsed: 500,
    claimDate: '2025-06-08',
    status: 'approved'
  },
  {
    id: 3,
    volunteerName: 'Siti Nurhaliza',
    volunteerEmail: 'siti@example.com',
    volunteerCurrentPoints: 300,
    rewardTitle: 'Tumbler Stainless Steel Ramah Lingkungan',
    pointsUsed: 800,
    claimDate: '2025-06-05',
    status: 'rejected'
  },
  {
    id: 4,
    volunteerName: 'Ahmad Rizki',
    volunteerEmail: 'ahmad@example.com',
    volunteerCurrentPoints: 1500,
    rewardTitle: 'Ayo! Kumpulkan poinmu hingga 1.500 untuk mendapatkan GRATIS trip volunteer ke Bengkayang, Kalimantan Barat!',
    pointsUsed: 1500,
    claimDate: '2025-06-12',
    status: 'pending'
  }
])

const pendingClaims = computed(() => claims.value.filter(c => c.status === 'pending'))
const approvedClaims = computed(() => claims.value.filter(c => c.status === 'approved'))
const rejectedClaims = computed(() => claims.value.filter(c => c.status === 'rejected'))

const filteredClaims = computed(() => {
  return claims.value.filter(claim => {
    const matchesSearch = claim.volunteerName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          claim.volunteerEmail.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = statusFilter.value === 'all' || claim.status === statusFilter.value
    return matchesSearch && matchesStatus
  })
})

const getStatusLabel = (status) => {
  const labels = {
    pending: 'Pending',
    approved: 'Disetujui',
    rejected: 'Ditolak'
  }
  return labels[status] || status
}

const viewClaimDetail = (claim) => {
  selectedClaim.value = claim
  detailModal.value.show = true
}

const closeDetailModal = () => {
  detailModal.value.show = false
  setTimeout(() => {
    selectedClaim.value = null
  }, 300)
}

const approveClaim = (claim) => {
  const index = claims.value.findIndex(c => c.id === claim.id)
  if (index !== -1) {
    claims.value[index].status = 'approved'
    closeDetailModal()
  }
}

const rejectClaim = (claim) => {
  const index = claims.value.findIndex(c => c.id === claim.id)
  if (index !== -1) {
    claims.value[index].status = 'rejected'
    closeDetailModal()
  }
}
</script>

<style scoped>
.admin-claim-container {
  width: 100%;
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.page-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 28px;
  padding: 24px;
  background: var(--gray-0);
  border-radius: var(--border-radius-xl);
  border: var(--border-light);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-base);
}

.header-icon {
  font-size: 40px;
  flex-shrink: 0;
}

.page-title {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--gray-900);
  margin: 0;
}

.page-subtitle {
  font-size: var(--text-sm);
  color: var(--gray-600);
  margin: 4px 0 0 0;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.stat-card {
  background: var(--gray-0);
  border-radius: var(--border-radius-lg);
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: var(--shadow-sm);
  border: var(--border-light);
  transition: all var(--transition-base);
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary-200);
}

.stat-icon {
  width: 50px;
  height: 50px;
  border-radius: var(--border-radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
}

.stat-icon.pending {
  background: linear-gradient(135deg, var(--warning-100) 0%, var(--warning-200) 100%);
}

.stat-icon.approved {
  background: linear-gradient(135deg, var(--success-100) 0%, var(--success-200) 100%);
}

.stat-icon.rejected {
  background: linear-gradient(135deg, var(--error-100) 0%, var(--error-200) 100%);
}

.stat-label {
  display: block;
  font-size: var(--text-xs);
  color: var(--gray-600);
  font-weight: var(--font-semibold);
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.stat-value {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--gray-900);
}

.table-container {
  background: var(--gray-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  border: var(--border-light);
  overflow: hidden;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: var(--border-light);
  flex-wrap: wrap;
  gap: 12px;
}

.table-title {
  font-size: var(--text-lg);
  font-weight: var(--font-bold);
  color: var(--gray-900);
  margin: 0;
}

.table-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--gray-50);
  border: 2px solid var(--gray-200);
  border-radius: var(--border-radius-lg);
  padding: 0 12px;
  min-width: 250px;
  transition: all var(--transition-base);
}

.search-box:focus-within {
  border-color: var(--primary-500);
  background: var(--gray-0);
  box-shadow: 0 0 0 3px var(--primary-50);
}

.search-icon {
  font-size: 16px;
  color: var(--gray-400);
}

.search-box input {
  flex: 1;
  border: none;
  background: transparent;
  padding: 10px 0;
  font-size: var(--text-sm);
  outline: none;
  color: var(--gray-900);
}

.search-box input::placeholder {
  color: var(--gray-400);
}

.filter-select {
  padding: 10px 12px;
  border: 2px solid var(--gray-200);
  border-radius: var(--border-radius-lg);
  background: var(--gray-0);
  cursor: pointer;
  font-size: var(--text-sm);
  color: var(--gray-700);
  font-weight: var(--font-medium);
  transition: all var(--transition-base);
}

.filter-select:hover {
  border-color: var(--gray-300);
}

.filter-select:focus {
  outline: none;
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px var(--primary-50);
}

.table-responsive {
  overflow-x: auto;
}

.claims-table {
  width: 100%;
  border-collapse: collapse;
}

.claims-table thead {
  background: var(--gray-50);
  border-bottom: 2px solid var(--gray-200);
}

.claims-table th {
  padding: 14px 16px;
  text-align: left;
  font-weight: var(--font-semibold);
  color: var(--gray-700);
  font-size: var(--text-sm);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.claims-table td {
  padding: 14px 16px;
  border-bottom: var(--border-light);
  font-size: var(--text-sm);
  color: var(--gray-700);
}

.claims-table tbody tr {
  transition: all var(--transition-base);
}

.claims-table tbody tr:hover {
  background: var(--gray-50);
}

.volunteer-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
}

.volunteer-name {
  display: block;
  font-weight: 600;
  color: #2d3748;
}

.volunteer-email {
  display: block;
  font-size: 12px;
  color: #718096;
}

.reward-name {
  display: block;
  color: #2d3748;
  font-weight: 500;
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.points-badge {
  display: inline-block;
  background: #fff5f0;
  color: #c05621;
  padding: 4px 12px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 13px;
}

.claim-date {
  color: #718096;
}

.status-badge {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
}

.status-badge.pending {
  background: #fef3c7;
  color: #92400e;
}

.status-badge.approved {
  background: #d1fae5;
  color: #065f46;
}

.status-badge.rejected {
  background: #fee2e2;
  color: #7f1d1d;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.btn-action {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  padding: 6px 8px;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.btn-action:hover {
  transform: scale(1.2);
}

.btn-action.approve:hover {
  background: #d1fae5;
}

.btn-action.reject:hover {
  background: #fee2e2;
}

.btn-action.view:hover {
  background: #e0e7ff;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: #718096;
}

/* Modal */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.detail-modal {
  background: white;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e2e8f0;
}

.modal-title {
  font-size: 18px;
  font-weight: 700;
  color: #2d3748;
  margin: 0;
}

.modal-close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #718096;
}

.modal-body {
  padding: 20px 24px;
}

.detail-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.detail-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.section-title {
  font-size: 14px;
  font-weight: 700;
  color: #2d3748;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: #f7fafc;
  border-radius: 6px;
}

.label {
  font-weight: var(--font-semibold);
  color: var(--gray-600);
  font-size: var(--text-xs);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.value {
  color: var(--gray-900);
  font-weight: var(--font-medium);
}

.action-row {
  display: flex;
  gap: 12px;
}

.btn-approve,
.btn-reject {
  flex: 1;
  padding: 10px 16px;
  border: none;
  border-radius: var(--border-radius-lg);
  font-weight: var(--font-semibold);
  cursor: pointer;
  transition: all var(--transition-base);
  font-size: var(--text-sm);
}

.btn-approve {
  background: linear-gradient(135deg, var(--success-100) 0%, var(--success-50) 100%);
  color: var(--success-700);
  border: 2px solid var(--success-200);
}

.btn-approve:hover {
  background: linear-gradient(135deg, var(--success-200) 0%, var(--success-100) 100%);
  border-color: var(--success-300);
  box-shadow: var(--shadow-sm);
}

.btn-reject {
  background: linear-gradient(135deg, var(--error-100) 0%, var(--error-50) 100%);
  color: var(--error-700);
  border: 2px solid var(--error-200);
}

.btn-reject:hover {
  background: linear-gradient(135deg, var(--error-200) 0%, var(--error-100) 100%);
  border-color: var(--error-300);
  box-shadow: var(--shadow-sm);
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
