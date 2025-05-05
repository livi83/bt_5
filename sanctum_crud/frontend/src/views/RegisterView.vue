<template>
  <div class="container">
    <h1>Register</h1>
    <form @submit.prevent="register" class="card">
      <div class="card-body">
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input type="text" id="name" class="form-control" v-model="name" required />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input type="email" id="email" class="form-control" v-model="email" required />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" id="password" class="form-control" v-model="password" required />
        </div>
        <div class="mb-3">
          <label for="password_confirmation" class="form-label">Confirm Password</label>
          <input type="password" id="password_confirmation" class="form-control" v-model="password_confirmation" required />
        </div>

        <button type="submit" class="btn btn-primary">Register</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  name: 'Register',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      role: '',
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    async register() {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/register', {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
          role: this.role,
        });
        const { token, user, role } = response.data; // Získaj rolu
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('role', role); // Ulož rolu
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        this.router.push('/admin/posts'); // Presmerovanie
      } catch (error) {
        console.error('Registration error:', error);
        alert('Registration failed. Please check your input.');
      }
    },
  },
};
</script>
