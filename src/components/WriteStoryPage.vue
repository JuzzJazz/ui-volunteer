<template>
  <div class="write-story-container">
    <div class="page-header">
      <h1 class="page-title">
        <span class="title-icon">✍️</span>
        Tulis Cerita
      </h1>
    </div>

    <div class="story-form-card">
      <div class="form-description">
        <p class="description-text">
          Bagikan testimonialmu tentang kegiatan volunteer bersama Wahana Visi Indonesia.
        </p>
      </div>

      <form @submit.prevent="submitStory" class="story-form">
        <!-- Judul Field -->
        <div class="form-group">
          <label for="title" class="form-label">
            <span class="label-icon">📝</span>
            Judul
          </label>
          <input 
            type="text" 
            id="title"
            v-model="formData.title"
            class="form-input"
            placeholder="Masukkan judul cerita Anda"
            required
          />
        </div>

        <!-- Cerita Anda Field -->
        <div class="form-group">
          <label for="story" class="form-label">
            <span class="label-icon">📖</span>
            Cerita Anda
          </label>
          <div class="editor-wrapper">
            <div class="editor-toolbar">
              <button type="button" class="toolbar-btn" @click="formatText('bold')" title="Bold">
                <strong>B</strong>
              </button>
              <button type="button" class="toolbar-btn" @click="formatText('italic')" title="Italic">
                <em>I</em>
              </button>
              <button type="button" class="toolbar-btn" @click="formatText('underline')" title="Underline">
                <u>U</u>
              </button>
              <div class="toolbar-divider"></div>
              <button type="button" class="toolbar-btn" @click="formatText('insertUnorderedList')" title="Bullet List">
                ≡
              </button>
              <button type="button" class="toolbar-btn" @click="formatText('insertOrderedList')" title="Number List">
                ≣
              </button>
              <div class="toolbar-divider"></div>
              <select class="toolbar-select" @change="changeFontSize($event)">
                <option value="">Font Size</option>
                <option value="1">Small</option>
                <option value="3">Normal</option>
                <option value="5">Large</option>
                <option value="7">Extra Large</option>
              </select>
            </div>
            <div 
              ref="editor"
              class="editor-content"
              contenteditable="true"
              @input="updateStoryContent"
              @paste="handlePaste"
              placeholder="Cerita Anda"
            ></div>
          </div>
        </div>

        <!-- Lampirkan File Field -->
        <div class="form-group">
          <label class="form-label">
            <span class="label-icon">📎</span>
            Lampirkan File
          </label>
          <div class="file-upload-area">
            <input 
              type="file" 
              id="file-upload"
              ref="fileInput"
              @change="handleFileUpload"
              accept="image/*,.pdf,.doc,.docx"
              class="file-input"
              multiple
            />
            <label for="file-upload" class="file-upload-label">
              <div class="upload-icon">📁</div>
              <div class="upload-text">
                <span class="upload-title">Pilih File atau Drag & Drop</span>
                <span class="upload-subtitle">Maks. 1 file (Maks. 2 MB)</span>
              </div>
            </label>
            <button 
              type="button" 
              class="upload-btn"
              @click="triggerFileInput"
            >
              UPLOAD
            </button>
          </div>
          
          <!-- File Preview -->
          <div v-if="uploadedFiles.length > 0" class="uploaded-files">
            <div 
              v-for="(file, index) in uploadedFiles" 
              :key="index"
              class="file-item"
            >
              <div class="file-info">
                <span class="file-icon">{{ getFileIcon(file.type) }}</span>
                <span class="file-name">{{ file.name }}</span>
                <span class="file-size">{{ formatFileSize(file.size) }}</span>
              </div>
              <button 
                type="button" 
                class="remove-file-btn"
                @click="removeFile(index)"
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        <!-- Link File Field -->
        <div class="form-group">
          <label for="link" class="form-label">
            <span class="label-icon">🔗</span>
            Link File
          </label>
          <input 
            type="url" 
            id="link"
            v-model="formData.link"
            class="form-input"
            placeholder="https://example.com/your-file"
          />
          <p class="field-hint">Opsional: Tambahkan link ke file eksternal (Google Drive, Dropbox, dll)</p>
        </div>

        <!-- Submit Button -->
        <div class="form-actions">
          <button type="submit" class="btn-submit" :disabled="isSubmitting">
            <span v-if="!isSubmitting" class="btn-icon">📤</span>
            <span v-if="isSubmitting" class="btn-spinner">⏳</span>
            {{ isSubmitting ? 'Mengirim...' : 'Simpan' }}
          </button>
        </div>
      </form>
    </div>

    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-icon">🎉</div>
        <h3 class="modal-title">Berhasil!</h3>
        <p class="modal-text">Cerita Anda telah berhasil disimpan. Terima kasih telah berbagi pengalaman!</p>
        <button @click="closeModal" class="modal-btn">OK</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const editor = ref(null)
const fileInput = ref(null)
const isSubmitting = ref(false)
const showSuccessModal = ref(false)
const uploadedFiles = ref([])

const formData = reactive({
  title: '',
  story: '',
  link: ''
})

const formatText = (command) => {
  document.execCommand(command, false, null)
  editor.value.focus()
}

const changeFontSize = (event) => {
  const size = event.target.value
  if (size) {
    document.execCommand('fontSize', false, size)
    editor.value.focus()
  }
  event.target.value = ''
}

const updateStoryContent = () => {
  formData.story = editor.value.innerHTML
}

const handlePaste = (event) => {
  event.preventDefault()
  const text = event.clipboardData.getData('text/plain')
  document.execCommand('insertText', false, text)
}

const triggerFileInput = () => {
  fileInput.value.click()
}

const handleFileUpload = (event) => {
  const files = Array.from(event.target.files)
  
  // Validate file size (max 2MB)
  const maxSize = 2 * 1024 * 1024 // 2MB in bytes
  const validFiles = files.filter(file => {
    if (file.size > maxSize) {
      alert(`File "${file.name}" terlalu besar. Maksimal 2MB.`)
      return false
    }
    return true
  })

  // Limit to 1 file
  if (uploadedFiles.value.length + validFiles.length > 1) {
    alert('Maksimal 1 file yang dapat diunggah.')
    uploadedFiles.value = [validFiles[0]]
  } else {
    uploadedFiles.value = [...uploadedFiles.value, ...validFiles]
  }
  
  // Reset input
  event.target.value = ''
}

const removeFile = (index) => {
  uploadedFiles.value.splice(index, 1)
}

const getFileIcon = (type) => {
  if (type.startsWith('image/')) return '🖼️'
  if (type.includes('pdf')) return '📄'
  if (type.includes('word') || type.includes('document')) return '📝'
  return '📎'
}

const formatFileSize = (bytes) => {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

const submitStory = async () => {
  if (!formData.title || !formData.story) {
    alert('Judul dan Cerita harus diisi!')
    return
  }

  isSubmitting.value = true

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500))

  console.log('Story submitted:', {
    ...formData,
    files: uploadedFiles.value
  })

  isSubmitting.value = false
  showSuccessModal.value = true

  // Reset form
  formData.title = ''
  formData.story = ''
  formData.link = ''
  editor.value.innerHTML = ''
  uploadedFiles.value = []
}

const closeModal = () => {
  showSuccessModal.value = false
}
</script>

<style scoped>
.write-story-container {
  width: 100%;
}

.page-header {
  margin-bottom: 24px;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
}

.title-icon {
  font-size: 32px;
  animation: write 2s ease-in-out infinite;
}

@keyframes write {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-5deg); }
  75% { transform: rotate(5deg); }
}

.story-form-card {
  background: white;
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  animation: slideUp 0.5s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.form-description {
  margin-bottom: 32px;
  padding: 20px;
  background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);
  border-radius: 12px;
  border-left: 4px solid #f97316;
}

.description-text {
  font-size: 15px;
  color: #374151;
  margin: 0;
  line-height: 1.6;
  font-weight: 500;
}

.story-form {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-label {
  font-size: 15px;
  font-weight: 700;
  color: #1f2937;
  display: flex;
  align-items: center;
  gap: 8px;
}

.label-icon {
  font-size: 18px;
}

.form-input {
  width: 100%;
  padding: 14px 18px;
  font-size: 15px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  outline: none;
  transition: all 0.3s ease;
  font-family: inherit;
}

.form-input:focus {
  border-color: #f97316;
  box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.1);
}

.form-input::placeholder {
  color: #9ca3af;
}

/* Editor Styles */
.editor-wrapper {
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.editor-wrapper:focus-within {
  border-color: #f97316;
  box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.1);
}

.editor-toolbar {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 12px;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
  flex-wrap: wrap;
}

.toolbar-btn {
  width: 36px;
  height: 36px;
  border: 1px solid #e5e7eb;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

.toolbar-btn:hover {
  background: #f97316;
  color: white;
  border-color: #f97316;
}

.toolbar-divider {
  width: 1px;
  height: 24px;
  background: #e5e7eb;
  margin: 0 8px;
}

.toolbar-select {
  padding: 8px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 13px;
  background: white;
  cursor: pointer;
  outline: none;
}

.toolbar-select:hover {
  border-color: #f97316;
}

.editor-content {
  min-height: 250px;
  max-height: 400px;
  padding: 16px;
  font-size: 15px;
  line-height: 1.7;
  color: #1f2937;
  overflow-y: auto;
  outline: none;
}

.editor-content:empty:before {
  content: attr(placeholder);
  color: #9ca3af;
}

/* File Upload Styles */
.file-upload-area {
  display: flex;
  gap: 12px;
  align-items: stretch;
}

.file-input {
  display: none;
}

.file-upload-label {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  border: 2px dashed #d1d5db;
  border-radius: 12px;
  background: #f9fafb;
  cursor: pointer;
  transition: all 0.3s ease;
}

.file-upload-label:hover {
  border-color: #f97316;
  background: #fff7ed;
}

.upload-icon {
  font-size: 32px;
}

.upload-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.upload-title {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
}

.upload-subtitle {
  font-size: 12px;
  color: #6b7280;
}

.upload-btn {
  padding: 14px 32px;
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
}

.upload-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(249, 115, 22, 0.4);
}

.uploaded-files {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.file-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
  border: 2px solid #86efac;
  border-radius: 12px;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.file-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.file-icon {
  font-size: 24px;
}

.file-name {
  font-size: 14px;
  font-weight: 600;
  color: #166534;
}

.file-size {
  font-size: 12px;
  color: #16a34a;
}

.remove-file-btn {
  width: 28px;
  height: 28px;
  border: none;
  background: #dc2626;
  color: white;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  transition: all 0.2s ease;
}

.remove-file-btn:hover {
  background: #991b1b;
  transform: scale(1.1);
}

.field-hint {
  font-size: 13px;
  color: #6b7280;
  margin: 4px 0 0 0;
  font-style: italic;
}

/* Form Actions */
.form-actions {
  display: flex;
  justify-content: center;
  padding-top: 20px;
  border-top: 2px solid #e5e7eb;
}

.btn-submit {
  padding: 16px 48px;
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  color: white;
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
  box-shadow: 0 4px 16px rgba(249, 115, 22, 0.4);
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(249, 115, 22, 0.5);
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-icon {
  font-size: 20px;
}

.btn-spinner {
  font-size: 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Modal Styles */
.modal-overlay {
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
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-content {
  background: white;
  border-radius: 20px;
  padding: 40px;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: scaleIn 0.3s ease-out;
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.modal-icon {
  font-size: 64px;
  margin-bottom: 20px;
  animation: bounce 0.6s ease-in-out;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.modal-title {
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 12px 0;
}

.modal-text {
  font-size: 15px;
  color: #6b7280;
  margin: 0 0 24px 0;
  line-height: 1.6;
}

.modal-btn {
  padding: 12px 40px;
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.modal-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(249, 115, 22, 0.4);
}

/* Responsive */
@media (max-width: 768px) {
  .story-form-card {
    padding: 24px;
  }

  .file-upload-area {
    flex-direction: column;
  }

  .upload-btn {
    width: 100%;
  }

  .editor-toolbar {
    gap: 2px;
    padding: 8px;
  }

  .toolbar-btn {
    width: 32px;
    height: 32px;
    font-size: 12px;
  }

  .file-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
}
</style>
