<template>
    <div class="wishlist-container">
      <h2>Wishlist</h2>
      <div v-if="wishlistItems.length > 0">
        <div v-for="item in wishlistItems" :key="item.id" class="wishlist-item">
          <img :src="item.image" :alt="item.name" class="wishlist-item-image" />
          <div class="wishlist-item-details">
            <h3>{{ item.name }}</h3>
            <p>${{ item.price.toFixed(2) }}</p>
            <button @click="removeFromWishlist(item.id)" class="remove-item">Remove</button>
          </div>
        </div>
      </div>
      <p v-else>Your wishlist is empty.</p>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  
  export default {
    computed: {
      ...mapGetters('wishlist', ['wishlistItems']),
    },
    methods: {
      ...mapActions('wishlist', ['removeFromWishlist']),
    },
  };
  </script>
  
  <style scoped>
  .wishlist-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .wishlist-item {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ddd;
    padding-bottom: 20px;
  }
  
  .wishlist-item-image {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }
  
  .wishlist-item-details {
    flex: 1;
  }
  
  .remove-item {
    background-color: #ff4d4d;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
  }
  </style>