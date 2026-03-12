<template>
  <div class="admin-validation-container">
    <div class="page-header">
      <h1 class="page-title">Validasi Campaign Relawan</h1>
      <p class="page-subtitle">Verifikasi partisipasi relawan dan berikan poin penghargaan</p>
    </div>

    <div class="content-wrapper">
      <div class="stats-grid">
        <div class="stat-card pending">
          <div class="stat-icon">⏳</div>
          <div class="stat-info">
            <span class="stat-label">Menunggu Validasi</span>
            <span class="stat-value">{{ pendingCount }}</span>
          </div>
        </div>
        <div class="stat-card approved">
          <div class="stat-icon">✅</div>
          <div class="stat-info">
            <span class="stat-label">Disetujui Hari Ini</span>
            <span class="stat-value">{{ approvedTodayCount }}</span>
          </div>
        </div>
      </div>

      <div class="table-container">
        <div class="table-header">
          <h2 class="table-title">Daftar Pengajuan</h2>
          <div class="table-actions">
            <div class="search-box">
              <span class="search-icon">🔍</span>
              <input type="text" v-model="searchQuery" placeholder="Cari relawan atau campaign..." />
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
          <table class="validation-table">
            <thead>
              <tr>
                <th>Relawan</th>
                <th>Campaign</th>
                <th>Tanggal Submit</th>
                <th>Bukti</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="filteredSubmissions.length === 0">
                <td colspan="6" class="empty-state">
                  Belum ada pengajuan untuk divalidasi.
                </td>
              </tr>
              <tr v-for="submission in filteredSubmissions" :key="submission.id">
                <td>
                  <div class="user-info">
                    <img :src="submission.userAvatar" :alt="submission.userName" class="user-avatar" />
                    <div class="user-details">
                      <span class="user-name">{{ submission.userName }}</span>
                      <span class="user-email">{{ submission.userEmail }}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="campaign-info">
                    <span class="campaign-name">{{ submission.campaignName }}</span>
                    <span class="campaign-points">+{{ submission.pointsReward }} Poin</span>
                  </div>
                </td>
                <td class="submit-date">{{ submission.submitDate }}</td>
                <td>
                  <button class="btn-view-evidence" @click="viewEvidence(submission)">
                    Lihat Bukti ({{ submission.evidenceCount }})
                  </button>
                </td>
                <td>
                  <span class="status-badge" :class="submission.status">
                    {{ formatStatus(submission.status) }}
                  </span>
                </td>
                <td>
                  <div class="action-buttons" v-if="submission.status === 'pending'">
                    <button class="btn-approve" @click="approveSubmission(submission.id)" title="Setujui & Berikan Poin">
                      ✓
                    </button>
                    <button class="btn-reject" @click="rejectSubmission(submission.id)" title="Tolak">
                      ✕
                    </button>
                  </div>
                  <span v-else class="action-completed">-</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const statusFilter = ref('pending')

// Dummy data for admin validation POV
const submissions = ref([
  {
    id: 1,
    userName: 'Budi Santoso',
    userEmail: 'budi.santoso@example.com',
    userAvatar: 'https://ui-avatars.com/api/?name=Budi+Santoso&background=random',
    campaignName: 'Mengajar Anak Pulau Pramuka',
    pointsReward: 50,
    submitDate: '2023-10-25',
    evidenceCount: 2,
    status: 'pending'
  },
  {
    id: 2,
    userName: 'Siti Aminah',
    userEmail: 'siti.aminah@example.com',
    userAvatar: 'https://ui-avatars.com/api/?name=Siti+Aminah&background=random',
    campaignName: 'Bersih Pantai Ancol',
    pointsReward: 30,
    submitDate: '2023-10-24',
    evidenceCount: 1,
    status: 'pending'
  },
  {
    id: 3,
    userName: 'Andi Wijaya',
    userEmail: 'andi.wijaya@example.com',
    userAvatar: 'https://ui-avatars.com/api/?name=Andi+Wijaya&background=random',
    campaignName: 'Distribusi Sembako Jakarta',
    pointsReward: 40,
    submitDate: '2023-10-24',
    evidenceCount: 3,
    status: 'approved'
  },
  {
    id: 4,
    userName: 'Rina Melati',
    userEmail: 'rina.melati@example.com',
    userAvatar: 'https://ui-avatars.com/api/?name=Rina+Melati&background=random',
    campaignName: 'Webinar Edukasi Gizi',
    pointsReward: 20,
    submitDate: '2023-10-23',
    evidenceCount: 1,
    status: 'rejected'
  }
])

const pendingCount = computed(() => submissions.value.filter(s => s.status === 'pending').length)
const approvedTodayCount = computed(() => {
  // In a real app, logic to check today's date would be here
  return submissions.value.filter(s => s.status === 'approved').length
})

const filteredSubmissions = computed(() => {
  return submissions.value.filter(sub => {
    const matchesSearch = sub.userName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          sub.campaignName.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = statusFilter.value === 'all' || sub.status === statusFilter.value
    
    return matchesSearch && matchesStatus
  })
})

const formatStatus = (status) => {
  switch (status) {
    case 'pending': return 'Menunggu'
    case 'approved': return 'Disetujui'
    case 'rejected': return 'Ditolak'
    default: return status
  }
}

const viewEvidence = (submission) => {
  alert(`Menampilkan ${submission.evidenceCount} bukti dari ${submission.userName} untuk campaign ${submission.campaignName}.`)
}

const approveSubmission = (id) => {
  if (confirm('Apakah Anda yakin ingin menyetujui pengajuan ini dan memberikan poin kepada relawan?')) {
    const sub = submissions.value.find(s => s.id === id)
    if (sub) sub.status = 'approved'
  }
}

const rejectSubmission = (id) => {
  if (confirm('Apakah Anda yakin ingin menolak pengajuan ini?')) {
    const sub = submissions.value.find(s => s.id === id)
    if (sub) sub.status = 'rejected'
  }
}
</script>

<style scoped>
.admin-validation-container {
  width: 100%;
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.page-header {
  margin-bottom: 24px;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 8px 0;
}

.page-subtitle {
  font-size: 15px;
  color: #64748b;
  margin: 0;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.stat-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.stat-card.pending {
  border-left: 4px solid #f59e0b;
}

.stat-card.approved {
  border-left: 4px solid #10b981;
}

.stat-icon {
  font-size: 36px;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
  border-radius: 16px;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-label {
  font-size: 14px;
  color: #64748b;
  font-weight: 500;
  margin-bottom: 4px;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: #0f172a;
}

/* Table Container */
.table-container {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
}

.table-title {
  font-size: 20px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.table-actions {
  display: flex;
  gap: 12px;
}

.search-box {
  position: relative;
  width: 250px;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
}

.search-box input {
  width: 100%;
  padding: 10px 12px 10px 40px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.search-box input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.filter-select {
  padding: 10px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  color: #475569;
  outline: none;
  background-color: white;
  cursor: pointer;
}

/* Table */
.table-responsive {
  overflow-x: auto;
}

.validation-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.validation-table th {
  padding: 16px;
  font-size: 13px;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 2px solid #f1f5f9;
}

.validation-table td {
  padding: 16px;
  vertical-align: middle;
  border-bottom: 1px solid #f1f5f9;
  color: #334155;
}

.validation-table tbody tr:hover {
  background: #f8fafc;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: #64748b;
  font-style: italic;
}

/* User Info */
.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.user-details {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: 600;
  font-size: 14px;
  color: #0f172a;
}

.user-email {
  font-size: 12px;
  color: #64748b;
}

/* Campaign Info */
.campaign-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.campaign-name {
  font-weight: 500;
  color: #1e293b;
}

.campaign-points {
  font-size: 12px;
  font-weight: 700;
  color: #f59e0b;
  background: #fef3c7;
  padding: 2px 8px;
  border-radius: 12px;
  width: fit-content;
}

.submit-date {
  font-size: 14px;
  color: #64748b;
}

/* Evidence Button */
.btn-view-evidence {
  background: #f1f5f9;
  color: #3b82f6;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-view-evidence:hover {
  background: #e2e8f0;
  color: #2563eb;
}

/* Status Badges */
.status-badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.status-badge.pending {
  background: #fef3c7;
  color: #d97706;
}

.status-badge.approved {
  background: #dcfce7;
  color: #16a34a;
}

.status-badge.rejected {
  background: #fee2e2;
  color: #dc2626;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 8px;
}

.action-buttons button {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
}

.btn-approve {
  background: #10b981;
  color: white;
}

.btn-approve:hover {
  background: #059669;
  transform: scale(1.05);
}

.btn-reject {
  background: #ef4444;
  color: white;
}

.btn-reject:hover {
  background: #dc2626;
  transform: scale(1.05);
}

.action-completed {
  color: #94a3b8;
  font-style: italic;
  font-size: 14px;
}

/* Responsive */
@media (max-width: 768px) {
  .table-actions {
    flex-direction: column;
    width: 100%;
  }
  
  .search-box {
    width: 100%;
  }
  
  .filter-select {
    width: 100%;
  }
}
</style>
