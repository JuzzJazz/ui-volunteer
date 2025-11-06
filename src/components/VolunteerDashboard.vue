<template>
  <div class="dashboard-container">
    <!-- Header -->
    <div class="dashboard-header">
      <div class="header-left">
        <h1 class="dashboard-title">Akun Relawan Saya</h1>
      </div>
      <div class="header-right">
        <button class="btn-create-campaign">BUAT CAMPAIGN</button>
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
              <div class="nav-subitem" :class="{ active: activeSection === 'profil-akun' }" @click="activeSection = 'profil-akun'">
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
        
        <!-- Summary Card -->
        <div v-else-if="activeSection === 'ringkasan'" class="summary-card">
          <h2 class="summary-title">Cris Ringkasan Relawan</h2>
          <div class="summary-stats">
            <div class="stat-item">
              <div class="stat-icon days">⏱️</div>
              <div class="stat-info">
                <div class="stat-value">0 Hari</div>
              </div>
            </div>
            <div class="stat-item">
              <div class="stat-icon events">🎪</div>
              <div class="stat-info">
                <div class="stat-value">1 Acara</div>
              </div>
            </div>
            <div class="stat-item">
              <div class="stat-icon points">❤️</div>
              <div class="stat-info">
                <div class="stat-value">0 Poin</div>
              </div>
            </div>
            <div class="stat-item">
              <div class="stat-icon badges">🏆</div>
              <div class="stat-info">
                <div class="stat-value">0 Badge</div>
              </div>
            </div>
            <div class="stat-item">
              <div class="stat-icon campaigns">📢</div>
              <div class="stat-info">
                <div class="stat-value">0 Kampanye</div>
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
                    <span class="heart-icon">❤️</span>
                    <span class="points-value">{{ opportunity.points }} Poin</span>
                  </div>
                  <button class="btn-daftar">Daftar</button>
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

const activeSection = ref('ringkasan')
const currentPage = ref(1)

const expandedSections = reactive({
  profil: true,
  perjalanan: false,
  'ayo-terlibat': false
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
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  padding: 24px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 20px rgba(249, 115, 22, 0.3);
}

.dashboard-title {
  color: white;
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.btn-create-campaign {
  background: white;
  color: #f97316;
  border: 2px solid white;
  padding: 12px 28px;
  border-radius: 25px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
}

.btn-create-campaign:hover {
  transform: translateY(-2px);
  background: #fff7ed;
  box-shadow: 0 6px 25px rgba(255, 255, 255, 0.5);
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
  padding: 24px 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  height: fit-content;
  position: sticky;
  top: 24px;
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
  padding: 14px 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #4a5568;
  font-size: 15px;
  font-weight: 500;
}

.nav-item:hover,
.nav-header:hover {
  background: linear-gradient(90deg, rgba(249, 115, 22, 0.1) 0%, transparent 100%);
  color: #f97316;
}

.nav-item.active {
  background: linear-gradient(90deg, rgba(249, 115, 22, 0.15) 0%, transparent 100%);
  color: #f97316;
  border-left: 4px solid #f97316;
  font-weight: 600;
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
  padding: 12px 24px;
  cursor: pointer;
  color: #718096;
  font-size: 14px;
  transition: all 0.3s ease;
}

.nav-subitem:hover {
  color: #f97316;
  background: rgba(249, 115, 22, 0.05);
}

.nav-subitem.active {
  color: #f97316;
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
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.summary-title {
  font-size: 22px;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 24px;
}

.summary-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  border-radius: 12px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  transition: all 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
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
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.section-title {
  font-size: 22px;
  font-weight: 700;
  color: #2d3748;
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
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
}

.opportunity-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
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
    gap: 16px;
    padding: 20px;
  }

  .dashboard-layout {
    padding: 16px;
  }

  .summary-stats {
    grid-template-columns: 1fr;
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
</style>
