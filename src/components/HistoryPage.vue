<template>
  <div class="history-container">
    <div class="history-header">
      <h1 class="page-title">Riwayat Perjalanan</h1>
    </div>

    <div class="history-content">
      <!-- History List -->
      <div class="history-section">
        <div v-if="histories.length === 0" class="empty-state">
          <div class="empty-icon">📝</div>
          <h3 class="empty-title">Belum Ada Riwayat</h3>
          <p class="empty-text">Anda belum memiliki riwayat perjalanan relawan. Daftarkan diri Anda pada campaign yang tersedia untuk memulai!</p>
        </div>

        <div v-else class="history-grid">
          <div 
            v-for="history in histories" 
            :key="history.id"
            class="history-card"
            :class="`status-${history.status}`"
          >
            <!-- Card Header -->
            <div class="card-header-section">
              <div class="campaign-status" :class="`status-badge-${history.status}`">
                <span class="status-dot"></span>
                {{ getStatusLabel(history.status) }}
              </div>
            </div>

            <!-- Card Body -->
            <div class="campaign-body">
              <!-- Campaign Image -->
              <div class="campaign-image">
                <img :src="history.image" :alt="history.title" />
                <div class="image-overlay">
                  <span class="heart-icon">🧡</span>
                </div>
              </div>

              <h3 class="campaign-title">{{ history.title }}</h3>
              
              <div class="history-tag">
                <span class="tag-badge">{{ history.tag }}</span>
              </div>

              <div class="campaign-meta">
                <div class="meta-row">
                  <span class="meta-label">� Lokasi:</span>
                  <span class="meta-value">{{ history.location }}</span>
                </div>
                <div class="meta-row">
                  <span class="meta-label">📅 Periode:</span>
                  <span class="meta-value">{{ history.period }}</span>
                </div>
              </div>

              <div class="campaign-stats">
                <div class="stat-box">
                  <div class="stat-icon">⏱️</div>
                  <div class="stat-info">
                    <div class="stat-value">{{ history.days }}</div>
                    <div class="stat-label">Hari</div>
                  </div>
                </div>
                <div class="stat-box">
                  <div class="stat-icon">❤️</div>
                  <div class="stat-info">
                    <div class="stat-value">{{ history.points }}</div>
                    <div class="stat-label">Poin</div>
                  </div>
                </div>
                <div class="stat-box">
                  <div class="stat-icon">🏆</div>
                  <div class="stat-info">
                    <div class="stat-value">{{ history.badges }}</div>
                    <div class="stat-label">Badge</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="histories.length > 0" class="pagination">
          <button 
            class="pagination-btn" 
            @click="prevPage" 
            :disabled="currentPage === 1"
          >
            ‹
          </button>
          <span class="page-info">Halaman {{ currentPage }} dari {{ totalPages }}</span>
          <button 
            class="pagination-btn" 
            @click="nextPage" 
            :disabled="currentPage === totalPages"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentPage = ref(1)
const itemsPerPage = 10

// Sample history data
const histories = ref([
  {
    id: 1,
    title: 'Holiday in the Forest - Photographer Polaroid',
    location: 'JAKARTA SELATAN',
    tag: '#Volunteer : KinCir Lapangan',
    period: '2025/10/30 - 2025/11/20',
    status: 'on-process',
    days: 22,
    points: 50,
    badges: 1,
    image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400&h=300&fit=crop'
  },
  {
    id: 2,
    title: 'Program Bersih-Bersih Pantai Ancol',
    location: 'JAKARTA UTARA',
    tag: '#Volunteer : KinCir Lingkungan',
    period: '2025/09/15 - 2025/09/17',
    status: 'completed',
    days: 3,
    points: 30,
    badges: 1,
    image: 'https://images.unsplash.com/photo-1583562835057-a62d1beffbf3?w=400&h=300&fit=crop'
  },
  {
    id: 3,
    title: 'Mengajar Anak-Anak di Desa Terpencil',
    location: 'BOGOR',
    tag: '#Volunteer : KinCir Pendidikan',
    period: '2025/08/01 - 2025/08/15',
    status: 'completed',
    days: 15,
    points: 75,
    badges: 2,
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=300&fit=crop'
  },
  {
    id: 4,
    title: 'Event Donor Darah Massal',
    location: 'BANDUNG',
    tag: '#Volunteer : KinCir Kesehatan',
    period: '2025/07/20 - 2025/07/21',
    status: 'completed',
    days: 2,
    points: 20,
    badges: 1,
    image: 'https://images.unsplash.com/photo-1615461066159-fea0960485d5?w=400&h=300&fit=crop'
  },
  {
    id: 5,
    title: 'Pelatihan Komputer untuk UMKM',
    location: 'JAKARTA SELATAN',
    tag: '#Volunteer : KinCir Kantor',
    period: '2025/06/10 - 2025/06/25',
    status: 'completed',
    days: 16,
    points: 80,
    badges: 2,
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop'
  }
])

const totalPages = computed(() => {
  return Math.ceil(histories.value.length / itemsPerPage)
})

const getStatusLabel = (status) => {
  const labels = {
    'on-process': 'SEDANG BERJALAN',
    'completed': 'SELESAI',
    'cancelled': 'DIBATALKAN'
  }
  return labels[status] || status
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}
</script>

<style scoped>
.history-container {
  width: 100%;
}

.history-header {
  margin-bottom: 24px;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  color: #f97316;
  margin: 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.history-content {
  width: 100%;
}

/* History Section */
.history-section {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 80px 20px;
}

.empty-icon {
  font-size: 80px;
  margin-bottom: 20px;
  opacity: 0.5;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
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
  max-width: 500px;
  margin: 0 auto;
}

/* History Grid */
.history-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
}

.history-card {
  background: white;
  border-radius: 16px;
  border: 2px solid #e5e7eb;
  overflow: hidden;
  transition: all 0.3s ease;
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.history-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
  border-color: #f97316;
}

.history-card.status-on-process {
  border-left: 4px solid #f59e0b;
}

.history-card.status-completed {
  border-left: 4px solid #10b981;
}

.history-card.status-cancelled {
  border-left: 4px solid #ef4444;
}

/* Card Header */
.card-header-section {
  padding: 16px 20px;
  background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);
  border-bottom: 1px solid #fed7aa;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.campaign-status {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.status-badge-on-process {
  background: #fef3c7;
  color: #92400e;
}

.status-badge-on-process .status-dot {
  background: #f59e0b;
}

.status-badge-completed {
  background: #d1fae5;
  color: #065f46;
}

.status-badge-completed .status-dot {
  background: #10b981;
}

.status-badge-cancelled {
  background: #fee2e2;
  color: #991b1b;
}

.status-badge-cancelled .status-dot {
  background: #ef4444;
}

/* Campaign Body */
.campaign-body {
  padding: 24px;
}

.campaign-image {
  width: 100%;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  margin-bottom: 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.campaign-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.history-card:hover .campaign-image img {
  transform: scale(1.1);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(249, 115, 22, 0.7) 0%, rgba(234, 88, 12, 0.7) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.history-card:hover .image-overlay {
  opacity: 1;
}

.image-overlay .heart-icon {
  font-size: 60px;
  transform: scale(0.5);
  transition: transform 0.3s ease;
}

.history-card:hover .image-overlay .heart-icon {
  transform: scale(1);
}

.campaign-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  box-shadow: 0 4px 16px rgba(249, 115, 22, 0.3);
  transition: all 0.3s ease;
}

.history-card:hover .campaign-icon {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 8px 24px rgba(249, 115, 22, 0.4);
}

.heart-icon {
  font-size: 40px;
}

.campaign-title {
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 16px 0;
  line-height: 1.4;
  text-align: center;
  min-height: 50px;
}

.history-tag {
  text-align: center;
  margin-bottom: 16px;
}

.tag-badge {
  display: inline-block;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.3px;
}

.campaign-meta {
  background: #f9fafb;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
}

.meta-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #e5e7eb;
}

.meta-row:last-child {
  border-bottom: none;
}

.meta-label {
  font-size: 13px;
  color: #6b7280;
  font-weight: 600;
}

.meta-value {
  font-size: 13px;
  color: #1f2937;
  font-weight: 600;
  text-align: right;
}

.campaign-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.stat-box {
  background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);
  border: 1px solid #fed7aa;
  border-radius: 12px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.stat-box:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(249, 115, 22, 0.2);
  border-color: #f97316;
}

.stat-icon {
  font-size: 24px;
}

.stat-info {
  text-align: center;
}

.stat-value {
  font-size: 20px;
  font-weight: 700;
  color: #f97316;
  line-height: 1;
}

.stat-label {
  font-size: 11px;
  color: #6b7280;
  font-weight: 600;
  margin-top: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 2px solid #e5e7eb;
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

.page-info {
  color: #6b7280;
  font-size: 14px;
  font-weight: 600;
}

/* Responsive */
@media (max-width: 768px) {
  .history-grid {
    grid-template-columns: 1fr;
  }

  .campaign-stats {
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }

  .stat-box {
    padding: 10px;
  }

  .stat-icon {
    font-size: 20px;
  }

  .stat-value {
    font-size: 16px;
  }

  .stat-label {
    font-size: 10px;
  }
}
</style>
