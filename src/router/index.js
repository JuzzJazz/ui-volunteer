import { createRouter, createWebHistory } from 'vue-router'
import VolunteerRegistrationForm from '../components/VolunteerRegistrationForm.vue'
import VolunteerDashboard from '../components/VolunteerDashboard.vue'

const routes = [
  {
    path: '/',
    name: 'Register',
    component: VolunteerRegistrationForm,
    meta: {
      title: 'Pendaftaran Volunteer - Wahana Visi Indonesia'
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: VolunteerDashboard,
    meta: {
      title: 'Dashboard - Volunteer KinCir'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

// Update document title based on route meta
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Wahana Visi Indonesia'
  next()
})

export default router
