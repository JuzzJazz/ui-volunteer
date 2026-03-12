<template>
  <div class="admin-rewards-container">
    <div class="page-header">
      <div class="header-icon">🎁</div>
      <div>
        <h1 class="page-title">Kelola Rewards</h1>
        <p class="page-subtitle">Atur list hadiah liburan dan merchandise untuk relawan</p>
      </div>
    </div>

    <div class="content-wrapper">
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon total">📦</div>
          <div class="stat-info">
            <span class="stat-label">Total Rewards</span>
            <span class="stat-value">{{ rewards.length }}</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon travel">✈️</div>
          <div class="stat-info">
            <span class="stat-label">Liburan & Trip</span>
            <span class="stat-value">{{ travelCount }}</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon merch">👕</div>
          <div class="stat-info">
            <span class="stat-label">Merchandise</span>
            <span class="stat-value">{{ merchCount }}</span>
          </div>
        </div>
      </div>

      <div class="table-container">
        <div class="table-header">
          <h2 class="table-title">Daftar Hadiah</h2>
          <div class="table-actions">
            <div class="search-box">
              <span class="search-icon">🔍</span>
              <input type="text" v-model="searchQuery" placeholder="Cari nama hadiah..." />
            </div>
            <select v-model="categoryFilter" class="filter-select">
              <option value="all">Semua Kategori</option>
              <option value="liburan">Liburan & Trip</option>
              <option value="merchandise">Merchandise</option>
            </select>
            <button class="btn-primary" @click="openRewardModal(null)">
              <span>+</span> Tambah Reward
            </button>
          </div>
        </div>

        <div class="table-responsive">
          <table class="rewards-table">
            <thead>
              <tr>
                <th>Detail Hadiah</th>
                <th>Kategori</th>
                <th>Syarat Poin & Badge</th>
                <th>Masa Berlaku</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="filteredRewards.length === 0">
                <td colspan="6" class="empty-state">
                  Belum ada hadiah yang ditemukan.
                </td>
              </tr>
              <tr v-for="reward in filteredRewards" :key="reward.id">
                <td>
                  <div class="reward-info">
                    <img :src="reward.image" :alt="reward.title" class="reward-thumb" />
                    <div class="reward-details">
                      <span class="reward-name">{{ reward.title }}</span>
                      <span class="reward-desc-excerpt">{{ truncate(reward.description, 60) }}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <span class="category-tag" :class="reward.category">
                    {{ reward.category === 'liburan' ? '✈️ Liburan' : '👕 Merchandise' }}
                  </span>
                </td>
                <td>
                  <div class="req-chips">
                    <span class="chip-poin">❤️ {{ reward.points }}</span>
                    <span class="chip-badge">🏆 {{ reward.badges }}</span>
                  </div>
                </td>
                <td class="expiry-date">{{ reward.expiryDate }}</td>
                <td>
                  <span class="status-badge" :class="reward.status">
                    {{ reward.status === 'active' ? 'Tersedia' : 'Nonaktif' }}
                  </span>
                </td>
                <td>
                  <div class="action-buttons">
                    <button class="btn-action edit" @click="openRewardModal(reward)" title="Edit">✏️</button>
                    <button class="btn-action delete" @click="deleteReward(reward.id)" title="Hapus">🗑️</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <!-- ===== REWARD FORM MODAL ===== -->
  <Transition name="modal-fade">
    <div v-if="formModal.show" class="modal-backdrop" @click.self="closeFormModal">
      <div class="form-modal">
        <div class="modal-header">
          <h3 class="modal-title">{{ isEditing ? 'Edit Reward' : 'Tambah Reward Baru' }}</h3>
          <button class="modal-close-btn" @click="closeFormModal">✕</button>
        </div>

        <div class="modal-body-scroll">
          <form @submit.prevent="saveReward" class="reward-form">
            
            <div class="form-row">
              <div class="form-group">
                <label>Kategori <span class="required">*</span></label>
                <select v-model="formData.category" required class="form-input">
                  <option value="liburan">Liburan & Trip (Travel)</option>
                  <option value="merchandise">Merchandise</option>
                </select>
              </div>
              <div class="form-group">
                <label>Status</label>
                <select v-model="formData.status" required class="form-input">
                  <option value="active">Tersedia Aktif</option>
                  <option value="inactive">Nonaktif / Draft</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label>Nama Hadiah <span class="required">*</span></label>
              <input type="text" v-model="formData.title" required class="form-input" placeholder="Contoh: Trip Volunteer Pulau Komodo" />
            </div>

            <div class="form-group">
              <label>Deskripsi <span class="required">*</span></label>
              <textarea v-model="formData.description" required class="form-textarea" rows="3" placeholder="Jelaskan detail hadiah ini..."></textarea>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Total Poin Dibutuhkan <span class="required">*</span></label>
                <input type="number" v-model.number="formData.points" required min="0" class="form-input" />
              </div>
              <div class="form-group">
                <label>Syarat Badge</label>
                <input type="number" v-model.number="formData.badges" min="0" class="form-input" />
              </div>
              <div class="form-group">
                <label>Berlaku Sampai <span class="required">*</span></label>
                <input type="date" v-model="formData.expiryDate" required class="form-input" />
              </div>
            </div>

            <div class="form-group">
              <label>URL Gambar URL (Unsplash etc)</label>
              <input type="url" v-model="formData.image" class="form-input" placeholder="https://images.unsplash.com/photo-..." />
              <div class="img-preview" v-if="formData.image">
                <img :src="formData.image" alt="Preview" />
              </div>
            </div>

            <!-- Dynamic Sub-Items for Travel Category Only -->
            <div class="subitems-section" v-if="formData.category === 'liburan'">
              <div class="subitems-header">
                <label>Item Perjalanan yang Bisa Diklaim</label>
                <button type="button" class="btn-add-subitem" @click="addSubItem">
                  + Tambah Item
                </button>
              </div>
              <p class="subitems-hint">Pastikan total poin sub-item logis dengan total poin reward.</p>

              <div v-if="formData.claimableItems.length === 0" class="no-subitems">
                Belum ada item ditambahkan. Relawan harus menebus biaya penuh.
              </div>

              <div class="subitems-list">
                <div class="subitem-row" v-for="(item, index) in formData.claimableItems" :key="index">
                  <input type="text" v-model="item.name" placeholder="Nama tiket/hotel" required class="form-input flex-2" />
                  <input type="number" v-model.number="item.points" placeholder="Poin" required min="0" class="form-input flex-1" />
                  <button type="button" class="btn-remove-subitem" @click="removeSubItem(index)" title="Hapus">✕</button>
                </div>
              </div>
            </div>

          </form>
        </div>

        <div class="modal-footer">
          <button class="btn-cancel" @click="closeFormModal">Batal</button>
          <button class="btn-save" @click="saveReward" :disabled="loading">
            <span v-if="!loading">💾 Simpan Reward</span>
            <span v-else class="loading-dots">Menyimpan<span>.</span><span>.</span><span>.</span></span>
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const categoryFilter = ref('all')

// Initial Mock Data (same as PointsBadgePage)
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
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop',
    claimableItems: []
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
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=300&fit=crop',
    claimableItems: []
  }
])

// Stats
const travelCount = computed(() => rewards.value.filter(r => r.category === 'liburan').length)
const merchCount = computed(() => rewards.value.filter(r => r.category === 'merchandise').length)

// Filtering
const filteredRewards = computed(() => {
  return rewards.value.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          r.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = categoryFilter.value === 'all' || r.category === categoryFilter.value
    return matchesSearch && matchesCategory
  })
})

const truncate = (text, length) => {
  return text.length > length ? text.substring(0, length) + '...' : text;
}

// ---- CRUD Modal Logic ----
const formModal = ref({ show: false })
const isEditing = ref(false)
const loading = ref(false)

const getEmptyForm = () => ({
  id: null,
  category: 'liburan',
  title: '',
  description: '',
  points: 0,
  badges: 0,
  expiryDate: '',
  status: 'active',
  image: '',
  claimableItems: []
})

const formData = ref(getEmptyForm())

const openRewardModal = (reward = null) => {
  if (reward) {
    isEditing.value = true
    // deep clone so edits don't reflect immediately
    formData.value = JSON.parse(JSON.stringify(reward))
  } else {
    isEditing.value = false
    formData.value = getEmptyForm()
  }
  formModal.value.show = true
}

const closeFormModal = () => {
  formModal.value.show = false
  setTimeout(() => {
    formData.value = getEmptyForm()
  }, 300)
}

const addSubItem = () => {
  formData.value.claimableItems.push({ name: '', points: 0 })
}

const removeSubItem = (index) => {
  formData.value.claimableItems.splice(index, 1)
}

const saveReward = async () => {
  if (!formData.value.title || !formData.value.description) return
  
  loading.value = true
  await new Promise(r => setTimeout(r, 800))

  if (formData.value.category !== 'liburan') {
    formData.value.claimableItems = [] // Ensure no subitems leak to merch
  }

  if (isEditing.value) {
    const index = rewards.value.findIndex(r => r.id === formData.value.id)
    if (index !== -1) {
      rewards.value[index] = { ...formData.value }
    }
  } else {
    rewards.value.push({
      ...formData.value,
      id: Date.now()
    })
  }

  loading.value = false
  closeFormModal()
}

const deleteReward = (id) => {
  if (confirm('Apakah Anda yakin ingin menghapus reward ini secara permanen?')) {
    rewards.value = rewards.value.filter(r => r.id !== id)
  }
}
</script>

<style scoped>
.admin-rewards-container {
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
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255,255,255,0.5);
}

.stat-icon {
  font-size: 28px;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  flex-shrink: 0;
}
.stat-icon.total { background: #eff6ff; color: #3b82f6; }
.stat-icon.travel { background: #dcfce7; color: #10b981; }
.stat-icon.merch { background: #fef3c7; color: #f59e0b; }

.stat-info { display: flex; flex-direction: column; }
.stat-label { font-size: 13px; color: #6b7280; font-weight: 500; margin-bottom: 2px; }
.stat-value { font-size: 24px; font-weight: 700; color: #0f172a; }

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
.table-actions { display: flex; gap: 12px; align-items: center; }

.search-box { position: relative; width: 220px; }
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
  font-size: 13px;
  outline: none;
  font-family: inherit;
  transition: all 0.2s;
}
.search-box input:focus { border-color: #f97316; }

.filter-select {
  padding: 10px 16px;
  border: 1.5px solid #e5e7eb;
  border-radius: 10px;
  font-size: 13px;
  color: #374151;
  outline: none;
  background: white;
  cursor: pointer;
  font-family: inherit;
}

.btn-primary {
  background: linear-gradient(135deg, #f97316, #ea580c);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
}
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(249, 115, 22, 0.4); }

/* Table */
.table-responsive { overflow-x: auto; }

.rewards-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.rewards-table th {
  padding: 14px 16px;
  font-size: 12px;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 2px solid #f3f4f6;
}

.rewards-table td {
  padding: 16px;
  vertical-align: middle;
  border-bottom: 1px solid #f3f4f6;
  color: #374151;
}

.rewards-table tbody tr { transition: background 0.15s ease; }
.rewards-table tbody tr:hover { background: #f9fafb; }

.empty-state { text-align: center; padding: 48px; color: #9ca3af; font-style: italic; }

.reward-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.reward-thumb {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  object-fit: cover;
  border: 1px solid #e5e7eb;
}

.reward-details { display: flex; flex-direction: column; gap: 4px; max-width: 250px; }
.reward-name { font-weight: 600; font-size: 14px; color: #111827; line-height: 1.3; }
.reward-desc-excerpt { font-size: 11px; color: #6b7280; line-height: 1.4; }

.category-tag {
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 12px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}
.category-tag.liburan { background: #eff6ff; color: #3b82f6; }
.category-tag.merchandise { background: #f0fdf4; color: #16a34a; }

.req-chips { display: flex; flex-direction: column; gap: 4px; }
.req-chips span { 
  font-size: 11px; 
  padding: 2px 8px; 
  border-radius: 8px; 
  background: #f1f5f9; 
  width: fit-content; 
  font-weight: 600;
}

.expiry-date { font-size: 13px; color: #475569; }

.status-badge {
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
}
.status-badge.active { background: #dcfce7; color: #16a34a; }
.status-badge.inactive { background: #fee2e2; color: #dc2626; }

.action-buttons { display: flex; gap: 8px; }
.btn-action {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-action.edit:hover { background: #eff6ff; border-color: #bfdbfe; }
.btn-action.delete:hover { background: #fee2e2; border-color: #fecaca; }

/* ===== FORM MODAL ===== */
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

.form-modal {
  background: white;
  border-radius: 20px;
  max-width: 650px;
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 32px 64px rgba(0, 0, 0, 0.25);
  animation: modalSlideUp 0.3s ease-out;
}

@keyframes modalSlideUp {
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
}

.modal-header {
  padding: 20px 24px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header .modal-title { font-size: 18px; font-weight: 700; margin: 0; color: #111827; }
.modal-close-btn { background: none; border: none; font-size: 20px; cursor: pointer; color: #9ca3af; transition: color 0.2s;}
.modal-close-btn:hover { color: #dc2626; }

.modal-body-scroll {
  padding: 24px;
  overflow-y: auto;
  flex: 1;
}

.reward-form { display: flex; flex-direction: column; gap: 20px; }

.form-row { display: flex; gap: 16px; }
.form-row .form-group { flex: 1; margin: 0; }

.form-group { display: flex; flex-direction: column; gap: 6px; }
.form-group label { font-size: 13px; font-weight: 600; color: #374151; }
.required { color: #dc2626; }

.form-input, .form-textarea {
  padding: 10px 14px;
  border: 1.5px solid #e5e7eb;
  border-radius: 10px;
  font-size: 14px;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s;
  color: #111827;
}
.form-input:focus, .form-textarea:focus { border-color: #f97316; }
.form-textarea { resize: vertical; min-height: 80px; }

.img-preview {
  margin-top: 10px;
  height: 120px;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
}
.img-preview img { width: 100%; height: 100%; object-fit: cover; }

/* Subitems styling */
.subitems-section {
  background: #f8fafc;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}
.subitems-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
.subitems-header label { font-size: 14px; font-weight: 700; color: #111827; }
.btn-add-subitem {
  background: #eff6ff; color: #2563eb; border: none; padding: 6px 12px; border-radius: 8px; font-size: 12px; font-weight: 600; cursor: pointer;
}
.subitems-hint { font-size: 12px; color: #64748b; margin: 0 0 16px; }

.no-subitems { font-size: 13px; color: #94a3b8; font-style: italic; text-align: center; padding: 20px; background: white; border-radius: 8px; border: 1px dashed #cbd5e1; }

.subitems-list { display: flex; flex-direction: column; gap: 10px; }
.subitem-row { display: flex; gap: 10px; align-items: center; }
.flex-2 { flex: 2; }
.flex-1 { flex: 1; }
.btn-remove-subitem {
  width: 38px; height: 38px; border: none; border-radius: 8px; background: #fee2e2; color: #dc2626; font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}

/* Modal Footer */
.modal-footer {
  padding: 16px 24px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
.btn-cancel { padding: 10px 16px; border: 1.5px solid #e5e7eb; background: white; border-radius: 10px; font-weight: 600; font-size: 14px; color: #374151; cursor: pointer; }
.btn-save { padding: 10px 20px; background: linear-gradient(135deg, #f97316, #ea580c); color: white; border: none; border-radius: 10px; font-weight: 700; font-size: 14px; cursor: pointer; }
.btn-save:disabled { opacity: 0.7; cursor: not-allowed; }

/* Loading dots */
.loading-dots span { animation: blink 1.2s infinite; }
.loading-dots span:nth-child(2) { animation-delay: 0.2s; }
.loading-dots span:nth-child(3) { animation-delay: 0.4s; }
@keyframes blink { 0%, 80%, 100% { opacity: 0; } 40% { opacity: 1; } }

/* Responsive */
@media (max-width: 768px) {
  .table-actions { flex-direction: column; width: 100%; align-items: stretch; }
  .search-box { width: 100%; }
  .form-row { flex-direction: column; gap: 16px; }
}
</style>
