<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, RouterLink, RouterView } from 'vue-router'

const isAuthenticated = ref(false)
const router = useRouter()

// Kontrola autentifikácie pri načítaní
onMounted(() => {
  isAuthenticated.value = !!localStorage.getItem('token')
})

// Odhlásenie používateľa
function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('role')
  isAuthenticated.value = false
  router.push('/login')
}
</script>

<template>
  <header>
    <div class="wrapper">
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <RouterLink class="navbar-brand" to="/">Home</RouterLink>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <RouterLink class="nav-link" to="/">Home</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" to="/about">About</RouterLink>
              </li>

              <!-- Ak je prihlásený -->
              <template v-if="isAuthenticated">
                <li class="nav-item">
                  <RouterLink class="nav-link" to="/admin/posts">Posts</RouterLink>
                </li>
                <li class="nav-item">
                  <RouterLink class="nav-link" to="/admin/users">Users</RouterLink>
                </li>
                <li class="nav-item">
                  <button class="btn nav-link" @click="logout">Logout</button>
                </li>
              </template>

              <!-- Ak nie je prihlásený -->
              <template v-else>
                <li class="nav-item">
                  <RouterLink class="nav-link" to="/login">Login</RouterLink>
                </li>
                <li class="nav-item">
                  <RouterLink class="nav-link" to="/register">Register</RouterLink>
                </li>
              </template>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
