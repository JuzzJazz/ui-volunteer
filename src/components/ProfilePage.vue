<template>
  <div class="profile-container">
    <div class="profile-header">
      <h1 class="page-title">Detail Akun Saya</h1>
    </div>

    <div class="profile-content">
      <div class="profile-card">
        <div class="card-header">
          <h2 class="card-title">Profil</h2>
        </div>

        <div class="profile-layout">
          <!-- Left Column - Profile Info -->
          <div class="profile-info">
            <div class="info-row">
              <div class="info-label">Nama</div>
              <div class="info-value">{{ profileData.name }}</div>
            </div>

            <div class="info-row">
              <div class="info-label">Tanggal Lahir</div>
              <div class="info-value">{{ profileData.birthDate }}</div>
            </div>

            <div class="info-row">
              <div class="info-label">Alamat</div>
              <div class="info-value">{{ profileData.address }}</div>
            </div>

            <div class="info-row">
              <div class="info-label">Kota</div>
              <div class="info-value">{{ profileData.city }}</div>
            </div>

            <div class="info-row">
              <div class="info-label">Media Sosial</div>
              <div class="info-value social-link">{{ profileData.socialMedia }}</div>
            </div>

            <div class="info-row">
              <div class="info-label">Email</div>
              <div class="info-value">{{ profileData.email }}</div>
            </div>

            <div class="info-row">
              <div class="info-label">Telepon</div>
              <div class="info-value">{{ profileData.phone }}</div>
            </div>

            <div class="info-row">
              <div class="info-label">Keahlian</div>
              <div class="info-value">{{ profileData.skills }}</div>
            </div>

            <div class="info-row">
              <div class="info-label">Upload CV terbaru</div>
              <div class="info-value cv-link">
                <a :href="profileData.cvUrl" target="_blank">{{ profileData.cvFileName }}</a>
              </div>
            </div>

            <div class="info-row">
              <div class="info-label">Link Portofolio</div>
              <div class="info-value portfolio-link">
                <a :href="profileData.portfolioUrl" target="_blank">{{ profileData.portfolioUrl }}</a>
              </div>
            </div>
          </div>

          <!-- Right Column - Profile Photo -->
          <div class="profile-photo-section">
            <div class="photo-container">
              <div v-if="!profileData.photoUrl" class="photo-placeholder">
                <div class="placeholder-icon">!</div>
                <div class="placeholder-text">Not Found</div>
              </div>
              <img v-else :src="profileData.photoUrl" alt="Profile Photo" class="profile-photo" />
            </div>
          </div>
        </div>

        <!-- Edit Button -->
        <div class="card-actions">
          <button class="btn-edit" @click="editProfile">
            <span class="btn-icon">✏️</span>
            Edit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const profileData = reactive({
  name: 'Hana Priscilla',
  birthDate: '25 Januari 2025',
  address: 'Kp. Pulo rt/rw: 006/008 kel/kec: rangkapan jaya / pancoranmas no: 63, KOTA DEPOK, PANCORAN MAS, JAWA BARAT, ID, 16435',
  city: 'KODYA DEPOK',
  socialMedia: 'hanaaa',
  email: 'haha@gmail.com',
  phone: '081234567890',
  skills: 'Fotografi, Teknologi Informasi (IT)',
  cvFileName: '251106690C4B262A827_upload_cv.pdf',
  cvUrl: '#',
  portfolioUrl: 'https://hahha.github.io/portofolio/',
  photoUrl: '' // Empty for "Not Found" state
})

const editProfile = () => {
  console.log('Edit profile clicked')
  // Add edit profile logic here
}
</script>

<style scoped>
.profile-container {
  width: 100%;
}

.profile-header {
  margin-bottom: 24px;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  color: #f97316;
  margin: 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.profile-content {
  width: 100%;
}

.profile-card {
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

.profile-layout {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 40px;
  padding: 32px;
}

/* Profile Info */
.profile-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.info-row {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 24px;
  padding: 16px 0;
  border-bottom: 1px solid #f3f4f6;
  transition: all 0.3s ease;
}

.info-row:hover {
  background: linear-gradient(90deg, rgba(249, 115, 22, 0.03) 0%, transparent 100%);
  padding-left: 12px;
  border-left: 3px solid #f97316;
}

.info-row:last-child {
  border-bottom: none;
}

.info-label {
  font-weight: 600;
  color: #6b7280;
  font-size: 15px;
  display: flex;
  align-items: flex-start;
}

.info-value {
  color: #1f2937;
  font-size: 15px;
  line-height: 1.6;
  word-break: break-word;
}

.info-value.social-link {
  color: #4b5563;
}

.info-value.cv-link a,
.info-value.portfolio-link a {
  color: #f97316;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  display: inline-block;
}

.info-value.cv-link a:hover,
.info-value.portfolio-link a:hover {
  color: #ea580c;
  text-decoration: underline;
  transform: translateX(4px);
}

/* Profile Photo Section */
.profile-photo-section {
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.photo-container {
  width: 250px;
  height: 300px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border: 3px solid #f97316;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  position: relative;
}

.photo-container::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent,
    rgba(249, 115, 22, 0.1),
    transparent
  );
  transform: rotate(45deg);
  animation: shine 3s infinite;
}

@keyframes shine {
  0% {
    left: -50%;
  }
  50% {
    left: 150%;
  }
  100% {
    left: 150%;
  }
}

.photo-container:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 16px 40px rgba(249, 115, 22, 0.2);
}

.photo-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f9fafb 0%, #e5e7eb 100%);
}

.placeholder-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #d1d5db 0%, #9ca3af 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  font-weight: 700;
  color: white;
  margin-bottom: 16px;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.placeholder-text {
  color: #6b7280;
  font-size: 16px;
  font-weight: 600;
}

.profile-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Card Actions */
.card-actions {
  padding: 24px 32px;
  background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);
  border-top: 2px solid #fed7aa;
  display: flex;
  justify-content: flex-start;
}

.btn-edit {
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

.btn-edit:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(249, 115, 22, 0.4);
  background: linear-gradient(135deg, #ea580c 0%, #dc2626 100%);
}

.btn-edit:active {
  transform: translateY(0);
}

.btn-icon {
  font-size: 18px;
}

/* Responsive */
@media (max-width: 1024px) {
  .profile-layout {
    grid-template-columns: 1fr;
  }

  .profile-photo-section {
    order: -1;
    margin-bottom: 20px;
  }

  .info-row {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .info-label {
    font-weight: 700;
    color: #f97316;
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 22px;
  }

  .profile-layout {
    padding: 20px;
    gap: 24px;
  }

  .card-header {
    padding: 20px;
  }

  .card-title {
    font-size: 20px;
  }

  .photo-container {
    width: 200px;
    height: 240px;
  }

  .card-actions {
    padding: 20px;
  }

  .btn-edit {
    width: 100%;
    justify-content: center;
  }
}
</style>
