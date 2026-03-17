<template>
  <div class="landing-page">
    <!-- Navigation -->
    <nav class="navbar" :class="{ scrolled: isScrolled }">
      <div class="nav-container">
        <div class="logo">
          <img src="/logo.svg" alt="Wahaha Misii Indonesia" class="logo-img">
          <span class="logo-text">Wahaha Misii<br><span class="indonesia">INDONESIA</span></span>
        </div>

        <div class="nav-links">
          <a href="#" class="nav-link">Sponsor Anak</a>
          <a href="#" class="nav-link">Donasi</a>
          <a href="#" class="nav-link">Bermitra dengan WHI</a>
          <a href="#" class="nav-link">Tentang WHI</a>
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
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </button>
          <button class="user-btn" @click="goToRegister">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>
          <button class="dashboard-btn" @click="goToDashboard">
            Dashboard
          </button>
          <button class="cart-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span class="cart-badge">0</span>
          </button>
          <button class="mobile-menu-btn" @click="mobileMenuOpen = !mobileMenuOpen"
            :aria-label="mobileMenuOpen ? 'Close menu' : 'Open menu'">
            <svg v-if="!mobileMenuOpen" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
            <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <Transition name="mobile-menu">
      <div v-if="mobileMenuOpen" class="mobile-menu-overlay" @click.self="mobileMenuOpen = false">
        <div class="mobile-menu-panel">
          <div class="mobile-menu-logo">
            <span style="font-weight:800;font-size:1.1rem;color:#1f2937;">Wahaha Misii <span
                style="color:#f97316;">INDONESIA</span></span>
          </div>
          <a href="#" class="mobile-nav-link" @click="mobileMenuOpen = false">Sponsor Anak</a>
          <a href="#" class="mobile-nav-link" @click="mobileMenuOpen = false">Donasi</a>
          <a href="#" class="mobile-nav-link" @click="mobileMenuOpen = false">Bermitra dengan WHI</a>
          <a href="#" class="mobile-nav-link" @click="mobileMenuOpen = false">Tentang WHI</a>
          <a href="#" class="mobile-nav-link" @click="mobileMenuOpen = false">Media &amp; Publikasi</a>
          <a href="#" class="mobile-nav-link" @click="mobileMenuOpen = false">Kontak kami</a>
          <a href="#" class="mobile-nav-link" @click="mobileMenuOpen = false">Ayo Terlibat</a>
          <button class="mobile-cta-btn" @click="goToRegister(); mobileMenuOpen = false">Join Us Here</button>
        </div>
      </div>
    </Transition>

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <div class="hero-text">
          <h2 class="hero-subtitle">Volunteer KinCir</h2>
          <h1 class="hero-title">Relawan KinCir</h1>
          <p class="hero-description">deskripsi</p>
          <div class="hero-buttons">
            <button class="btn-primary" @click="goToRegister">Join Us Here</button>
            <button class="btn-secondary" @click="scrollToVolunteer">Redisisi</button>
          </div>
        </div>
      </div>
      <div class="hero-image">
        <img src="/hero-volunteer.svg" alt="Wahaha Misii Indonesia Volunteers" class="hero-img">
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
      <div class="stats-container">
        <div class="hero-stat-item">
          <div class="hero-stat-number">{{ formatNumber(counters.volunteers) }}+</div>
          <div class="hero-stat-label">Relawan Aktif</div>
        </div>
        <div class="hero-stat-item">
          <div class="hero-stat-number">{{ counters.events }}+</div>
          <div class="hero-stat-label">Acara Sukses</div>
        </div>
        <div class="hero-stat-item">
          <div class="hero-stat-number">{{ formatNumber(counters.hours) }}+</div>
          <div class="hero-stat-label">Jam Volunteer</div>
        </div>
        <div class="hero-stat-item">
          <div class="hero-stat-number">{{ counters.communities }}+</div>
          <div class="hero-stat-label">Komunitas Terjangkau</div>
        </div>
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

    <!-- Steps Section -->
    <section class="steps-section">
      <div class="steps-container">
        <div class="steps-header">
          <span class="steps-tag">Awali Perubahan Hari ini</span>
          <h2 class="steps-title">langkah mudah bergabung menjadi relawan kincir</h2>
        </div>

        <div class="steps-grid">
          <div class="step-card">
            <div class="step-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="3" fill="#F97316" />
                <path d="M12 14c-4 0-7 2-7 4v2h14v-2c0-2-3-4-7-4z" fill="#F97316" />
                <rect x="16" y="16" width="4" height="4" rx="1" fill="#FB923C" />
              </svg>
            </div>
            <h3 class="step-title">Be a volunteer</h3>
            <p class="step-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea
              commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
              id est
              laborum.
            </p>
          </div>

          <div class="step-card">
            <div class="step-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="3" fill="#F97316" />
                <path d="M12 14c-4 0-7 2-7 4v2h14v-2c0-2-3-4-7-4z" fill="#F97316" />
                <rect x="16" y="16" width="4" height="4" rx="1" fill="#FB923C" />
              </svg>
            </div>
            <h3 class="step-title">Get and collect</h3>
            <p class="step-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea
              commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
              id est
              laborum.
            </p>
          </div>

          <div class="step-card">
            <div class="step-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="3" fill="#F97316" />
                <path d="M12 14c-4 0-7 2-7 4v2h14v-2c0-2-3-4-7-4z" fill="#F97316" />
                <rect x="16" y="16" width="4" height="4" rx="1" fill="#FB923C" />
              </svg>
            </div>
            <h3 class="step-title">Exchange your points</h3>
            <p class="step-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea
              commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
              id est
              laborum.
            </p>
          </div>

          <div class="step-card">
            <div class="step-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="3" fill="#F97316" />
                <path d="M12 14c-4 0-7 2-7 4v2h14v-2c0-2-3-4-7-4z" fill="#F97316" />
                <rect x="16" y="16" width="4" height="4" rx="1" fill="#FB923C" />
              </svg>
            </div>
            <h3 class="step-title">Gas</h3>
            <p class="step-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea
              commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
              id est
              laborum.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Program Section -->
    <section class="program-section">
      <div class="program-container">
        <div class="program-header">
          <span class="program-tag">ini program yang bisa kalian ikuti</span>
          <h2 class="program-title">KinCir Volunteer Program</h2>
        </div>

        <div class="program-grid">
          <div class="program-card">
            <div class="program-image">
              <img src="/volunteer-field.svg" alt="Volunteer KinOir Field" class="program-img">
              <div class="program-overlay">
                <h3 class="program-card-title">Volunteer: KinOir Field</h3>
                <p class="program-card-desc">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque
                  sem placerat. In id cursus ...
                </p>
              </div>
            </div>
          </div>

          <div class="program-card">
            <div class="program-image">
              <img src="/volunteer-event.svg" alt="Volunteer Event" class="program-img">
              <div class="program-overlay">
                <h3 class="program-card-title">Volunteer: Event</h3>
                <p class="program-card-desc">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque
                  sem placerat. In id cursus ...
                </p>
              </div>
            </div>
          </div>

          <div class="program-card">
            <div class="program-image">
              <img src="/volunteer-skills.svg" alt="Volunteer Skills" class="program-img">
              <div class="program-overlay">
                <h3 class="program-card-title">Volunteer: Skills Based</h3>
                <p class="program-card-desc">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque
                  sem placerat. In id cursus ...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="team-section">
      <div class="team-container">
        <div class="team-header">
          <span class="team-tag">Our Team</span>
          <h2 class="team-title">Meet Our Amazing Teman KinCir</h2>
        </div>

        <div class="team-grid">
          <div class="team-card">
            <div class="team-image">
              <img src="/team-member-1.svg" alt="Haga, Pengusaha kayu" class="team-img">
              <div class="team-overlay">
                <h3 class="team-name">Haga, Pengusaha kayu</h3>
                <p class="team-role">nice ,</p>
              </div>
            </div>
          </div>

          <div class="team-card">
            <div class="team-image">
              <img src="/team-member-2.svg" alt="Sazkia Sungkir" class="team-img">
              <div class="team-overlay">
                <h3 class="team-name">Sazkia Sungkir</h3>
                <p class="team-role">suka jadi telesales</p>
              </div>
            </div>
          </div>

          <div class="team-card">
            <div class="team-image">
              <img src="/team-member-3.svg" alt="Team Member" class="team-img">
              <div class="team-overlay">
                <h3 class="team-name">Team Member</h3>
                <p class="team-role">Volunteer Enthusiast</p>
              </div>
            </div>
          </div>

          <div class="team-card">
            <div class="team-image">
              <img src="/team-member-4.svg" alt="Team Member" class="team-img">
              <div class="team-overlay">
                <h3 class="team-name">Team Member</h3>
                <p class="team-role">Community Leader</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Q&A Section -->
    <section class="qna-section">
      <div class="qna-container">
        <div class="qna-header">
          <span class="qna-tag">Campaign</span>
          <h2 class="qna-title">ini section Q&A</h2>
          <p class="qna-description">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
            Aldus PageMaker including versions of Lorem Ipsum.
          </p>
        </div>

        <div class="qna-content">
          <div class="qna-accordion">
            <div class="accordion-item" :class="{ active: activeAccordion === 0 }">
              <button class="accordion-header" @click="toggleAccordion(0)">
                <span>Cara mendaftar</span>
                <svg class="accordion-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-width="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <div class="accordion-content">
                <p>Untuk mendaftar sebagai relawan KinCir, silakan klik tombol "Join Us Here" dan isi formulir
                  pendaftaran yang tersedia. Pastikan semua data yang diisi sudah benar dan lengkap.</p>
              </div>
            </div>

            <div class="accordion-item" :class="{ active: activeAccordion === 1 }">
              <button class="accordion-header" @click="toggleAccordion(1)">
                <span>Benefit</span>
                <svg class="accordion-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-width="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <div class="accordion-content">
                <p>benefitnya itu seperti ini lalalalaalallala</p>
              </div>
            </div>

            <div class="accordion-item" :class="{ active: activeAccordion === 2 }">
              <button class="accordion-header" @click="toggleAccordion(2)">
                <span>Syarat & Ketentuan</span>
                <svg class="accordion-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-width="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <div class="accordion-content">
                <p>Syarat dan ketentuan menjadi relawan akan dijelaskan disini. Pastikan Anda membaca dengan teliti
                  sebelum mendaftar.</p>
              </div>
            </div>
          </div>

          <div class="qna-image">
            <img src="/qna-volunteers.svg" alt="Volunteers with children" class="qna-img">
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="faq-section">
      <div class="faq-container">
        <div class="faq-header">
          <span class="faq-tag">faq</span>
          <h2 class="faq-title">Pertanyaan yang sering ditanyakan</h2>
        </div>

        <div class="faq-list">
          <div class="faq-item" :class="{ active: activeFaq === 0 }">
            <button class="faq-question" @click="toggleFaq(0)">
              <span>Bagaimana cara mendaftar menjadi volunteer?</span>
              <svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div class="faq-answer">
              <p>Anda dapat mendaftar dengan mengklik tombol "Join Us Here" di halaman utama dan mengisi formulir
                pendaftaran yang tersedia. Pastikan semua data yang Anda masukkan sudah benar dan lengkap.</p>
            </div>
          </div>

          <div class="faq-item" :class="{ active: activeFaq === 1 }">
            <button class="faq-question" @click="toggleFaq(1)">
              <span>Apa saja persyaratan untuk menjadi volunteer?</span>
              <svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div class="faq-answer">
              <p>Persyaratan dasar meliputi: berusia minimal 17 tahun, memiliki komitmen untuk berkontribusi, memiliki
                kemampuan komunikasi yang baik, dan bersedia mengikuti pelatihan yang diberikan.</p>
            </div>
          </div>

          <div class="faq-item" :class="{ active: activeFaq === 2 }">
            <button class="faq-question" @click="toggleFaq(2)">
              <span>Berapa lama komitmen waktu yang diperlukan?</span>
              <svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div class="faq-answer">
              <p>Komitmen waktu bervariasi tergantung program yang Anda ikuti. Minimal komitmen adalah 4 jam per minggu
                untuk program regular, atau sesuai kebutuhan untuk program khusus dan event tertentu.</p>
            </div>
          </div>

          <div class="faq-item" :class="{ active: activeFaq === 3 }">
            <button class="faq-question" @click="toggleFaq(3)">
              <span>Apakah ada biaya untuk menjadi volunteer?</span>
              <svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div class="faq-answer">
              <p>Tidak ada biaya pendaftaran untuk menjadi volunteer KinCir. Semua program volunteer kami gratis dan
                terbuka untuk siapa saja yang memiliki dedikasi untuk membantu sesama.</p>
            </div>
          </div>

          <div class="faq-item" :class="{ active: activeFaq === 4 }">
            <button class="faq-question" @click="toggleFaq(4)">
              <span>Benefit apa yang didapatkan sebagai volunteer?</span>
              <svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div class="faq-answer">
              <p>Sebagai volunteer, Anda akan mendapatkan: sertifikat volunteer, pelatihan gratis, pengalaman berharga,
                kesempatan networking, points yang dapat ditukar dengan merchandise, dan kepuasan batin dari membantu
                sesama.</p>
            </div>
          </div>

          <div class="faq-item" :class="{ active: activeFaq === 5 }">
            <button class="faq-question" @click="toggleFaq(5)">
              <span>Bagaimana sistem points bekerja?</span>
              <svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div class="faq-answer">
              <p>Setiap aktivitas volunteer akan mendapatkan points. Points dapat dikumpulkan dan ditukarkan dengan
                merchandise eksklusif Wahaha Misii Indonesia atau digunakan untuk mengikuti program pelatihan premium.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Activities Section -->
    <section class="activities-section">
      <div class="activities-container">
        <div class="activities-header">
          <span class="activities-tag">Aktivitas Relawan disini niii</span>
          <h2 class="activities-title">Kegiatan</h2>
        </div>

        <div class="activities-grid">
          <div class="activity-card">
            <div class="activity-image">
              <img src="/activity-1.svg" alt="Volunteer OnField" class="activity-img">
            </div>
            <div class="activity-content">
              <span class="activity-badge">Volunteer OnField</span>
              <h3 class="activity-name">Nama aktivitas</h3>
              <div class="activity-meta">
                <div class="activity-meta-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span>8 Oktober 2025 - 31 Oktober 2025</span>
                </div>
                <div class="activity-meta-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>alamat untuk indonesia</span>
                </div>
                <div class="activity-meta-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                  <span>10 Poin</span>
                </div>
              </div>
              <button class="activity-btn">Lihat Detail</button>
            </div>
          </div>

          <div class="activity-card">
            <div class="activity-image">
              <img src="/activity-2.svg" alt="Aktivitas Volunteer" class="activity-img">
            </div>
            <div class="activity-content">
              <span class="activity-badge">Aktivitas Volunteer</span>
              <h3 class="activity-name">Membuat Robot Bersama Anak Depok</h3>
              <div class="activity-meta">
                <div class="activity-meta-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span>4 September 2025 - 10 September 2025</span>
                </div>
                <div class="activity-meta-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>Alamat Sibuk</span>
                </div>
                <div class="activity-meta-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                  <span>10 Poin</span>
                </div>
              </div>
              <button class="activity-btn">Lihat Detail</button>
            </div>
          </div>

          <div class="activity-card">
            <div class="activity-image">
              <img src="/activity-3.svg" alt="Volunteer OnField" class="activity-img">
            </div>
            <div class="activity-content">
              <span class="activity-badge">Volunteer OnField</span>
              <h3 class="activity-name">ED Relawan Sudah Tiba</h3>
              <div class="activity-meta">
                <div class="activity-meta-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span>27 Juli 2025 - 29 Juli 2025</span>
                </div>
                <div class="activity-meta-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>Jalan jalan dan jalan jalan jalan</span>
                </div>
                <div class="activity-meta-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                  <span>199 Poin</span>
                </div>
              </div>
              <button class="activity-btn">Lihat Detail</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="features-container">
        <div class="feature-card">
          <div class="feature-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <h3 class="feature-title">Komunitas Positif</h3>
          <p class="feature-desc">Bergabung dengan komunitas volunteer yang peduli dan saling mendukung</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <h3 class="feature-title">Pelatihan & Pengembangan</h3>
          <p class="feature-desc">Dapatkan pelatihan dan sertifikasi untuk mengembangkan skill Anda</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
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
              <img src="/logo.svg" alt="Wahaha Misii Indonesia" class="footer-logo-img">
              <span class="footer-logo-text">Wahaha Misii<br><span class="indonesia">INDONESIA</span></span>
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
                  <path
                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" class="social-link">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a href="#" class="social-link">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <p>&copy; 2025 Wahaha Misii Indonesia. All rights reserved.</p>
        </div>
      </div>
    </footer>

    <!-- Scroll to Top -->
    <Transition name="fade-up">
      <button v-if="showScrollTop" class="scroll-top-btn" @click="scrollToTop" aria-label="Scroll to top">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeAccordion = ref(1)
const activeFaq = ref(null)
const isScrolled = ref(false)
const mobileMenuOpen = ref(false)
const showScrollTop = ref(false)

// Animated counters
const counters = ref({ volunteers: 0, events: 0, hours: 0, communities: 0 })
const counterTargets = { volunteers: 1200, events: 86, hours: 15000, communities: 34 }
let counterAnimated = false

const formatNumber = (n) => n >= 1000 ? (n / 1000).toFixed(1) + 'K' : String(n)

const animateCounters = () => {
  if (counterAnimated) return
  counterAnimated = true
  const duration = 2200
  const start = Date.now()
  const easeOut = (t) => 1 - Math.pow(1 - t, 3)
  const frame = () => {
    const elapsed = Date.now() - start
    const progress = Math.min(elapsed / duration, 1)
    const eased = easeOut(progress)
    Object.keys(counterTargets).forEach(key => {
      counters.value[key] = Math.floor(counterTargets[key] * eased)
    })
    if (progress < 1) requestAnimationFrame(frame)
  }
  requestAnimationFrame(frame)
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 60
  showScrollTop.value = window.scrollY > 500
}

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

const toggleAccordion = (index) => {
  activeAccordion.value = activeAccordion.value === index ? null : index
}

const toggleFaq = (index) => {
  activeFaq.value = activeFaq.value === index ? null : index
}

const scrollToVolunteer = () => {
  document.getElementById('volunteer')?.scrollIntoView({ behavior: 'smooth' })
}

const goToRegister = () => router.push('/register')
const goToDashboard = () => router.push('/dashboard')

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-visible')
          if (entry.target.classList.contains('stats-section')) animateCounters()
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  )

  document.querySelectorAll(
    '.steps-section, .program-section, .team-section, .qna-section, ' +
    '.faq-section, .activities-section, .features-section, .volunteer-section, .stats-section'
  ).forEach(el => observer.observe(el))
})

onUnmounted(() => window.removeEventListener('scroll', handleScroll))
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

.lang-btn,
.search-btn,
.user-btn {
  background: transparent;
  border: none;
  color: #374151;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0.5rem;
  transition: color 0.3s ease;
}

.lang-btn:hover,
.search-btn:hover,
.user-btn:hover {
  color: #f97316;
}

.dashboard-btn {
  background: linear-gradient(135deg, #f97316 0%, #fb923c 100%);
  color: white;
  border: none;
  padding: 0.6rem 1.5rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(249, 115, 22, 0.3);
}

.dashboard-btn:hover {
  background: linear-gradient(135deg, #ea580c 0%, #f97316 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.4);
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
  line-height: 1.6;
}

/* Steps Section */
.steps-section {
  padding: 6rem 2rem;
  background: white;
}

.steps-container {
  max-width: 1400px;
  margin: 0 auto;
}

.steps-header {
  text-align: center;
  margin-bottom: 4rem;
}

.steps-tag {
  color: #f97316;
  font-weight: 600;
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  display: block;
  margin-bottom: 1rem;
}

.steps-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #1f2937;
  line-height: 1.2;
  max-width: 800px;
  margin: 0 auto;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.step-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 2.5rem 2rem;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.step-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #f97316 0%, #fb923c 100%);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.step-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
  border-color: #f97316;
}

.step-card:hover::before {
  transform: scaleX(1);
}

.step-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);
  border-radius: 16px;
  transition: all 0.3s ease;
}

.step-card:hover .step-icon {
  transform: scale(1.1) rotate(5deg);
  background: linear-gradient(135deg, #fed7aa 0%, #fdba74 100%);
}

.step-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
}

.step-description {
  color: #6b7280;
  font-size: 0.95rem;
  line-height: 1.7;
  text-align: left;
}

/* Program Section */
.program-section {
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);
}

.program-container {
  max-width: 1400px;
  margin: 0 auto;
}

.program-header {
  text-align: center;
  margin-bottom: 4rem;
}

.program-tag {
  color: #f97316;
  font-weight: 600;
  font-size: 0.95rem;
  text-transform: lowercase;
  letter-spacing: 0.5px;
  display: block;
  margin-bottom: 1rem;
}

.program-title {
  font-size: 2.75rem;
  font-weight: 800;
  color: #1f2937;
  line-height: 1.2;
}

.program-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2.5rem;
  margin-top: 3rem;
}

.program-card {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.4s ease;
  background: white;
}

.program-card:hover {
  transform: translateY(-12px);
  box-shadow: 0 16px 32px rgba(249, 115, 22, 0.2);
}

.program-image {
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
}

.program-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.program-card:hover .program-img {
  transform: scale(1.1);
}

.program-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.5) 70%, transparent 100%);
  padding: 2rem 1.75rem;
  color: white;
}

.program-card-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: white;
}

.program-card-desc {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #f3f4f6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Team Section */
.team-section {
  padding: 6rem 2rem;
  background: white;
}

.team-container {
  max-width: 1400px;
  margin: 0 auto;
}

.team-header {
  text-align: center;
  margin-bottom: 4rem;
}

.team-tag {
  color: #f97316;
  font-weight: 600;
  font-size: 0.95rem;
  text-transform: capitalize;
  letter-spacing: 0.5px;
  display: block;
  margin-bottom: 1rem;
}

.team-title {
  font-size: 2.75rem;
  font-weight: 800;
  color: #1f2937;
  line-height: 1.2;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.team-card {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: white;
  position: relative;
}

.team-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 20px 40px rgba(249, 115, 22, 0.2);
}

.team-image {
  position: relative;
  width: 100%;
  height: 380px;
  overflow: hidden;
}

.team-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.team-card:hover .team-img {
  transform: scale(1.15);
}

.team-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.6) 60%, transparent 100%);
  padding: 1.75rem 1.5rem;
  color: white;
  transform: translateY(0);
  transition: transform 0.4s ease;
}

.team-card:hover .team-overlay {
  transform: translateY(-5px);
}

.team-name {
  font-size: 1.35rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: white;
}

.team-role {
  font-size: 0.95rem;
  line-height: 1.5;
  color: #fbbf24;
  font-weight: 500;
}

/* Q&A Section */
.qna-section {
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);
}

.qna-container {
  max-width: 1400px;
  margin: 0 auto;
}

.qna-header {
  text-align: center;
  margin-bottom: 4rem;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}

.qna-tag {
  color: #f97316;
  font-weight: 600;
  font-size: 0.95rem;
  text-transform: capitalize;
  letter-spacing: 0.5px;
  display: block;
  margin-bottom: 1rem;
}

.qna-title {
  font-size: 2.75rem;
  font-weight: 800;
  color: #1f2937;
  line-height: 1.2;
  margin-bottom: 1.5rem;
}

.qna-description {
  font-size: 1rem;
  line-height: 1.8;
  color: #6b7280;
  margin-bottom: 2rem;
}

.qna-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
  margin-top: 3rem;
}

.qna-accordion {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.accordion-item {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.accordion-item:hover {
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.15);
}

.accordion-header {
  width: 100%;
  padding: 1.5rem 1.75rem;
  background: white;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  transition: all 0.3s ease;
  text-align: left;
}

.accordion-header:hover {
  color: #f97316;
}

.accordion-item.active .accordion-header {
  color: #f97316;
  background: #fff7ed;
}

.accordion-icon {
  transition: transform 0.3s ease;
  flex-shrink: 0;
  color: #9ca3af;
}

.accordion-item.active .accordion-icon {
  transform: rotate(180deg);
  color: #f97316;
}

.accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), padding 0.3s ease;
  padding: 0 1.75rem;
}

.accordion-item.active .accordion-content {
  max-height: 500px;
  padding: 0 1.75rem 1.5rem 1.75rem;
}

.accordion-content p {
  color: #6b7280;
  line-height: 1.7;
  font-size: 0.95rem;
}

.qna-image {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  height: 100%;
  min-height: 400px;
}

.qna-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.qna-image:hover .qna-img {
  transform: scale(1.05);
}

/* FAQ Section */
.faq-section {
  padding: 6rem 2rem;
  background: white;
}

.faq-container {
  max-width: 900px;
  margin: 0 auto;
}

.faq-header {
  text-align: center;
  margin-bottom: 4rem;
}

.faq-tag {
  color: #f97316;
  font-weight: 600;
  font-size: 0.95rem;
  text-transform: lowercase;
  letter-spacing: 0.5px;
  display: block;
  margin-bottom: 1rem;
}

.faq-title {
  font-size: 2.75rem;
  font-weight: 800;
  color: #1f2937;
  line-height: 1.2;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.faq-item {
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.faq-item:hover {
  border-color: #f97316;
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.1);
}

.faq-item.active {
  border-color: #f97316;
  box-shadow: 0 6px 16px rgba(249, 115, 22, 0.15);
}

.faq-question {
  width: 100%;
  padding: 1.5rem 2rem;
  background: white;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  transition: all 0.3s ease;
  text-align: left;
  gap: 1rem;
}

.faq-question:hover {
  color: #f97316;
}

.faq-item.active .faq-question {
  color: #f97316;
  background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);
}

.faq-icon {
  transition: transform 0.3s ease;
  flex-shrink: 0;
  color: #9ca3af;
}

.faq-item.active .faq-icon {
  transform: rotate(180deg);
  color: #f97316;
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), padding 0.3s ease;
  padding: 0 2rem;
}

.faq-item.active .faq-answer {
  max-height: 500px;
  padding: 0 2rem 1.5rem 2rem;
}

.faq-answer p {
  color: #6b7280;
  line-height: 1.8;
  font-size: 1rem;
}

/* Activities Section */
.activities-section {
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);
}

.activities-container {
  max-width: 1400px;
  margin: 0 auto;
}

.activities-header {
  text-align: center;
  margin-bottom: 4rem;
}

.activities-tag {
  color: #f97316;
  font-weight: 600;
  font-size: 0.95rem;
  text-transform: capitalize;
  letter-spacing: 0.5px;
  display: block;
  margin-bottom: 1rem;
}

.activities-title {
  font-size: 2.75rem;
  font-weight: 800;
  color: #1f2937;
  line-height: 1.2;
}

.activities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2.5rem;
}

.activity-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.activity-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 28px rgba(249, 115, 22, 0.2);
}

.activity-image {
  width: 100%;
  height: 220px;
  overflow: hidden;
  position: relative;
}

.activity-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.activity-card:hover .activity-img {
  transform: scale(1.1);
}

.activity-content {
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
}

.activity-badge {
  display: inline-block;
  padding: 0.4rem 0.9rem;
  background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);
  color: #f97316;
  font-size: 0.85rem;
  font-weight: 600;
  border-radius: 6px;
  align-self: flex-start;
}

.activity-name {
  font-size: 1.35rem;
  font-weight: 700;
  color: #1f2937;
  line-height: 1.3;
  margin: 0;
}

.activity-meta {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin: 0.5rem 0;
}

.activity-meta-item {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  color: #6b7280;
  font-size: 0.9rem;
  line-height: 1.5;
}

.activity-meta-item svg {
  flex-shrink: 0;
  margin-top: 2px;
  color: #f97316;
}

.activity-btn {
  width: 100%;
  padding: 1rem;
  background: #f97316;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: auto;
}

.activity-btn:hover {
  background: #ea580c;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
}

/* Features Section */
.features-section {
  padding: 5rem 2rem;
  background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);
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

  .qna-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .qna-image {
    min-height: 350px;
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

  .steps-title,
  .program-title,
  .team-title,
  .qna-title {
    font-size: 2rem;
  }

  .qna-description {
    font-size: 0.95rem;
  }

  .program-grid,
  .team-grid {
    grid-template-columns: 1fr;
  }
}

/* ============================================================
   ENHANCED UI — Navbar scroll effect, mobile menu, stats,
   scroll-reveal, scroll-to-top, step badges, animations
   ============================================================ */

/* Navbar smooth transition & scrolled glass effect */
.navbar {
  transition: box-shadow 0.35s ease, background 0.35s ease, padding 0.35s ease;
}

.navbar.scrolled {
  padding: 0.6rem 0;
  background: rgba(255, 255, 255, 0.97);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

/* Nav-link active underline on hover */
.nav-link {
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: 2px;
  background: #f97316;
  border-radius: 2px;
  transform: scaleX(0);
  transition: transform 0.25s ease;
}

.nav-link:hover::after {
  transform: scaleX(1);
}

/* Mobile menu button (hidden on desktop) */
.mobile-menu-btn {
  display: none;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: #374151;
  transition: color 0.25s;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

.mobile-menu-btn:hover {
  color: #f97316;
  background: #fff7ed;
}

@media (max-width: 1024px) {
  .mobile-menu-btn {
    display: flex;
  }
}

/* Mobile menu overlay & panel */
.mobile-menu-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 998;
  backdrop-filter: blur(4px);
}

.mobile-menu-panel {
  position: absolute;
  top: 0;
  right: 0;
  width: min(320px, 85vw);
  height: 100%;
  background: white;
  padding: 1.75rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  box-shadow: -8px 0 32px rgba(0, 0, 0, 0.15);
  overflow-y: auto;
}

.mobile-menu-logo {
  padding-bottom: 1.25rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #f0f0f0;
}

.mobile-nav-link {
  display: block;
  padding: 0.8rem 1rem;
  border-radius: 8px;
  color: #374151;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.2s ease;
}

.mobile-nav-link:hover {
  background: #fff7ed;
  color: #f97316;
  padding-left: 1.5rem;
}

.mobile-cta-btn {
  margin-top: 1rem;
  width: 100%;
  padding: 0.9rem;
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.35);
}

.mobile-cta-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(249, 115, 22, 0.45);
}

/* Mobile menu slide-in transition */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.3s ease;
}

.mobile-menu-enter-active .mobile-menu-panel,
.mobile-menu-leave-active .mobile-menu-panel {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
}

.mobile-menu-enter-from .mobile-menu-panel,
.mobile-menu-leave-to .mobile-menu-panel {
  transform: translateX(100%);
}

/* Hero button pulse */
.btn-primary {
  animation: heroPulse 2.5s ease-in-out infinite;
}

@keyframes heroPulse {

  0%,
  100% {
    box-shadow: 0 4px 12px rgba(249, 115, 22, 0.4);
  }

  50% {
    box-shadow: 0 4px 24px rgba(249, 115, 22, 0.65);
  }
}

.btn-primary:hover {
  animation: none;
}

/* ======== Stats Section ======== */
.stats-section {
  background: linear-gradient(135deg, #f97316 0%, #ea580c 60%, #dc4a09 100%);
  padding: 4rem 2rem;
  position: relative;
  overflow: hidden;
}

.stats-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  pointer-events: none;
}

.stats-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  position: relative;
  z-index: 1;
}

.hero-stat-item {
  text-align: center;
  padding: 2rem 1rem;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
  cursor: default;
}

.hero-stat-item:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-6px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
}

.hero-stat-number {
  font-size: 2.75rem;
  font-weight: 800;
  color: white;
  line-height: 1;
  margin-bottom: 0.5rem;
  font-variant-numeric: tabular-nums;
}

.hero-stat-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
  text-transform: uppercase;
  letter-spacing: 1px;
}

@media (max-width: 768px) {
  .stats-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .stats-container {
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .hero-stat-number {
    font-size: 2rem;
  }
}

/* ======== Step Card Number Badges (CSS Counter) ======== */
.steps-grid {
  counter-reset: step-counter;
}

.step-card {
  counter-increment: step-counter;
}

.step-card::after {
  content: "0" counter(step-counter);
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  font-size: 1.1rem;
  font-weight: 800;
  color: white;
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.4);
  line-height: 44px;
  text-align: center;
}

/* ======== Scroll-reveal animations ======== */
.volunteer-section,
.steps-section,
.program-section,
.team-section,
.qna-section,
.faq-section,
.activities-section,
.features-section {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.75s ease, transform 0.75s ease;
}

.section-visible {
  opacity: 1 !important;
  transform: translateY(0) !important;
}

/* Staggered card animations once section is visible */
.steps-section.section-visible .step-card {
  opacity: 1;
  transform: translateY(0);
}

.steps-section .step-card {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.steps-section.section-visible .step-card:nth-child(1) {
  transition-delay: 0.1s;
}

.steps-section.section-visible .step-card:nth-child(2) {
  transition-delay: 0.22s;
}

.steps-section.section-visible .step-card:nth-child(3) {
  transition-delay: 0.34s;
}

.steps-section.section-visible .step-card:nth-child(4) {
  transition-delay: 0.46s;
}

.program-section .program-card,
.team-section .team-card,
.activities-section .activity-card,
.features-section .feature-card {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.55s ease, transform 0.55s ease;
}

.program-section.section-visible .program-card,
.team-section.section-visible .team-card,
.activities-section.section-visible .activity-card,
.features-section.section-visible .feature-card {
  opacity: 1;
  transform: translateY(0);
}

.program-section.section-visible .program-card:nth-child(1),
.team-section.section-visible .team-card:nth-child(1),
.activities-section.section-visible .activity-card:nth-child(1),
.features-section.section-visible .feature-card:nth-child(1) {
  transition-delay: 0.1s;
}

.program-section.section-visible .program-card:nth-child(2),
.team-section.section-visible .team-card:nth-child(2),
.activities-section.section-visible .activity-card:nth-child(2),
.features-section.section-visible .feature-card:nth-child(2) {
  transition-delay: 0.22s;
}

.program-section.section-visible .program-card:nth-child(3),
.team-section.section-visible .team-card:nth-child(3),
.activities-section.section-visible .activity-card:nth-child(3),
.features-section.section-visible .feature-card:nth-child(3) {
  transition-delay: 0.34s;
}

.team-section.section-visible .team-card:nth-child(4) {
  transition-delay: 0.46s;
}

/* Stats section animation on scroll */
.stats-section {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.75s ease, transform 0.75s ease;
}

.stats-section.section-visible {
  opacity: 1;
  transform: translateY(0);
}

.stats-section.section-visible .hero-stat-item {
  opacity: 1;
  transform: translateY(0);
}

.stats-section .hero-stat-item {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.stats-section.section-visible .hero-stat-item:nth-child(1) {
  transition-delay: 0.1s;
}

.stats-section.section-visible .hero-stat-item:nth-child(2) {
  transition-delay: 0.2s;
}

.stats-section.section-visible .hero-stat-item:nth-child(3) {
  transition-delay: 0.3s;
}

.stats-section.section-visible .hero-stat-item:nth-child(4) {
  transition-delay: 0.4s;
}

/* ======== Scroll-to-top button ======== */
.scroll-top-btn {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  color: white;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 997;
  box-shadow: 0 4px 18px rgba(249, 115, 22, 0.45);
  transition: all 0.3s ease;
}

.scroll-top-btn:hover {
  transform: translateY(-4px) scale(1.08);
  box-shadow: 0 8px 28px rgba(249, 115, 22, 0.55);
}

.fade-up-enter-active,
.fade-up-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(12px);
}

/* ======== Feature card icon ring ======== */
.feature-icon {
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.feature-card:hover .feature-icon {
  transform: scale(1.15) rotate(8deg);
}

/* ======== Footer social alt hover ======== */
.social-link {
  transition: background 0.25s ease, color 0.25s ease, transform 0.25s ease;
}
</style>
