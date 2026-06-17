<template>
  <div class="admin-approval-container">
    <div class="page-header">
      <div class="header-icon">⭐</div>
      <div>
        <h1 class="page-title">Validasi Campaign & Approval Poin</h1>
        <p class="page-subtitle">Satu halaman untuk mengelola pengajuan campaign dan poin relawan secara terpadu.</p>
      </div>
    </div>

    <div class="content-wrapper">
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon pending">⏳</div>
          <div class="stat-info">
            <span class="stat-label">Pending Review</span>
            <span class="stat-value">{{ pendingApprovals.length }}</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon approved">✅</div>
          <div class="stat-info">
            <span class="stat-label">Approved</span>
            <span class="stat-value">{{ approvedApprovals.length }}</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon rejected">❌</div>
          <div class="stat-info">
            <span class="stat-label">Rejected</span>
            <span class="stat-value">{{ rejectedApprovals.length }}</span>
          </div>
        </div>
      </div>

      <div class="table-container">
        <div class="table-header">
          <h2 class="table-title">Daftar Pengajuan Poin</h2>
          <div class="table-actions">
            <div class="search-box">
              <span class="search-icon">🔍</span>
              <input type="text" v-model="searchQuery" placeholder="Cari nama relawan atau aktivitas..." />
            </div>
            <select v-model="statusFilter" class="filter-select">
              <option value="all">Semua Status</option>
              <option value="pending">Menunggu</option>
              <option value="approved">Disetujui</option>
              <option value="rejected">Ditolak</option>
            </select>
          </div>
        </div>

        <div class="table-responsive">
          <table class="approvals-table">
            <thead>
              <tr>
                <th>Nama Relawan</th>
                <th>Aktivitas</th>
                <th>Poin yang Diajukan</th>
                <th>Tanggal Submit</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="filteredApprovals.length === 0">
                <td colspan="6" class="empty-state">
                  Belum ada approval poin yang ditemukan.
                </td>
              </tr>
              <tr v-for="approval in filteredApprovals" :key="approval.id">
                <td>
                  <div class="volunteer-info">
                    <div class="avatar" :style="{ background: getAvatarColor(approval.id) }">{{ approval.volunteerName.charAt(0).toUpperCase() }}</div>
                    <div class="volunteer-details">
                      <span class="volunteer-name">{{ approval.volunteerName }}</span>
                      <span class="volunteer-id">#{{ approval.volunteerId }}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <span class="activity-name">{{ approval.activityName }}</span>
                </td>
                <td>
                  <span class="points-badge">❤️ {{ approval.pointsRequested }}</span>
                </td>
                <td class="submit-date">{{ approval.dateSubmitted }}</td>
                <td>
                  <span class="status-badge" :class="approval.status">
                    {{ getStatusLabel(approval.status) }}
                  </span>
                </td>
                <td>
                  <div class="action-buttons">
                    <button v-if="approval.status === 'pending'" class="btn-action approve" @click="approveApproval(approval)" title="Setujui">✅</button>
                    <button v-if="approval.status === 'pending'" class="btn-action reject" @click="rejectApproval(approval)" title="Tolak">❌</button>
                    <button class="btn-action view" @click="viewDetail(approval)" title="Lihat Detail">👁️</button>
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
            <h3 class="modal-title">Detail Review Poin</h3>
            <button class="modal-close-btn" @click="closeDetailModal">✕</button>
          </div>
          <div class="modal-body">
            <div v-if="selectedApproval" class="detail-content">
              <div class="detail-section">
                <h4 class="section-title">Informasi Relawan</h4>
                <div class="detail-row">
                  <span class="label">Nama:</span>
                  <span class="value">{{ selectedApproval.volunteerName }}</span>
                </div>
                <div class="detail-row">
                  <span class="label">ID Relawan:</span>
                  <span class="value">#{{ selectedApproval.volunteerId }}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Poin Saat Ini:</span>
                  <span class="value points-current">❤️ {{ selectedApproval.volunteerCurrentPoints }}</span>
                </div>
              </div>
              <div class="detail-section">
                <h4 class="section-title">Detail Aktivitas</h4>
                <div class="detail-row">
                  <span class="label">Nama Aktivitas:</span>
                  <span class="value">{{ selectedApproval.activityName }}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Deskripsi:</span>
                  <span class="value">{{ selectedApproval.description }}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Waktu Aktivitas:</span>
                  <span class="value">{{ selectedApproval.activityDate }}</span>
                </div>
              </div>
              <div class="detail-section">
                <h4 class="section-title">Poin yang Diajukan</h4>
                <div class="points-display">
                  <span class="points-value">{{ selectedApproval.pointsRequested }} Poin</span>
                  <span class="points-level">Level: {{ selectedApproval.pointsLevel }}</span>
                </div>
              </div>
              <div v-if="selectedApproval.status === 'pending'" class="detail-section">
                <h4 class="section-title">Tindakan</h4>
                <div class="action-row">
                  <button class="btn-approve" @click="approveApproval(selectedApproval)">✅ Setujui Poin</button>
                  <button class="btn-reject" @click="rejectApproval(selectedApproval)">❌ Tolak</button>
                </div>
              </div>
              <div v-else class="detail-section">
                <p class="status-message" :class="selectedApproval.status">
                  Status: {{ getStatusLabel(selectedApproval.status) }}
                </p>
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
const selectedApproval = ref(null)

const approvals = ref([
  {
    id: 1,
    volunteerName: 'Hana Volunteer',
    volunteerId: 'VOL001',
    volunteerCurrentPoints: 750,
    activityName: 'Mengajar di TPA Anak Kampung',
    description: 'Mengajar matematika dan bahasa inggris untuk 25 anak selama 3 jam',
    activityDate: '2025-06-10',
    evidence: 'Foto kegiatan dan daftar hadir sudah dilampirkan',
    pointsRequested: 100,
    pointsLevel: 'Normal',
    dateSubmitted: '2025-06-11',
    status: 'pending'
  },
  {
    id: 2,
    volunteerName: 'Budi Santoso',
    volunteerId: 'VOL002',
    volunteerCurrentPoints: 1200,
    activityName: 'Membantu Renovasi Rumah Yatim Piatu',
    description: 'Membantu renovasi dan pengecat ulang rumah yatim piatu selama 5 jam',
    activityDate: '2025-06-09',
    evidence: 'Video dokumentasi dan bukti foto telah diserahkan',
    pointsRequested: 150,
    pointsLevel: 'High',
    dateSubmitted: '2025-06-10',
    status: 'approved'
  },
  {
    id: 3,
    volunteerName: 'Siti Nurhaliza',
    volunteerId: 'VOL003',
    volunteerCurrentPoints: 450,
    activityName: 'Pembersihan Pantai dan Riset Sampah',
    description: 'Membersihkan pantai dan mengumpulkan data sampah plastik selama 4 jam',
    activityDate: '2025-06-08',
    evidence: 'Laporan data dan foto sebelum-sesudah tersedia',
    pointsRequested: 120,
    pointsLevel: 'High',
    dateSubmitted: '2025-06-09',
    status: 'rejected'
  },
  {
    id: 4,
    volunteerName: 'Ahmad Rizki',
    volunteerId: 'VOL004',
    volunteerCurrentPoints: 900,
    activityName: 'Mentoring Anak Kurang Mampu Online',
    description: 'Memberikan mentoring online untuk 5 anak tentang pengembangan diri',
    activityDate: '2025-06-12',
    evidence: 'Rekaman sesi mentoring dan feedback anak tersedia',
    pointsRequested: 80,
    pointsLevel: 'Normal',
    dateSubmitted: '2025-06-13',
    status: 'pending'
  },
  {
    id: 5,
    volunteerName: 'Rina Wijaya',
    volunteerId: 'VOL005',
    volunteerCurrentPoints: 600,
    activityName: 'Donasi Darah dan Edukasi Kesehatan',
    description: 'Mendonor darah dan membantu edukasi tentang pentingnya donor darah',
    activityDate: '2025-06-07',
    evidence: 'Sertifikat donor dan dokumentasi edukasi dilampirkan',
    pointsRequested: 200,
    pointsLevel: 'Very High',
    dateSubmitted: '2025-06-08',
    status: 'approved'
  }
])

const pendingApprovals = computed(() => approvals.value.filter(a => a.status === 'pending'))
const approvedApprovals = computed(() => approvals.value.filter(a => a.status === 'approved'))
const rejectedApprovals = computed(() => approvals.value.filter(a => a.status === 'rejected'))

const filteredApprovals = computed(() => {
  return approvals.value.filter(approval => {
    const matchesSearch = approval.volunteerName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          approval.activityName.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = statusFilter.value === 'all' || approval.status === statusFilter.value
    return matchesSearch && matchesStatus
  })
})

const getStatusLabel = (status) => {
  const labels = {
    pending: 'Menunggu',
    approved: 'Disetujui',
    rejected: 'Ditolak'
  }
  return labels[status] || status
}

const getAvatarColor = (id) => {
  const colors = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
  ]
  return colors[id % colors.length]
}

const viewDetail = (approval) => {
  selectedApproval.value = approval
  detailModal.value.show = true
}

const closeDetailModal = () => {
  detailModal.value.show = false
  setTimeout(() => {
    selectedApproval.value = null
  }, 300)
}

const approveApproval = (approval) => {
  const index = approvals.value.findIndex(a => a.id === approval.id)
  if (index !== -1) {
    approvals.value[index].status = 'approved'
    closeDetailModal()
  }
}

const rejectApproval = (approval) => {
  const index = approvals.value.findIndex(a => a.id === approval.id)
  if (index !== -1) {
    approvals.value[index].status = 'rejected'
    closeDetailModal()
  }
}
</script>

<style scoped>
.admin-approval-container {
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
  min-width: 280px;
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

.approvals-table {
  width: 100%;
  border-collapse: collapse;
}

.approvals-table thead {
  background: var(--gray-50);
  border-bottom: 2px solid var(--gray-200);
}

.approvals-table th {
  padding: 14px 16px;
  text-align: left;
  font-weight: var(--font-semibold);
  color: var(--gray-700);
  font-size: var(--text-sm);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.approvals-table td {
  padding: 14px 16px;
  border-bottom: var(--border-light);
  font-size: var(--text-sm);
  color: var(--gray-700);
}

.approvals-table tbody tr {
  transition: all var(--transition-base);
}

.approvals-table tbody tr:hover {
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
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: var(--font-bold);
  font-size: 16px;
  flex-shrink: 0;
}

.volunteer-name {
  display: block;
  font-weight: var(--font-semibold);
  color: var(--gray-900);
}

.volunteer-id {
  display: block;
  font-size: var(--text-xs);
  color: #a0aec0;
}

.activity-name {
  display: block;
  color: #2d3748;
  font-weight: 500;
  max-width: 250px;
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

.submit-date {
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
  max-width: 550px;
  width: 90%;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e2e8f0;
  position: sticky;
  top: 0;
  background: white;
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
  font-weight: 600;
  color: #4a5568;
  font-size: 13px;
}

.value {
  color: #2d3748;
  font-weight: 500;
  text-align: right;
  flex: 1;
  margin-left: 12px;
}

.points-current {
  color: #c05621;
  font-weight: 700;
}

.points-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 20px;
  background: linear-gradient(135deg, #fff5f0 0%, #ffe4d6 100%);
  border-radius: 8px;
}

.points-value {
  font-size: 32px;
  font-weight: 700;
  color: #c05621;
}

.points-level {
  font-size: 14px;
  color: #7c2d12;
  font-weight: 600;
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

.status-message {
  text-align: center;
  padding: 12px;
  border-radius: var(--border-radius-lg);
  font-weight: var(--font-semibold);
  margin: 0;
}

.status-message.approved {
  background: var(--success-50);
  color: var(--success-700);
  border: 1px solid var(--success-200);
}

.status-message.rejected {
  background: #fee2e2;
  color: #7f1d1d;
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
