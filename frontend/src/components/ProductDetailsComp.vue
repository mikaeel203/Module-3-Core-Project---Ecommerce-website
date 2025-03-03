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
      mainImage: '', // Currently displayed main image
      loading: false, // Loading state for add to cart
      zoomLevel: 1, // Current zoom level (1 = no zoom)
      maxZoom: 3, // Maximum zoom level
      minZoom: 1 
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
  },
  methods: {
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
  border-radius: 8px;
}

/* .thumbnail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 10px;
} */

/* .thumbnail {
  width: 100%;
  height: 100px;
  object-fit: cover;
  cursor: pointer;
  border: 2px solid transparent;
  border-radius: 8px;
  transition: border-color 0.3s, transform 0.3s;
}

.thumbnail:hover {
  border-color: #3366ff;
  transform: scale(1.05);
}

.thumbnail.active {
  border-color: #3366ff;
} */

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

.add-to-cart-btn:hover {
  background-color: #2855d9;
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

.main-image-container {
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden; /* Hide overflow when zoomed */
  margin-bottom: 15px;
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease; /* Smooth zoom transition */
  transform-origin: center center; /* Zoom from the center */
}

.zoom-controls {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.zoom-controls button {
  padding: 8px 16px;
  background-color: #3366ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.zoom-controls button:hover {
  background-color: #2855d9;
}

.thumbnail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 10px;
}

.thumbnail {
  width: 100%;
  height: 80px;
  object-fit: cover;
  cursor: pointer;
  border: 2px solid transparent;
  border-radius: 8px;
  transition: border-color 0.3s, transform 0.3s;
}

.thumbnail:hover {
  border-color: #3366ff;
  transform: scale(1.05);
}

.thumbnail.active {
  border-color: #3366ff;
}
</style>