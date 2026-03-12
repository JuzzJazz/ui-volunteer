<template>
  <div class="password-container">
    <div class="password-header">
      <div class="header-icon">🔐</div>
      <div>
        <h1 class="page-title">Pengaturan Keamanan</h1>
        <p class="page-subtitle">Perbarui kata sandi Anda secara berkala untuk menjaga keamanan akun</p>
      </div>
    </div>

    <div class="password-content">
      <div class="password-card">
        <div class="card-body">
          <form @submit.prevent="handleSubmit" class="password-form">
            <div class="form-group">
              <label for="oldPassword" class="form-label">Kata Sandi Lama</label>
              <div class="input-wrapper">
                <span class="input-icon">🔒</span>
                <input
                  :type="showOldPassword ? 'text' : 'password'"
                  id="oldPassword"
                  v-model="formData.oldPassword"
                  placeholder="Masukkan kata sandi lama"
                  class="form-input"
                  required
                />
                <button type="button" @click="showOldPassword = !showOldPassword" class="toggle-password">
                  {{ showOldPassword ? '🙈' : '👁️' }}
                </button>
              </div>
            </div>

            <div class="form-group">
              <label for="newPassword" class="form-label">Kata Sandi Baru</label>
              <div class="input-wrapper">
                <span class="input-icon">✨</span>
                <input
                  :type="showNewPassword ? 'text' : 'password'"
                  id="newPassword"
                  v-model="formData.newPassword"
                  placeholder="Buat kata sandi yang kuat"
                  class="form-input"
                  required
                  minlength="8"
                />
                <button type="button" @click="showNewPassword = !showNewPassword" class="toggle-password">
                  {{ showNewPassword ? '🙈' : '👁️' }}
                </button>
              </div>
              <div class="password-strength" v-if="formData.newPassword">
                <div class="strength-bar">
                  <div class="strength-fill" :class="passwordStrength.class" :style="{ width: passwordStrength.width }"></div>
                </div>
                <div class="strength-meta">
                  <span class="strength-text" :class="passwordStrength.class">{{ passwordStrength.text }}</span>
                  <span class="strength-hint">{{ passwordStrength.hint }}</span>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label for="confirmPassword" class="form-label">Konfirmasi Kata Sandi</label>
              <div class="input-wrapper" :class="{ 'match': passwordsMatch, 'no-match': formData.confirmPassword && !passwordsMatch }">
                <span class="input-icon">🔑</span>
                <input
                  :type="showConfirmPassword ? 'text' : 'password'"
                  id="confirmPassword"
                  v-model="formData.confirmPassword"
                  placeholder="Ketik ulang kata sandi baru"
                  class="form-input"
                  required
                />
                <button type="button" @click="showConfirmPassword = !showConfirmPassword" class="toggle-password">
                  {{ showConfirmPassword ? '🙈' : '👁️' }}
                </button>
              </div>
              <div v-if="formData.confirmPassword && !passwordsMatch" class="error-message">
                <span class="msg-icon">⚠️</span> Kata sandi tidak cocok
              </div>
              <div v-if="formData.confirmPassword && passwordsMatch" class="success-message">
                <span class="msg-icon">✅</span> Kata sandi cocok!
              </div>
            </div>

            <div class="form-actions">
              <button type="submit" class="btn-save" :disabled="!isFormValid">
                <span v-if="!isFormValid">🔒</span>
                <span v-else>💾</span>
                Perbarui Kata Sandi
              </button>
            </div>
          </form>
        </div>

        <div class="requirements-panel">
          <h3 class="requirements-title">
            <span>🛡️</span> Kriteria Keamanan
          </h3>
          <ul class="requirements-list">
            <li :class="{ valid: requirements.minLength }">
              <span class="check-icon">{{ requirements.minLength ? '✅' : '⬜' }}</span>
              Minimal 8 karakter
            </li>
            <li :class="{ valid: requirements.hasUpperCase }">
              <span class="check-icon">{{ requirements.hasUpperCase ? '✅' : '⬜' }}</span>
              Mengandung huruf besar (A-Z)
            </li>
            <li :class="{ valid: requirements.hasLowerCase }">
              <span class="check-icon">{{ requirements.hasLowerCase ? '✅' : '⬜' }}</span>
              Mengandung huruf kecil (a-z)
            </li>
            <li :class="{ valid: requirements.hasNumber }">
              <span class="check-icon">{{ requirements.hasNumber ? '✅' : '⬜' }}</span>
              Mengandung angka (0-9)
            </li>
            <li :class="{ valid: requirements.hasSpecialChar }">
              <span class="check-icon">{{ requirements.hasSpecialChar ? '✅' : '⬜' }}</span>
              Karakter khusus (!@#$%^&*)
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'

const formData = reactive({ oldPassword: '', newPassword: '', confirmPassword: '' })
const showOldPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

const requirements = computed(() => ({
  minLength: formData.newPassword.length >= 8,
  hasUpperCase: /[A-Z]/.test(formData.newPassword),
  hasLowerCase: /[a-z]/.test(formData.newPassword),
  hasNumber: /[0-9]/.test(formData.newPassword),
  hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(formData.newPassword)
}))

const passwordStrength = computed(() => {
  if (!formData.newPassword) return { width: '0%', text: '', class: '', hint: '' }
  let strength = Object.values(requirements.value).filter(Boolean).length
  if (strength <= 2) return { width: '33%', text: 'Lemah', class: 'weak', hint: 'Tambahkan lebih banyak karakter' }
  if (strength <= 3) return { width: '66%', text: 'Sedang', class: 'medium', hint: 'Hampir aman!' }
  return { width: '100%', text: 'Kuat 💪', class: 'strong', hint: 'Kata sandi aman!' }
})

const passwordsMatch = computed(() =>
  formData.newPassword && formData.confirmPassword && formData.newPassword === formData.confirmPassword
)

const isFormValid = computed(() =>
  formData.oldPassword && formData.newPassword && formData.confirmPassword &&
  passwordsMatch.value && Object.values(requirements.value).every(r => r)
)

const handleSubmit = () => {
  if (!isFormValid.value) return
  alert('Kata sandi berhasil diubah!')
  formData.oldPassword = ''
  formData.newPassword = ''
  formData.confirmPassword = ''
}
</script>

<style scoped>
.password-container { width: 100%; }

.password-header {
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --shadow-orange: 0 10px 15px -3px rgba(249, 115, 22, 0.3), 0 4px 6px -4px rgba(249, 115, 22, 0.3);

  --primary-50: #fff7ed;
  --primary-100: #ffedd5;
  --primary-200: #fed7aa;
  --primary-300: #fdba74;
  --primary-400: #fb923c;
  --primary-500: #f97316;
  --primary-600: #ea580c;
  --primary-700: #c2410c;
  --primary-800: #9a3412;
  --primary-900: #7c2d12;

  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-200: #e5e7eb;
  --gray-300: #d1d5db;
  --gray-400: #9ca3af;
  --gray-500: #6b7280;
  --gray-600: #4b5563;
  --gray-700: #374151;
  --gray-800: #1f2937;
  --gray-900: #111827;

  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 28px;
  padding: 24px 28px;
  background: rgba(255,255,255,0.8);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.5);
  box-shadow: var(--shadow-sm);
}

.header-icon { font-size: 40px; flex-shrink: 0; }

.page-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--gray-900);
  margin: 0 0 4px;
  letter-spacing: -0.5px;
}

.page-subtitle {
  font-size: 14px;
  color: var(--gray-500);
  margin: 0;
}

.password-card {
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  box-shadow: var(--shadow-xl);
  border: 1px solid rgba(255,255,255,0.5);
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 320px;
  animation: slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}

.card-body { padding: 40px; }

.password-form { display: flex; flex-direction: column; gap: 24px; }

.form-group { display: flex; flex-direction: column; gap: 8px; }

.form-label {
  font-weight: 600;
  color: var(--gray-700, #374151);
  font-size: 14px;
  letter-spacing: 0.1px;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  background: white;
  transition: all 0.2s ease;
  overflow: hidden;
}

.input-wrapper:focus-within {
  border-color: var(--primary-500);
  box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.1);
}

.input-wrapper.match { border-color: #10b981; }
.input-wrapper.match:focus-within { box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1); }
.input-wrapper.no-match { border-color: #ef4444; }
.input-wrapper.no-match:focus-within { box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1); }

.input-icon {
  padding: 0 14px;
  font-size: 18px;
  flex-shrink: 0;
}

.form-input {
  flex: 1;
  padding: 14px 0;
  border: none;
  background: transparent;
  font-size: 15px;
  color: var(--gray-800);
  font-family: inherit;
  outline: none;
}

.form-input::placeholder { color: #9ca3af; }

.toggle-password {
  background: none;
  border: none;
  padding: 10px 14px;
  cursor: pointer;
  font-size: 18px;
  transition: transform 0.2s;
}

.toggle-password:hover { transform: scale(1.1); }

.password-strength { margin-top: 4px; }

.strength-bar {
  width: 100%;
  height: 6px;
  background: #e5e7eb;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 6px;
}

.strength-fill {
  height: 100%;
  transition: all 0.4s ease;
  border-radius: 10px;
}

.strength-fill.weak { background: linear-gradient(90deg, #ef4444, #dc2626); }
.strength-fill.medium { background: linear-gradient(90deg, #f59e0b, #d97706); }
.strength-fill.strong { background: linear-gradient(90deg, #10b981, #059669); }

.strength-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.strength-text { font-size: 13px; font-weight: 700; }
.strength-text.weak { color: #ef4444; }
.strength-text.medium { color: #f59e0b; }
.strength-text.strong { color: #10b981; }
.strength-hint { font-size: 12px; color: var(--gray-500); }

.error-message, .success-message {
  font-size: 13px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
}
.error-message { color: #ef4444; }
.success-message { color: #10b981; }
.msg-icon { font-size: 14px; }

.form-actions {
  padding-top: 8px;
  border-top: 1px solid var(--gray-100);
}

.btn-save {
  background: var(--primary-500);
  color: white;
  border: none;
  padding: 14px 32px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: var(--shadow-md);
  transition: all 0.2s ease;
  font-family: inherit;
}

.btn-save:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-orange);
  background: var(--primary-600);
}

.btn-save:disabled { opacity: 0.5; cursor: not-allowed; }

.requirements-panel {
  background: var(--gray-50);
  border-left: 1px solid var(--gray-100);
  padding: 40px 28px;
}

.requirements-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--gray-800);
  margin: 0 0 20px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.requirements-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.requirements-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--gray-500);
  font-size: 14px;
  transition: all 0.3s ease;
}

.requirements-list li.valid { color: #10b981; font-weight: 600; }
.check-icon { font-size: 16px; flex-shrink: 0; }

@media (max-width: 900px) {
  .password-card { grid-template-columns: 1fr; }
  .requirements-panel { border-left: none; border-top: 1px solid var(--gray-100); }
}

@media (max-width: 600px) {
  .password-header { padding: 16px; }
  .card-body { padding: 24px 20px; }
  .btn-save { width: 100%; justify-content: center; }
}
</style>
