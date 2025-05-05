<template>
  <main class="container">
    <h1>Create Post</h1>
    <form @submit.prevent="createPost" class="card">
      <div class="card-body">
        <div class="mb-3">
          <label for="title" class="form-label">Title</label>
          <input
            type="text"
            id="title"
            class="form-control"
            v-model="post.title"
            required
          />
          <div v-if="errors.title" class="text-danger">
            {{ errors.title[0] }}
          </div>
        </div>

        <div class="mb-3">
          <label for="content" class="form-label">Content</label>
          <textarea
            id="content"
            class="form-control"
            v-model="post.content"
            rows="8"
            required
          ></textarea>
          <div v-if="errors.content" class="text-danger">
            {{ errors.content[0] }}
          </div>
        </div>

        <div class="mb-3">
          <label for="category_id" class="form-label">Category</label>
          <select
            id="category_id"
            class="form-select"
            v-model="post.category_id"
            required
          >
            <option value="">Select Category</option>
            <option v-for="category in categories" :value="category.id" :key="category.id">
              {{ category.name }}
            </option>
          </select>
          <div v-if="errors.category_id" class="text-danger">
            {{ errors.category_id[0] }}
          </div>
        </div>

        <div class="mb-3">
          <label for="tags" class="form-label">Tags</label>
          <select
            id="tags"
            class="form-select"
            multiple
            v-model="post.tags"
          >
            <option v-for="tag in tags" :value="tag.id" :key="tag.id">
              {{ tag.name }}
            </option>
          </select>
          <div v-if="errors.tags" class="text-danger">
            {{ errors.tags[0] }}
          </div>
        </div>

        <button type="submit" class="btn btn-success">Create Post</button>
      </div>
    </form>
  </main>
</template>

<script>
import axios from '@/axios';

export default {
  name: 'CreatePost',
  data() {
    return {
      post: {
        title: '',
        content: '',
        category_id: '',
        tags: []
      },
      categories: [],
      tags: [],
      errors: {}
    };
  },
  mounted() {
    this.getCategories();
    this.getTags();
  },
  methods: {
    async getCategories() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/admin/categories');
        this.categories = response.data;
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    },
    async getTags() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/admin/tags');
        this.tags = response.data;
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    },
    async createPost() {
      try {
        const response = await axios.post(
          'http://127.0.0.1:8000/api/admin/posts',
          this.post
        );
        console.log(response.data);
        this.$router.push({ name: 'posts' });
      } catch (error) {
        if (error.response && error.response.status === 422) {
          this.errors = error.response.data.errors;
        } else {
          console.error('Error creating post:', error);
        }
      }
    }
  }
};
</script>
