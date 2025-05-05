<template>
  <div class="container">
    <h1>Login</h1>
    <form @submit.prevent="login" class="card">
      <div class="card-body">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input type="email" id="email" class="form-control" v-model="email" required />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" id="password" class="form-control" v-model="password" required />
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/login', {
          email: this.email,
          password: this.password,
        });
        const { token, user, role } = response.data; // Získaj rolu z odpovede
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('role', role); // Ulož rolu do localStorage
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        this.router.push('/admin/posts'); // Presmerovanie po úspešnom prihlásení
      } catch (error) {
        console.error('Login error:', error);
        alert('Invalid login credentials');
      }
    },

  },
};
</script>
