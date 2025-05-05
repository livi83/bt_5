<template>
  <main class="container">
    <h1>This is a posts page</h1>
    <div class="card">
      <div class="card-header">
        <h4>Posts</h4>
        <RouterLink :to="{ name: 'posts.create' }" class="btn btn-primary float-end">
          Add Post
        </RouterLink>
      </div>
      <div class="card-body">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Content</th>
              <th>Category</th>
              <th>User</th>
              <th>Tags</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="post in posts" :key="post.id">
              <td>{{ post.id }}</td>
              <td>{{ post.title }}</td>
              <td>{{ post.content }}</td>
              <td>{{ post.category.name }}</td>
              <td>{{ post.user.name }}</td>
              <td>
                <span v-for="tag in post.tags" :key="tag.id" class="badge bg-secondary me-1">{{ tag.name }}</span>
              </td>
              <td>
                <RouterLink :to="{ name: 'posts.update', params: { id: post.id } }" class="btn btn-success">
                  Edit
                </RouterLink>
                <button type="button" @click="deletePost(post.id)" class="btn btn-danger">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios';
export default {
  name: 'posts',
  data() {
    return {
      posts: []
    }
  },
  mounted() {
    this.getPosts();
  },
  methods: {
    getPosts() {
      axios.get('http://127.0.0.1:8000/api/admin/posts').then(res => {
        this.posts = res.data;
        console.log(this.posts);
      })
    },
    async deletePost(postId) {
      if (confirm('Naozaj chceš vymazať tento príspevok?')) {
        try {
          const response = await axios.delete(`http://127.0.0.1:8000/api/admin/posts/${postId}`);
          console.log(response.data); // Voliteľné: Zobrazenie správy o úspešnom vymazaní
          // Odstráň príspevok z lokálneho zoznamu, aby sa okamžite zmizol z tabuľky
          this.posts = this.posts.filter(post => post.id !== postId);
        } catch (error) {
          console.error("Error deleting post:", error);
          // Zobrazenie chybovej hlášky používateľovi (napr. pomocou alertu alebo toastu)
          alert('Nepodarilo sa vymazať príspevok!');
        }
      }
    },
  }

}
</script>
