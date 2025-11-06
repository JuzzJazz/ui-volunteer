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
        
        <div v-if="rewards.length === 0" class="empty-state">
          <div class="empty-icon">🎁</div>
          <h3 class="empty-title">Belum Ada Hadiah</h3>
          <p class="empty-text">Kumpulkan poin dan badge untuk mendapatkan hadiah menarik!</p>
        </div>

        <div v-else class="rewards-list">
          <div 
            v-for="reward in rewards" 
            :key="reward.id"
            class="reward-card"
          >
            <div class="reward-badge-corner">
              <span class="corner-icon">⭐</span>
            </div>

            <div class="reward-image">
              <img :src="reward.image" :alt="reward.title" />
              <div class="image-badge">
                <span>{{ reward.points }} Poin</span>
              </div>
            </div>
            
            <div class="reward-content">
              <h3 class="reward-title">{{ reward.title }}</h3>
              <p class="reward-description">{{ reward.description }}</p>
              
              <div class="reward-requirements">
                <div class="requirement-item">
                  <div class="requirement-icon">❤️</div>
                  <div class="requirement-details">
                    <span class="requirement-label">Poin Dibutuhkan</span>
                    <span class="requirement-value">{{ reward.points }} Poin</span>
                  </div>
                </div>
                <div class="requirement-item">
                  <div class="requirement-icon">🏆</div>
                  <div class="requirement-details">
                    <span class="requirement-label">Badge Dibutuhkan</span>
                    <span class="requirement-value">{{ reward.badges }} Badge</span>
                  </div>
                </div>
              </div>

              <div class="reward-footer">
                <div class="expiry-info">
                  <span class="expiry-icon">🗓️</span>
                  <span class="expiry-text">Berakhir: {{ reward.expiryDate }}</span>
                </div>
                <span class="status-badge" :class="`status-${reward.status}`">
                  {{ reward.status === 'active' ? 'Kadaluarsa' : 'Berakhir' }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentPoin = ref(0)
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

// Sample rewards data
const rewards = ref([
  {
    id: 1,
    title: 'Ayo! Kumpulkan poinmu hingga 1.500 untuk mendapatkan GRATIS trip volunteer ke Bengkayang, Kalimantan Barat!',
    description: 'Kamu akan mendapatkan pengalaman tinggal bersama masyarakat, berkegiatan dengan anak-anak dan masyarakat, jalan-jalan ke tempat wisata menarik sekitar Bengkayang.',
    points: 1500,
    badges: 20,
    expiryDate: '2021-06-11',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=200&h=150&fit=crop'
  }
])
</script>

<style scoped>
.points-badge-container {
  width: 100%;
}

.page-header {
  margin-bottom: 24px;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  color: #f97316;
  margin: 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
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

.rewards-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.reward-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  border: 2px solid #e5e7eb;
  transition: all 0.3s ease;
  position: relative;
}

.reward-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.15);
  border-color: #f97316;
}

.reward-badge-corner {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4);
  z-index: 10;
  animation: bounce 2s ease-in-out infinite;
}

.corner-icon {
  font-size: 24px;
}

.reward-image {
  width: 100%;
  height: 250px;
  position: relative;
  overflow: hidden;
}

.reward-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.reward-card:hover .reward-image img {
  transform: scale(1.1);
}

.image-badge {
  position: absolute;
  bottom: 16px;
  left: 16px;
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  color: white;
  padding: 8px 20px;
  border-radius: 30px;
  font-size: 16px;
  font-weight: 700;
  box-shadow: 0 4px 16px rgba(249, 115, 22, 0.4);
  backdrop-filter: blur(10px);
}

.reward-content {
  padding: 28px;
}

.reward-title {
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 12px 0;
  line-height: 1.5;
}

.reward-description {
  font-size: 14px;
  color: #6b7280;
  margin: 0 0 24px 0;
  line-height: 1.7;
}

.reward-requirements {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.requirement-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);
  border-radius: 12px;
  border: 2px solid #fed7aa;
  transition: all 0.3s ease;
}

.requirement-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(249, 115, 22, 0.2);
  border-color: #f97316;
}

.requirement-icon {
  font-size: 32px;
  flex-shrink: 0;
}

.requirement-details {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.requirement-label {
  font-size: 11px;
  color: #6b7280;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.requirement-value {
  font-size: 16px;
  color: #1f2937;
  font-weight: 700;
}

.reward-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  border-top: 2px solid #e5e7eb;
}

.expiry-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.expiry-icon {
  font-size: 18px;
}

.expiry-text {
  font-size: 13px;
  color: #6b7280;
  font-weight: 600;
}

.status-badge {
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
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

  .reward-requirements {
    grid-template-columns: 1fr;
  }

  .reward-footer {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
}
</style>
