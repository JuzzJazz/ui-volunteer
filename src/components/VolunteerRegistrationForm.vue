<template>
  <div class="form-container">
    <div class="form-wrapper">
      <h1 class="form-title">Ceritakan Kepada Kami Mengenai Diri Anda!</h1>
      
      <!-- Stepper -->
      <div class="stepper">
        <div 
          v-for="(step, index) in steps" 
          :key="index"
          class="step"
          :class="{ 
            'active': currentStep === index + 1,
            'completed': currentStep > index + 1
          }"
          @click="goToStep(index + 1)"
        >
          <div class="step-number">
            <span v-if="currentStep > index + 1">✓</span>
            <span v-else>{{ index + 1 }}</span>
          </div>
          <div class="step-label">{{ step }}</div>
          <div v-if="index < steps.length - 1" class="step-line"></div>
        </div>
      </div>
      
      <form @submit.prevent="submitForm" class="volunteer-form" novalidate>
        
        <!-- Step 1: Personal Information -->
        <div v-show="currentStep === 1" class="step-content">
          <h2 class="section-title">Informasi Personal</h2>
          
          <!-- Row 1: Status -->
          <div class="form-row">
            <div class="form-group">
              <label for="status" class="required">Status</label>
              <select v-model="formData.status" id="status" required>
                <option value="">No</option>
                <option value="pelajar">Pelajar</option>
                <option value="mahasiswa">Mahasiswa</option>
                <option value="pekerja">Pekerja</option>
                <option value="lainnya">Lainnya</option>
              </select>
            </div>
            <div class="form-group"></div>
          </div>
          
          <!-- Row 2: Nama Lengkap -->
          <div class="form-row">
            <div class="form-group">
              <label for="fullName" class="required">Nama Lengkap</label>
              <input type="text" v-model="formData.fullName" id="fullName" placeholder="Nama Lengkap" required />
            </div>
            <div class="form-group"></div>
          </div>
          
          <!-- Row 3: Birth Date -->
          <div class="form-row">
            <div class="form-group">
              <label for="birthDate" class="required">Tanggal Lahir</label>
              <input 
                type="date" 
                v-model="formData.birthDate" 
                id="birthDate" 
                required 
                :max="maxDate"
              />
            </div>
            <div class="form-group"></div>
          </div>

          <!-- Row 4: Gender -->
          <div class="form-row">
            <div class="form-group">
              <label class="required">Jenis Kelamin</label>
              <div class="radio-group">
                <label class="radio-label">
                  <input type="radio" v-model="formData.gender" value="laki-laki" />
                  Laki-Laki
                </label>
                <label class="radio-label">
                  <input type="radio" v-model="formData.gender" value="perempuan" />
                  Perempuan
                </label>
              </div>
            </div>
            <div class="form-group"></div>
          </div>
          
          <!-- Row 5: Religion -->
          <div class="form-row">
            <div class="form-group">
              <label for="religion" class="required">Agama</label>
              <select v-model="formData.religion" id="religion" required>
                <option value="">Pilih Agama</option>
                <option value="islam">Islam</option>
                <option value="kristen">Kristen</option>
                <option value="katolik">Katolik</option>
                <option value="hindu">Hindu</option>
                <option value="buddha">Buddha</option>
                <option value="konghucu">Konghucu</option>
              </select>
            </div>
            <div class="form-group"></div>
          </div>

          <!-- Row 6: Password -->
          <div class="form-row">
            <div class="form-group">
              <label for="password">Kata Sandi</label>
              <input type="password" v-model="formData.password" id="password" placeholder="Kata Sandi" />
            </div>
            <div class="form-group"></div>
          </div>
          
          <!-- Row 7: Profession -->
          <div class="form-row">
            <div class="form-group">
              <label for="profession" class="required">Profesi</label>
              <input type="text" v-model="formData.profession" id="profession" placeholder="Profesi" required />
            </div>
            <div class="form-group"></div>
          </div>

          <!-- Row 8: Volunteer Activities -->
          <div class="form-row">
            <div class="form-group">
              <label for="activities" class="required">Kegiatan relawan yang diminati</label>
              <select v-model="formData.activities" id="activities" required>
                <option value="">Volunteer › KinCir Lapangan</option>
                <option value="pendidikan">Pendidikan</option>
                <option value="kesehatan">Kesehatan</option>
                <option value="lingkungan">Lingkungan</option>
                <option value="sosial">Sosial</option>
              </select>
            </div>
            <div class="form-group"></div>
          </div>
          
          <!-- Row 9: Company -->
          <div class="form-row">
            <div class="form-group">
              <label for="company" class="required">Nama perusahaan / lembaga tempat Anda bekerja / studi sekarang</label>
              <input type="text" v-model="formData.company" id="company" placeholder="Nama perusahaan / lembaga tempat Anda bekerja / studi sekarang" required />
            </div>
            <div class="form-group"></div>
          </div>

          <!-- ID Card Section -->
          <div class="subsection">
            <h3 class="subsection-title">Identitas & Dokumen</h3>
            
            <!-- Type ID Card -->
            <div class="form-row">
              <div class="form-group">
                <label for="idCardType" class="required">Type ID Card</label>
                <select v-model="formData.idCardType" id="idCardType" required>
                  <option value="">KTP</option>
                  <option value="ktp">KTP</option>
                  <option value="sim">SIM</option>
                  <option value="passport">Passport</option>
                </select>
              </div>
              <div class="form-group"></div>
            </div>
            
            <!-- Number ID Card -->
            <div class="form-row">
              <div class="form-group">
                <label for="idCardNumber" class="required">Number ID Card</label>
                <input type="text" v-model="formData.idCardNumber" id="idCardNumber" placeholder="KTP/SIM/Passport" required />
              </div>
              <div class="form-group"></div>
            </div>
            
            <!-- Upload ID Card -->
            <div class="form-row">
              <div class="form-group">
                <label for="idCardUpload" class="required">Upload ID Card <span class="file-info">tipe file : png, jpg, jpeg, pdf, doc, docx | ukuran maksimal : 25 MB</span></label>
                <div class="upload-area">
                  <input type="file" @change="handleFileUpload" id="idCardUpload" accept="image/*,.pdf,.doc,.docx" />
                  <button type="button" class="upload-btn">UPLOAD</button>
                </div>
              </div>
              <div class="form-group"></div>
            </div>

            <!-- Upload CV -->
            <div class="form-row">
              <div class="form-group">
                <label for="cv" class="required">Upload CV terbaru <span class="file-info">tipe file : png, jpg, jpeg, pdf, doc, docx | ukuran maksimal : 25 MB</span></label>
                <div class="upload-area">
                  <input type="file" @change="handleCVUpload" id="cv" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" />
                  <button type="button" class="upload-btn">UPLOAD</button>
                </div>
              </div>
              <div class="form-group"></div>
            </div>
            
            <!-- Link Portfolio -->
            <div class="form-row">
              <div class="form-group">
                <label for="portfolio">Link Portofolio</label>
                <input type="url" v-model="formData.portfolio" id="portfolio" placeholder="Khusus untuk relawan desain/foto/video" />
              </div>
              <div class="form-group"></div>
            </div>
          </div>
        </div>

        <!-- Step 2: Address Information -->
        <div v-show="currentStep === 2" class="step-content">
          <h2 class="section-title">Alamat</h2>
          
          <!-- Row 1: Address -->
          <div class="form-row">
            <div class="form-group">
              <label for="address" class="required">Alamat</label>
              <textarea v-model="formData.address" id="address" placeholder="Alamat" rows="3" required></textarea>
            </div>
            <div class="form-group"></div>
          </div>
          
          <!-- Row 2: Province -->
          <div class="form-row">
            <div class="form-group">
              <label for="province" class="required">Provinsi</label>
              <select v-model="formData.province" id="province" required>
                <option value="">— Provinsi —</option>
                <option value="jawa-barat">Jawa Barat</option>
                <option value="jawa-tengah">Jawa Tengah</option>
                <option value="jawa-timur">Jawa Timur</option>
                <option value="dki-jakarta">DKI Jakarta</option>
                <option value="banten">Banten</option>
              </select>
            </div>
            <div class="form-group"></div>
          </div>

          <!-- Row 3: City -->
          <div class="form-row">
            <div class="form-group">
              <label for="city" class="required">Kota/Kabupaten</label>
              <select v-model="formData.city" id="city" required>
                <option value="">— Kota/Kabupaten —</option>
                <option value="bandung">Bandung</option>
                <option value="jakarta">Jakarta</option>
                <option value="surabaya">Surabaya</option>
                <option value="yogyakarta">Yogyakarta</option>
              </select>
            </div>
            <div class="form-group"></div>
          </div>
        </div>

        <!-- Step 3: Contact Information -->
        <div v-show="currentStep === 3" class="step-content">
          <h2 class="section-title">Kontak</h2>
          
          <!-- Personal Contact -->
          <div class="subsection">
            <h3 class="subsection-title">Kontak Pribadi</h3>
            
            <!-- Email -->
            <div class="form-row">
              <div class="form-group">
                <label for="email" class="required">Email</label>
                <input type="email" v-model="formData.email" id="email" placeholder="Email" required />
              </div>
              <div class="form-group"></div>
            </div>
            
            <!-- Phone -->
            <div class="form-row">
              <div class="form-group">
                <label for="phone" class="required">No Telp</label>
                <input type="tel" v-model="formData.phone" id="phone" placeholder="Mobile/WhatsApp" required />
              </div>
              <div class="form-group"></div>
            </div>
            
            <!-- Social Media -->
            <div class="form-row">
              <div class="form-group">
                <label for="socialMedia" class="required">Media Sosial</label>
                <input type="text" v-model="formData.socialMedia" id="socialMedia" placeholder="Facebook/Instagram link" required />
              </div>
              <div class="form-group"></div>
            </div>
            
            <!-- Sponsor WHI -->
            <div class="form-row">
              <div class="form-group">
                <label>Apakah anda seorang sponsor anak WHI ?</label>
                <div class="radio-group">
                  <label class="radio-label">
                    <input type="radio" v-model="formData.isSponsor" value="yes" />
                    Yes
                  </label>
                  <label class="radio-label">
                    <input type="radio" v-model="formData.isSponsor" value="no" />
                    No
                  </label>
                </div>
              </div>
              <div class="form-group"></div>
            </div>
          </div>

          <!-- Emergency Contact Section -->
          <div class="subsection">
            <h3 class="subsection-title">Kontak Darurat</h3>
            <div class="contact-notice">
              <p><strong>Silakan tuliskan dua orang (supervisor/atasan, guru, atau mentor) yang mengenal Anda.</strong></p>
              <p><strong style="color: #f97316;">Mereka tidak boleh memiliki hubungan cukup dekat dengan Anda (misalnya Anggota keluarga atau teman terdekat).</strong></p>
            </div>
            
            <!-- Contact 1 -->
            <h4 class="contact-title">KONTAK DARURAT 1</h4>
            <div class="form-row">
              <div class="form-group">
                <label for="contact1Name" class="required">Nama Lengkap</label>
                <input type="text" v-model="formData.emergencyContact1.name" id="contact1Name" placeholder="Nama Lengkap" required />
              </div>
              
              <div class="form-group">
                <label for="contact1Phone" class="required">Telepon</label>
                <input type="tel" v-model="formData.emergencyContact1.phone" id="contact1Phone" placeholder="Telepon" required />
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="contact1Address" class="required">Alamat</label>
                <input type="text" v-model="formData.emergencyContact1.address" id="contact1Address" placeholder="Alamat" required />
              </div>
              
              <div class="form-group">
                <label for="contact1Profession" class="required">Profesi</label>
                <input type="text" v-model="formData.emergencyContact1.profession" id="contact1Profession" placeholder="Profesi" required />
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="contact1Relationship" class="required">Hubungan</label>
                <input type="text" v-model="formData.emergencyContact1.relationship" id="contact1Relationship" placeholder="Hubungan" required />
              </div>
              
              <div class="form-group">
                <label for="contact1YearKnown" class="required">Tahun dikenal</label>
                <input type="text" v-model="formData.emergencyContact1.yearKnown" id="contact1YearKnown" placeholder="Tahun dikenal" required />
              </div>
            </div>
            
            <!-- Contact 2 -->
            <h4 class="contact-title">KONTAK DARURAT 2</h4>
            <div class="form-row">
              <div class="form-group">
                <label for="contact2Name" class="required">Nama Lengkap</label>
                <input type="text" v-model="formData.emergencyContact2.name" id="contact2Name" placeholder="Nama Lengkap" required />
              </div>
              
              <div class="form-group">
                <label for="contact2Phone" class="required">Telepon</label>
                <input type="tel" v-model="formData.emergencyContact2.phone" id="contact2Phone" placeholder="Telepon" required />
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="contact2Address" class="required">Alamat</label>
                <input type="text" v-model="formData.emergencyContact2.address" id="contact2Address" placeholder="Alamat" required />
              </div>
              
              <div class="form-group">
                <label for="contact2Profession" class="required">Profesi</label>
                <input type="text" v-model="formData.emergencyContact2.profession" id="contact2Profession" placeholder="Profesi" required />
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="contact2Relationship" class="required">Hubungan</label>
                <input type="text" v-model="formData.emergencyContact2.relationship" id="contact2Relationship" placeholder="Hubungan" required />
              </div>
              
              <div class="form-group">
                <label for="contact2YearKnown" class="required">Tahun dikenal</label>
                <input type="text" v-model="formData.emergencyContact2.yearKnown" id="contact2YearKnown" placeholder="Tahun dikenal" required />
              </div>
            </div>
          </div>
        </div>

        <!-- Step 4: Skills & Agreements -->
        <div v-show="currentStep === 4" class="step-content">
          <h2 class="section-title">Keahlian & Persetujuan</h2>
          
          <!-- Motivation -->
          <div class="form-group full-width">
            <label for="motivation" class="required">Apa yang mendorong Anda untuk mendaftar sebagai sukarelawan</label>
            <textarea v-model="formData.motivation" id="motivation" rows="4" required></textarea>
          </div>

          <!-- Skills Section -->
          <div class="form-group full-width">
            <label>Skill (Anda dapat memilih lebih dari satu)</label>
            <div class="skills-grid">
              <div class="skills-column">
                <label class="checkbox-label">
                  <input type="checkbox" v-model="formData.skills" value="administrasi" />
                  Administrasi
                </label>
                <label class="checkbox-label">
                  <input type="checkbox" v-model="formData.skills" value="akuntanFinansial" />
                  Akuntan/Financial
                </label>
                <label class="checkbox-label">
                  <input type="checkbox" v-model="formData.skills" value="animasi" />
                  Animasi
                </label>
                <label class="checkbox-label">
                  <input type="checkbox" v-model="formData.skills" value="bicaraDidepanUmum" />
                  Bicara Didepan Umum
                </label>
                <label class="checkbox-label">
                  <input type="checkbox" v-model="formData.skills" value="dataAnalisis" />
                  Data Analisis
                </label>
                <label class="checkbox-label">
                  <input type="checkbox" v-model="formData.skills" value="desainGrafis" />
                  Desain Grafis
                </label>
                <label class="checkbox-label">
                  <input type="checkbox" v-model="formData.skills" value="editVideo" />
                  Edit Video
                </label>
                <label class="checkbox-label">
                  <input type="checkbox" v-model="formData.skills" value="eventPlanning" />
                  Event Planning & Management
                </label>
                <label class="checkbox-label">
                  <input type="checkbox" v-model="formData.skills" value="fotografi" />
                  Fotografi
                </label>
                <label class="checkbox-label">
                  <input type="checkbox" v-model="formData.skills" value="kepemimpinan" />
                  Kepemimpinan
                </label>
              </div>
              
              <div class="skills-column">
                <label class="checkbox-label">
                  <input type="checkbox" v-model="formData.skills" value="konseling" />
                  Konseling
                </label>
                <label class="checkbox-label">
                  <input type="checkbox" v-model="formData.skills" value="mediaDigital" />
                  Media Digital
                </label>
                <label class="checkbox-label">
                  <input type="checkbox" v-model="formData.skills" value="mengajar" />
                  Mengajar
                </label>
                <label class="checkbox-label">
                  <input type="checkbox" v-model="formData.skills" value="menulis" />
                  Menulis
                </label>
                <label class="checkbox-label">
                  <input type="checkbox" v-model="formData.skills" value="pelayananKesehatan" />
                  Pelayanan kesehatan
                </label>
                <label class="checkbox-label">
                  <input type="checkbox" v-model="formData.skills" value="pemasaran" />
                  Pemasaran
                </label>
                <label class="checkbox-label">
                  <input type="checkbox" v-model="formData.skills" value="penerjemahan" />
                  Penerjamah English/Indonesia
                </label>
                <label class="checkbox-label">
                  <input type="checkbox" v-model="formData.skills" value="pengembanganMasyarakat" />
                  Pengembangan Masyarakat
                </label>
                <label class="checkbox-label">
                  <input type="checkbox" v-model="formData.skills" value="teknologiInformasi" />
                  Teknologi Informasi (IT)
                </label>
                <label class="checkbox-label">
                  <input type="checkbox" v-model="formData.skills" value="videografi" />
                  Videografi
                </label>
              </div>
            </div>
            
            <div class="form-group">
              <label for="others">Lainnya (Silahkan Sebutkan)</label>
              <input type="text" v-model="formData.others" id="others" />
            </div>
          </div>

          <!-- Agreement Checkboxes -->
          <div class="checkbox-agreements">
            <label class="checkbox-label">
              <input type="checkbox" v-model="formData.agreements.privacy" required />
              <span class="checkbox-text">Saya setuju dengan <span class="link-text">Kebijakan privasi</span></span>
            </label>
            
            <label class="checkbox-label">
              <input type="checkbox" v-model="formData.agreements.childProtection" required />
              <span class="checkbox-text">Saya telah membaca, mengerti dan menyetujui <span class="link-text">Kebijakan Perlindungan Anak dan Penerima Manfaat Dewasa</span> dinyatakan oleh Wahaha MisiihIndonesia</span>
            </label>
            
            <label class="checkbox-label">
              <input type="checkbox" v-model="formData.agreements.declaration" required />
              <span class="checkbox-text">Karena itu saya telah membaca bahwa saya mengerti dan menyatakan bahwa saya tidak pernah memiliki catatan atau keterasan terhadap anak atal, keterasan terhadap anak seperti yang dinyatakan dalam <span class="link-text">Pernyataan Janji</span> dokumen oleh Wahaha MisiihIndonesia</span>
            </label>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <div class="navigation-buttons">
          <button 
            type="button" 
            class="nav-btn prev-btn" 
            @click="prevStep"
            v-show="currentStep > 1"
          >
            ← Sebelumnya
          </button>
          
          <button 
            type="button" 
            class="nav-btn next-btn" 
            @click="nextStep"
            v-show="currentStep < 4"
          >
            Selanjutnya →
          </button>
          
          <button 
            type="submit" 
            class="submit-btn"
            v-show="currentStep === 4"
          >
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'

const currentStep = ref(1)
const steps = [
  'Informasi Personal',
  'Alamat',
  'Kontak',
  'Keahlian & Persetujuan'
]

// Get max date (today) for birthdate validation
const maxDate = computed(() => {
  const today = new Date()
  return today.toISOString().split('T')[0]
})

const formData = reactive({
  status: '',
  fullName: '',
  birthDate: '',
  gender: '',
  email: '',
  religion: '',
  password: '',
  profession: '',
  activities: '',
  company: '',
  address: '',
  province: '',
  city: '',
  phone: '',
  socialMedia: '',
  isSponsor: '',
  motivation: '',
  skills: [],
  others: '',
  idCardType: '',
  idCardNumber: '',
  idCard: null,
  cv: null,
  portfolio: '',
  emergencyContact1: {
    name: '',
    phone: '',
    address: '',
    profession: '',
    relationship: '',
    yearKnown: ''
  },
  emergencyContact2: {
    name: '',
    phone: '',
    address: '',
    profession: '',
    relationship: '',
    yearKnown: ''
  },
  agreements: {
    privacy: false,
    childProtection: false,
    declaration: false
  }
})

const handleFileUpload = (event) => {
  formData.idCard = event.target.files[0]
}

const handleCVUpload = (event) => {
  formData.cv = event.target.files[0]
}

const nextStep = () => {
  if (currentStep.value < 4) {
    currentStep.value++
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const goToStep = (step) => {
  if (step >= 1 && step <= 4) {
    currentStep.value = step
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

import { useRouter } from 'vue-router'
const router = useRouter()

const submitForm = () => {
  console.log('Form submitted:', formData)
  console.log('Redirecting to dashboard...')
  
  // Navigate to dashboard after form submission
  router.push('/dashboard')
  console.log('Navigated to dashboard successfully!')
}
</script>

<style scoped>
.form-container {
  max-width: 1100px;
  margin: 40px auto;
  background: linear-gradient(135deg, #ffffff 0%, #fef9f5 100%);
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(249, 115, 22, 0.12), 0 0 0 1px rgba(249, 115, 22, 0.05);
  overflow: hidden;
  position: relative;
  border: 1px solid rgba(249, 115, 22, 0.08);
}

.form-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 8px;
  background: linear-gradient(90deg, #f97316 0%, #fb923c 25%, #fdba74 50%, #fb923c 75%, #f97316 100%);
  background-size: 300% 100%;
  animation: gradientShift 4s ease infinite;
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.form-wrapper {
  padding: 60px 70px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  position: relative;
}

.form-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at top right, rgba(249, 115, 22, 0.03), transparent 60%),
              radial-gradient(circle at bottom left, rgba(251, 146, 60, 0.03), transparent 60%);
  pointer-events: none;
}

.form-title {
  font-size: 36px;
  font-weight: 900;
  text-align: center;
  margin-bottom: 60px;
  background: linear-gradient(135deg, #f97316 0%, #fb923c 50%, #ea580c 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  padding-bottom: 28px;
  letter-spacing: -1px;
  line-height: 1.2;
  text-shadow: 0 0 30px rgba(249, 115, 22, 0.1);
}

.form-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 5px;
  background: linear-gradient(90deg, transparent, #f97316, #fb923c, #f97316, transparent);
  border-radius: 10px;
  box-shadow: 0 3px 12px rgba(249, 115, 22, 0.4);
  animation: titleLineGlow 3s ease infinite;
}

@keyframes titleLineGlow {
  0%, 100% { 
    box-shadow: 0 3px 12px rgba(249, 115, 22, 0.4);
    width: 100px;
  }
  50% { 
    box-shadow: 0 3px 20px rgba(249, 115, 22, 0.6);
    width: 120px;
  }
}

/* Stepper Styles */
.stepper {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 70px;
  padding: 0 40px;
  position: relative;
}

.step {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.step:hover .step-number {
  transform: scale(1.2) rotate(5deg);
  box-shadow: 0 10px 25px rgba(249, 115, 22, 0.3);
}

.step-number {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
  color: #9ca3af;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 22px;
  margin-bottom: 16px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 2;
  position: relative;
  border: 4px solid white;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1), inset 0 2px 4px rgba(0, 0, 0, 0.05);
}

.step.active .step-number {
  background: linear-gradient(135deg, #f97316 0%, #fb923c 100%);
  color: white;
  box-shadow: 0 10px 30px rgba(249, 115, 22, 0.5), 
              0 0 0 8px rgba(249, 115, 22, 0.12),
              inset 0 2px 8px rgba(0, 0, 0, 0.15);
  transform: scale(1.2);
  border-color: rgba(255, 255, 255, 0.5);
  animation: pulse 2.5s ease infinite;
}

@keyframes pulse {
  0%, 100% { 
    box-shadow: 0 10px 30px rgba(249, 115, 22, 0.5), 
                0 0 0 8px rgba(249, 115, 22, 0.12),
                inset 0 2px 8px rgba(0, 0, 0, 0.15);
  }
  50% { 
    box-shadow: 0 12px 40px rgba(249, 115, 22, 0.6), 
                0 0 0 12px rgba(249, 115, 22, 0.08),
                inset 0 2px 8px rgba(0, 0, 0, 0.15);
  }
}

.step.completed .step-number {
  background: linear-gradient(135deg, #10b981 0%, #34d399 100%);
  color: white;
  border-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 8px 20px rgba(16, 185, 129, 0.4),
              inset 0 2px 4px rgba(0, 0, 0, 0.1);
  animation: completedBounce 0.6s ease;
}

@keyframes completedBounce {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.25); }
}

.step-label {
  font-size: 14px;
  font-weight: 700;
  color: #9ca3af;
  text-align: center;
  max-width: 130px;
  line-height: 1.4;
  transition: all 0.3s ease;
  position: relative;
}

.step.active .step-label {
  color: #f97316;
  font-weight: 800;
  transform: translateY(-3px);
  text-shadow: 0 2px 8px rgba(249, 115, 22, 0.2);
}

.step.completed .step-label {
  color: #10b981;
  font-weight: 700;
}

.step-line {
  position: absolute;
  top: 32px;
  left: calc(50% + 32px);
  width: calc(100% - 64px);
  height: 5px;
  background: linear-gradient(90deg, #e5e7eb 0%, #d1d5db 100%);
  z-index: 1;
  transition: all 0.6s ease;
  border-radius: 10px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.08);
}

.step.completed .step-line {
  background: linear-gradient(90deg, #10b981 0%, #34d399 100%);
  box-shadow: 0 3px 10px rgba(16, 185, 129, 0.35);
}

.step.active .step-line {
  background: linear-gradient(to right, #10b981 0%, #34d399 30%, #e5e7eb 100%);
  animation: progressLine 1.2s ease;
}

@keyframes progressLine {
  from {
    background-position: -100% 0;
  }
  to {
    background-position: 0 0;
  }
}


/* Form Sections */
.volunteer-form {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.step-content {
  animation: fadeInUp 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.section-title {
  font-size: 28px;
  font-weight: 900;
  background: linear-gradient(135deg, #1f2937 0%, #4b5563 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 3px solid transparent;
  border-image: linear-gradient(90deg, #f97316, #fb923c, transparent) 1;
  position: relative;
  letter-spacing: -0.5px;
}

.section-title::before {
  content: '';
  position: absolute;
  left: 0;
  bottom: -3px;
  width: 70px;
  height: 4px;
  background: linear-gradient(90deg, #f97316, #fb923c);
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(249, 115, 22, 0.4);
  animation: sectionLineSlide 3s ease infinite;
}

@keyframes sectionLineSlide {
  0%, 100% { width: 70px; }
  50% { width: 90px; }
}

.subsection {
  margin-top: 48px;
  padding: 36px;
  background: linear-gradient(135deg, #ffffff 0%, #fffbf7 100%);
  border-radius: 20px;
  border: 2px solid #f8f9fa;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.subsection::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #f97316, #fb923c, #fdba74);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.subsection:hover {
  box-shadow: 0 12px 32px rgba(249, 115, 22, 0.12), inset 0 1px 0 rgba(255, 255, 255, 1);
  border-color: rgba(249, 115, 22, 0.15);
  transform: translateY(-4px);
}

.subsection:hover::before {
  opacity: 1;
}

.subsection-title {
  font-size: 20px;
  font-weight: 800;
  color: #374151;
  margin-bottom: 32px;
  padding-bottom: 16px;
  border-bottom: 2px solid #f3f4f6;
  display: flex;
  align-items: center;
  gap: 12px;
  letter-spacing: -0.3px;
}

.subsection-title::before {
  content: '●';
  color: #f97316;
  font-size: 14px;
  text-shadow: 0 2px 8px rgba(249, 115, 22, 0.4);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
  margin-bottom: 8px;
}

.form-row-three {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 28px;
  margin-bottom: 8px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

label {
  font-weight: 600;
  color: #374151;
  font-size: 14px;
  margin-bottom: 8px;
  letter-spacing: 0.2px;
  transition: color 0.2s ease;
}

.form-group:focus-within label {
  color: #f97316;
}

.required::after {
  content: '*';
  color: #f97316;
  margin-left: 4px;
  font-size: 16px;
  animation: requiredPulse 2s ease infinite;
}

@keyframes requiredPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

input[type="text"],
input[type="email"],
input[type="password"],
input[type="url"],
input[type="tel"],
input[type="date"],
textarea,
select {
  padding: 18px 22px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 15px;
  background: linear-gradient(135deg, #ffffff 0%, #fafafa 100%);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: inherit;
  color: #1f2937;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04), inset 0 1px 2px rgba(0, 0, 0, 0.02);
  position: relative;
  font-weight: 500;
}

/* Special styling for date input */
input[type="date"] {
  cursor: pointer;
  position: relative;
}

input[type="date"]::-webkit-calendar-picker-indicator {
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s ease;
  filter: invert(55%) sepia(85%) saturate(2000%) hue-rotate(360deg);
}

input[type="date"]::-webkit-calendar-picker-indicator:hover {
  opacity: 1;
  transform: scale(1.1);
}

input:focus,
textarea:focus,
select:focus {
  outline: none;
  border-color: #f97316;
  box-shadow: 0 0 0 5px rgba(249, 115, 22, 0.1), 
              0 6px 16px rgba(249, 115, 22, 0.2);
  transform: translateY(-2px);
  background: linear-gradient(135deg, #fffcfa 0%, #ffffff 100%);
}

input:hover:not(:focus),
textarea:hover:not(:focus),
select:hover:not(:focus) {
  border-color: #fb923c;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  background: #ffffff;
}

input:valid:not(:placeholder-shown),
textarea:valid:not(:placeholder-shown),
select:valid {
  border-color: #10b981;
  background: linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%);
}

textarea {
  resize: vertical;
  min-height: 100px;
  line-height: 1.6;
  padding: 16px 20px;
}

.date-input-group {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 12px;
}

.date-select {
  padding: 16px 20px;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  background: white;
  font-size: 15px;
  color: #374151;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
  cursor: pointer;
}

.date-select:focus {
  border-color: #f97316;
  box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.12), 0 4px 12px rgba(249, 115, 22, 0.15);
  transform: translateY(-1px);
}

.date-select:hover:not(:focus) {
  border-color: #fb923c;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06);
}

.radio-group {
  display: flex;
  gap: 14px;
  margin-top: 12px;
  flex-wrap: wrap;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  cursor: pointer;
  color: #374151;
  padding: 16px 32px;
  border-radius: 12px;
  border: 2px solid #e5e7eb;
  background: linear-gradient(135deg, #ffffff 0%, #fafafa 100%);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 140px;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  position: relative;
  overflow: hidden;
}

.radio-label::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(249, 115, 22, 0.1), transparent);
  transition: left 0.5s ease;
}

.radio-label:hover::before {
  left: 100%;
}

.radio-label:hover {
  border-color: #f97316;
  background: linear-gradient(135deg, #fffcfa 0%, #fff7ed 100%);
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(249, 115, 22, 0.18);
}

.radio-label:has(input:checked) {
  background: linear-gradient(135deg, #f97316 0%, #fb923c 100%);
  color: white;
  border-color: #f97316;
  box-shadow: 0 8px 24px rgba(249, 115, 22, 0.4);
  transform: translateY(-3px) scale(1.02);
  font-weight: 700;
}

.radio-label input[type="radio"] {
  width: 20px;
  height: 20px;
  accent-color: white;
  cursor: pointer;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
  margin: 28px 0;
  padding: 32px;
  background: linear-gradient(135deg, #ffffff 0%, #fefbf8 100%);
  border-radius: 16px;
  border: 2px solid #f3f4f6;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
}

.skills-column {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 14px;
  font-weight: 600;
  cursor: pointer;
  line-height: 1.6;
  color: #374151;
  padding: 16px 20px;
  border-radius: 12px;
  background: linear-gradient(135deg, #ffffff 0%, #fafafa 100%);
  border: 2px solid #e5e7eb;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  position: relative;
  overflow: hidden;
}

.checkbox-label::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(249, 115, 22, 0.05), transparent);
  transition: left 0.6s ease;
}

.checkbox-label:hover::before {
  left: 100%;
}

.checkbox-label:hover {
  border-color: #f97316;
  background: linear-gradient(135deg, #fffcfa 0%, #fff7ed 100%);
  transform: translateX(6px);
  box-shadow: 0 6px 16px rgba(249, 115, 22, 0.15);
}

.checkbox-label:has(input:checked) {
  background: linear-gradient(135deg, #f97316 0%, #fb923c 100%);
  color: white;
  border-color: #f97316;
  box-shadow: 0 6px 20px rgba(249, 115, 22, 0.35);
  transform: translateX(6px);
  font-weight: 700;
}

.checkbox-label input[type="checkbox"] {
  width: 20px;
  height: 20px;
  accent-color: white;
  border-radius: 6px;
  cursor: pointer;
}

.file-info {
  font-size: 12px;
  color: #6b7280;
  font-weight: 400;
  display: block;
  margin-top: 4px;
  font-style: italic;
}

.upload-area {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 12px;
  padding: 24px;
  border: 3px dashed #d1d5db;
  border-radius: 12px;
  background: linear-gradient(135deg, #ffffff 0%, #fafafa 100%);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.upload-area::before {
  content: '📁';
  position: absolute;
  right: 20px;
  font-size: 32px;
  opacity: 0.1;
  transition: all 0.3s ease;
}

.upload-area:hover {
  border-color: #f97316;
  background: linear-gradient(135deg, #fffcfa 0%, #fff7ed 100%);
  box-shadow: 0 4px 16px rgba(249, 115, 22, 0.12);
}

.upload-area:hover::before {
  opacity: 0.2;
  transform: scale(1.1) rotate(5deg);
}

.upload-area input[type="file"] {
  flex: 1;
  padding: 10px 14px;
  border: none;
  border-radius: 8px;
  background: rgba(249, 115, 22, 0.05);
  font-weight: 500;
  color: #374151;
  transition: all 0.3s ease;
  cursor: pointer;
}

.upload-area input[type="file"]:hover {
  background: rgba(249, 115, 22, 0.1);
}

.upload-btn {
  padding: 12px 28px;
  background: linear-gradient(135deg, #f97316 0%, #fb923c 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-transform: uppercase;
  letter-spacing: 0.8px;
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.25);
  position: relative;
  overflow: hidden;
}

.upload-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.upload-btn:hover::before {
  left: 100%;
}

.upload-btn:hover {
  background: linear-gradient(135deg, #ea580c 0%, #f97316 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(249, 115, 22, 0.4);
}

.upload-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(249, 115, 22, 0.3);
}

.contact-notice {
  margin-bottom: 32px;
  padding: 24px 28px;
  background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);
  border-radius: 12px;
  border-left: 5px solid #f97316;
  box-shadow: 0 4px 16px rgba(249, 115, 22, 0.12);
  position: relative;
  overflow: hidden;
}

.contact-notice::before {
  content: '⚠️';
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 48px;
  opacity: 0.1;
}

.contact-notice p {
  margin-bottom: 12px;
  line-height: 1.8;
  color: #374151;
  font-weight: 500;
  position: relative;
  z-index: 1;
}

.contact-title {
  color: #f97316;
  font-size: 17px;
  font-weight: 700;
  margin: 32px 0 24px 0;
  text-transform: uppercase;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.contact-title::before {
  content: '';
  width: 6px;
  height: 24px;
  background: linear-gradient(135deg, #f97316, #fb923c);
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(249, 115, 22, 0.3);
}

.checkbox-agreements {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin: 40px 0;
  padding: 28px;
  background: linear-gradient(135deg, #ffffff 0%, #fefbf8 100%);
  border-radius: 16px;
  border: 2px solid #f3f4f6;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
}

.checkbox-agreements .checkbox-label {
  padding: 18px 22px;
  background: white;
  border-radius: 10px;
  border: 2px solid #e5e7eb;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
}

.checkbox-agreements .checkbox-label:hover {
  border-color: #f97316;
  background: #fffcfa;
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.12);
}

.checkbox-agreements .checkbox-label:has(input:checked) {
  background: linear-gradient(135deg, #f97316 0%, #fb923c 100%);
  border-color: #f97316;
  box-shadow: 0 4px 16px rgba(249, 115, 22, 0.3);
  transform: translateX(4px);
}

.checkbox-agreements .checkbox-label:has(input:checked) .checkbox-text {
  color: white;
  font-weight: 600;
}

.checkbox-agreements .checkbox-label:has(input:checked) .link-text {
  color: #fef3c7;
  text-decoration-color: #fef3c7;
  font-weight: 700;
}

.checkbox-text {
  line-height: 1.7;
  color: #374151;
  font-weight: 500;
  transition: color 0.3s ease;
}

.link-text {
  color: #f97316;
  text-decoration: underline;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  text-decoration-thickness: 2px;
  text-underline-offset: 3px;
}

.link-text:hover {
  color: #ea580c;
  text-decoration-color: #ea580c;
}

/* Navigation Buttons */
.navigation-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 64px;
  padding-top: 40px;
  border-top: 3px solid transparent;
  border-image: linear-gradient(90deg, transparent, #e5e7eb, transparent) 1;
  gap: 24px;
}

.nav-btn {
  padding: 18px 48px;
  border: 3px solid #f97316;
  background: linear-gradient(135deg, #ffffff 0%, #fafafa 100%);
  color: #f97316;
  border-radius: 14px;
  font-size: 16px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  text-transform: uppercase;
  letter-spacing: 1.2px;
  min-width: 240px;
  box-shadow: 0 6px 16px rgba(249, 115, 22, 0.2);
  position: relative;
  overflow: hidden;
}

.nav-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f97316 0%, #fb923c 100%);
  transition: left 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: -1;
}

.nav-btn:hover::before {
  left: 0;
}

.nav-btn:hover {
  color: white;
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 12px 32px rgba(249, 115, 22, 0.4);
  border-color: #ea580c;
}

.nav-btn:active {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(249, 115, 22, 0.35);
}

.next-btn {
  margin-left: auto;
}

.submit-btn {
  padding: 20px 60px;
  background: linear-gradient(135deg, #f97316 0%, #fb923c 100%);
  color: white;
  border: none;
  border-radius: 14px;
  font-size: 18px;
  font-weight: 900;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-left: auto;
  box-shadow: 0 8px 28px rgba(249, 115, 22, 0.4);
  position: relative;
  overflow: hidden;
}

.submit-btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.25);
  transform: translate(-50%, -50%);
  transition: width 0.7s ease, height 0.7s ease;
}

.submit-btn:hover::before {
  width: 400px;
  height: 400px;
}

.submit-btn:hover {
  background: linear-gradient(135deg, #ea580c 0%, #f97316 100%);
  transform: translateY(-5px) scale(1.03);
  box-shadow: 0 14px 42px rgba(249, 115, 22, 0.55);
}

.submit-btn:active {
  transform: translateY(-3px) scale(1.01);
  box-shadow: 0 8px 28px rgba(249, 115, 22, 0.45);
}

@media (max-width: 768px) {
  .form-wrapper {
    padding: 32px 20px;
  }
  
  .form-title {
    font-size: 24px;
    margin-bottom: 32px;
  }
  
  .stepper {
    padding: 0;
    gap: 8px;
    margin-bottom: 40px;
  }
  
  .step-number {
    width: 40px;
    height: 40px;
    font-size: 16px;
  }
  
  .step-label {
    font-size: 11px;
    max-width: 80px;
  }
  
  .step-line {
    top: 20px;
    left: calc(50% + 20px);
    width: calc(100% - 40px);
  }
  
  .section-title {
    font-size: 20px;
    margin-bottom: 24px;
  }
  
  .subsection-title {
    font-size: 16px;
  }
  
  .subsection {
    padding: 24px 16px;
    margin-top: 28px;
  }
  
  .form-row,
  .form-row-three {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .skills-grid {
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 20px;
    margin: 20px 0;
  }
  
  .date-input-group {
    grid-template-columns: 1fr;
    gap: 10px;
  }
  
  .radio-group {
    flex-direction: column;
    gap: 10px;
  }
  
  .upload-area {
    flex-direction: column;
    gap: 10px;
    padding: 16px;
  }
  
  .navigation-buttons {
    flex-direction: column;
    margin-top: 40px;
    padding-top: 24px;
  }
  
  .nav-btn,
  .submit-btn {
    width: 100%;
    min-width: auto;
    margin-left: 0;
  }
}

@media (max-width: 480px) {
  .form-container {
    margin: 10px;
  }
  
  .form-wrapper {
    padding: 16px 12px;
  }
  
  .form-title {
    font-size: 20px;
    line-height: 1.3;
  }
  
  .stepper {
    gap: 4px;
  }
  
  .step-number {
    width: 35px;
    height: 35px;
    font-size: 14px;
  }
  
  .step-label {
    font-size: 10px;
    max-width: 70px;
  }
  
  .section-title {
    font-size: 18px;
  }
  
  .checkbox-agreements {
    padding: 16px 12px;
  }
}
</style>