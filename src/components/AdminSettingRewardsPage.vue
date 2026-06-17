<template>
  <div class="admin-setting-container">
    <div class="page-header">
      <div class="header-icon">⚙️</div>
      <div>
        <h1 class="page-title">Setting Rewards</h1>
        <p class="page-subtitle">Kelola jenis dan kategori reward yang tersedia</p>
      </div>
    </div>

    <div class="content-wrapper">
      <!-- Reward Types Section -->
      <div class="settings-section">
        <div class="section-header">
          <h2 class="section-title">Jenis Reward Tersedia</h2>
          <button class="btn-primary" @click="openTypeModal(null)">+ Tambah Jenis</button>
        </div>

        <div class="types-grid">
          <div v-for="type in rewardTypes" :key="type.id" class="type-card">
            <div class="type-icon">{{ type.icon }}</div>
            <div class="type-info">
              <h3 class="type-name">{{ type.name }}</h3>
              <p class="type-desc">{{ type.description }}</p>
            </div>
            <div class="type-stats">
              <span class="stat">{{ type.rewardCount }} Reward</span>
            </div>
            <div class="type-actions">
              <button class="btn-icon edit" @click="openTypeModal(type)" title="Edit">✏️</button>
              <button class="btn-icon delete" @click="deleteType(type.id)" title="Hapus">🗑️</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Reward Variants Section -->
      <div class="settings-section">
        <div class="section-header">
          <h2 class="section-title">Varian Reward</h2>
          <button class="btn-primary" @click="openVariantModal(null)">+ Tambah Varian</button>
        </div>

        <div class="table-responsive">
          <table class="variants-table">
            <thead>
              <tr>
                <th>Nama Varian</th>
                <th>Jenis</th>
                <th>Deskripsi</th>
                <th>Rekomendasi Poin</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="variant in rewardVariants" :key="variant.id">
                <td>
                  <div class="variant-info">
                    <span class="variant-icon">{{ variant.icon }}</span>
                    <span class="variant-name">{{ variant.name }}</span>
                  </div>
                </td>
                <td>
                  <span class="type-badge" :class="variant.type">{{ variant.type }}</span>
                </td>
                <td class="variant-desc">{{ truncate(variant.description, 50) }}</td>
                <td>
                  <span class="points-rec">{{ variant.recommendedPoints }} poin</span>
                </td>
                <td>
                  <div class="action-buttons">
                    <button class="btn-action edit" @click="openVariantModal(variant)" title="Edit">✏️</button>
                    <button class="btn-action delete" @click="deleteVariant(variant.id)" title="Hapus">🗑️</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Settings Options -->
      <div class="settings-section">
        <div class="section-header">
          <h2 class="section-title">Pengaturan Umum</h2>
        </div>

        <div class="settings-options">
          <div class="option-group">
            <label class="option-label">
              <input type="checkbox" v-model="settings.enableAutoApproval" />
              <span>Aktifkan Auto-Approval untuk reward tertentu</span>
            </label>
            <p class="option-desc">Reward dengan kategori merchandise akan otomatis di-approve setelah 24 jam</p>
          </div>

          <div class="option-group">
            <label class="option-label">
              <input type="checkbox" v-model="settings.enableNotification" />
              <span>Kirim notifikasi saat ada klaim reward baru</span>
            </label>
            <p class="option-desc">Admin akan menerima notifikasi real-time untuk setiap klaim reward</p>
          </div>

          <div class="option-group">
            <label class="option-label">
              <input type="checkbox" v-model="settings.enablePointsDecay" />
              <span>Aktifkan poin decay untuk poin yang tidak dipakai</span>
            </label>
            <p class="option-desc">Poin yang tidak dipakai akan berkurang 10% setiap bulannya</p>
          </div>

          <div class="save-settings">
            <button class="btn-save-settings" @click="saveSettings">💾 Simpan Pengaturan</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Type Modal -->
    <Transition name="modal-fade">
      <div v-if="typeModal.show" class="modal-backdrop" @click.self="closeTypeModal">
        <div class="form-modal">
          <div class="modal-header">
            <h3 class="modal-title">{{ typeModal.isEditing ? 'Edit Jenis Reward' : 'Tambah Jenis Reward' }}</h3>
            <button class="modal-close-btn" @click="closeTypeModal">✕</button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveType" class="form">
              <div class="form-group">
                <label>Icon <span class="required">*</span></label>
                <input type="text" v-model="typeFormData.icon" required placeholder="Contoh: 🏆" maxlength="2" class="form-input" />
              </div>

              <div class="form-group">
                <label>Nama Jenis <span class="required">*</span></label>
                <input type="text" v-model="typeFormData.name" required placeholder="Contoh: Voucher E-Commerce" class="form-input" />
              </div>

              <div class="form-group">
                <label>Deskripsi <span class="required">*</span></label>
                <textarea v-model="typeFormData.description" required rows="3" placeholder="Jelaskan jenis reward ini..." class="form-textarea"></textarea>
              </div>

              <div class="form-actions">
                <button type="button" class="btn-cancel" @click="closeTypeModal">Batal</button>
                <button type="submit" class="btn-submit">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Variant Modal -->
    <Transition name="modal-fade">
      <div v-if="variantModal.show" class="modal-backdrop" @click.self="closeVariantModal">
        <div class="form-modal">
          <div class="modal-header">
            <h3 class="modal-title">{{ variantModal.isEditing ? 'Edit Varian' : 'Tambah Varian Reward' }}</h3>
            <button class="modal-close-btn" @click="closeVariantModal">✕</button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveVariant" class="form">
              <div class="form-group">
                <label>Icon <span class="required">*</span></label>
                <input type="text" v-model="variantFormData.icon" required placeholder="Contoh: 🎫" maxlength="2" class="form-input" />
              </div>

              <div class="form-group">
                <label>Nama Varian <span class="required">*</span></label>
                <input type="text" v-model="variantFormData.name" required placeholder="Contoh: Voucher MAP" class="form-input" />
              </div>

              <div class="form-group">
                <label>Jenis Reward <span class="required">*</span></label>
                <select v-model="variantFormData.type" required class="form-input">
                  <option value="">-- Pilih Jenis --</option>
                  <option v-for="type in rewardTypes" :key="type.id" :value="type.name">{{ type.name }}</option>
                </select>
              </div>

              <div class="form-group">
                <label>Deskripsi <span class="required">*</span></label>
                <textarea v-model="variantFormData.description" required rows="2" placeholder="Deskripsi varian ini..." class="form-textarea"></textarea>
              </div>

              <div class="form-group">
                <label>Poin Rekomendasi <span class="required">*</span></label>
                <input type="number" v-model.number="variantFormData.recommendedPoints" required min="0" class="form-input" />
              </div>

              <div class="form-actions">
                <button type="button" class="btn-cancel" @click="closeVariantModal">Batal</button>
                <button type="submit" class="btn-submit">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const typeModal = ref({ show: false, isEditing: false })
const variantModal = ref({ show: false, isEditing: false })

const typeFormData = ref({
  id: null,
  icon: '',
  name: '',
  description: ''
})

const variantFormData = ref({
  id: null,
  icon: '',
  name: '',
  type: '',
  description: '',
  recommendedPoints: 0
})

const settings = ref({
  enableAutoApproval: true,
  enableNotification: true,
  enablePointsDecay: false
})

const rewardTypes = ref([
  {
    id: 1,
    icon: '🎫',
    name: 'Voucher Retail',
    description: 'Voucher dari toko retail dan e-commerce seperti MAP, Indomaret, Alfamart, dan lainnya',
    rewardCount: 8
  },
  {
    id: 2,
    icon: '👜',
    name: 'Fashion & Luxury',
    description: 'Produk fashion dan luxury brands seperti Dior, LV, dan fashion premium lainnya',
    rewardCount: 5
  },
  {
    id: 3,
    icon: '🏨',
    name: 'Travel & Hotel',
    description: 'Paket hotel, penginapan, dan akomodasi perjalanan dari berbagai lokasi',
    rewardCount: 4
  },
  {
    id: 4,
    icon: '🎁',
    name: 'Merchandise',
    description: 'Merchandise eksklusif dan branded items dari Wahana Visi',
    rewardCount: 6
  }
])

const rewardVariants = ref([
  {
    id: 1,
    icon: '🎫',
    name: 'Voucher MAP',
    type: 'Voucher Retail',
    description: 'Voucher belanja di toko MAP senilai nominal yang tersedia',
    recommendedPoints: 500
  },
  {
    id: 2,
    icon: '🎫',
    name: 'Voucher Indomaret',
    type: 'Voucher Retail',
    description: 'Voucher belanja di Indomaret untuk kebutuhan sehari-hari',
    recommendedPoints: 400
  },
  {
    id: 3,
    icon: '🎫',
    name: 'Voucher Alfamart',
    type: 'Voucher Retail',
    description: 'Voucher belanja di Alfamart dengan berbagai pilihan produk',
    recommendedPoints: 400
  },
  {
    id: 4,
    icon: '💼',
    name: 'Dior Handbag',
    type: 'Fashion & Luxury',
    description: 'Handbag eksklusif dari Dior collection terbaru',
    recommendedPoints: 5000
  },
  {
    id: 5,
    icon: '🏨',
    name: 'Hotel Mulia Senayan',
    type: 'Travel & Hotel',
    description: '2 malam menginap di Hotel Mulia Senayan dengan fasilitas 5 bintang',
    recommendedPoints: 3000
  },
  {
    id: 6,
    icon: '👕',
    name: 'Merchandise Eksklusif',
    type: 'Merchandise',
    description: 'T-Shirt, hoodie, dan merchandise branded Wahana Visi',
    recommendedPoints: 500
  }
])

const truncate = (text, length) => {
  return text.length > length ? text.substring(0, length) + '...' : text
}

// Type Modal Functions
const openTypeModal = (type = null) => {
  if (type) {
    typeModal.value.isEditing = true
    typeFormData.value = { ...type }
  } else {
    typeModal.value.isEditing = false
    typeFormData.value = { id: null, icon: '', name: '', description: '' }
  }
  typeModal.value.show = true
}

const closeTypeModal = () => {
  typeModal.value.show = false
}

const saveType = () => {
  if (typeModal.value.isEditing) {
    const index = rewardTypes.value.findIndex(t => t.id === typeFormData.value.id)
    if (index !== -1) {
      rewardTypes.value[index] = { ...typeFormData.value, rewardCount: rewardTypes.value[index].rewardCount }
    }
  } else {
    rewardTypes.value.push({
      ...typeFormData.value,
      id: Math.max(...rewardTypes.value.map(t => t.id)) + 1,
      rewardCount: 0
    })
  }
  closeTypeModal()
}

const deleteType = (id) => {
  if (confirm('Yakin ingin menghapus jenis reward ini?')) {
    rewardTypes.value = rewardTypes.value.filter(t => t.id !== id)
  }
}

// Variant Modal Functions
const openVariantModal = (variant = null) => {
  if (variant) {
    variantModal.value.isEditing = true
    variantFormData.value = { ...variant }
  } else {
    variantModal.value.isEditing = false
    variantFormData.value = { id: null, icon: '', name: '', type: '', description: '', recommendedPoints: 0 }
  }
  variantModal.value.show = true
}

const closeVariantModal = () => {
  variantModal.value.show = false
}

const saveVariant = () => {
  if (variantModal.value.isEditing) {
    const index = rewardVariants.value.findIndex(v => v.id === variantFormData.value.id)
    if (index !== -1) {
      rewardVariants.value[index] = { ...variantFormData.value }
    }
  } else {
    rewardVariants.value.push({
      ...variantFormData.value,
      id: Math.max(...rewardVariants.value.map(v => v.id)) + 1
    })
  }
  closeVariantModal()
}

const deleteVariant = (id) => {
  if (confirm('Yakin ingin menghapus varian ini?')) {
    rewardVariants.value = rewardVariants.value.filter(v => v.id !== id)
  }
}

const saveSettings = () => {
  alert('✅ Pengaturan berhasil disimpan!')
}
</script>

<style scoped>
.admin-setting-container {
  width: 100%;
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.page-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 28px;
  padding: 24px;
  background: var(--gray-0);
  border-radius: var(--border-radius-xl);
  border: var(--border-light);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-base);
}

.header-icon {
  font-size: 40px;
  flex-shrink: 0;
}

.page-title {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--gray-900);
  margin: 0;
}

.page-subtitle {
  font-size: var(--text-sm);
  color: var(--gray-600);
  margin: 4px 0 0 0;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.settings-section {
  background: var(--gray-0);
  border-radius: var(--border-radius-lg);
  padding: 24px;
  box-shadow: var(--shadow-sm);
  border: var(--border-light);
  transition: all var(--transition-base);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 12px;
}

.section-title {
  font-size: var(--text-lg);
  font-weight: var(--font-bold);
  color: var(--gray-900);
  margin: 0;
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%);
  color: white;
  border: none;
  padding: 10px 22px;
  border-radius: var(--border-radius-lg);
  font-weight: var(--font-semibold);
  cursor: pointer;
  transition: all var(--transition-base);
  box-shadow: var(--shadow-orange);
  font-size: var(--text-sm);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  background: linear-gradient(135deg, var(--primary-600) 0%, var(--primary-700) 100%);
}

/* Types Grid */
.types-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.type-card {
  background: linear-gradient(135deg, var(--primary-50) 0%, var(--primary-100) 100%);
  border-radius: var(--border-radius-lg);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: all var(--transition-base);
  border: 2px solid var(--primary-200);
}

.type-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary-300);
}

.type-icon {
  font-size: 32px;
}

.type-info {
  flex: 1;
}

.type-name {
  font-size: var(--text-base);
  font-weight: var(--font-bold);
  color: var(--gray-900);
  margin: 0 0 4px 0;
}

.type-desc {
  font-size: var(--text-xs);
  color: var(--gray-600);
  margin: 0;
  line-height: 1.5;
}

.type-stats {
  display: flex;
  gap: 8px;
}

.stat {
  display: inline-block;
  background: var(--primary-200);
  padding: 6px 12px;
  border-radius: var(--border-radius-full);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  color: var(--primary-700);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.type-actions {
  display: flex;
  gap: 8px;
}

.btn-icon {
  flex: 1;
  background: var(--gray-0);
  border: 2px solid var(--gray-200);
  padding: 8px;
  border-radius: var(--border-radius-md);
  cursor: pointer;
  font-size: 16px;
  transition: all var(--transition-base);
}

.btn-icon:hover {
  background: var(--gray-100);
  border-color: var(--gray-300);
}

/* Variants Table */
.table-responsive {
  overflow-x: auto;
}

.variants-table {
  width: 100%;
  border-collapse: collapse;
}

.variants-table thead {
  background: var(--gray-50);
  border-bottom: 2px solid var(--gray-200);
}

.variants-table th {
  padding: 14px 16px;
  text-align: left;
  font-weight: var(--font-semibold);
  color: var(--gray-700);
  font-size: var(--text-sm);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.variants-table td {
  padding: 14px 16px;
  border-bottom: var(--border-light);
  font-size: var(--text-sm);
  color: var(--gray-700);
}

.variants-table tbody tr {
  transition: all var(--transition-base);
}

.variants-table tbody tr:hover {
  background: var(--gray-50);
}

.variant-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.variant-icon {
  font-size: 20px;
}

.variant-name {
  font-weight: var(--font-semibold);
  color: var(--gray-900);
}

.type-badge {
  display: inline-block;
  padding: 6px 12px;
  border-radius: var(--border-radius-full);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  background: var(--primary-100);
  color: var(--primary-700);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.variant-desc {
  color: var(--gray-600);
  max-width: 250px;
}

.points-rec {
  font-weight: var(--font-semibold);
  color: var(--primary-700);
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.btn-action {
  background: none;
  border: none;
  font-size: 14px;
  cursor: pointer;
  padding: 6px 8px;
  border-radius: var(--border-radius-md);
  transition: all var(--transition-base);
}

.btn-action:hover {
  background: var(--gray-100);
}

.btn-action.edit:hover {
  background: var(--primary-50);
  color: var(--primary-700);
}

.btn-action.delete:hover {
  background: var(--error-50);
  color: var(--error-700);
}

/* Settings Options */
.settings-options {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.option-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  background: var(--primary-50);
  border-radius: var(--border-radius-lg);
  border-left: 4px solid var(--primary-500);
}

.option-label {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  font-weight: var(--font-semibold);
  color: var(--gray-900);
  user-select: none;
}

.option-label input {
  cursor: pointer;
  width: 18px;
  height: 18px;
  accent-color: var(--primary-500);
}

.option-desc {
  margin: 0;
  font-size: var(--text-xs);
  color: var(--gray-600);
}

.save-settings {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}

.btn-save-settings {
  background: linear-gradient(135deg, var(--success-500) 0%, var(--success-600) 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: var(--border-radius-lg);
  font-weight: var(--font-semibold);
  cursor: pointer;
  transition: all var(--transition-base);
  box-shadow: var(--shadow-sm);
  font-size: var(--text-sm);
}

.btn-save-settings:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  background: linear-gradient(135deg, var(--success-600) 0%, var(--success-700) 100%);
}

/* Modal */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.form-modal {
  background: var(--gray-0);
  border-radius: var(--border-radius-xl);
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: var(--shadow-xl);
  border: var(--border-light);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: var(--border-light);
}

.modal-title {
  font-size: var(--text-lg);
  font-weight: var(--font-bold);
  color: var(--gray-900);
  margin: 0;
}

.modal-close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: var(--gray-500);
  transition: all var(--transition-base);
}

.modal-close-btn:hover {
  color: var(--gray-700);
}

.modal-body {
  padding: 24px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-weight: var(--font-semibold);
  color: var(--gray-700);
  font-size: var(--text-sm);
}

.required {
  color: var(--error-600);
}

.form-input,
.form-textarea {
  padding: 10px 12px;
  border: 2px solid var(--gray-200);
  border-radius: var(--border-radius-lg);
  font-size: var(--text-sm);
  transition: all var(--transition-base);
  background: var(--gray-50);
  color: var(--gray-900);
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--primary-500);
  background: var(--gray-0);
  box-shadow: 0 0 0 3px var(--primary-50);
}

.form-textarea {
  resize: vertical;
  font-family: inherit;
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 12px;
}

.btn-cancel,
.btn-submit {
  flex: 1;
  padding: 10px 16px;
  border: none;
  border-radius: var(--border-radius-lg);
  font-weight: var(--font-semibold);
  cursor: pointer;
  transition: all var(--transition-base);
  font-size: var(--text-sm);
}

.btn-cancel {
  background: var(--gray-200);
  color: var(--gray-700);
  transition: all var(--transition-base);
}

.btn-cancel:hover {
  background: var(--gray-300);
  color: var(--gray-800);
}

.btn-submit {
  background: linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%);
  color: white;
  box-shadow: var(--shadow-orange);
}

.btn-submit:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  background: linear-gradient(135deg, var(--primary-600) 0%, var(--primary-700) 100%);
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
