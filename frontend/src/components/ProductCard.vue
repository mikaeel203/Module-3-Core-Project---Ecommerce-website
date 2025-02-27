<template>
  <router-link :to="`/details/${product.product_id}`" class="product-card">
    <div class="product-image">
      <!-- Display the first image of the product -->
      <img :src="product.images[0]" :alt="product.title" />
    </div>
    <div class="product-details">
      <h3>{{ product.title }}</h3>
      <!-- <p>{{ product.description }}</p> -->
      <p class="price">${{ formatPrice(product.price) }}</p>
      <span class="view-details">View More Details <i class="bi bi-arrow-right"></i></span>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatPrice(price) {
      return price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    },
  },
};
</script>

<style scoped>
.product-card {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s, box-shadow 0.3s;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.product-details {
  padding: 15px;
}

.product-details h3 {
  margin-bottom: 5px;
  color: #333;
}

.product-details p {
  color: #666;
  margin-bottom: 10px;
  font-size: 0.95rem;
}

.price {
  font-weight: 600;
  color: #333;
  margin: 10px 0;
}

.view-details {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #1a2940;
  font-weight: 500;
  font-size: 0.95rem;
  transition: color 0.3s;
}

.view-details:hover {
  color: #344b6e;
}

.view-details i {
  margin-left: 5px;
  font-size: 0.8rem;
  transition: transform 0.3s;
}

.view-details:hover i {
  transform: translateX(3px);
}
</style>