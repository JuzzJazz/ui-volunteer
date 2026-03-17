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
              <div class="nav-subitem" @click="activeSection = 'admin-pov'">
                Validasi Campaign
              </div>
              <div class="nav-subitem" @click="activeSection = 'kelola-rewards'">
                Kelola Rewards
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

        <!-- Admin Validation Page -->
        <AdminValidationPage v-else-if="activeSection === 'admin-pov'" />

        <!-- Admin Rewards Page -->
        <AdminRewardsPage v-else-if="activeSection === 'kelola-rewards'" />

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
import AdminValidationPage from './AdminValidationPage.vue'
import AdminRewardsPage from './AdminRewardsPage.vue'

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
  transition: all 0.2s ease;
  color: #4b5568;
  font-size: 14px;
  font-weight: 500;
  border-radius: 8px;
  margin: 0 8px;
}

.nav-item:hover,
.nav-header:hover {
  background: var(--gray-50);
  color: var(--primary-600);
}

.nav-item.active {
  background: var(--primary-50);
  color: var(--primary-600);
  border-left: 3px solid var(--primary-500);
  font-weight: 600;
}

.admin-section {
  margin-top: 16px;
  border-top: 2px dashed #e2e8f0;
  padding-top: 16px;
}

.admin-section .nav-item {
  color: #4f46e5;
}

.admin-section .nav-item:hover {
  background: linear-gradient(90deg, rgba(79, 70, 229, 0.1) 0%, transparent 100%);
  color: #4338ca;
}

.admin-section .nav-item.active {
  background: linear-gradient(90deg, rgba(79, 70, 229, 0.15) 0%, transparent 100%);
  color: #4338ca;
  border-left: 4px solid #4f46e5;
}

.nav-icon {
  font-size: 20px;
  width: 24px;
  text-align: center;
}

.dropdown-icon {
  margin-left: auto;
  font-size: 10px;
  transition: transform 0.3s ease;
}

.dropdown-icon.open {
  transform: rotate(180deg);
}

.nav-submenu {
  padding-left: 56px;
}

.nav-subitem {
  padding: 10px 24px;
  cursor: pointer;
  color: var(--gray-500);
  font-size: 14px;
  transition: all 0.2s ease-in-out;
}

.nav-subitem:hover {
  color: var(--primary-600);
  background: var(--gray-50);
}

.nav-subitem.active {
  color: var(--primary-600);
  font-weight: 600;
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
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  padding: 32px;
  box-shadow: var(--shadow-xl);
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.summary-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
  flex-wrap: wrap;
  gap: 8px;
}

.summary-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--gray-800);
}

.summary-period {
  font-size: 12px;
  font-weight: 600;
  color: #f97316;
  background: #fff7ed;
  border: 1px solid #fed7aa;
  border-radius: 20px;
  padding: 4px 14px;
}

.summary-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 16px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px 16px;
  border-radius: 14px;
  background: white;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--gray-100);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  cursor: default;
}

.stat-item:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: var(--shadow-md);
  border-color: var(--primary-100);
}

.stat-desc {
  font-size: 11px;
  color: var(--gray-500);
  font-weight: 500;
  margin-top: 2px;
  text-transform: uppercase;
  letter-spacing: 0.4px;
}

.stat-icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
}

.stat-icon.days {
  background: linear-gradient(135deg, #fed7aa 0%, #fdba74 100%);
}

.stat-icon.events {
  background: linear-gradient(135deg, #fb923c 0%, #f97316 100%);
}

.stat-icon.points {
  background: linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%);
}

.stat-icon.badges {
  background: linear-gradient(135deg, #ffedd5 0%, #fb923c 100%);
}

.stat-icon.campaigns {
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
}

.stat-value {
  font-size: 20px;
  font-weight: 700;
  color: #2d3748;
}

/* Sections */
.campaign-section,
.opportunities-section {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  padding: 32px;
  box-shadow: var(--shadow-lg);
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.section-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--gray-800);
  margin-bottom: 24px;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 60px 20px;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-text {
  color: #718096;
  font-size: 16px;
}

/* Opportunities Grid */
.opportunities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.opportunity-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;
  border: 1px solid var(--gray-100);
}

.opportunity-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary-100);
}

.opportunity-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.opportunity-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.opportunity-card:hover .opportunity-image img {
  transform: scale(1.05);
}

.opportunity-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  color: white;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.4);
}

.opportunity-content {
  padding: 20px;
}

.opportunity-title {
  font-size: 16px;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 12px;
  line-height: 1.4;
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
  color: #718096;
  font-size: 13px;
}

.meta-icon {
  font-size: 14px;
}

.opportunity-tag {
  margin-bottom: 16px;
}

.tag {
  display: inline-block;
  background: linear-gradient(135deg, #fb923c 0%, #f97316 100%);
  color: white;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.3px;
}

.opportunity-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #e2e8f0;
}

.points {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #2d3748;
  font-weight: 600;
}

.heart-icon {
  font-size: 18px;
}

.points-value {
  font-size: 15px;
}

.btn-daftar {
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
}

.btn-daftar:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(249, 115, 22, 0.5);
  background: linear-gradient(135deg, #ea580c 0%, #dc2626 100%);
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  gap: 12px;
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
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal-content.application-modal {
  background: white;
  border-radius: 20px;
  max-width: 500px;
  width: 100%;
  padding: 32px;
  position: relative;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  animation: modalPop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
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
  background: #f3f4f6;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  transition: all 0.2s;
}

.modal-close:hover {
  background: #fee2e2;
  color: #dc2626;
}

.modal-title {
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 8px 0;
}

.modal-subtitle {
  font-size: 15px;
  color: #4b5563;
  margin-bottom: 28px;
  line-height: 1.6;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: left;
  margin-bottom: 28px;
}

.form-group label {
  font-size: 15px;
  font-weight: 600;
  color: #374151;
}

.required {
  color: #ef4444;
  margin-left: 2px;
}

.form-textarea {
  padding: 16px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 15px;
  font-family: inherit;
  outline: none;
  transition: all 0.3s ease;
  resize: vertical;
  min-height: 120px;
  background: #f9fafb;
}

.form-textarea:focus {
  border-color: #f97316;
  box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.1);
}

.modal-actions-row {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 20px;
  border-top: 1px solid #e5e7eb;
}

.btn-cancel {
  padding: 10px 20px;
  background: white;
  border: 1.5px solid #e5e7eb;
  border-radius: 10px;
  font-weight: 600;
  font-size: 14px;
  color: #4b5563;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-cancel:hover {
  background: #f9fafb;
  border-color: #d1d5db;
}

.btn-submit {
  flex: 1;
  padding: 12px 20px;
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(249, 115, 22, 0.4);
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
  margin-bottom: 16px;
  animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes bounceIn {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}

.success-title {
  font-size: 24px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 8px;
}

.success-desc {
  font-size: 15px;
  color: #4b5563;
  margin-bottom: 12px;
}

.success-campaign-name {
  font-size: 16px;
  font-weight: 700;
  color: #f97316;
  padding: 12px;
  background: #fff7ed;
  border-radius: 8px;
  margin-bottom: 24px;
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
