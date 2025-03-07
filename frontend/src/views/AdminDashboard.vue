<template>
    <div class="admin-dashboard">
      <h2>Admin Dashboard</h2>
  
      <!-- Product Statistics -->
      <div class="product-stats">
        <h3>Product Statistics</h3>
        <div v-if="loadingStats">Loading statistics...</div>
        <div v-else>
          <p>Total Products: {{ stats.totalProducts }}</p>
          <p>Most Viewed Product: {{ stats.mostViewedProduct.title }} ({{ stats.mostViewedProduct.views }} views)</p>
          <p>Total Orders: {{ stats.totalOrders }}</p>
        </div>
      </div>
  
      <!-- Add New Product Form -->
      <div class="add-product-form">
        <h3>Add New Product</h3>
        <form @submit.prevent="addProduct">
          <div class="form-group">
            <label for="title">Title</label>
            <input type="text" id="title" v-model="newProduct.title" required />
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <textarea id="description" v-model="newProduct.description" required></textarea>
          </div>
          <div class="form-group">
            <label for="price">Price</label>
            <input type="number" id="price" v-model="newProduct.price" required />
          </div>
          <div class="form-group">
            <label for="category">Category</label>
            <select id="category" v-model="newProduct.category" required>
              <option value="Casket">Casket</option>
              <option value="Coffin">Coffin</option>
              <option value="Urn">Urn</option>
              <option value="Pet Memorial">Pet Memorial</option>
            </select>
          </div>
          <button type="submit" class="add-product-btn">Add Product</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { API_BASE_URL } from '@/config';
  
  export default {
    data() {
      return {
        stats: {
          totalProducts: 0,
          mostViewedProduct: { title: '', views: 0 },
          totalOrders: 0,
        },
        newProduct: {
          title: '',
          description: '',
          price: 0,
          category: 'Casket',
        },
        loadingStats: true,
      };
    },
    async created() {
      await this.fetchProductStats();
    },
    methods: {
      async fetchProductStats() {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch(`${API_BASE_URL}/admin/stats`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
  
          if (!response.ok) throw new Error('Failed to fetch product stats');
          this.stats = await response.json();
        } catch (error) {
          console.error('Error fetching product stats:', error);
        } finally {
          this.loadingStats = false;
        }
      },
      async addProduct() {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch(`${API_BASE_URL}/admin/products`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(this.newProduct),
          });
  
          if (!response.ok) throw new Error('Failed to add product');
          alert('Product added successfully!');
          this.newProduct = { title: '', description: '', price: 0, category: 'Casket' }; // Reset form
          await this.fetchProductStats(); // Refresh stats
        } catch (error) {
          console.error('Error adding product:', error);
          alert('Failed to add product. Please try again.');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .admin-dashboard {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .product-stats,
  .add-product-form {
    margin-bottom: 40px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  input,
  textarea,
  select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
  }
  
  .add-product-btn {
    padding: 10px 20px;
    background-color: #3366ff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .add-product-btn:hover {
    background-color: #2855d9;
  }
  </style>