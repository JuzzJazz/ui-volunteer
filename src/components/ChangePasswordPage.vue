<template>
  <div class="password-container">
    <div class="password-header">
      <h1 class="page-title">Pengaturan Akun</h1>
    </div>

    <div class="password-content">
      <div class="password-card">
        <div class="card-header">
          <h2 class="card-title">Ganti Kata Sandi</h2>
        </div>

        <form @submit.prevent="handleSubmit" class="password-form">
          <div class="form-group">
            <label for="oldPassword" class="form-label">Kata Sandi Lama</label>
            <div class="input-wrapper">
              <input
                :type="showOldPassword ? 'text' : 'password'"
                id="oldPassword"
                v-model="formData.oldPassword"
                placeholder="Kata Sandi Lama"
                class="form-input"
                required
              />
              <button
                type="button"
                @click="showOldPassword = !showOldPassword"
                class="toggle-password"
              >
                <span v-if="showOldPassword">👁️</span>
                <span v-else>👁️‍🗨️</span>
              </button>
            </div>
          </div>

          <div class="form-group">
            <label for="newPassword" class="form-label">Kata Sandi Baru</label>
            <div class="input-wrapper">
              <input
                :type="showNewPassword ? 'text' : 'password'"
                id="newPassword"
                v-model="formData.newPassword"
                placeholder="Kata Sandi Baru"
                class="form-input"
                required
                minlength="8"
              />
              <button
                type="button"
                @click="showNewPassword = !showNewPassword"
                class="toggle-password"
              >
                <span v-if="showNewPassword">👁️</span>
                <span v-else>👁️‍🗨️</span>
              </button>
            </div>
            <div class="password-strength" v-if="formData.newPassword">
              <div class="strength-bar">
                <div 
                  class="strength-fill" 
                  :class="passwordStrength.class"
                  :style="{ width: passwordStrength.width }"
                ></div>
              </div>
              <span class="strength-text" :class="passwordStrength.class">
                {{ passwordStrength.text }}
              </span>
            </div>
          </div>

          <div class="form-group">
            <label for="confirmPassword" class="form-label">Ketik Ulang Kata Sandi Baru</label>
            <div class="input-wrapper">
              <input
                :type="showConfirmPassword ? 'text' : 'password'"
                id="confirmPassword"
                v-model="formData.confirmPassword"
                placeholder="Ketik Ulang Kata Sandi Baru"
                class="form-input"
                required
              />
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="toggle-password"
              >
                <span v-if="showConfirmPassword">👁️</span>
                <span v-else>👁️‍🗨️</span>
              </button>
            </div>
            <div v-if="formData.confirmPassword && !passwordsMatch" class="error-message">
              ⚠️ Kata sandi tidak cocok
            </div>
            <div v-if="formData.confirmPassword && passwordsMatch" class="success-message">
              ✓ Kata sandi cocok
            </div>
          </div>

          <div class="form-actions">
            <button type="submit" class="btn-save" :disabled="!isFormValid">
              <span class="btn-icon">💾</span>
              Simpan
            </button>
          </div>
        </form>

        <!-- Password Requirements -->
        <div class="password-requirements">
          <h3 class="requirements-title">Persyaratan Kata Sandi:</h3>
          <ul class="requirements-list">
            <li :class="{ valid: requirements.minLength }">
              <span class="check-icon">{{ requirements.minLength ? '✓' : '○' }}</span>
              Minimal 8 karakter
            </li>
            <li :class="{ valid: requirements.hasUpperCase }">
              <span class="check-icon">{{ requirements.hasUpperCase ? '✓' : '○' }}</span>
              Mengandung huruf besar
            </li>
            <li :class="{ valid: requirements.hasLowerCase }">
              <span class="check-icon">{{ requirements.hasLowerCase ? '✓' : '○' }}</span>
              Mengandung huruf kecil
            </li>
            <li :class="{ valid: requirements.hasNumber }">
              <span class="check-icon">{{ requirements.hasNumber ? '✓' : '○' }}</span>
              Mengandung angka
            </li>
            <li :class="{ valid: requirements.hasSpecialChar }">
              <span class="check-icon">{{ requirements.hasSpecialChar ? '✓' : '○' }}</span>
              Mengandung karakter khusus (!@#$%^&*)
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed, watch } from 'vue'

const formData = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

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
  const password = formData.newPassword
  if (!password) return { width: '0%', text: '', class: '' }
  
  let strength = 0
  if (requirements.value.minLength) strength++
  if (requirements.value.hasUpperCase) strength++
  if (requirements.value.hasLowerCase) strength++
  if (requirements.value.hasNumber) strength++
  if (requirements.value.hasSpecialChar) strength++
  
  if (strength <= 2) return { width: '33%', text: 'Lemah', class: 'weak' }
  if (strength <= 3) return { width: '66%', text: 'Sedang', class: 'medium' }
  return { width: '100%', text: 'Kuat', class: 'strong' }
})

const passwordsMatch = computed(() => {
  return formData.newPassword && formData.confirmPassword && 
         formData.newPassword === formData.confirmPassword
})

const isFormValid = computed(() => {
  return formData.oldPassword && 
         formData.newPassword && 
         formData.confirmPassword && 
         passwordsMatch.value &&
         Object.values(requirements.value).every(req => req)
})

const handleSubmit = () => {
  if (!isFormValid.value) return
  
  console.log('Changing password...', {
    oldPassword: formData.oldPassword,
    newPassword: formData.newPassword
  })
  
  // Show success message
  alert('Kata sandi berhasil diubah!')
  
  // Reset form
  formData.oldPassword = ''
  formData.newPassword = ''
  formData.confirmPassword = ''
}
</script>

<style scoped>
.password-container {
  width: 100%;
}

.password-header {
  margin-bottom: 24px;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  color: #f97316;
  margin: 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.password-content {
  width: 100%;
}

.password-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(249, 115, 22, 0.15);
  overflow: hidden;
  border: 2px solid rgba(249, 115, 22, 0.1);
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

.card-header {
  background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);
  padding: 24px 32px;
  border-bottom: 2px solid #fed7aa;
}

.card-title {
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.password-form {
  padding: 32px;
}

.form-group {
  margin-bottom: 28px;
}

.form-label {
  display: block;
  font-weight: 600;
  color: #6b7280;
  font-size: 15px;
  margin-bottom: 10px;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.form-input {
  width: 100%;
  padding: 14px 50px 14px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 15px;
  transition: all 0.3s ease;
  background: white;
  color: #1f2937;
}

.form-input:focus {
  outline: none;
  border-color: #f97316;
  box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
}

.form-input::placeholder {
  color: #9ca3af;
}

.toggle-password {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
}

.toggle-password:hover {
  transform: scale(1.1);
}

/* Password Strength */
.password-strength {
  margin-top: 12px;
}

.strength-bar {
  width: 100%;
  height: 6px;
  background: #e5e7eb;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 8px;
}

.strength-fill {
  height: 100%;
  transition: all 0.3s ease;
  border-radius: 3px;
}

.strength-fill.weak {
  background: linear-gradient(90deg, #ef4444 0%, #dc2626 100%);
}

.strength-fill.medium {
  background: linear-gradient(90deg, #f59e0b 0%, #d97706 100%);
}

.strength-fill.strong {
  background: linear-gradient(90deg, #10b981 0%, #059669 100%);
}

.strength-text {
  font-size: 13px;
  font-weight: 600;
}

.strength-text.weak {
  color: #ef4444;
}

.strength-text.medium {
  color: #f59e0b;
}

.strength-text.strong {
  color: #10b981;
}

/* Messages */
.error-message {
  margin-top: 8px;
  color: #ef4444;
  font-size: 13px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
}

.success-message {
  margin-top: 8px;
  color: #10b981;
  font-size: 13px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
}

/* Form Actions */
.form-actions {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 2px solid #f3f4f6;
}

.btn-save {
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  color: white;
  border: none;
  padding: 14px 36px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 4px 16px rgba(249, 115, 22, 0.3);
  transition: all 0.3s ease;
}

.btn-save:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(249, 115, 22, 0.4);
  background: linear-gradient(135deg, #ea580c 0%, #dc2626 100%);
}

.btn-save:active {
  transform: translateY(0);
}

.btn-save:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.btn-icon {
  font-size: 18px;
}

/* Password Requirements */
.password-requirements {
  padding: 24px 32px 32px;
  background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);
  border-top: 2px solid #fed7aa;
}

.requirements-title {
  font-size: 16px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 16px;
}

.requirements-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.requirements-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #6b7280;
  font-size: 14px;
  transition: all 0.3s ease;
}

.requirements-list li.valid {
  color: #10b981;
  font-weight: 600;
}

.check-icon {
  font-size: 18px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #e5e7eb;
  transition: all 0.3s ease;
}

.requirements-list li.valid .check-icon {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
}

/* Responsive */
@media (max-width: 768px) {
  .page-title {
    font-size: 22px;
  }

  .password-form {
    padding: 24px 20px;
  }

  .card-header {
    padding: 20px;
  }

  .card-title {
    font-size: 20px;
  }

  .password-requirements {
    padding: 20px;
  }

  .btn-save {
    width: 100%;
    justify-content: center;
  }
}
</style>
