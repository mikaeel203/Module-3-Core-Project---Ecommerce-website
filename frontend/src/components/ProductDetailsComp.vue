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

        <!-- Product Options -->
        <div class="product-options">
          <div class="option-group">
            <label>Wood Type:</label>
            <select v-model="selectedWoodType" class="option-select">
              <option v-for="type in product.woodTypes" :key="type" :value="type">
                {{ type }}
              </option>
            </select>
          </div>

          <div class="option-group">
            <label>Interior Color:</label>
            <div class="color-options">
              <div
                v-for="color in product.interiorColors"
                :key="color.value"
                class="color-option"
                :class="{ selected: selectedColor === color.value }"
                :style="{ backgroundColor: color.hex }"
                @click="selectedColor = color.value"
              ></div>
            </div>
          </div>
        </div>

        <!-- Add to Cart Button -->
        <button class="add-to-cart-btn" @click="addToCart">Add to Cart</button>
        <button @click="addToWishlist" class="wishlist-btn">Add to Wishlist</button>

        <!-- Product Description -->
        <div class="product-description">
          <h2>Product Description</h2>
          <p>{{ product.description }}</p>

          <ul class="feature-list">
            <li v-for="(feature, index) in product.features" :key="index">
              <span class="check-icon">✓</span> {{ feature }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-else class="loading">Loading product details...</div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { API_BASE_URL } from '@/config';
export default {
  name: 'ProductDetail',
  props: {
    productId: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      product: null,
      selectedWoodType: null,
      selectedColor: null,
    };
  },
  async created() {
    await this.fetchProductDetails();
  },
  methods: {
    async fetchProductDetails() {
      const response = await fetch(`${API_BASE_URL}/products/${this.productId}`);
      this.product = await response.json();
    },
    formatPrice(price) {
      return price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    },
    methods: {
      
  addToCart() {
    const productToAdd = {
      id: this.product.product_id,
      name: this.product.name,
      price: this.product.price,
      image: this.product.image,
      quantity: 1,
    };
    this.$store.dispatch('cart/addToCart', productToAdd);
    alert('Product added to cart');
  },
  ...mapActions('wishlist', ['addToWishlist']),
    addToWishlist() {
      this.addToWishlist(this.product);
      alert('Product added to wishlist');
    }
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