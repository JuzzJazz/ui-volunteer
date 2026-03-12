<template>
  <div class="admin-validation-container">
    <div class="page-header">
      <div class="header-icon">🛡️</div>
      <div>
        <h1 class="page-title">Validasi Campaign Relawan</h1>
        <p class="page-subtitle">Verifikasi partisipasi relawan dan berikan poin penghargaan</p>
      </div>
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
                    📎 Bukti ({{ submission.evidenceCount }})
                  </button>
                </td>
                <td>
                  <span class="status-badge" :class="submission.status">
                    {{ formatStatus(submission.status) }}
                  </span>
                </td>
                <td>
                  <div class="action-buttons" v-if="submission.status === 'pending'">
                    <button class="btn-approve" @click="openApproveModal(submission)" title="Setujui & Berikan Poin">
                      ✓
                    </button>
                    <button class="btn-reject" @click="openRejectModal(submission)" title="Tolak">
                      ✕
                    </button>
                  </div>
                  <span v-else class="action-completed">—</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <!-- ===== APPROVE MODAL ===== -->
  <Transition name="modal-fade">
    <div v-if="approveModal.show" class="modal-backdrop" @click.self="approveModal.show = false">
      <div class="confirm-modal">

        <div v-if="!approveModal.success" class="modal-step">
          <button class="modal-close-btn" @click="approveModal.show = false">✕</button>

          <!-- Volunteer banner -->
          <div class="modal-volunteer-banner approve-banner">
            <img :src="approveModal.submission?.userAvatar" class="banner-avatar" />
            <div class="banner-info">
              <span class="banner-name">{{ approveModal.submission?.userName }}</span>
              <span class="banner-campaign">{{ approveModal.submission?.campaignName }}</span>
            </div>
            <div class="banner-points">+{{ approveModal.submission?.pointsReward }} Poin</div>
          </div>

          <div class="modal-body">
            <div class="modal-icon-badge">🏅</div>
            <h3 class="modal-title">Konfirmasi Persetujuan</h3>
            <p class="modal-desc">
              Dengan menyetujui, relawan akan mendapatkan
              <strong class="highlight-points">+{{ approveModal.submission?.pointsReward }} Poin</strong>
              yang langsung dikreditkan ke akun mereka.
            </p>

            <div class="modal-summary">
              <div class="summary-row">
                <span class="summary-label">Relawan</span>
                <span class="summary-value">{{ approveModal.submission?.userName }}</span>
              </div>
              <div class="summary-row">
                <span class="summary-label">Campaign</span>
                <span class="summary-value">{{ approveModal.submission?.campaignName }}</span>
              </div>
              <div class="summary-divider"></div>
              <div class="summary-row">
                <span class="summary-label">Poin Diberikan</span>
                <span class="summary-value approve-points">+{{ approveModal.submission?.pointsReward }} Poin ✨</span>
              </div>
            </div>

            <div class="modal-actions">
              <button class="btn-batal" @click="approveModal.show = false">Batal</button>
              <button class="btn-approve-confirm" @click="confirmApprove" :disabled="approveModal.loading">
                <span v-if="!approveModal.loading">✅ Ya, Setujui!</span>
                <span v-else class="loading-dots">Memproses<span>.</span><span>.</span><span>.</span></span>
              </button>
            </div>
          </div>
        </div>

        <!-- Approve Success -->
        <div v-else class="modal-step modal-success">
          <div class="confetti-wrapper">
            <span v-for="i in 12" :key="i" class="confetti-piece" :style="{ '--i': i }"></span>
          </div>
          <div class="success-icon">🎉</div>
          <h3 class="success-title">Berhasil Disetujui!</h3>
          <p class="success-desc">
            <strong>{{ approveModal.submission?.userName }}</strong> telah mendapatkan
            <strong class="approve-points">+{{ approveModal.submission?.pointsReward }} Poin</strong>
          </p>
          <div class="success-badge approve">Campaign tervalidasi ✓</div>
          <button class="btn-approve-confirm" style="margin-top: 24px;" @click="approveModal.show = false">Tutup</button>
        </div>

      </div>
    </div>
  </Transition>

  <!-- ===== REJECT MODAL ===== -->
  <Transition name="modal-fade">
    <div v-if="rejectModal.show" class="modal-backdrop" @click.self="rejectModal.show = false">
      <div class="confirm-modal">

        <div v-if="!rejectModal.success" class="modal-step">
          <button class="modal-close-btn" @click="rejectModal.show = false">✕</button>

          <div class="modal-volunteer-banner reject-banner">
            <img :src="rejectModal.submission?.userAvatar" class="banner-avatar" />
            <div class="banner-info">
              <span class="banner-name">{{ rejectModal.submission?.userName }}</span>
              <span class="banner-campaign">{{ rejectModal.submission?.campaignName }}</span>
            </div>
            <div class="banner-reject-tag">Tolak</div>
          </div>

          <div class="modal-body">
            <div class="modal-icon-badge">⚠️</div>
            <h3 class="modal-title">Konfirmasi Penolakan</h3>
            <p class="modal-desc">
              Pengajuan ini akan ditolak dan relawan akan diberitahu. Harap berikan alasan yang jelas.
            </p>

            <div class="reject-reason-box">
              <label class="reason-label">Alasan Penolakan <span class="required">*</span></label>
              <textarea
                v-model="rejectModal.reason"
                class="reason-textarea"
                placeholder="Contoh: Bukti tidak sesuai, foto tidak jelas, aktivitas tidak terdaftar..."
                rows="3"
              ></textarea>
              <span v-if="rejectModal.touched && !rejectModal.reason.trim()" class="reason-error">
                ⚠️ Alasan penolakan wajib diisi
              </span>
            </div>

            <div class="modal-actions">
              <button class="btn-batal" @click="rejectModal.show = false">Batal</button>
              <button
                class="btn-reject-confirm"
                @click="confirmReject"
                :disabled="rejectModal.loading"
              >
                <span v-if="!rejectModal.loading">✕ Ya, Tolak</span>
                <span v-else class="loading-dots">Memproses<span>.</span><span>.</span><span>.</span></span>
              </button>
            </div>
          </div>
        </div>

        <!-- Reject Success -->
        <div v-else class="modal-step modal-success modal-rejected">
          <div class="success-icon">📋</div>
          <h3 class="success-title">Pengajuan Ditolak</h3>
          <p class="success-desc">
            Pengajuan dari <strong>{{ rejectModal.submission?.userName }}</strong> telah ditolak.
          </p>
          <div class="reject-reason-display">
            <span class="reason-display-label">Alasan:</span>
            <span class="reason-display-text">{{ rejectModal.reason }}</span>
          </div>
          <div class="success-badge reject">Status diperbarui ✓</div>
          <button class="btn-reject-confirm" style="margin-top: 24px;" @click="rejectModal.show = false">Tutup</button>
        </div>

      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const statusFilter = ref('pending')

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
const approvedTodayCount = computed(() => submissions.value.filter(s => s.status === 'approved').length)

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
  alert(`Menampilkan ${submission.evidenceCount} bukti dari ${submission.userName} untuk campaign: ${submission.campaignName}`)
}

// ---- Approve Modal ----
const approveModal = ref({ show: false, submission: null, loading: false, success: false })

const openApproveModal = (submission) => {
  approveModal.value = { show: true, submission, loading: false, success: false }
}

const confirmApprove = async () => {
  approveModal.value.loading = true
  await new Promise(r => setTimeout(r, 1400))
  const sub = submissions.value.find(s => s.id === approveModal.value.submission.id)
  if (sub) sub.status = 'approved'
  approveModal.value.loading = false
  approveModal.value.success = true
}

// ---- Reject Modal ----
const rejectModal = ref({ show: false, submission: null, loading: false, success: false, reason: '', touched: false })

const openRejectModal = (submission) => {
  rejectModal.value = { show: true, submission, loading: false, success: false, reason: '', touched: false }
}

const confirmReject = async () => {
  rejectModal.value.touched = true
  if (!rejectModal.value.reason.trim()) return
  rejectModal.value.loading = true
  await new Promise(r => setTimeout(r, 1200))
  const sub = submissions.value.find(s => s.id === rejectModal.value.submission.id)
  if (sub) sub.status = 'rejected'
  rejectModal.value.loading = false
  rejectModal.value.success = true
}
</script>

<style scoped>
.admin-validation-container {
  width: 100%;
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Header */
.page-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 28px;
  padding: 20px 24px;
  background: rgba(255,255,255,0.8);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.5);
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
}

.header-icon { font-size: 36px; flex-shrink: 0; }

.page-title {
  font-size: 22px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 4px;
  letter-spacing: -0.5px;
}

.page-subtitle {
  font-size: 14px;
  color: #6b7280;
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
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255,255,255,0.5);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.stat-card.pending { border-left: 4px solid #f59e0b; }
.stat-card.approved { border-left: 4px solid #10b981; }

.stat-icon {
  font-size: 32px;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
  border-radius: 14px;
  flex-shrink: 0;
}

.stat-info { display: flex; flex-direction: column; }
.stat-label { font-size: 13px; color: #6b7280; font-weight: 500; margin-bottom: 4px; }
.stat-value { font-size: 28px; font-weight: 700; color: #0f172a; }

/* Table Container */
.table-container {
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(255,255,255,0.5);
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
}

.table-title { font-size: 18px; font-weight: 700; color: #111827; margin: 0; }
.table-actions { display: flex; gap: 12px; }

.search-box { position: relative; width: 250px; }
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
  border: 1.5px solid #e5e7eb;
  border-radius: 10px;
  font-size: 14px;
  outline: none;
  transition: all 0.2s ease;
  font-family: inherit;
}

.search-box input:focus {
  border-color: #f97316;
  box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
}

.filter-select {
  padding: 10px 16px;
  border: 1.5px solid #e5e7eb;
  border-radius: 10px;
  font-size: 14px;
  color: #374151;
  outline: none;
  background: white;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.2s;
}

.filter-select:focus { border-color: #f97316; }

/* Table */
.table-responsive { overflow-x: auto; }

.validation-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.validation-table th {
  padding: 14px 16px;
  font-size: 12px;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 2px solid #f3f4f6;
}

.validation-table td {
  padding: 16px;
  vertical-align: middle;
  border-bottom: 1px solid #f3f4f6;
  color: #374151;
}

.validation-table tbody tr {
  transition: background 0.15s ease;
}

.validation-table tbody tr:hover { background: #f9fafb; }

.empty-state {
  text-align: center;
  padding: 48px;
  color: #9ca3af;
  font-style: italic;
}

/* User Info */
.user-info { display: flex; align-items: center; gap: 12px; }

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e5e7eb;
}

.user-details { display: flex; flex-direction: column; }
.user-name { font-weight: 600; font-size: 14px; color: #111827; }
.user-email { font-size: 12px; color: #9ca3af; }

/* Campaign Info */
.campaign-info { display: flex; flex-direction: column; gap: 4px; }
.campaign-name { font-weight: 500; color: #1e293b; font-size: 14px; }
.campaign-points {
  font-size: 12px;
  font-weight: 700;
  color: #d97706;
  background: #fef3c7;
  padding: 2px 8px;
  border-radius: 12px;
  width: fit-content;
}

.submit-date { font-size: 13px; color: #9ca3af; }

/* Evidence Button */
.btn-view-evidence {
  background: #eff6ff;
  color: #3b82f6;
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
}

.btn-view-evidence:hover { background: #dbeafe; transform: translateY(-1px); }

/* Status Badges */
.status-badge {
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.status-badge.pending  { background: #fef3c7; color: #d97706; }
.status-badge.approved { background: #dcfce7; color: #16a34a; }
.status-badge.rejected { background: #fee2e2; color: #dc2626; }

/* Action Buttons */
.action-buttons { display: flex; gap: 8px; }

.action-buttons button {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  transition: all 0.2s ease;
}

.btn-approve { background: #10b981; color: white; }
.btn-approve:hover { background: #059669; transform: scale(1.12); }

.btn-reject { background: #ef4444; color: white; }
.btn-reject:hover { background: #dc2626; transform: scale(1.12); }

.action-completed { color: #d1d5db; font-size: 18px; }

/* ===== MODALS ===== */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.confirm-modal {
  background: white;
  border-radius: 24px;
  max-width: 460px;
  width: 100%;
  box-shadow: 0 32px 64px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  animation: modalSlideUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes modalSlideUp {
  from { opacity: 0; transform: translateY(40px) scale(0.95); }
  to   { opacity: 1; transform: translateY(0)   scale(1); }
}

.modal-fade-enter-active,
.modal-fade-leave-active { transition: opacity 0.25s ease; }
.modal-fade-enter-from,
.modal-fade-leave-to { opacity: 0; }

.modal-step { position: relative; }

/* Volunteer banner */
.modal-volunteer-banner {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 20px;
}

.approve-banner { background: linear-gradient(135deg, #d1fae5, #a7f3d0); }
.reject-banner  { background: linear-gradient(135deg, #fee2e2, #fecaca); }

.banner-avatar {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 3px solid white;
  box-shadow: 0 4px 12px rgba(0,0,0,0.12);
  flex-shrink: 0;
}

.banner-info { flex: 1; display: flex; flex-direction: column; gap: 2px; }
.banner-name { font-weight: 700; font-size: 15px; color: #111827; }
.banner-campaign { font-size: 12px; color: #6b7280; }

.banner-points {
  font-size: 15px;
  font-weight: 800;
  color: #059669;
  background: white;
  padding: 6px 12px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.banner-reject-tag {
  font-size: 13px;
  font-weight: 700;
  color: #dc2626;
  background: white;
  padding: 6px 14px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

/* Modal close btn */
.modal-close-btn {
  position: absolute;
  top: 10px;
  right: 12px;
  z-index: 10;
  background: rgba(255,255,255,0.85);
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}
.modal-close-btn:hover { background: #fee2e2; color: #dc2626; }

/* Modal body */
.modal-body { padding: 20px 24px 24px; text-align: center; }
.modal-icon-badge { font-size: 36px; margin-bottom: 8px; }
.modal-title { font-size: 20px; font-weight: 700; color: #111827; margin: 0 0 8px; }
.modal-desc { font-size: 14px; color: #6b7280; margin: 0 0 20px; line-height: 1.6; }

.highlight-points { color: #059669; }

/* Summary */
.modal-summary {
  background: #f9fafb;
  border-radius: 14px;
  padding: 16px;
  margin-bottom: 16px;
  text-align: left;
}
.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
}
.summary-label { font-size: 13px; color: #9ca3af; }
.summary-value { font-size: 14px; font-weight: 600; color: #111827; }
.summary-value.approve-points { color: #059669; font-size: 16px; }
.approve-points { color: #059669; font-weight: 700; }
.summary-divider { border-top: 1.5px dashed #e5e7eb; margin: 8px 0; }

/* Reject reason */
.reject-reason-box {
  text-align: left;
  margin-bottom: 20px;
}
.reason-label { font-size: 14px; font-weight: 600; color: #374151; display: block; margin-bottom: 8px; }
.required { color: #ef4444; }
.reason-textarea {
  width: 100%;
  padding: 12px;
  border: 1.5px solid #e5e7eb;
  border-radius: 10px;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  outline: none;
  transition: all 0.2s;
  color: #374151;
}
.reason-textarea:focus { border-color: #ef4444; box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1); }
.reason-error { font-size: 12px; color: #ef4444; margin-top: 6px; display: block; }

/* Action buttons */
.modal-actions { display: flex; gap: 12px; }

.btn-batal {
  flex: 1;
  padding: 12px;
  border: 1.5px solid #e5e7eb;
  background: white;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
}
.btn-batal:hover { background: #f9fafb; }

.btn-approve-confirm {
  flex: 1;
  padding: 12px;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 14px rgba(16, 185, 129, 0.3);
  font-family: inherit;
}
.btn-approve-confirm:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(16, 185, 129, 0.4);
}
.btn-approve-confirm:disabled { opacity: 0.65; cursor: not-allowed; }

.btn-reject-confirm {
  flex: 1;
  padding: 12px;
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 14px rgba(239, 68, 68, 0.3);
  font-family: inherit;
}
.btn-reject-confirm:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(239, 68, 68, 0.4);
}
.btn-reject-confirm:disabled { opacity: 0.65; cursor: not-allowed; }

/* Loading dots */
.loading-dots span { animation: blink 1.2s infinite; }
.loading-dots span:nth-child(2) { animation-delay: 0.2s; }
.loading-dots span:nth-child(3) { animation-delay: 0.4s; }
@keyframes blink { 0%, 80%, 100% { opacity: 0; } 40% { opacity: 1; } }

/* Success states */
.modal-success {
  padding: 40px 32px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.modal-rejected { background: #fff; }

.success-icon {
  font-size: 72px;
  animation: popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  display: block;
  margin-bottom: 16px;
}
@keyframes popIn {
  from { opacity: 0; transform: scale(0.4); }
  to   { opacity: 1; transform: scale(1); }
}

.success-title { font-size: 22px; font-weight: 800; color: #111827; margin: 0 0 12px; }
.success-desc { font-size: 14px; color: #6b7280; margin: 0 0 16px; }
.success-badge {
  display: inline-block;
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 700;
}
.success-badge.approve { background: #dcfce7; color: #16a34a; }
.success-badge.reject  { background: #fee2e2; color: #dc2626; }

.reject-reason-display {
  background: #f9fafb;
  border-radius: 12px;
  padding: 12px 16px;
  text-align: left;
  margin-bottom: 16px;
}
.reason-display-label { font-size: 12px; color: #9ca3af; display: block; margin-bottom: 4px; }
.reason-display-text { font-size: 14px; color: #374151; line-height: 1.5; }

/* Confetti */
.confetti-wrapper {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}
.confetti-piece {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 2px;
  top: -20px;
  left: calc(var(--i) * 8.5%);
  background: hsl(calc(var(--i) * 30), 80%, 60%);
  animation: confettiFall calc(1s + var(--i) * 0.1s) ease-in forwards;
  animation-delay: calc(var(--i) * 0.05s);
}
@keyframes confettiFall {
  0%   { transform: translateY(0) rotate(0deg); opacity: 1; }
  100% { transform: translateY(420px) rotate(540deg); opacity: 0; }
}

/* Responsive */
@media (max-width: 768px) {
  .table-actions { flex-direction: column; width: 100%; }
  .search-box { width: 100%; }
  .filter-select { width: 100%; }
}
</style>
