
<template>
  <main class="container">
    <h1>This is a users page</h1>
    <div class="card">
      <div class="card-header">
        <h4>Users</h4>
      </div>
      <div class="card-body">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.id }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.role }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>

<script>
import axios from '@/axios';
export default {
  name: 'users',
  data() {
    return {
      users: []
    }
  },
  mounted() {
    this.getusers();
  },
  methods: {
    getusers() {
      axios.get('http://127.0.0.1:8000/api/admin/users').then(res => {
        this.users = res.data;
        console.log(this.users);
      })
    },

  }

}
</script>
