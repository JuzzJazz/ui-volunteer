<template>
  <div class="events-container">
    <div class="page-header">
      <h1 class="page-title">
        <span class="title-icon">🎉</span>
        Acara Relawan
      </h1>
      <p class="page-subtitle">Ikuti berbagai acara menarik dan bermakna bersama komunitas relawan</p>
    </div>

    <!-- Filter Section -->
    <div class="filter-section">
      <div class="filter-group">
        <label class="filter-label">
          <span class="filter-icon">📅</span>
          Waktu
        </label>
        <select v-model="filters.time" class="filter-select">
          <option value="">Semua Waktu</option>
          <option value="upcoming">Akan Datang</option>
          <option value="ongoing">Sedang Berlangsung</option>
          <option value="past">Sudah Lewat</option>
        </select>
      </div>

      <div class="filter-group">
        <label class="filter-label">
          <span class="filter-icon">📍</span>
          Lokasi
        </label>
        <select v-model="filters.location" class="filter-select">
          <option value="">Semua Lokasi</option>
          <option value="jakarta">Jakarta</option>
          <option value="bandung">Bandung</option>
          <option value="surabaya">Surabaya</option>
          <option value="yogyakarta">Yogyakarta</option>
          <option value="online">Online</option>
        </select>
      </div>

      <div class="filter-group">
        <label class="filter-label">
          <span class="filter-icon">🏷️</span>
          Tipe Acara
        </label>
        <select v-model="filters.type" class="filter-select">
          <option value="">Semua Tipe</option>
          <option value="workshop">Workshop</option>
          <option value="seminar">Seminar</option>
          <option value="aksi">Aksi Lapangan</option>
          <option value="training">Training</option>
          <option value="gathering">Gathering</option>
        </select>
      </div>

      <button @click="applyFilters" class="filter-btn">
        <span class="btn-icon">🔍</span>
        Cari
      </button>
    </div>

    <!-- Statistics Section -->
    <div class="stats-section">
      <div class="stat-card">
        <div class="stat-icon upcoming">📅</div>
        <div class="stat-content">
          <div class="stat-value">{{ upcomingEventsCount }}</div>
          <div class="stat-label">Acara Mendatang</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon ongoing">🔥</div>
        <div class="stat-content">
          <div class="stat-value">{{ ongoingEventsCount }}</div>
          <div class="stat-label">Sedang Berlangsung</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon registered">✓</div>
        <div class="stat-content">
          <div class="stat-value">{{ registeredEventsCount }}</div>
          <div class="stat-label">Anda Terdaftar</div>
        </div>
      </div>
    </div>

    <!-- Events Section -->
    <div class="events-section">
      <div class="section-header">
        <h2 class="section-title">{{ filteredEvents.length }} Acara Tersedia</h2>
        <div class="view-toggle">
          <button 
            @click="viewMode = 'grid'" 
            class="toggle-btn"
            :class="{ active: viewMode === 'grid' }"
            title="Tampilan Grid"
          >
            ⊞
          </button>
          <button 
            @click="viewMode = 'list'" 
            class="toggle-btn"
            :class="{ active: viewMode === 'list' }"
            title="Tampilan List"
          >
            ☰
          </button>
        </div>
      </div>

      <div v-if="filteredEvents.length === 0" class="empty-state">
        <div class="empty-icon">📭</div>
        <h3 class="empty-title">Tidak Ada Acara Ditemukan</h3>
        <p class="empty-text">Coba ubah filter pencarian Anda atau periksa kembali nanti untuk acara baru</p>
      </div>

      <div v-else class="events-grid" :class="{ 'list-view': viewMode === 'list' }">
        <div 
          v-for="event in paginatedEvents" 
          :key="event.id"
          class="event-card"
          :class="{ registered: event.isRegistered }"
        >
          <!-- Card Image -->
          <div class="card-image">
            <img :src="event.image" :alt="event.title" />
            <div class="image-overlay">
              <span class="event-status" :class="event.status">
                {{ getStatusLabel(event.status) }}
              </span>
            </div>
            <div v-if="event.isRegistered" class="registered-badge">
              <span class="badge-icon">✓</span>
              <span class="badge-text">Terdaftar</span>
            </div>
            <div v-if="event.isFeatured" class="featured-badge">
              <span class="star-icon">⭐</span>
              <span>Featured</span>
            </div>
          </div>

          <!-- Card Content -->
          <div class="card-content">
            <div class="card-header">
              <span class="event-type">{{ event.type }}</span>
              <span class="event-capacity" :class="{ limited: event.spotsLeft < 10 }">
                <span class="capacity-icon">👥</span>
                {{ event.spotsLeft }} tempat tersisa
              </span>
            </div>

            <h3 class="card-title">{{ event.title }}</h3>
            
            <div class="card-meta">
              <div class="meta-item">
                <span class="meta-icon">📅</span>
                <span class="meta-text">{{ event.date }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-icon">⏰</span>
                <span class="meta-text">{{ event.time }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-icon">📍</span>
                <span class="meta-text">{{ event.location }}</span>
              </div>
            </div>

            <div class="card-footer">
              <button 
                @click="viewDetails(event)" 
                class="btn-detail"
              >
                <span class="btn-text">Detail</span>
                <span class="btn-arrow">→</span>
              </button>
              <button 
                v-if="!event.isRegistered && event.status === 'upcoming'"
                @click="registerEvent(event)" 
                class="btn-register"
                :disabled="event.spotsLeft === 0"
              >
                <span class="btn-icon">✓</span>
                <span class="btn-text">Daftar</span>
              </button>
              <button 
                v-if="event.isRegistered"
                class="btn-registered"
                disabled
              >
                <span class="btn-icon">✓</span>
                <span class="btn-text">Sudah Terdaftar</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="filteredEvents.length > 0" class="pagination">
        <button 
          class="pagination-btn" 
          @click="prevPage" 
          :disabled="currentPage === 1"
        >
          ‹
        </button>
        <div class="pagination-info">
          <span class="page-number">{{ currentPage }}</span>
          <span class="page-separator">/</span>
          <span class="page-total">{{ totalPages }}</span>
        </div>
        <button 
          class="pagination-btn" 
          @click="nextPage" 
          :disabled="currentPage === totalPages"
        >
          ›
        </button>
      </div>
    </div>

    <!-- Detail Modal -->
    <div v-if="selectedEvent" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button @click="closeModal" class="modal-close">✕</button>
        
        <div class="modal-image">
          <img :src="selectedEvent.image" :alt="selectedEvent.title" />
          <div v-if="selectedEvent.isFeatured" class="modal-featured">
            <span class="star-icon">⭐</span>
            <span>Featured Event</span>
          </div>
        </div>

        <div class="modal-body">
          <div class="modal-header">
            <span class="modal-type">{{ selectedEvent.type }}</span>
            <span class="modal-status" :class="selectedEvent.status">
              {{ getStatusLabel(selectedEvent.status) }}
            </span>
          </div>

          <h2 class="modal-title">{{ selectedEvent.title }}</h2>
          
          <div class="modal-info">
            <div class="info-row">
              <span class="info-label">📅 Tanggal:</span>
              <span class="info-value">{{ selectedEvent.date }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">⏰ Waktu:</span>
              <span class="info-value">{{ selectedEvent.time }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">📍 Lokasi:</span>
              <span class="info-value">{{ selectedEvent.location }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">👥 Kapasitas:</span>
              <span class="info-value">{{ selectedEvent.spotsLeft }} dari {{ selectedEvent.capacity }} tersisa</span>
            </div>
            <div class="info-row">
              <span class="info-label">🎫 Biaya:</span>
              <span class="info-value">{{ selectedEvent.fee }}</span>
            </div>
          </div>

          <div class="modal-description">
            <h3 class="description-title">Tentang Acara</h3>
            <p class="description-text">{{ selectedEvent.description }}</p>
          </div>

          <div v-if="selectedEvent.organizer" class="modal-organizer">
            <h3 class="organizer-title">Penyelenggara</h3>
            <div class="organizer-info">
              <div class="organizer-avatar">{{ selectedEvent.organizer.charAt(0) }}</div>
              <div class="organizer-details">
                <div class="organizer-name">{{ selectedEvent.organizer }}</div>
                <div class="organizer-badge">Verified Organizer ✓</div>
              </div>
            </div>
          </div>

          <div class="modal-actions">
            <button 
              v-if="!selectedEvent.isRegistered && selectedEvent.status === 'upcoming'"
              @click="registerEventFromModal" 
              class="btn-register-modal"
              :disabled="selectedEvent.spotsLeft === 0"
            >
              <span class="btn-icon">✓</span>
              {{ selectedEvent.spotsLeft === 0 ? 'Tempat Penuh' : 'Daftar Acara Ini' }}
            </button>
            <button 
              v-if="selectedEvent.isRegistered"
              class="btn-registered-modal"
              disabled
            >
              <span class="btn-icon">✓</span>
              Anda Sudah Terdaftar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const viewMode = ref('grid')
const currentPage = ref(1)
const itemsPerPage = 6
const selectedEvent = ref(null)

const filters = ref({
  time: '',
  location: '',
  type: ''
})

const events = ref([
  {
    id: 1,
    title: 'Workshop Fotografi untuk Volunteer',
    date: 'Sabtu, 15 November 2025',
    time: '09:00 - 16:00 WIB',
    location: 'Jakarta Selatan',
    type: 'Workshop',
    status: 'upcoming',
    capacity: 30,
    spotsLeft: 12,
    fee: 'Gratis',
    isRegistered: false,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&h=300&fit=crop',
    description: 'Belajar teknik fotografi dokumentasi untuk kegiatan volunteer. Workshop ini akan membekali Anda dengan keterampilan fotografi yang berguna untuk mendokumentasikan kegiatan sosial dan volunteer.',
    organizer: 'Kincir Indonesia',
    category: 'training'
  },
  {
    id: 2,
    title: 'Seminar Kesehatan Mental Relawan',
    date: 'Minggu, 16 November 2025',
    time: '13:00 - 17:00 WIB',
    location: 'Online (Zoom)',
    type: 'Seminar',
    status: 'upcoming',
    capacity: 100,
    spotsLeft: 45,
    fee: 'Gratis',
    isRegistered: true,
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=300&fit=crop',
    description: 'Memahami pentingnya kesehatan mental bagi para relawan. Seminar ini akan membahas cara menjaga work-life balance, mengelola stress, dan tips self-care untuk volunteer yang aktif.',
    organizer: 'Komunitas Relawan Indonesia',
    category: 'training'
  },
  {
    id: 3,
    title: 'Aksi Bersih-Bersih Pantai Jakarta',
    date: 'Sabtu, 22 November 2025',
    time: '06:00 - 12:00 WIB',
    location: 'Pantai Ancol, Jakarta Utara',
    type: 'Aksi Lapangan',
    status: 'upcoming',
    capacity: 50,
    spotsLeft: 8,
    fee: 'Gratis',
    isRegistered: false,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=400&h=300&fit=crop',
    description: 'Mari bersama-sama membersihkan pantai dari sampah plastik dan limbah. Kegiatan ini bertujuan untuk menjaga kelestarian ekosistem laut dan meningkatkan kesadaran masyarakat tentang pentingnya menjaga kebersihan pantai.',
    organizer: 'Save Our Ocean',
    category: 'lingkungan'
  },
  {
    id: 4,
    title: 'Training Disaster Response Team',
    date: 'Kamis, 20 November 2025',
    time: '08:00 - 17:00 WIB',
    location: 'Jakarta Pusat',
    type: 'Training',
    status: 'ongoing',
    capacity: 40,
    spotsLeft: 0,
    fee: 'Rp 150.000',
    isRegistered: false,
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=300&fit=crop',
    description: 'Pelatihan intensif untuk menjadi bagian dari tim tanggap darurat bencana. Training mencakup pertolongan pertama, evakuasi, logistik, dan koordinasi tim dalam situasi darurat.',
    organizer: 'Indonesia Disaster Relief',
    category: 'training'
  },
  {
    id: 5,
    title: 'Gathering Volunteer Tahunan 2025',
    date: 'Minggu, 30 November 2025',
    time: '10:00 - 18:00 WIB',
    location: 'Taman Menteng, Jakarta Pusat',
    type: 'Gathering',
    status: 'upcoming',
    capacity: 200,
    spotsLeft: 150,
    fee: 'Gratis',
    isRegistered: true,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop',
    description: 'Acara tahunan untuk semua volunteer! Nikmati games, sharing session, networking, penghargaan volunteer terbaik, dan entertainment. Mari rayakan dedikasi dan kontribusi kita bersama!',
    organizer: 'Kincir Indonesia',
    category: 'sosial'
  },
  {
    id: 6,
    title: 'Workshop Pembuatan Konten Media Sosial',
    date: 'Rabu, 26 November 2025',
    time: '18:00 - 21:00 WIB',
    location: 'Online (Google Meet)',
    type: 'Workshop',
    status: 'upcoming',
    capacity: 50,
    spotsLeft: 25,
    fee: 'Gratis',
    isRegistered: false,
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop',
    description: 'Belajar membuat konten media sosial yang engaging untuk kampanye volunteer. Workshop akan membahas copywriting, visual design, video editing, dan strategi posting yang efektif.',
    organizer: 'Digital Volunteer Network',
    category: 'training'
  },
  {
    id: 7,
    title: 'Bakti Sosial di Panti Asuhan',
    date: 'Sabtu, 8 November 2025',
    time: '09:00 - 15:00 WIB',
    location: 'Panti Asuhan Kasih, Bandung',
    type: 'Aksi Lapangan',
    status: 'past',
    capacity: 30,
    spotsLeft: 0,
    fee: 'Gratis',
    isRegistered: true,
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=300&fit=crop',
    description: 'Kegiatan bermain dan belajar bersama anak-anak panti asuhan, donasi buku dan alat tulis, serta renovasi ringan fasilitas panti.',
    organizer: 'Berbagi Kasih Foundation',
    category: 'sosial'
  },
  {
    id: 8,
    title: 'Pelatihan Fundraising untuk NGO',
    date: 'Selasa, 25 November 2025',
    time: '14:00 - 17:00 WIB',
    location: 'Surabaya',
    type: 'Training',
    status: 'upcoming',
    capacity: 35,
    spotsLeft: 20,
    fee: 'Rp 100.000',
    isRegistered: false,
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=300&fit=crop',
    description: 'Pelajari strategi dan teknik fundraising yang efektif untuk organisasi nirlaba. Materi meliputi proposal writing, donor management, dan campaign planning.',
    organizer: 'NGO Development Center',
    category: 'training'
  }
])

const filteredEvents = computed(() => {
  let result = events.value

  if (filters.value.time) {
    result = result.filter(event => event.status === filters.value.time)
  }

  if (filters.value.location) {
    if (filters.value.location === 'online') {
      result = result.filter(event => 
        event.location.toLowerCase().includes('online') ||
        event.location.toLowerCase().includes('zoom') ||
        event.location.toLowerCase().includes('meet')
      )
    } else {
      result = result.filter(event => 
        event.location.toLowerCase().includes(filters.value.location.toLowerCase())
      )
    }
  }

  if (filters.value.type) {
    result = result.filter(event => 
      event.type.toLowerCase() === filters.value.type.toLowerCase()
    )
  }

  return result
})

const upcomingEventsCount = computed(() => {
  return events.value.filter(e => e.status === 'upcoming').length
})

const ongoingEventsCount = computed(() => {
  return events.value.filter(e => e.status === 'ongoing').length
})

const registeredEventsCount = computed(() => {
  return events.value.filter(e => e.isRegistered).length
})

const totalPages = computed(() => {
  return Math.ceil(filteredEvents.value.length / itemsPerPage)
})

const paginatedEvents = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredEvents.value.slice(start, end)
})

const getStatusLabel = (status) => {
  const labels = {
    upcoming: 'Akan Datang',
    ongoing: 'Sedang Berlangsung',
    past: 'Sudah Lewat'
  }
  return labels[status] || status
}

const applyFilters = () => {
  currentPage.value = 1
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const viewDetails = (event) => {
  selectedEvent.value = event
}

const closeModal = () => {
  selectedEvent.value = null
}

const registerEvent = (event) => {
  if (event.spotsLeft > 0) {
    event.isRegistered = true
    event.spotsLeft--
    alert(`Berhasil mendaftar untuk acara: ${event.title}`)
  }
}

const registerEventFromModal = () => {
  if (selectedEvent.value && selectedEvent.value.spotsLeft > 0) {
    selectedEvent.value.isRegistered = true
    selectedEvent.value.spotsLeft--
    alert(`Berhasil mendaftar untuk acara: ${selectedEvent.value.title}`)
    closeModal()
  }
}
</script>

<style scoped>
.events-container {
  width: 100%;
}

.page-header {
  margin-bottom: 32px;
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 8px 0;
  display: flex;
  align-items: center;
  gap: 12px;
}

.title-icon {
  font-size: 36px;
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.page-subtitle {
  font-size: 16px;
  color: #6b7280;
  margin: 0;
  font-weight: 500;
}

/* Filter Section */
.filter-section {
  background: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
  animation: slideDown 0.5s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.filter-label {
  font-size: 13px;
  font-weight: 700;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.filter-icon {
  font-size: 16px;
}

.filter-select {
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  color: #1f2937;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;
}

.filter-select:hover {
  border-color: #f97316;
}

.filter-select:focus {
  border-color: #f97316;
  box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.1);
}

.filter-btn {
  padding: 12px 24px;
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
  align-self: flex-end;
}

.filter-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(249, 115, 22, 0.4);
}

.btn-icon {
  font-size: 16px;
}

/* Statistics Section */
.stats-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
}

.stat-card {
  background: white;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  gap: 16px;
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

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
}

.stat-icon.upcoming {
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
}

.stat-icon.ongoing {
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.stat-icon.registered {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;
  line-height: 1;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 13px;
  color: #6b7280;
  font-weight: 600;
}

/* Events Section */
.events-section {
  background: white;
  padding: 28px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #e5e7eb;
}

.section-title {
  font-size: 20px;
  font-weight: 700;
  color: #f97316;
  margin: 0;
}

.view-toggle {
  display: flex;
  gap: 8px;
}

.toggle-btn {
  width: 40px;
  height: 40px;
  border: 2px solid #e5e7eb;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  transition: all 0.3s ease;
}

.toggle-btn:hover {
  border-color: #f97316;
  color: #f97316;
}

.toggle-btn.active {
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  color: white;
  border-color: #f97316;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 80px 20px;
}

.empty-icon {
  font-size: 100px;
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
  margin: 0 0 12px 0;
}

.empty-text {
  font-size: 16px;
  color: #6b7280;
  margin: 0;
  max-width: 500px;
  margin: 0 auto;
}

/* Events Grid */
.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

.events-grid.list-view {
  grid-template-columns: 1fr;
}

.event-card {
  background: white;
  border-radius: 16px;
  border: 2px solid #e5e7eb;
  overflow: hidden;
  transition: all 0.3s ease;
  animation: fadeIn 0.5s ease-out;
}

.event-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
  border-color: #f97316;
}

.event-card.registered {
  border-color: #10b981;
  background: linear-gradient(to bottom, #ecfdf5 0%, white 50px);
}

.card-image {
  width: 100%;
  height: 200px;
  position: relative;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.event-card:hover .card-image img {
  transform: scale(1.1);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, transparent 50%, rgba(0, 0, 0, 0.6) 100%);
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 16px;
}

.event-status {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.event-status.ongoing {
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  animation: pulse-glow 2s ease-in-out infinite;
}

@keyframes pulse-glow {
  0%, 100% { 
    box-shadow: 0 0 10px rgba(249, 115, 22, 0.5);
  }
  50% { 
    box-shadow: 0 0 20px rgba(249, 115, 22, 0.8);
  }
}

.event-status.past {
  background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
}

.registered-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  padding: 8px 16px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 700;
  font-size: 13px;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
}

.featured-badge {
  position: absolute;
  bottom: 16px;
  left: 16px;
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 700;
  font-size: 12px;
  box-shadow: 0 4px 12px rgba(251, 191, 36, 0.4);
}

.star-icon {
  font-size: 14px;
  animation: rotate 3s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.card-content {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  gap: 8px;
}

.event-type {
  background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%);
  color: #4338ca;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.event-capacity {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 600;
  color: #10b981;
}

.event-capacity.limited {
  color: #dc2626;
  animation: blink 1.5s ease-in-out infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.capacity-icon {
  font-size: 14px;
}

.card-title {
  font-size: 16px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 16px 0;
  line-height: 1.4;
  min-height: 44px;
}

.card-meta {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #6b7280;
}

.meta-icon {
  font-size: 16px;
}

.meta-text {
  font-weight: 500;
  line-height: 1.4;
}

.card-footer {
  padding-top: 16px;
  border-top: 2px solid #e5e7eb;
  display: flex;
  gap: 8px;
}

.btn-detail {
  flex: 1;
  padding: 12px 20px;
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 12px rgba(251, 191, 36, 0.3);
}

.btn-detail:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(251, 191, 36, 0.4);
}

.btn-register {
  flex: 1;
  padding: 12px 20px;
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
}

.btn-register:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(249, 115, 22, 0.4);
}

.btn-register:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-registered {
  flex: 1;
  padding: 12px 20px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
  cursor: not-allowed;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  opacity: 0.8;
}

.btn-arrow {
  font-size: 18px;
  transition: transform 0.3s ease;
}

.btn-detail:hover .btn-arrow {
  transform: translateX(4px);
}

.btn-text {
  font-size: 14px;
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
  width: 44px;
  height: 44px;
  border: 2px solid #fed7aa;
  background: white;
  border-radius: 10px;
  cursor: pointer;
  font-size: 24px;
  color: #f97316;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pagination-btn:hover:not(:disabled) {
  background: #f97316;
  color: white;
  border-color: #f97316;
}

.pagination-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.pagination-info {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 700;
}

.page-number {
  color: #f97316;
  font-size: 20px;
}

.page-separator {
  color: #9ca3af;
}

.page-total {
  color: #6b7280;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  animation: fadeIn 0.3s ease-out;
  overflow-y: auto;
}

.modal-content {
  background: white;
  border-radius: 20px;
  max-width: 650px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: scaleIn 0.3s ease-out;
  position: relative;
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  border: none;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-close:hover {
  background: #dc2626;
  transform: rotate(90deg);
}

.modal-image {
  width: 100%;
  height: 300px;
  overflow: hidden;
  border-radius: 20px 20px 0 0;
  position: relative;
}

.modal-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-featured {
  position: absolute;
  bottom: 16px;
  left: 16px;
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  color: white;
  padding: 8px 16px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 14px;
  box-shadow: 0 4px 16px rgba(251, 191, 36, 0.5);
}

.modal-body {
  padding: 32px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  gap: 12px;
}

.modal-type {
  background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%);
  color: #4338ca;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.modal-status {
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: white;
}

.modal-status.upcoming {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
}

.modal-status.ongoing {
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
}

.modal-status.past {
  background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
}

.modal-title {
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 24px 0;
  line-height: 1.4;
}

.modal-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);
  border-radius: 12px;
  margin-bottom: 24px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  gap: 16px;
}

.info-label {
  font-weight: 600;
  color: #6b7280;
  white-space: nowrap;
}

.info-value {
  font-weight: 700;
  color: #1f2937;
  text-align: right;
}

.modal-description {
  margin-bottom: 24px;
}

.description-title {
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 12px 0;
}

.description-text {
  font-size: 15px;
  color: #6b7280;
  line-height: 1.7;
  margin: 0;
}

.modal-organizer {
  margin-bottom: 24px;
  padding: 20px;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border-radius: 12px;
}

.organizer-title {
  font-size: 16px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 12px 0;
}

.organizer-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.organizer-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
}

.organizer-details {
  flex: 1;
}

.organizer-name {
  font-size: 16px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 4px;
}

.organizer-badge {
  font-size: 13px;
  color: #10b981;
  font-weight: 600;
}

.modal-actions {
  display: flex;
  justify-content: center;
}

.btn-register-modal,
.btn-registered-modal {
  padding: 14px 40px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: white;
}

.btn-register-modal {
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  box-shadow: 0 4px 16px rgba(249, 115, 22, 0.4);
}

.btn-register-modal:hover:not(:disabled) {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(249, 115, 22, 0.5);
}

.btn-register-modal:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-registered-modal {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  cursor: not-allowed;
  opacity: 0.8;
}

/* Responsive */
@media (max-width: 768px) {
  .filter-section {
    grid-template-columns: 1fr;
  }

  .filter-btn {
    align-self: stretch;
  }

  .stats-section {
    grid-template-columns: 1fr;
  }

  .events-grid {
    grid-template-columns: 1fr;
  }

  .section-header {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }

  .modal-body {
    padding: 24px;
  }

  .modal-title {
    font-size: 20px;
  }

  .card-footer {
    flex-direction: column;
  }
}
</style>
