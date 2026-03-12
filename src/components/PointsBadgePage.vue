<template>
  <div class="points-badge-container">
    <div class="page-header">
      <h1 class="page-title">Poin & Badge</h1>
    </div>

    <div class="content-wrapper">
      <!-- Poin Section -->
      <div class="section-card poin-section">
        <div class="poin-header">
          <h2 class="section-title">
            <span class="title-icon">💰</span>
            Poin Saya
          </h2>
          <div class="poin-badge">
            <span class="badge-label">Total Poin</span>
            <span class="badge-value">{{ currentPoin }}</span>
          </div>
        </div>
        
        <div class="poin-progress">
          <div class="progress-info">
            <span class="progress-current">{{ currentPoin }} Poin</span>
            <span class="progress-target">Target: {{ maxPoin }} Poin</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: poinPercentage + '%' }">
              <div class="progress-shine"></div>
            </div>
            <span class="progress-percentage">{{ Math.round(poinPercentage) }}%</span>
          </div>
        </div>

        <div class="poin-tips">
          <span class="tips-icon">💡</span>
          <span class="tips-text">Kumpulkan lebih banyak poin dengan mengikuti campaign volunteer!</span>
        </div>
      </div>

      <!-- Badge Section -->
      <div class="section-card badge-section">
        <h2 class="section-title">
          <span class="title-icon">🏆</span>
          Koleksi Badge
        </h2>
        
        <div class="badges-grid">
          <div 
            v-for="badge in badges" 
            :key="badge.id"
            class="badge-item"
            :class="{ locked: badge.count === 0 }"
          >
            <div class="badge-image-wrapper">
              <div class="badge-glow"></div>
              <img :src="badge.image" :alt="badge.name" class="badge-image" />
              <div v-if="badge.count === 0" class="lock-overlay">
                <span class="lock-icon">🔒</span>
              </div>
              <div v-else class="unlock-badge">
                <span class="unlock-icon">✓</span>
              </div>
            </div>
            <div class="badge-info">
              <div class="badge-name">{{ badge.name }}</div>
              <div class="badge-count">{{ badge.count }}</div>
            </div>
          </div>
        </div>

        <div class="total-badge">
          <div class="total-content">
            <span class="total-icon">🎯</span>
            <div class="total-info">
              <span class="total-label">Total Badge Terkumpul</span>
              <span class="total-value">{{ totalBadges }} Badge</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Pemberian Section -->
      <div class="section-card pemberian-section">
        <h2 class="section-title">
          <span class="title-icon">🎁</span>
          Hadiah & Penghargaan
        </h2>
        
        <div class="reward-tabs">
          <button 
            class="tab-btn" 
            :class="{ active: currentTab === 'all' }"
            @click="currentTab = 'all'"
          >
            Semua
          </button>
          <button 
            class="tab-btn" 
            :class="{ active: currentTab === 'liburan' }"
            @click="currentTab = 'liburan'"
          >
            ✈️ Liburan & Trip
          </button>
          <button 
            class="tab-btn" 
            :class="{ active: currentTab === 'merchandise' }"
            @click="currentTab = 'merchandise'"
          >
            👕 Merchandise
          </button>
        </div>

        <div v-if="filteredRewards.length === 0" class="empty-state">
          <div class="empty-icon">🎁</div>
          <h3 class="empty-title">Belum Ada Hadiah di Kategori Ini</h3>
          <p class="empty-text">Kumpulkan poin dan badge untuk mendapatkan hadiah menarik!</p>
        </div>

        <div v-else class="rewards-grid">
          <div 
            v-for="reward in filteredRewards" 
            :key="reward.id"
            class="reward-card"
            @click="handleRewardClick(reward)"
          >
            <!-- Image -->
            <div class="reward-image">
              <img :src="reward.image" :alt="reward.title" />
              <div class="image-poin-pill">{{ reward.points }} Poin</div>
              <div class="image-star">⭐</div>
            </div>

            <!-- Content -->
            <div class="reward-content">
              <span class="reward-category-tag" :class="reward.category">
                {{ reward.category === 'liburan' ? '✈️ Liburan' : '👕 Merchandise' }}
              </span>
              <h3 class="reward-title">{{ reward.title }}</h3>

              <!-- Requirement chips -->
              <div class="reward-chips">
                <span class="chip chip-poin" :class="{ 'chip-ok': currentPoin >= reward.points }">
                  ❤️ {{ reward.points }} Poin
                </span>
                <span class="chip chip-badge" :class="{ 'chip-ok': totalBadges >= reward.badges }">
                  🏆 {{ reward.badges }} Badge
                </span>
              </div>

              <!-- Footer -->
              <div class="reward-footer">
                <span class="expiry-text">🗓️ {{ reward.expiryDate }}</span>
                <button 
                  v-if="reward.status === 'active'"
                  class="btn-tukar" 
                  @click="handleRewardClick(reward)"
                >
                  🎁 Tukar
                </button>
                <span v-else class="badge-expired">Berakhir</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Redemption Confirmation Modal -->
  <Transition name="modal-fade">
    <div v-if="confirmModal.show" class="modal-backdrop" @click.self="closeConfirmModal">
      <div class="confirm-modal">

        <!-- Step 1: Confirm -->
        <div v-if="!confirmModal.success" class="modal-step">
          <button class="modal-close-btn" @click="closeConfirmModal">✕</button>

          <div class="modal-reward-img">
            <img :src="confirmModal.reward?.image" :alt="confirmModal.reward?.title" />
            <div class="modal-img-overlay"></div>
            <div class="modal-poin-pill">🎁 {{ confirmModal.reward?.points }} Poin</div>
          </div>

          <div class="modal-body">
            <div class="modal-icon-badge">🎁</div>
            <h3 class="modal-title">Konfirmasi Penukaran</h3>
            <p class="modal-reward-name">{{ confirmModal.reward?.title }}</p>

            <div class="modal-summary">
              <div class="summary-row">
                <span class="summary-label">Poin Kamu</span>
                <span class="summary-value current">{{ currentPoin }} Poin</span>
              </div>
              <div class="summary-row">
                <span class="summary-label">Biaya Penukaran</span>
                <span class="summary-value cost">- {{ confirmModal.reward?.points }} Poin</span>
              </div>
              <div class="summary-divider"></div>
              <div class="summary-row">
                <span class="summary-label">Sisa Poin</span>
                <span class="summary-value remain">{{ currentPoin - (confirmModal.reward?.points || 0) }} Poin</span>
              </div>
            </div>

            <p class="modal-hint">⚠️ Penukaran tidak dapat dibatalkan setelah dikonfirmasi.</p>

            <div class="modal-actions">
              <button class="btn-batal" @click="closeConfirmModal">Batal</button>
              <button class="btn-konfirmasi" @click="confirmRedemption" :disabled="confirmModal.loading">
                <span v-if="!confirmModal.loading">✅ Ya, Tukar Sekarang!</span>
                <span v-else class="loading-dots">Memproses<span>.</span><span>.</span><span>.</span></span>
              </button>
            </div>
          </div>
        </div>

        <!-- Step 2: Success -->
        <div v-else class="modal-step modal-success">
          <div class="confetti-wrapper">
            <span v-for="i in 12" :key="i" class="confetti-piece" :style="{ '--i': i }"></span>
          </div>
          <div class="success-icon">🎉</div>
          <h3 class="success-title">Penukaran Berhasil!</h3>
          <p class="success-desc">Kamu berhasil menukarkan <strong>{{ confirmModal.reward?.points }} Poin</strong> untuk:</p>
          <p class="success-reward-name">{{ confirmModal.reward?.title }}</p>
          <div class="success-points-badge">Sisa Poin: {{ currentPoin }} ✨</div>
          <button class="btn-konfirmasi" style="margin-top: 24px;" @click="closeConfirmModal">Tutup</button>
        </div>

      </div>
    </div>
  </Transition>

  <!-- ===== TRAVEL DETAIL MODAL ===== -->
  <Transition name="modal-fade">
    <div v-if="travelModal.show" class="modal-backdrop" @click.self="closeTravelModal">
      <div class="travel-modal confirm-modal">
        
        <div v-if="!travelModal.success" class="modal-step">
          <button class="modal-close-btn" @click="closeTravelModal">✕</button>

          <div class="modal-reward-img travel-img">
            <img :src="travelModal.reward?.image" :alt="travelModal.reward?.title" />
            <div class="modal-img-overlay"></div>
            <div class="travel-banner-title">
              <h3>{{ travelModal.reward?.title }}</h3>
              <p>🗓️ Berakhir: {{ travelModal.reward?.expiryDate }}</p>
            </div>
          </div>

          <div class="travel-body">
            <div class="travel-desc-box">
              <p>{{ travelModal.reward?.description }}</p>
            </div>

            <div class="claim-items-container">
              <h4 class="claim-section-title">Pilih Item untuk Diklaim</h4>
              
              <div 
                v-for="(item, index) in travelModal.reward?.claimableItems" 
                :key="index"
                class="claim-item"
                :class="{ 'is-selected': isItemSelected(item), 'is-disabled': !canAffordItem(item) }"
                @click="toggleItemSelection(item)"
              >
                <div class="item-checkbox">
                  <div class="checkbox-box" :class="{ checked: isItemSelected(item) }">
                    <span v-if="isItemSelected(item)">✓</span>
                  </div>
                </div>
                <div class="item-info">
                  <span class="item-name">{{ item.name }}</span>
                </div>
                <div class="item-cost">
                  <span>{{ item.points }} Poin</span>
                </div>
              </div>
            </div>

            <div class="travel-summary-bar">
              <div class="bar-left">
                <span class="bar-label">Total Poin Terpilih</span>
                <span class="bar-value" :class="{ 'error': selectedTotalPoints > currentPoin }">
                  {{ selectedTotalPoints }} Poin
                </span>
                <span class="bar-balance">(Saldo: {{ currentPoin }})</span>
              </div>
            </div>

            <div class="modal-actions travel-actions">
              <button 
                class="btn-batal" 
                @click="claimAllTravel"
                :disabled="!canAffordAll || travelModal.loading"
              >
                Klaim Semua Item
              </button>
              <button 
                class="btn-konfirmasi" 
                @click="claimSelectedTravel" 
                :disabled="selectedItems.length === 0 || selectedTotalPoints > currentPoin || travelModal.loading"
              >
                <span v-if="!travelModal.loading">🚀 Klaim Terpilih</span>
                <span v-else class="loading-dots">Memproses<span>.</span><span>.</span><span>.</span></span>
              </button>
            </div>
          </div>
        </div>

        <!-- Travel Success -->
        <div v-else class="modal-step modal-success travel-success">
          <div class="confetti-wrapper">
            <span v-for="i in 16" :key="i" class="confetti-piece" :style="{ '--i': i }"></span>
          </div>
          <div class="success-icon">✈️</div>
          <h3 class="success-title">Yey! Pembelian Tiket Berhasil</h3>
          <p class="success-desc">Kamu telah berhasil mengklaim item perjalanan berikut:</p>
          
          <ul class="success-claimed-list">
            <li v-for="item in travelModal.claimedItems" :key="item.name">
              ✓ {{ item.name }} ({{ item.points }} Poin)
            </li>
          </ul>

          <div class="success-points-badge">Sisa Poin: {{ currentPoin }} ✨</div>
          <button class="btn-konfirmasi" style="margin-top: 24px;" @click="closeTravelModal">Selesai</button>
        </div>

      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentTab = ref('all')
const currentPoin = ref(1200) // Updated for better demo
const maxPoin = ref(1500)

const poinPercentage = computed(() => {
  return (currentPoin.value / maxPoin.value) * 100
})

const badges = ref([
  {
    id: 1,
    name: 'Health',
    count: 0,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=150&h=150&fit=crop'
  },
  {
    id: 2,
    name: 'Child Protection',
    count: 0,
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=150&h=150&fit=crop'
  },
  {
    id: 3,
    name: 'Economy',
    count: 0,
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=150&h=150&fit=crop'
  },
  {
    id: 4,
    name: 'Education',
    count: 0,
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=150&h=150&fit=crop'
  },
  {
    id: 5,
    name: 'Emergency Response',
    count: 0,
    image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=150&h=150&fit=crop'
  },
  {
    id: 6,
    name: 'Support Office',
    count: 0,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=150&h=150&fit=crop'
  }
])

const totalBadges = computed(() => {
  return badges.value.reduce((sum, badge) => sum + badge.count, 0)
})

// Sample rewards data with categories
const rewards = ref([
  {
    id: 1,
    category: 'liburan',
    title: 'Ayo! Kumpulkan poinmu hingga 1.500 untuk mendapatkan GRATIS trip volunteer ke Bengkayang, Kalimantan Barat!',
    description: 'Kamu akan mendapatkan pengalaman tinggal bersama masyarakat, berkegiatan dengan anak-anak dan masyarakat, jalan-jalan ke tempat wisata menarik sekitar Bengkayang.',
    points: 1500,
    badges: 20,
    expiryDate: '2025-12-31',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=300&fit=crop',
    claimableItems: [
      { name: 'Tiket Pesawat (PP)', points: 800 },
      { name: 'Penginapan (3 Malam)', points: 500 },
      { name: 'Konsumsi & Akomodasi Lokal', points: 200 }
    ]
  },
  {
    id: 2,
    category: 'liburan',
    title: 'Trip Volunteer Eksklusif: Mengajar di Pulau Komodo',
    description: 'Jadilah bagian dari perubahan dengan membagikan ilmu di sekolah-sekolah lokal di Pulau Komodo, sekaligus menikmati keindahan alamnya.',
    points: 2500,
    badges: 30,
    expiryDate: '2026-06-30',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=400&h=300&fit=crop',
    claimableItems: [
      { name: 'Tiket Pesawat (PP)', points: 1200 },
      { name: 'Penginapan Kapal (4 Malam)', points: 900 },
      { name: 'Peralatan Mengajar & Konsumsi', points: 400 }
    ]
  },
  {
    id: 3,
    category: 'merchandise',
    title: 'T-Shirt Eksklusif Relawan Wahana Visi',
    description: 'Tukarkan poinmu dengan T-Shirt eksklusif berbahan cotton combed 30s premium. Tunjukkan kebanggaanmu sebagai relawan!',
    points: 500,
    badges: 5,
    expiryDate: '2025-10-15',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop'
  },
  {
    id: 4,
    category: 'merchandise',
    title: 'Tumbler Stainless Steel Ramah Lingkungan',
    description: 'Kurangi penggunaan plastik dengan tumbler premium ini. Menjaga suhu minuman hingga 12 jam. Cocok untuk menemanimu saat kegiatan volunteer.',
    points: 800,
    badges: 10,
    expiryDate: '2025-11-20',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=300&fit=crop'
  }
])

const filteredRewards = computed(() => {
  if (currentTab.value === 'all') return rewards.value
  return rewards.value.filter(r => r.category === currentTab.value)
})

// --- Confirmation Modal ---
const confirmModal = ref({
  show: false,
  reward: null,
  loading: false,
  success: false
})

const openConfirmModal = (reward) => {
  confirmModal.value = { show: true, reward, loading: false, success: false }
}

const closeConfirmModal = () => {
  confirmModal.value.show = false
}

const confirmRedemption = async () => {
  confirmModal.value.loading = true
  await new Promise(resolve => setTimeout(resolve, 1400))
  currentPoin.value -= confirmModal.value.reward.points
  confirmModal.value.loading = false
  confirmModal.value.success = true
}

// --- Travel Detail Modal ---
const travelModal = ref({
  show: false,
  reward: null,
  loading: false,
  success: false,
  claimedItems: []
})

const selectedItems = ref([])

const handleRewardClick = (reward) => {
  if (reward.category === 'liburan') {
    openTravelModal(reward)
  } else {
    // Check points for merchandise here since we removed disabled form button
    if (currentPoin.value >= reward.points && totalBadges.value >= reward.badges) {
      openConfirmModal(reward)
    } else {
      alert('Poin atau badge belum mencukupi untuk item ini.')
    }
  }
}

const openTravelModal = (reward) => {
  travelModal.value = { show: true, reward, loading: false, success: false, claimedItems: [] }
  selectedItems.value = []
}

const closeTravelModal = () => {
  travelModal.value.show = false
  selectedItems.value = []
}

const isItemSelected = (item) => {
  return selectedItems.value.some(i => i.name === item.name)
}

const canAffordItem = (item) => {
  const costWithoutItem = isItemSelected(item) ? selectedTotalPoints.value - item.points : selectedTotalPoints.value;
  return (costWithoutItem + item.points) <= currentPoin.value;
}

const toggleItemSelection = (item) => {
  if (isItemSelected(item)) {
    selectedItems.value = selectedItems.value.filter(i => i.name !== item.name)
  } else {
    if (canAffordItem(item)) {
      selectedItems.value.push(item)
    }
  }
}

const selectedTotalPoints = computed(() => {
  return selectedItems.value.reduce((sum, item) => sum + item.points, 0)
})

const canAffordAll = computed(() => {
  if (!travelModal.value.reward) return false;
  return currentPoin.value >= travelModal.value.reward.points;
})

const claimAllTravel = () => {
  selectedItems.value = [...travelModal.value.reward.claimableItems]
  claimSelectedTravel()
}

const claimSelectedTravel = async () => {
  if (selectedItems.value.length === 0) return;
  
  travelModal.value.loading = true
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  currentPoin.value -= selectedTotalPoints.value
  travelModal.value.claimedItems = [...selectedItems.value]
  
  travelModal.value.loading = false
  travelModal.value.success = true
}
</script>

<style scoped>
.points-badge-container {
  width: 100%;
}

.page-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 28px;
  padding: 20px 24px;
  background: rgba(255,255,255,0.8);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.5);
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
}

.page-title {
  font-size: 22px;
  font-weight: 700;
  color: #111827;
  margin: 0;
  letter-spacing: -0.5px;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Section Card */
.section-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  animation: slideIn 0.5s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.section-title {
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 24px 0;
  display: flex;
  align-items: center;
  gap: 12px;
}

.title-icon {
  font-size: 28px;
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

/* Poin Section */
.poin-section {
  background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);
  border: 2px solid #fed7aa;
  position: relative;
  overflow: hidden;
}

.poin-section::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(249, 115, 22, 0.1) 0%, transparent 70%);
  animation: rotate 20s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.poin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  position: relative;
  z-index: 1;
}

.poin-badge {
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  padding: 12px 24px;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 16px rgba(249, 115, 22, 0.4);
  animation: pulse-glow 2s ease-in-out infinite;
}

@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 4px 16px rgba(249, 115, 22, 0.4); }
  50% { box-shadow: 0 8px 24px rgba(249, 115, 22, 0.6); }
}

.badge-label {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.badge-value {
  font-size: 28px;
  font-weight: 700;
  color: white;
  line-height: 1;
  margin-top: 4px;
}

.poin-progress {
  margin-bottom: 20px;
  position: relative;
  z-index: 1;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 14px;
  font-weight: 600;
}

.progress-current {
  color: #f97316;
}

.progress-target {
  color: #6b7280;
}

.progress-bar {
  height: 50px;
  background: white;
  border-radius: 25px;
  overflow: visible;
  position: relative;
  border: 3px solid #fed7aa;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.1);
}

.progress-fill {
  height: 100%;
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  border-radius: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: width 1s ease;
  position: relative;
  overflow: hidden;
  min-width: 60px;
  box-shadow: 0 4px 16px rgba(249, 115, 22, 0.4);
}

.progress-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  animation: shimmer 3s infinite;
}

@keyframes shimmer {
  0% { left: -100%; }
  100% { left: 200%; }
}

.progress-percentage {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  font-weight: 700;
  color: #6b7280;
  z-index: 1;
}

.poin-tips {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: white;
  border-radius: 12px;
  border-left: 4px solid #f97316;
  position: relative;
  z-index: 1;
}

.tips-icon {
  font-size: 24px;
  animation: blink 2s ease-in-out infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.tips-text {
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
  line-height: 1.5;
}

/* Badge Section */
.badges-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.badge-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
  padding: 16px;
  border-radius: 16px;
  background: linear-gradient(135deg, #f9fafb 0%, #ffffff 100%);
  border: 2px solid transparent;
}

.badge-item:hover {
  transform: translateY(-8px);
  border-color: #f97316;
  box-shadow: 0 8px 24px rgba(249, 115, 22, 0.2);
}

.badge-image-wrapper {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  border: 4px solid #f97316;
  box-shadow: 0 4px 16px rgba(249, 115, 22, 0.3);
  transition: all 0.3s ease;
}

.badge-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(249, 115, 22, 0.3) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.badge-item:hover .badge-glow {
  opacity: 1;
  animation: rotate 3s linear infinite;
}

.badge-item.locked .badge-image-wrapper {
  border-color: #d1d5db;
  filter: grayscale(100%);
  opacity: 0.5;
}

.badge-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.lock-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(2px);
}

.lock-icon {
  font-size: 36px;
  animation: shake 1s ease-in-out infinite;
}

@keyframes shake {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-5deg); }
  75% { transform: rotate(5deg); }
}

.unlock-badge {
  position: absolute;
  bottom: -5px;
  right: -5px;
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.unlock-icon {
  color: white;
  font-weight: 700;
  font-size: 16px;
}

.badge-info {
  text-align: center;
}

.badge-name {
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 4px;
}

.badge-count {
  font-size: 28px;
  font-weight: 700;
  color: #065f46;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.badge-item.locked .badge-count {
  background: #9ca3af;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.total-badge {
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 24px rgba(249, 115, 22, 0.3);
  position: relative;
  overflow: hidden;
}

.total-badge::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  animation: rotate 15s linear infinite;
}

.total-content {
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
  z-index: 1;
}

.total-icon {
  font-size: 48px;
  animation: bounce 2s ease-in-out infinite;
}

.total-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.total-label {
  font-size: 14px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.total-value {
  font-size: 32px;
  font-weight: 700;
  color: white;
  line-height: 1;
}

/* Pemberian Section */
.reward-tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  overflow-x: auto;
  padding-bottom: 8px;
}

.tab-btn {
  padding: 10px 24px;
  border-radius: 30px;
  border: 2px solid #e2e8f0;
  background: white;
  color: #4a5568;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.tab-btn:hover {
  border-color: #f97316;
  color: #f97316;
  background: #fff7ed;
}

.tab-btn.active {
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  color: white;
  border-color: transparent;
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
}

.empty-state {
  text-align: center;
  padding: 80px 20px;
}

.empty-icon {
  font-size: 100px;
  margin-bottom: 20px;
  opacity: 0.6;
  animation: float 3s ease-in-out infinite;
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
  margin: 0;
  max-width: 400px;
  margin: 0 auto;
}

/* Rewards Grid */
.rewards-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.reward-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  transition: all 0.25s ease;
  display: flex;
  flex-direction: column;
  position: relative;
  cursor: pointer;
}

.reward-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1);
  border-color: #f97316;
}

/* Card image */
.reward-image {
  width: 100%;
  height: 140px;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
}

.reward-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.reward-card:hover .reward-image img { transform: scale(1.08); }

.image-poin-pill {
  position: absolute;
  bottom: 8px;
  left: 10px;
  background: linear-gradient(135deg, #f97316, #ea580c);
  color: white;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(249, 115, 22, 0.4);
}

.image-star {
  position: absolute;
  top: 8px;
  right: 10px;
  font-size: 18px;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
}

/* Card content */
.reward-content {
  padding: 12px 14px 14px;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 8px;
}

.reward-category-tag {
  font-size: 11px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 12px;
  width: fit-content;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.reward-category-tag.liburan { background: #eff6ff; color: #3b82f6; }
.reward-category-tag.merchandise { background: #f0fdf4; color: #16a34a; }

.reward-title {
  font-size: 13px;
  font-weight: 700;
  color: #111827;
  margin: 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Requirement chips */
.reward-chips {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.chip {
  font-size: 11px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 20px;
  background: #f3f4f6;
  color: #6b7280;
  border: 1px solid #e5e7eb;
  transition: all 0.2s;
}

.chip.chip-ok { background: #dcfce7; color: #16a34a; border-color: #86efac; }

/* Footer */
.reward-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 8px;
  border-top: 1px solid #f3f4f6;
  margin-top: auto;
}

.expiry-text { font-size: 11px; color: #9ca3af; }

.badge-expired {
  font-size: 11px;
  font-weight: 700;
  color: #ef4444;
  background: #fee2e2;
  padding: 3px 8px;
  border-radius: 10px;
}

.btn-tukar {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  border: none;
  padding: 6px 14px;
  border-radius: 20px;
  font-weight: 700;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 3px 8px rgba(16, 185, 129, 0.3);
  font-family: inherit;
}

.btn-tukar:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 14px rgba(16, 185, 129, 0.4);
}

.btn-tukar:disabled {
  background: #d1d5db;
  color: #9ca3af;
  cursor: not-allowed;
  box-shadow: none;
  transform: none;
}

.status-badge.status-active {
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
  color: #991b1b;
  border: 2px solid #fca5a5;
}

.status-badge.status-expired {
  background: linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%);
  color: #6b7280;
  border: 2px solid #9ca3af;
}

/* Responsive */
@media (max-width: 768px) {
  .poin-header {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }

  .poin-badge {
    align-self: stretch;
  }

  .badges-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  .badge-image-wrapper {
    width: 90px;
    height: 90px;
  }

  .badge-count {
    font-size: 24px;
  }

  .total-content {
    flex-direction: column;
    text-align: center;
  }

  .rewards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .rewards-grid {
    grid-template-columns: 1fr;
  }
}

/* ===== CONFIRMATION MODAL ===== */
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
  box-shadow: 0 32px 64px rgba(0, 0, 0, 0.25);
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

/* Reward image at top */
.modal-reward-img {
  position: relative;
  height: 180px;
  overflow: hidden;
}
.modal-reward-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.modal-img-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 50%, transparent 100%);
}
.modal-poin-pill {
  position: absolute;
  bottom: 12px;
  right: 12px;
  background: #f97316;
  color: white;
  font-size: 13px;
  font-weight: 700;
  padding: 6px 14px;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.4);
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
  transition: background 0.2s;
}
.modal-close-btn:hover { background: #fee2e2; color: #dc2626; }

/* Modal body */
.modal-body {
  padding: 24px;
  text-align: center;
}
.modal-icon-badge { font-size: 40px; margin-bottom: 8px; }
.modal-title {
  font-size: 20px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 8px;
}
.modal-reward-name {
  font-size: 13px;
  color: #6b7280;
  margin: 0 0 20px;
  line-height: 1.5;
}

/* Summary table */
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
.summary-label { font-size: 14px; color: #6b7280; }
.summary-value { font-size: 14px; font-weight: 600; color: #111827; }
.summary-value.current { color: #10b981; }
.summary-value.cost     { color: #ef4444; }
.summary-value.remain   { color: #f97316; font-size: 16px; }
.summary-divider {
  border-top: 1.5px dashed #e5e7eb;
  margin: 8px 0;
}

.modal-hint {
  font-size: 12px;
  color: #9ca3af;
  margin: 0 0 20px;
}

/* Action buttons */
.modal-actions {
  display: flex;
  gap: 12px;
}
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
.btn-batal:hover { background: #f9fafb; border-color: #d1d5db; }
.btn-konfirmasi {
  flex: 1;
  padding: 12px;
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 14px rgba(249, 115, 22, 0.35);
  font-family: inherit;
}
.btn-konfirmasi:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(249, 115, 22, 0.45);
}
.btn-konfirmasi:disabled { opacity: 0.65; cursor: not-allowed; }

/* Loading dots */
.loading-dots span {
  animation: blink 1.2s infinite;
}
.loading-dots span:nth-child(2) { animation-delay: 0.2s; }
.loading-dots span:nth-child(3) { animation-delay: 0.4s; }
@keyframes blink { 0%, 80%, 100% { opacity: 0; } 40% { opacity: 1; } }

/* Success state */
.modal-success {
  padding: 40px 32px;
  text-align: center;
  position: relative;
  overflow: hidden;
}
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
.success-title {
  font-size: 24px;
  font-weight: 800;
  color: #111827;
  margin: 0 0 12px;
  letter-spacing: -0.5px;
}
.success-desc { font-size: 14px; color: #6b7280; margin: 0 0 8px; }
.success-reward-name {
  font-size: 13px;
  color: #374151;
  font-weight: 600;
  margin: 0 0 16px;
  padding: 10px 14px;
  background: #f9fafb;
  border-radius: 10px;
}
.success-points-badge {
  display: inline-block;
  padding: 10px 24px;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  border-radius: 20px;
  font-size: 15px;
  font-weight: 700;
  box-shadow: 0 4px 14px rgba(16, 185, 129, 0.35);
}

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

/* ===== TRAVEL MODAL SPECIFICS ===== */
.travel-modal {
  max-width: 500px;
}

.travel-img {
  height: 240px;
}

.travel-banner-title {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 30px 20px 16px; /* slightly taller padding for gradient */
  background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 60%, transparent 100%);
  color: white;
  text-align: left;
  text-shadow: 0 1px 3px rgba(0,0,0,0.8);
}

.travel-banner-title h3 {
  font-size: 18px;
  margin: 0 0 4px;
  line-height: 1.3;
  color: #ffffff; /* Explicitly force white */
}

.travel-banner-title p {
  font-size: 12px;
  margin: 0;
  opacity: 0.9;
  color: #ffffff; /* Explicitly force white */
}

.travel-body {
  padding: 20px 24px 24px;
}

.travel-desc-box {
  background: #f8fafc;
  padding: 12px 16px;
  border-radius: 12px;
  margin-bottom: 20px;
  text-align: left;
  border-left: 4px solid #3b82f6;
}

.travel-desc-box p {
  font-size: 13px;
  color: #475569;
  margin: 0;
  line-height: 1.5;
}

.claim-items-container {
  text-align: left;
  margin-bottom: 20px;
}

.claim-section-title {
  font-size: 14px;
  color: #111827;
  margin: 0 0 12px;
  font-weight: 700;
}

.claim-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.claim-item:hover:not(.is-disabled) {
  border-color: #cbd5e1;
  background: #f8fafc;
}

.claim-item.is-selected {
  border-color: #10b981;
  background: #ecfdf5;
}

.claim-item.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: #f1f5f9;
}

.checkbox-box {
  width: 20px;
  height: 20px;
  border: 2px solid #cbd5e1;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: white;
  transition: all 0.2s;
  flex-shrink: 0;
}

.checkbox-box.checked {
  background: #10b981;
  border-color: #10b981;
}

.item-info {
  flex: 1;
}

.item-name {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
}

.item-cost {
  font-size: 13px;
  font-weight: 700;
  color: #f97316;
  background: #fff7ed;
  padding: 4px 10px;
  border-radius: 12px;
}

.travel-summary-bar {
  background: #f1f5f9;
  padding: 12px 16px;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.bar-left {
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 2px;
}

.bar-label {
  font-size: 11px;
  color: #64748b;
  font-weight: 600;
  text-transform: uppercase;
}

.bar-value {
  font-size: 18px;
  font-weight: 700;
  color: #10b981;
}

.bar-value.error {
  color: #ef4444;
}

.bar-balance {
  font-size: 12px;
  color: #64748b;
}

.travel-actions {
  display: flex;
  gap: 12px;
}

.travel-actions .btn-batal {
  flex: 1;
}

.travel-actions .btn-konfirmasi {
  flex: 1.5;
}

.success-claimed-list {
  list-style: none;
  padding: 0;
  margin: 0 0 20px;
  text-align: left;
  background: #f8fafc;
  border-radius: 12px;
  padding: 16px;
}

.success-claimed-list li {
  font-size: 14px;
  color: #10b981;
  font-weight: 600;
  margin-bottom: 8px;
  display: flex;
  gap: 8px;
}

.success-claimed-list li:last-child {
  margin-bottom: 0;
}
</style>
