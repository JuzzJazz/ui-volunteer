<template>
  <div class="dashboard-container">
    <!-- Header -->
    <div class="dashboard-header">
      <div class="header-left">
        <h1 class="dashboard-title">Akun Relawan Saya</h1>
        <p class="dashboard-subtitle">Selamat datang kembali! Semangat terus ya 🙌</p>
      </div>
      <div class="header-right">
        <div class="header-user-chip">
          <div class="header-avatar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div class="header-user-info">
            <span class="header-username">Hana Volunteer</span>
            <span class="header-badge">🌟 Aktif</span>
          </div>
        </div>
        <button class="btn-create-campaign">+ BUAT CAMPAIGN</button>
      </div>
    </div>

    <!-- Sidebar & Main Content -->
    <div class="dashboard-layout">
      <!-- Sidebar -->
      <aside class="sidebar">
        <nav class="sidebar-nav">
          <div class="nav-section">
            <div class="nav-item active" @click="activeSection = 'ringkasan'">
              <span class="nav-icon">📊</span>
              <span>Ringkasan Akun</span>
            </div>
          </div>

          <div class="nav-section">
            <div class="nav-header" @click="toggleSection('profil')">
              <span class="nav-icon">👤</span>
              <span>Profil</span>
              <span class="dropdown-icon" :class="{ open: expandedSections.profil }">▼</span>
            </div>
            <div v-show="expandedSections.profil" class="nav-submenu">
              <div class="nav-subitem" :class="{ active: activeSection === 'profil-akun' }"
                @click="activeSection = 'profil-akun'">
                Profil Akun
              </div>
              <div class="nav-subitem" @click="activeSection = 'ganti-kata-sandi'">
                Ganti Kata Sandi
              </div>
            </div>
          </div>

          <div class="nav-section">
            <div class="nav-item" @click="activeSection = 'campaign'">
              <span class="nav-icon">📋</span>
              <span>Campaign Saya</span>
            </div>
          </div>

          <div class="nav-section">
            <div class="nav-header" @click="toggleSection('perjalanan')">
              <span class="nav-icon">✈️</span>
              <span>Perjalanan</span>
              <span class="dropdown-icon" :class="{ open: expandedSections.perjalanan }">▼</span>
            </div>
            <div v-show="expandedSections.perjalanan" class="nav-submenu">
              <div class="nav-subitem" @click="activeSection = 'riwayat'">
                Riwayat
              </div>
              <div class="nav-subitem" @click="activeSection = 'poin-badge'">
                Poin & Badge
              </div>
              <div class="nav-subitem" @click="activeSection = 'tulis-cerita'">
                Tulis Cerita
              </div>
            </div>
          </div>

          <div class="nav-section">
            <div class="nav-header" @click="toggleSection('ayo-terlibat')">
              <span class="nav-icon">🤝</span>
              <span>Ayo Terlibat</span>
              <span class="dropdown-icon" :class="{ open: expandedSections['ayo-terlibat'] }">▼</span>
            </div>
            <div v-show="expandedSections['ayo-terlibat']" class="nav-submenu">
              <div class="nav-subitem" @click="activeSection = 'peluang-relawan'">
                Peluang Relawan
              </div>
              <div class="nav-subitem" @click="activeSection = 'acara-relawan'">
                Acara Relawan
              </div>
            </div>
          </div>

          <div class="nav-section">
            <div class="nav-item" @click="activeSection = 'sertifikat'">
              <span class="nav-icon">🎓</span>
              <span>Sertifikat</span>
            </div>
          </div>

          <div class="nav-section admin-section">
            <div class="nav-header" @click="toggleSection('admin')">
              <span class="nav-icon">👑</span>
              <span>Admin POV</span>
              <span class="dropdown-icon" :class="{ open: expandedSections.admin }">▼</span>
            </div>
            <div v-show="expandedSections.admin" class="nav-submenu">
              <div class="nav-subitem" :class="{ active: activeSection === 'admin-pov' }" @click="activeSection = 'admin-pov'">
                Validasi Campaign & Approval Poin
              </div>
              <div class="nav-subitem" @click="activeSection = 'kelola-rewards'">
                Kelola Rewards
              </div>
              <div class="nav-subitem" @click="activeSection = 'claim-reward'">
                Claim Reward
              </div>
              <div class="nav-subitem" @click="activeSection = 'setting-rewards'">
                Setting Rewards
              </div>
            </div>
          </div>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="main-content">
        <!-- Profile Page -->
        <ProfilePage v-if="activeSection === 'profil-akun'" />

        <!-- Change Password Page -->
        <ChangePasswordPage v-else-if="activeSection === 'ganti-kata-sandi'" />

        <!-- My Campaign Page -->
        <MyCampaignPage v-else-if="activeSection === 'campaign'" />

        <!-- History Page -->
        <HistoryPage v-else-if="activeSection === 'riwayat'" />

        <!-- Points & Badge Page -->
        <PointsBadgePage v-else-if="activeSection === 'poin-badge'" />

        <!-- Write Story Page -->
        <WriteStoryPage v-else-if="activeSection === 'tulis-cerita'" />

        <!-- Opportunities Page -->
        <OpportunitiesPage v-else-if="activeSection === 'peluang-relawan'" />

        <!-- Events Page -->
        <EventsPage v-else-if="activeSection === 'acara-relawan'" />

        <!-- Certificates Page -->
        <CertificatesPage v-else-if="activeSection === 'sertifikat'" />

<!-- Approval & Validation Page -->
        <AdminApprovalPoinPage v-else-if="activeSection === 'admin-pov'" />

        <!-- Admin Rewards Page -->
        <AdminRewardsPage v-else-if="activeSection === 'kelola-rewards'" />
        
        <!-- Claim Reward Page -->
        <AdminClaimRewardPage v-else-if="activeSection === 'claim-reward'" />

        <!-- Setting Rewards Page -->
        <AdminSettingRewardsPage v-else-if="activeSection === 'setting-rewards'" />

        <!-- Summary Card -->
        <div v-else-if="activeSection === 'ringkasan'" class="summary-card">
          <div class="summary-header">
            <h2 class="summary-title">📊 Ringkasan Aktivitas Relawan</h2>
            <span class="summary-period">2025 – Sekarang</span>
          </div>
          <div class="summary-stats">
            <div class="stat-item">
              <div class="stat-icon days">⏱️</div>
              <div class="stat-info">
                <div class="stat-value">0</div>
                <div class="stat-desc">Hari Aktif</div>
              </div>
            </div>
            <div class="stat-item">
              <div class="stat-icon events">🎪</div>
              <div class="stat-info">
                <div class="stat-value">1</div>
                <div class="stat-desc">Acara Diikuti</div>
              </div>
            </div>
            <div class="stat-item">
              <div class="stat-icon points">❤️</div>
              <div class="stat-info">
                <div class="stat-value">0</div>
                <div class="stat-desc">Poin Terkumpul</div>
              </div>
            </div>
            <div class="stat-item">
              <div class="stat-icon badges">🏆</div>
              <div class="stat-info">
                <div class="stat-value">0</div>
                <div class="stat-desc">Badge Diraih</div>
              </div>
            </div>
            <div class="stat-item">
              <div class="stat-icon campaigns">📢</div>
              <div class="stat-info">
                <div class="stat-value">0</div>
                <div class="stat-desc">Kampanye</div>
              </div>
            </div>
          </div>
        </div>

        <!-- On Going Campaign -->
        <div v-if="activeSection === 'ringkasan'" class="campaign-section">
          <h2 class="section-title">On Going Campaign</h2>
          <div class="empty-state">
            <div class="empty-icon">📭</div>
            <p class="empty-text">Belum ada campaign yang sedang berjalan</p>
          </div>
        </div>

        <!-- Peluang Relawan -->
        <div v-if="activeSection === 'ringkasan'" class="opportunities-section">
          <h2 class="section-title">Peluang Relawan</h2>
          <div class="opportunities-grid">
            <div class="opportunity-card" v-for="opportunity in opportunities" :key="opportunity.id">
              <div class="opportunity-image">
                <img :src="opportunity.image" :alt="opportunity.title" />
                <div class="opportunity-badge">
                  <span class="badge-text">{{ opportunity.badge }}</span>
                </div>
              </div>
              <div class="opportunity-content">
                <h3 class="opportunity-title">{{ opportunity.title }}</h3>
                <div class="opportunity-meta">
                  <div class="meta-item">
                    <span class="meta-icon">📅</span>
                    <span class="meta-text">{{ opportunity.date }}</span>
                  </div>
                  <div class="meta-item">
                    <span class="meta-icon">📍</span>
                    <span class="meta-text">{{ opportunity.location }}</span>
                  </div>
                </div>
                <div class="opportunity-tag">
                  <span class="tag">{{ opportunity.tag }}</span>
                </div>
                <div class="opportunity-footer">
                  <div class="points">
                    <span class="points-value">{{ opportunity.points }} Poin</span>
                  </div>
                  <button class="btn-daftar" @click="openApplicationForm(opportunity)">Daftar</button>
                </div>
              </div>
            </div>
          </div>
          <div class="pagination">
            <button class="pagination-btn" @click="prevPage" :disabled="currentPage === 1">‹</button>
            <button class="pagination-btn" @click="nextPage">›</button>
          </div>
        </div>
      </main>
    </div>

    <!-- Application Form Modal -->
    <Transition name="modal-fade">
      <div v-if="applicationModal.show" class="modal-overlay" @click.self="closeApplicationModal">
        <div class="modal-content application-modal">

          <div v-if="!applicationModal.success" class="modal-step">
            <button class="modal-close" @click="closeApplicationModal">✕</button>
            <h2 class="modal-title">Konfirmasi Pendaftaran</h2>
            <p class="modal-subtitle">Anda akan mendaftar sebagai relawan untuk <strong>{{ selectedOpportunity?.title
                }}</strong>.</p>

            <div class="form-group">
              <label>Mengapa Anda tertarik mengikuti acara ini? <span class="required">*</span></label>
              <textarea v-model="applicationModal.reason" class="form-textarea" rows="4"
                placeholder="Tuliskan motivasi atau alasan singkat Anda..." required></textarea>
            </div>

            <div class="modal-actions-row">
              <button class="btn-cancel" @click="closeApplicationModal">Batal</button>
              <button class="btn-submit" @click="submitApplication"
                :disabled="!applicationModal.reason.trim() || applicationModal.loading">
                <span v-if="!applicationModal.loading">Kirim Pendaftaran</span>
                <span v-else class="loading-dots">Mengirim<span>.</span><span>.</span><span>.</span></span>
              </button>
            </div>
          </div>

          <!-- Application Success -->
          <div v-else class="modal-step modal-success">
            <div class="confetti-wrapper">
              <span v-for="i in 12" :key="i" class="confetti-piece" :style="{ '--i': i }"></span>
            </div>
            <div class="success-icon">🎉</div>
            <h3 class="success-title">Pendaftaran Berhasil!</h3>
            <p class="success-desc">Terima kasih atas semangat Anda. Kami sedang meninjau pendaftaran Anda untuk
              campaign:</p>
            <p class="success-campaign-name">{{ selectedOpportunity?.title }}</p>
            <button class="btn-submit btn-done" @click="closeApplicationModal">Selesai</button>
          </div>

        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import ProfilePage from './ProfilePage.vue'
import ChangePasswordPage from './ChangePasswordPage.vue'
import MyCampaignPage from './MyCampaignPage.vue'
import HistoryPage from './HistoryPage.vue'
import PointsBadgePage from './PointsBadgePage.vue'
import WriteStoryPage from './WriteStoryPage.vue'
import OpportunitiesPage from './OpportunitiesPage.vue'
import EventsPage from './EventsPage.vue'
import CertificatesPage from './CertificatesPage.vue'
import AdminRewardsPage from './AdminRewardsPage.vue'
import AdminClaimRewardPage from './AdminClaimRewardPage.vue'
import AdminApprovalPoinPage from './AdminApprovalPoinPage.vue'
import AdminSettingRewardsPage from './AdminSettingRewardsPage.vue'

const activeSection = ref('ringkasan')
const currentPage = ref(1)

// --- Application Logic ---
const selectedOpportunity = ref(null)
const applicationModal = ref({
  show: false,
  reason: '',
  loading: false,
  success: false
})

const openApplicationForm = (opportunity) => {
  selectedOpportunity.value = opportunity
  applicationModal.value = { show: true, reason: '', loading: false, success: false }
}

const closeApplicationModal = () => {
  if (applicationModal.value.loading) return
  applicationModal.value.show = false
  setTimeout(() => {
    selectedOpportunity.value = null
  }, 300)
}

const submitApplication = async () => {
  if (!applicationModal.value.reason.trim()) return

  applicationModal.value.loading = true
  // simulate network request
  await new Promise(resolve => setTimeout(resolve, 1500))
  applicationModal.value.loading = false
  applicationModal.value.success = true
}

const expandedSections = reactive({
  profil: true,
  perjalanan: false,
  'ayo-terlibat': false,
  admin: false
})

const opportunities = ref([
  {
    id: 1,
    title: 'Holiday in the Forest - Live Drawing Illustrator',
    date: 'Kamis, 30 Oktober 2025 - Kamis, 20 November 2025',
    location: 'JAKARTA SELATAN',
    badge: 'VOLUNTEER',
    tag: '#VOLUNTEER-KINCIRLAPANGAN',
    points: 50,
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=300&fit=crop'
  },
  {
    id: 2,
    title: '[Student Volunteer] Volunteer Coordinator',
    date: 'Rabu, 22 Oktober 2025 - Sabtu, 22 November 2025',
    location: 'Bintaro',
    badge: 'VOLUNTEER',
    tag: '#VOLUNTEER-KINCIRKANTOR',
    points: 90,
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop'
  },
  {
    id: 3,
    title: '[Student Volunteer] Business Analyst',
    date: 'Rabu, 22 Oktober 2025 - Sabtu, 22 November 2025',
    location: 'Bintaro',
    badge: 'VOLUNTEER',
    tag: '#VOLUNTEER-KINCIRKANTOR',
    points: 90,
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop'
  }
])

const toggleSection = (section) => {
  expandedSections[section] = !expandedSections[section]
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  currentPage.value++
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.dashboard-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #fff7ed 0%, #fed7aa 50%, #f97316 100%);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Header */
.dashboard-header {
  background: linear-gradient(135deg, #f97316 0%, #ea580c 60%, #dc4a09 100%);
  padding: 24px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 24px rgba(249, 115, 22, 0.35);
  position: relative;
  overflow: hidden;
}

.dashboard-header::before {
  content: '';
  position: absolute;
  top: -60px;
  right: -60px;
  width: 200px;
  height: 200px;
  background: rgba(255, 255, 255, 0.07);
  border-radius: 50%;
  pointer-events: none;
}

.dashboard-header::after {
  content: '';
  position: absolute;
  bottom: -40px;
  right: 200px;
  width: 120px;
  height: 120px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  pointer-events: none;
}

.dashboard-title {
  color: white;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.dashboard-subtitle {
  color: rgba(255, 255, 255, 0.82);
  font-size: 14px;
  margin-top: 4px;
  font-weight: 400;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
  z-index: 1;
}

.header-user-chip {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  padding: 8px 16px 8px 8px;
  backdrop-filter: blur(8px);
}

.header-avatar {
  width: 36px;
  height: 36px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f97316;
  flex-shrink: 0;
}

.header-user-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.header-username {
  font-size: 13px;
  font-weight: 700;
  color: white;
  line-height: 1;
}

.header-badge {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1;
}

.btn-create-campaign {
  background: white;
  color: #f97316;
  border: 2px solid white;
  padding: 12px 24px;
  border-radius: 25px;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.25);
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

.btn-create-campaign:hover {
  transform: translateY(-2px);
  background: #fff7ed;
  box-shadow: 0 6px 25px rgba(255, 255, 255, 0.45);
}

/* Layout */
.dashboard-layout {
  display: flex;
  gap: 24px;
  padding: 24px 40px;
  max-width: 1600px;
  margin: 0 auto;
}

/* Sidebar */
.sidebar {
  width: 280px;
  background: white;
  border-radius: 16px;
  padding: 16px 0;
  box-shadow: var(--shadow-md);
  height: fit-content;
  position: sticky;
  top: 24px;
  border: 1px solid var(--gray-100);
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.nav-section {
  border-bottom: 1px solid #f0f0f0;
  padding: 8px 0;
}

.nav-section:last-child {
  border-bottom: none;
}

.nav-item,
.nav-header {
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all var(--transition-base);
  color: var(--gray-600);
  font-size: 14px;
  font-weight: 500;
  border-radius: 8px;
  margin: 0 8px;
  position: relative;
}

.nav-item:hover,
.nav-header:hover {
  background: var(--gray-50);
  color: var(--primary-600);
}

.nav-item.active {
  background: linear-gradient(90deg, var(--primary-50) 0%, rgba(249, 115, 22, 0.04) 100%);
  color: var(--primary-700);
  font-weight: 600;
  box-shadow: inset -4px 0 0 0 var(--primary-500);
}

.admin-section {
  margin-top: 12px;
  border-top: 1px solid var(--gray-200);
  padding-top: 12px;
  border-bottom: 1px solid var(--gray-200);
  padding-bottom: 12px;
}

.admin-section .nav-header {
  color: var(--primary-600);
  font-weight: 600;
}

.admin-section .nav-item {
  color: var(--gray-600);
  padding-left: 36px;
  font-size: 13px;
}

.admin-section .nav-item:hover {
  background: linear-gradient(90deg, rgba(249, 115, 22, 0.08) 0%, transparent 100%);
  color: var(--primary-700);
}

.admin-section .nav-item.active {
  background: linear-gradient(90deg, rgba(249, 115, 22, 0.12) 0%, transparent 100%);
  color: var(--primary-700);
  font-weight: 600;
  box-shadow: inset -3px 0 0 0 var(--primary-500);
}

.nav-icon {
  font-size: 18px;
  width: 24px;
  text-align: center;
  flex-shrink: 0;
}

.dropdown-icon {
  margin-left: auto;
  font-size: 10px;
  transition: transform var(--transition-base);
  color: currentColor;
}

.dropdown-icon.open {
  transform: rotate(180deg);
}

.nav-submenu {
  padding-left: 0;
  margin-top: 4px;
}

.nav-subitem {
  padding: 10px 20px 10px 52px;
  cursor: pointer;
  color: var(--gray-600);
  font-size: 13px;
  font-weight: 400;
  transition: all var(--transition-base);
  border-radius: 6px;
  margin: 2px 8px;
  position: relative;
}

.nav-subitem::before {
  content: '';
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--gray-400);
  transition: all var(--transition-base);
}

.nav-subitem:hover {
  color: var(--primary-600);
  background: rgba(249, 115, 22, 0.06);
}

.nav-subitem:hover::before {
  background: var(--primary-500);
}

.nav-subitem.active {
  color: var(--primary-700);
  font-weight: 600;
  background: rgba(249, 115, 22, 0.1);
}

.nav-subitem.active::before {
  background: var(--primary-600);
  transform: translateY(-50%) scaleX(1.2);
}

/* Main Content */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Summary Card */
.summary-card {
  background: var(--gray-0);
  backdrop-filter: blur(12px);
  border-radius: var(--border-radius-xl);
  padding: 32px;
  box-shadow: var(--shadow-md);
  border: var(--border-light);
  transition: all var(--transition-base);
}

.summary-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
  flex-wrap: wrap;
  gap: 12px;
}

.summary-title {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--gray-900);
  margin: 0;
}

.summary-period {
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  color: var(--primary-700);
  background: var(--primary-50);
  border: var(--border-light);
  border-radius: var(--border-radius-full);
  padding: 6px 14px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.summary-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 16px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-radius: var(--border-radius-lg);
  background: var(--gray-50);
  box-shadow: var(--shadow-sm);
  border: var(--border-light);
  transition: all var(--transition-base);
  cursor: default;
}

.stat-item:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
  background: var(--gray-0);
  border-color: var(--primary-200);
}

.stat-desc {
  font-size: var(--text-xs);
  color: var(--gray-500);
  font-weight: var(--font-medium);
  margin-top: 4px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.stat-icon {
  width: 52px;
  height: 52px;
  border-radius: var(--border-radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  flex-shrink: 0;
}

.stat-icon.days {
  background: linear-gradient(135deg, var(--primary-200) 0%, var(--primary-300) 100%);
}

.stat-icon.events {
  background: linear-gradient(135deg, var(--primary-400) 0%, var(--primary-500) 100%);
}

.stat-icon.points {
  background: linear-gradient(135deg, var(--primary-100) 0%, var(--primary-200) 100%);
}

.stat-icon.badges {
  background: linear-gradient(135deg, var(--primary-100) 0%, var(--primary-400) 100%);
}

.stat-icon.campaigns {
  background: linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%);
}

.stat-value {
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  color: var(--gray-900);
  line-height: 1.2;
}

/* Sections */
.campaign-section,
.opportunities-section {
  background: var(--gray-0);
  border-radius: var(--border-radius-xl);
  padding: 32px;
  box-shadow: var(--shadow-md);
  border: var(--border-light);
  transition: all var(--transition-base);
}

.section-title {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--gray-900);
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 60px 20px;
}

.empty-icon {
  font-size: 56px;
  margin-bottom: 16px;
  opacity: 0.6;
}

.empty-text {
  color: var(--gray-500);
  font-size: var(--text-base);
  margin: 0;
}

/* Opportunities Grid */
.opportunities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
}

.opportunity-card {
  background: var(--gray-0);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-base);
  border: var(--border-light);
  display: flex;
  flex-direction: column;
}

.opportunity-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary-200);
}

.opportunity-image {
  position: relative;
  height: 200px;
  overflow: hidden;
  background: linear-gradient(135deg, var(--primary-100) 0%, var(--gray-200) 100%);
}

.opportunity-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-base);
}

.opportunity-card:hover .opportunity-image img {
  transform: scale(1.08);
}

.opportunity-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%);
  color: white;
  padding: 6px 16px;
  border-radius: var(--border-radius-full);
  font-size: var(--text-xs);
  font-weight: var(--font-bold);
  letter-spacing: 0.05em;
  box-shadow: var(--shadow-orange);
  text-transform: uppercase;
}

.opportunity-content {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.opportunity-title {
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  color: var(--gray-900);
  margin: 0;
  line-height: 1.5;
  min-height: 44px;
}

.opportunity-meta {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--gray-600);
  font-size: var(--text-sm);
  margin: 0;
}

.meta-icon {
  font-size: 14px;
  flex-shrink: 0;
}

.meta-text {
  line-height: 1.4;
}

.opportunity-tag {
  margin-bottom: 12px;
}

.tag {
  display: inline-block;
  background: linear-gradient(135deg, var(--primary-400) 0%, var(--primary-500) 100%);
  color: white;
  padding: 6px 12px;
  border-radius: var(--border-radius-full);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  transition: all var(--transition-base);
}

.tag:hover {
  transform: translateY(-2px);
}

.opportunity-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: var(--border-light);
  margin-top: auto;
}

.points {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--gray-700);
  font-weight: var(--font-semibold);
}

.heart-icon {
  font-size: 18px;
}

.points-value {
  font-size: var(--text-sm);
  line-height: 1.2;
}

.btn-daftar {
  background: linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%);
  color: white;
  border: none;
  padding: 10px 22px;
  border-radius: var(--border-radius-full);
  font-weight: var(--font-semibold);
  font-size: var(--text-sm);
  cursor: pointer;
  transition: all var(--transition-base);
  box-shadow: var(--shadow-orange);
  white-space: nowrap;
}

.btn-daftar:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  background: linear-gradient(135deg, var(--primary-600) 0%, var(--primary-700) 100%);
}

.btn-daftar:active {
  transform: translateY(0);
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 24px;
}

.pagination-btn {
  width: 40px;
  height: 40px;
  border: 2px solid var(--primary-200);
  background: white;
  border-radius: var(--border-radius-md);
  cursor: pointer;
  font-size: 18px;
  color: var(--primary-500);
  transition: all var(--transition-base);
  font-weight: var(--font-bold);
  display: flex;
  align-items: center;
  justify-content: center;
}

.pagination-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%);
  color: white;
  border-color: var(--primary-600);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.pagination-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.pagination-btn:active:not(:disabled) {
  transform: translateY(0);
}

/* Responsive */
@media (max-width: 1200px) {
  .dashboard-layout {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    position: static;
  }

  .opportunities-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
}

@media (max-width: 768px) {
  .dashboard-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    padding: 20px;
  }

  .header-right {
    width: 100%;
    justify-content: space-between;
  }

  .header-user-chip {
    flex: 1;
  }

  .dashboard-layout {
    padding: 16px;
  }

  .summary-stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .opportunities-grid {
    grid-template-columns: 1fr;
  }

  .summary-card,
  .campaign-section,
  .opportunities-section {
    padding: 20px;
  }
}

/* ===== APPLICATION MODAL (Matching OpportunitiesPage) ===== */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal-content.application-modal {
  background: var(--gray-0);
  border-radius: var(--border-radius-xl);
  max-width: 500px;
  width: 100%;
  padding: 32px;
  position: relative;
  box-shadow: var(--shadow-xl);
  animation: modalPop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  border: var(--border-light);
}

@keyframes modalPop {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }

  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  background: var(--gray-100);
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gray-500);
  transition: all var(--transition-base);
}

.modal-close:hover {
  background: var(--error-50);
  color: var(--error-600);
}

.modal-title {
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  color: var(--gray-900);
  margin: 0 0 8px 0;
}

.modal-subtitle {
  font-size: var(--text-base);
  color: var(--gray-600);
  margin-bottom: 28px;
  line-height: 1.6;
  margin: 0;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: left;
  margin-bottom: 28px;
}

.form-group label {
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  color: var(--gray-700);
}

.required {
  color: var(--error-600);
  margin-left: 2px;
}

.form-textarea {
  padding: 12px 16px;
  border: 2px solid var(--gray-200);
  border-radius: var(--border-radius-lg);
  font-size: var(--text-base);
  font-family: inherit;
  outline: none;
  transition: all var(--transition-base);
  resize: vertical;
  min-height: 120px;
  background: var(--gray-50);
  color: var(--gray-900);
}

.form-textarea:focus {
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px var(--primary-50);
}

.modal-actions-row {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 24px;
  border-top: var(--border-light);
  margin-top: 28px;
}

.btn-cancel {
  padding: 10px 24px;
  background: var(--gray-0);
  border: 2px solid var(--gray-200);
  border-radius: var(--border-radius-lg);
  font-weight: var(--font-semibold);
  font-size: var(--text-sm);
  color: var(--gray-700);
  cursor: pointer;
  transition: all var(--transition-base);
}

.btn-cancel:hover {
  background: var(--gray-50);
  border-color: var(--gray-300);
  color: var(--gray-900);
}

.btn-submit {
  flex: 1;
  padding: 12px 24px;
  background: linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%);
  color: white;
  border: none;
  border-radius: var(--border-radius-lg);
  font-weight: var(--font-semibold);
  font-size: var(--text-sm);
  cursor: pointer;
  transition: all var(--transition-base);
  box-shadow: var(--shadow-orange);
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.btn-done {
  width: 100%;
  margin-top: 24px;
}

/* Success State styling */
.modal-success {
  text-align: center;
  padding: 20px 0;
}

.success-icon {
  font-size: 64px;
  margin-bottom: 20px;
  animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  display: inline-block;
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }

  50% {
    opacity: 1;
    transform: scale(1.15);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.success-title {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--gray-900);
  margin-bottom: 12px;
  margin: 0;
}

.success-desc {
  font-size: var(--text-base);
  color: var(--gray-600);
  margin-bottom: 12px;
  line-height: 1.6;
  margin: 0 0 12px 0;
}

.success-campaign-name {
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  color: var(--primary-700);
  padding: 12px 16px;
  background: var(--primary-50);
  border-radius: var(--border-radius-lg);
  margin-bottom: 24px;
  border-left: 4px solid var(--primary-500);
  text-align: left;
}

/* Confetti implementation */
.confetti-wrapper {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
}

.confetti-piece {
  position: absolute;
  width: 10px;
  height: 10px;
  top: -20px;
  left: calc(var(--i) * 8.5%);
  background: hsl(calc(var(--i) * 30), 80%, 60%);
  animation: confettiFall calc(1s + var(--i) * 0.1s) ease-in forwards;
  animation-delay: calc(var(--i) * 0.05s);
}

@keyframes confettiFall {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }

  100% {
    transform: translateY(420px) rotate(540deg);
    opacity: 0;
  }
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

/* Loading Dots */
.loading-dots span {
  animation: blink 1.4s infinite cubic-bezier(0.2, 0.8, 0.2, 1);
}

.loading-dots span:nth-child(2) {
  animation-delay: 0.2s;
}

.loading-dots span:nth-child(3) {
  animation-delay: 0.4s;
}
</style>
