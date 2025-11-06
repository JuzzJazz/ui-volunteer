<script setup>
import { ref } from 'vue'
import LandingPage from './components/LandingPage.vue'
import VolunteerRegistrationForm from './components/VolunteerRegistrationForm.vue'
import VolunteerDashboard from './components/VolunteerDashboard.vue'

const currentView = ref('landing') // 'landing', 'register', 'dashboard'

const showRegistrationForm = () => {
  currentView.value = 'register'
}

const handleFormSubmit = (formData) => {
  console.log('🎉 handleFormSubmit called!')
  console.log('Form data received:', formData)
  console.log('Switching to dashboard...')
  currentView.value = 'dashboard'
  console.log('currentView is now:', currentView.value)
}
</script>

<template>
  <div id="app">
    <LandingPage 
      v-if="currentView === 'landing'" 
      @joinVolunteer="showRegistrationForm" 
    />
    <VolunteerRegistrationForm 
      v-else-if="currentView === 'register'" 
      @formSubmitted="handleFormSubmit" 
    />
    <VolunteerDashboard v-else-if="currentView === 'dashboard'" />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter', sans-serif;
  background: linear-gradient(135deg, #fff7ed 0%, #fed7aa 50%, #f97316 100%);
  background-attachment: fixed;
  color: #1f2937;
  line-height: 1.6;
  min-height: 100vh;
}

#app {
  min-height: 100vh;
}

#app:has(.form-container) {
  padding: 30px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #fff7ed;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #ea580c 0%, #dc2626 100%);
}

/* Animation for form elements */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.form-container {
  animation: fadeInUp 0.6s ease-out;
}
</style>
