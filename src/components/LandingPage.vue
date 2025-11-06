<template>
  <div class="landing-page">
    <!-- Navigation -->
    <nav class="navbar">
      <div class="nav-container">
        <div class="logo">
          <img src="/logo.svg" alt="Wahana Visi Indonesia" class="logo-img">
          <span class="logo-text">Wahana Visi<br><span class="indonesia">INDONESIA</span></span>
        </div>
        
        <div class="nav-links">
          <a href="#" class="nav-link">Sponsor Anak</a>
          <a href="#" class="nav-link">Donasi</a>
          <a href="#" class="nav-link">Bermitra dengan WVI</a>
          <a href="#" class="nav-link">Tentang WVI</a>
          <a href="#" class="nav-link">Media & Publikasi</a>
          <a href="#" class="nav-link">Kontak kami</a>
          <a href="#" class="nav-link">Ayo Terlibat</a>
        </div>

        <div class="nav-actions">
          <button class="lang-btn">ID</button>
          <span class="divider">|</span>
          <button class="lang-btn">Bahasa</button>
          <button class="search-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
          </button>
          <button class="user-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </button>
          <button class="cart-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            <span class="cart-badge">0</span>
          </button>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <div class="hero-text">
          <h2 class="hero-subtitle">Volunteer KinCir</h2>
          <h1 class="hero-title">Relawan KinCir</h1>
          <p class="hero-description">deskripsi</p>
          <div class="hero-buttons">
            <button class="btn-primary" @click="$emit('joinVolunteer')">Join Us Here</button>
            <button class="btn-secondary" @click="scrollToVolunteer">Redisisi</button>
          </div>
        </div>
      </div>
      <div class="hero-image">
        <img src="/hero-volunteer.svg" alt="Wahana Visi Indonesia Volunteers" class="hero-img">
      </div>
    </section>

    <!-- Volunteer Section -->
    <section class="volunteer-section" id="volunteer">
      <div class="section-container">
        <div class="section-header">
          <span class="section-tag">Volunteer KinCir</span>
          <h2 class="section-title">ToGether, To Other, To Be Better</h2>
          <button class="btn-read-more">Read More</button>
        </div>
        
        <div class="section-content">
          <p class="section-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in 
            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="features-container">
        <div class="feature-card">
          <div class="feature-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <h3 class="feature-title">Komunitas Positif</h3>
          <p class="feature-desc">Bergabung dengan komunitas volunteer yang peduli dan saling mendukung</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <h3 class="feature-title">Pelatihan & Pengembangan</h3>
          <p class="feature-desc">Dapatkan pelatihan dan sertifikasi untuk mengembangkan skill Anda</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <h3 class="feature-title">Dampak Nyata</h3>
          <p class="feature-desc">Buat perbedaan nyata dalam kehidupan anak-anak Indonesia</p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-content">
          <div class="footer-section">
            <div class="footer-logo">
              <img src="/logo.svg" alt="Wahana Visi Indonesia" class="footer-logo-img">
              <span class="footer-logo-text">Wahana Visi<br><span class="indonesia">INDONESIA</span></span>
            </div>
            <p class="footer-desc">
              Bersama membangun masa depan cerah untuk anak-anak Indonesia
            </p>
          </div>

          <div class="footer-section">
            <h4 class="footer-title">Quick Links</h4>
            <ul class="footer-links">
              <li><a href="#">Tentang Kami</a></li>
              <li><a href="#">Program</a></li>
              <li><a href="#">Donasi</a></li>
              <li><a href="#">Kontak</a></li>
            </ul>
          </div>

          <div class="footer-section">
            <h4 class="footer-title">Volunteer</h4>
            <ul class="footer-links">
              <li><a href="#">Daftar Volunteer</a></li>
              <li><a href="#">Pelatihan</a></li>
              <li><a href="#">Sertifikasi</a></li>
              <li><a href="#">Komunitas</a></li>
            </ul>
          </div>

          <div class="footer-section">
            <h4 class="footer-title">Follow Us</h4>
            <div class="social-links">
              <a href="#" class="social-link">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" class="social-link">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" class="social-link">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>&copy; 2025 Wahana Visi Indonesia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
const scrollToVolunteer = () => {
  document.getElementById('volunteer')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.landing-page {
  width: 100%;
  min-height: 100vh;
  background: #ffffff;
}

/* Navigation */
.navbar {
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: 1rem 0;
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-img {
  width: 45px;
  height: 45px;
  background: linear-gradient(135deg, #f97316 0%, #fb923c 100%);
  border-radius: 8px;
  padding: 8px;
}

.logo-text {
  font-weight: 700;
  font-size: 0.95rem;
  color: #1f2937;
  line-height: 1.2;
}

.indonesia {
  color: #f97316;
  font-size: 0.75rem;
  font-weight: 600;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  flex: 1;
  justify-content: center;
}

.nav-link {
  color: #374151;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.3s ease;
  white-space: nowrap;
}

.nav-link:hover {
  color: #f97316;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.lang-btn, .search-btn, .user-btn {
  background: transparent;
  border: none;
  color: #374151;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0.5rem;
  transition: color 0.3s ease;
}

.lang-btn:hover, .search-btn:hover, .user-btn:hover {
  color: #f97316;
}

.divider {
  color: #d1d5db;
}

.cart-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  position: relative;
  padding: 0.5rem;
  color: #374151;
  transition: color 0.3s ease;
}

.cart-btn:hover {
  color: #f97316;
}

.cart-badge {
  position: absolute;
  top: 0;
  right: 0;
  background: #f97316;
  color: white;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.1rem 0.35rem;
  border-radius: 999px;
  min-width: 18px;
  text-align: center;
}

/* Hero Section */
.hero {
  position: relative;
  height: 600px;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.7);
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  width: 100%;
}

.hero-text {
  max-width: 600px;
  color: white;
}

.hero-subtitle {
  font-size: 1.1rem;
  font-weight: 600;
  color: #fb923c;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.hero-title {
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 1rem;
  line-height: 1.1;
  color: white;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
}

.hero-description {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  color: #f3f4f6;
  font-weight: 500;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-primary {
  background: #f97316;
  color: white;
  padding: 1rem 2.5rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.4);
}

.btn-primary:hover {
  background: #ea580c;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(249, 115, 22, 0.5);
}

.btn-secondary {
  background: transparent;
  color: white;
  padding: 1rem 2.5rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  border: 2px solid white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: white;
  color: #f97316;
}

/* Volunteer Section */
.volunteer-section {
  padding: 5rem 2rem;
  background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);
}

.section-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

.section-header {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.section-tag {
  color: #f97316;
  font-weight: 600;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #1f2937;
  line-height: 1.2;
}

.btn-read-more {
  background: #f97316;
  color: white;
  padding: 0.875rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: flex-start;
}

.btn-read-more:hover {
  background: #ea580c;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
}

.section-content {
  padding-top: 3rem;
}

.section-text {
  color: #4b5563;
  font-size: 1.05rem;
  line-height: 1.8;
}

/* Features Section */
.features-section {
  padding: 5rem 2rem;
  background: white;
}

.features-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
}

.feature-card {
  text-align: center;
  padding: 2.5rem 2rem;
  border-radius: 16px;
  background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(249, 115, 22, 0.15);
  border-color: #f97316;
}

.feature-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #f97316 0%, #fb923c 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
}

.feature-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
}

.feature-desc {
  color: #6b7280;
  font-size: 1rem;
  line-height: 1.6;
}

/* Footer */
.footer {
  background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
  color: white;
  padding: 4rem 2rem 2rem;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  margin-bottom: 3rem;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.footer-logo-img {
  width: 45px;
  height: 45px;
  background: linear-gradient(135deg, #f97316 0%, #fb923c 100%);
  border-radius: 8px;
  padding: 8px;
}

.footer-logo-text {
  font-weight: 700;
  font-size: 0.95rem;
  line-height: 1.2;
}

.footer-desc {
  color: #9ca3af;
  line-height: 1.6;
}

.footer-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: white;
}

.footer-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-links a {
  color: #9ca3af;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: #f97316;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  width: 40px;
  height: 40px;
  background: rgba(249, 115, 22, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f97316;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: #f97316;
  color: white;
  transform: translateY(-4px);
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: #9ca3af;
}

/* Responsive */
@media (max-width: 1024px) {
  .nav-links {
    display: none;
  }
  
  .hero-title {
    font-size: 3rem;
  }
  
  .section-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .hero {
    height: 500px;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .features-container {
    grid-template-columns: 1fr;
  }
  
  .section-title {
    font-size: 2rem;
  }
}
</style>
