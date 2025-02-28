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
      <!-- Product Images -->
      <div class="product-images">
        <div class="main-image">
          <img :src="product.images[0]" :alt="product.title" />
        </div>
        <div class="thumbnail-grid">
          <img
            v-for="(image, index) in product.images"
            :key="index"
            :src="image"
            :alt="`${product.title} image ${index + 1}`"
            @click="setMainImage(image)"
            class="thumbnail"
          />
        </div>
      </div>

      <!-- Product Info -->
      <div class="product-info">
        <h1 class="product-title">{{ product.title }}</h1>
        <div class="product-price">R{{ formatPrice(product.price) }}</div>

        <!-- Add to Cart Button -->
        <button class="add-to-cart-btn" @click="handleAddToCart">Add to Cart</button>

        <!-- Product Description -->
        <div class="product-description">
          <h2>Product Description</h2>
          <p>{{ product.description }}</p>
        </div>

        <!-- Additional Details -->
        <div class="additional-details">
          <h2>Additional Details</h2>
          <p><strong>Color:</strong> {{ product.color }}</p>
          <p><strong>Wood Type:</strong> {{ product.wood_type }}</p>
          <p><strong>Category:</strong> {{ product.category }}</p>
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
      loading: false, // Loading state for add to cart
    };
  },
  async created() {
    const productId = this.$route.params.id;
    try {
      const response = await fetch(`${API_BASE_URL}/products/${productId}`);
      if (response.ok) {
        this.product = await response.json();
        console.log("Product Data:", this.product); // Debugging
      } else {
        console.error("Failed to fetch product details");
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  },
  methods: {
    formatPrice(price) {
      return price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    },
    setMainImage(image) {
      this.mainImage = image; // Update the main image when a thumbnail is clicked
    },
    async handleAddToCart() {
      // Redirect to login if user is not logged in
      if (!localStorage.getItem('token')) {
        this.$router.push('/login');
        return;
      }

      this.loading = true; // Show loading state

      try {
        const response = await fetch(`${API_BASE_URL}/cart/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            product_id: this.product.product_id,
            quantity: 1, // Default quantity
          }),
        });

        if (response.ok) {
          alert('Product added to cart!');
          this.$store.dispatch('fetchCart'); // Update cart in Vuex store
        } else {
          const data = await response.json();
          alert(data.error || 'Failed to add to cart.');
        }
      } catch (error) {
        console.error('Error adding to cart:', error);
        alert('An error occurred. Please try again.');
      } finally {
        this.loading = false; // Hide loading state
      }
    },
  },
};
</script>

<style scoped>
.product-detail-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
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
  gap: 40px;
}

.product-images {
  flex: 1;
}

.main-image {
  width: 100%;
  height: 400px;
  overflow: hidden;
  margin-bottom: 15px;
}

.main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 10px;
}

.thumbnail {
  width: 100%;
  height: 100px;
  object-fit: cover;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.3s;
}

.thumbnail:hover {
  border-color: #3366ff;
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

.add-to-cart-btn {
  width: 100%;
  padding: 15px 0;
  background-color: #3366ff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;
  transition: background-color 0.3s;
}

.add-to-cart-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.product-description {
  margin-bottom: 20px;
}

.product-description h2 {
  font-size: 20px;
  margin-bottom: 10px;
  color: #333;
}

.product-description p {
  color: #555;
  line-height: 1.6;
}

.additional-details {
  margin-top: 20px;
}

.additional-details h2 {
  font-size: 20px;
  margin-bottom: 10px;
  color: #333;
}

.additional-details p {
  color: #555;
  line-height: 1.6;
}

.loading {
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #666;
}
</style>