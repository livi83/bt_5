<template>
  <main class="container">
    <h1>Edit Post</h1>

    <form @submit.prevent="updatePost" class="card">
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
            rows="5"
            v-model="post.content"
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
            <option v-for="category in categories" :value="category.id">
              {{ category.name }}
            </option>
          </select>
          <div v-if="errors.category_id" class="text-danger">
            {{ errors.category_id[0] }}
          </div>
        </div>

        <div class="mb-3">
          <label for="user_id" class="form-label">User</label>
          <select
            id="user_id"
            class="form-select"
            v-model="post.user_id"
            required
          >
            <option value="">Select User</option>
            <option v-for="user in users" :value="user.id">
              {{ user.name }}
            </option>
          </select>
          <div v-if="errors.user_id" class="text-danger">
            {{ errors.user_id[0] }}
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
            <option v-for="tag in tags" :value="tag.id">
              {{ tag.name }}
            </option>
          </select>
          <div v-if="errors.tags" class="text-danger">
            {{ errors.tags[0] }}
          </div>
        </div>

        <button type="submit" class="btn btn-success">Update Post</button>
      </div>
    </form>
  </main>
</template>

<script>
import axios from "axios";
export default {
  name: "EditPost", // Zmenil som názov komponentu
  data() {
    return {
      post: {
        title: "",
        content: "",
        category_id: "",
        user_id: "",
        tags: [],
      },
      categories: [],
      users: [],
      tags: [],
      errors: {},
      postId: null, // Pridali sme premennú pre ID upravovaného postu
    };
  },
  mounted() {
    this.getPost(); // Načítame detail postu pri načítaní komponentu
    this.getCategories();
    this.getUsers();
    this.getTags();
  },
  methods: {
    async getPost() {
      this.postId = this.$route.params.id;

      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/admin/posts/${this.postId}`
        );
        this.post = response.data;
        this.post.tags = response.data.tags.map((tag) => tag.id);
      } catch (error) {
        console.error("Error fetching post:", error);
        this.$router.push({ name: "posts" });
      }
    },

    async getCategories() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/admin/categories");
        this.categories = response.data;
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },
    async getUsers() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/admin/users");
        this.users = response.data;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    async getTags() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/admin/tags");
        this.tags = response.data;
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    },
    async updatePost() {
      try {
        const response = await axios.put(
          `http://127.0.0.1:8000/api/admin/posts/${this.postId}`, // Správna URL pre aktualizáciu
          this.post
        );
        console.log(response.data);
        // Po úspešnej aktualizácii presmeruj na detail/zoznam postov
        this.$router.push({ name: "posts" });
      } catch (error) {
        if (error.response && error.response.status === 422) {
          this.errors = error.response.data.errors;
        } else {
          console.error("Error updating post:", error);
        }
      }
    },
  },
};
</script>
