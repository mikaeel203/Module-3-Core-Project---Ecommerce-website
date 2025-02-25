<template>
  <div class="product-detail-container">
    <!-- Back button -->
    <div class="back-button">
      <router-link to="/caskets">
        <span class="arrow">&larr;</span> Previous
      </router-link>
    </div>

    <!-- Product Details -->
    <div class="product-layout" v-if="product">
      <!-- Product Image -->
      <div class="product-images">
        <div class="main-image">
          <img :src="product.image" :alt="product.name" />
        </div>
      </div>

      <!-- Product Info -->
      <div class="product-info">
        <h1 class="product-title">{{ product.name }}</h1>
        <div class="product-price">${{ formatPrice(product.price) }}</div>

        <!-- Add to Cart Button -->
        <button class="add-to-cart-btn" @click="addToCart">Add to Cart</button>

        <!-- Product Description -->
        <div class="product-description">
          <h2>Product Description</h2>
          <p>{{ product.description }}</p>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-else class="loading">Loading product details...</div>
  </div>
</template>

<script>
import { API_BASE_URL } from '@/config';

export default {
  props: {
    id: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      product: null, // Product details
    };
  },
  async created() {
    await this.fetchProductDetails();
  },
  methods: {
    async fetchProductDetails() {
      try {
        const response = await fetch(`${API_BASE_URL}/products/${this.id}`);
        if (response.ok) {
          this.product = await response.json();
        } else {
          console.error('Failed to fetch product details');
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    },
    formatPrice(price) {
      return price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    },
    addToCart() {
      // Add to cart logic
      alert('Product added to cart');
    },
  },
};
</script>


<style scoped>
.wishlist-btn {
  background-color: #ffcc00;
  color: #333;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 10px;
}
.product-detail-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', sans-serif;
}

.back-button {
  margin-bottom: 20px;
}

.back-button a {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #333;
  font-size: 16px;
}

.arrow {
  margin-right: 8px;
}

.product-layout {
  display: flex;
  flex-direction: row;
  gap: 40px;
}

@media (max-width: 768px) {
  .product-layout {
    flex-direction: column;
  }
}

.product-images {
  flex: 1;
}

.main-image {
  width: 100%;
  background-color: #f8f8f8;
  margin-bottom: 15px;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.main-image img {
  width: 100%;
  height: auto;
  display: block;
}

.product-info {
  flex: 1;
}

.product-title {
  font-size: 28px;
  margin: 0 0 10px 0;
  color: #333;
}

.product-price {
  font-size: 24px;
  font-weight: bold;
  color: #444;
  margin-bottom: 20px;
}

.product-options {
  margin-bottom: 25px;
}

.option-group {
  margin-bottom: 15px;
}

.option-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #555;
}

.option-select {
  width: 100%;
  max-width: 300px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  font-size: 16px;
}

.color-options {
  display: flex;
  gap: 10px;
}

.color-option {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid #ddd;
  cursor: pointer;
}

.color-option.selected {
  border: 2px solid #333;
  box-shadow: 0 0 0 2px white inset;
}

.add-to-cart-btn {
  width: 100%;
  max-width: 300px;
  padding: 15px 0;
  background-color: #3366ff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.add-to-cart-btn:hover {
  background-color: #2855d9;
}

.product-description {
  margin-top: 30px;
}

.product-description h2 {
  font-size: 20px;
  margin-bottom: 15px;
  color: #333;
}

.product-description p {
  line-height: 1.6;
  color: #555;
  margin-bottom: 20px;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-list li {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  color: #444;
}

.check-icon {
  color: #4CAF50;
  margin-right: 10px;
}

.loading {
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #666;
}
</style>