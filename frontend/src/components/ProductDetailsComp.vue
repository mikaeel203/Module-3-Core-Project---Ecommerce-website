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
        <!-- Main Image -->
        <div class="main-image-container">
          <img 
            :src="mainImage" 
            :alt="product.title" 
            ref="mainImage"
            class="main-image"
            :style="{ transform: `scale(${zoomLevel})` }"
          >
        </div>

        <!-- Zoom Controls -->
        <div class="zoom-controls">
          <button @click="zoomIn">Zoom In</button>
          <button @click="zoomOut">Zoom Out</button>
          <button @click="resetZoom">Reset</button>
        </div>

        <!-- Thumbnail Grid -->
        <div class="thumbnail-grid">
          <img
            v-for="(image, index) in product.images"
            :key="index"
            :src="image"
            :alt="`${product.title} image ${index + 1}`"
            @click="setMainImage(image)"
            :class="{ active: image === mainImage }"
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
    <div class="reviews-section">
      <h3>Reviews</h3>
      <div v-if="reviews.length > 0">
        <div v-for="review in reviews" :key="review.review_id" class="review-item">
          <p><strong>Rating:</strong> {{ review.rating }}/5</p>
          <p>{{ review.comment }}</p>
          <p><small>By: User {{ review.user_id }}</small></p>
        </div>
      </div>
      <p v-else>No reviews yet.</p>

      <!-- Add Review Form -->
      <form @submit.prevent="submitReview">
        <label for="rating">Rating:</label>
        <input type="number" id="rating" v-model="newReview.rating" min="1" max="5" required />
        <label for="comment">Comment:</label>
        <textarea id="comment" v-model="newReview.comment" required></textarea>
        <button type="submit">Submit Review</button>
      </form>
    </div>
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
      product: null,
      mainImage: '',
      reviews: [],
      newReview: {
        rating: 5,
        comment: ''
      }
    };
  },
  async created() {
    const productId = this.$route.params.id;
    try {
      const response = await fetch(`${API_BASE_URL}/products/${productId}`);
      if (response.ok) {
        this.product = await response.json();
        this.mainImage = this.product.images[0]; // Set the first image as the main image
      } else {
        console.error("Failed to fetch product details");
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
    await this.fetchReviews();
  },
  methods: {
    async fetchReviews() {
      const productId = this.$route.params.id;
      const response = await fetch(`${API_BASE_URL}/reviews/${productId}`);
      if (response.ok) {
        this.reviews = await response.json();
      }
    },
    async submitReview() {
      const response = await fetch(`${API_BASE_URL}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          product_id: this.$route.params.id,
          rating: this.newReview.rating,
          comment: this.newReview.comment,
        }),
      });
      if (response.ok) {
        this.newReview = { rating: 5, comment: '' };
        await this.fetchReviews();
      }
    },

    zoomIn() {
      if (this.zoomLevel < this.maxZoom) {
        this.zoomLevel += 0.5;
      }
    },
    zoomOut() {
      if (this.zoomLevel > this.minZoom) {
        this.zoomLevel -= 0.5;
      }
    },
    resetZoom() {
      this.zoomLevel = 1;
    },
    formatPrice(price) {
      return price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    },
    setMainImage(image) {
      this.mainImage = image; // Update the main image when a thumbnail is clicked
    },
    async handleAddToCart() {
      if (!localStorage.getItem('token')) {
        this.$router.push('/login');
        return;
      }

      this.loading = true;

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
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.reviews-section {
  margin-top: 20px;
}

.review-item {
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
}

form {
  margin-top: 20px;
}

textarea {
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
}

.product-detail-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 24px;
  font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  color: #333;
  padding-top: 100px !important;
}

.back-button {
  margin-bottom: 28px;
}

.back-button a {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #555;
  font-size: 16px;
  font-weight: 500;
  transition: color 0.2s ease;
}

.back-button a:hover {
  color: #2855d9;
}

.arrow {
  margin-right: 10px;
  font-size: 18px;
  transition: transform 0.2s ease;
}

.back-button a:hover .arrow {
  transform: translateX(-4px);
}

.product-layout {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

@media (min-width: 768px) {
  .product-layout {
    flex-direction: row;
  }
}

.product-images {
  flex: 1;
}

.main-image-container {
  position: relative;
  width: 100%;
  height: 450px;
  overflow: hidden;
  margin-bottom: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
  transform-origin: center center;
}

.zoom-controls {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.zoom-controls button {
  padding: 10px 18px;
  background-color: #3366ff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  flex: 1;
}

.zoom-controls button:hover {
  background-color: #2855d9;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.zoom-controls button:active {
  transform: translateY(0);
}

.thumbnail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  gap: 12px;
}

.thumbnail {
  width: 100%;
  height: 90px;
  object-fit: cover;
  cursor: pointer;
  border: 2px solid transparent;
  border-radius: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.thumbnail:hover {
  border-color: #3366ff;
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.thumbnail.active {
  border-color: #3366ff;
  box-shadow: 0 0 0 2px rgba(51, 102, 255, 0.3);
}

.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-title {
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 16px 0;
  color: #222;
  line-height: 1.2;
}

.product-price {
  font-size: 28px;
  font-weight: 700;
  color: #3366ff;
  margin-bottom: 28px;
}

.add-to-cart-btn {
  width: 100%;
  padding: 16px 0;
  background-color: #3366ff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 32px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(51, 102, 255, 0.2);
}

.add-to-cart-btn:hover {
  background-color: #2855d9;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(51, 102, 255, 0.3);
}

.add-to-cart-btn:active {
  transform: translateY(0);
}

.product-description, .additional-details {
  background-color: #f8f9fa;
  padding: 24px;
  border-radius: 10px;
  margin-bottom: 24px;
}

.product-description h2, .additional-details h2 {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #222;
  position: relative;
  padding-bottom: 12px;
}

.product-description h2::after, .additional-details h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 3px;
  background-color: #3366ff;
  border-radius: 3px;
}

.product-description p, .additional-details p {
  color: #444;
  line-height: 1.7;
  font-size: 16px;
  margin-bottom: 10px;
}

.additional-details p strong {
  font-weight: 600;
  color: #333;
  display: inline-block;
  width: 100px;
}

.loading {
  text-align: center;
  padding: 60px;
  font-size: 18px;
  color: #666;
  animation: pulse 1.5s infinite ease-in-out;
}

@keyframes pulse {
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
}
</style>