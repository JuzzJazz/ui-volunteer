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
  padding: 20px 24px;
  background: rgba(255,255,255,0.8);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.5);
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
}

.header-icon {
  font-size: 40px;
}

.page-title {
  font-size: 24px;
  font-weight: 700;
  color: #2d3748;
  margin: 0;
}

.page-subtitle {
  font-size: 14px;
  color: #718096;
  margin: 4px 0 0 0;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.settings-section {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
  border: 1px solid #e2e8f0;
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
  font-size: 18px;
  font-weight: 700;
  color: #2d3748;
  margin: 0;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

/* Types Grid */
.types-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.type-card {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
}

.type-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.type-icon {
  font-size: 32px;
}

.type-info {
  flex: 1;
}

.type-name {
  font-size: 16px;
  font-weight: 700;
  color: #2d3748;
  margin: 0 0 4px 0;
}

.type-desc {
  font-size: 13px;
  color: #718096;
  margin: 0;
  line-height: 1.4;
}

.type-stats {
  display: flex;
  gap: 8px;
}

.stat {
  display: inline-block;
  background: rgba(0, 0, 0, 0.05);
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  color: #4a5568;
}

.type-actions {
  display: flex;
  gap: 8px;
}

.btn-icon {
  flex: 1;
  background: white;
  border: 1px solid #e2e8f0;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s ease;
}

.btn-icon:hover {
  background: #f7fafc;
  border-color: #cbd5e0;
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
  background: #f7fafc;
  border-bottom: 2px solid #e2e8f0;
}

.variants-table th {
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
  color: #4a5568;
  font-size: 13px;
}

.variants-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #e2e8f0;
  font-size: 14px;
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
  font-weight: 600;
  color: #2d3748;
}

.type-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  background: #e0e7ff;
  color: #4f46e5;
}

.variant-desc {
  color: #718096;
  max-width: 250px;
}

.points-rec {
  font-weight: 600;
  color: #c05621;
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
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.btn-action:hover {
  background: #f0f0f0;
}

.btn-action.edit:hover {
  background: #e0e7ff;
}

.btn-action.delete:hover {
  background: #fee2e2;
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
  background: #f7fafc;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.option-label {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  font-weight: 600;
  color: #2d3748;
}

.option-label input {
  cursor: pointer;
  width: 18px;
  height: 18px;
}

.option-desc {
  margin: 0;
  font-size: 13px;
  color: #718096;
}

.save-settings {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}

.btn-save-settings {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-save-settings:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
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
  background: white;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e2e8f0;
}

.modal-title {
  font-size: 18px;
  font-weight: 700;
  color: #2d3748;
  margin: 0;
}

.modal-close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #718096;
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
  gap: 6px;
}

.form-group label {
  font-weight: 600;
  color: #4a5568;
  font-size: 14px;
}

.required {
  color: #e53e3e;
}

.form-input,
.form-textarea {
  padding: 10px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s ease;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
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
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-cancel {
  background: #e2e8f0;
  color: #4a5568;
}

.btn-cancel:hover {
  background: #cbd5e0;
}

.btn-submit {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
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
