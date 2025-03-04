<template>
    <div class="search-and-filter">
      <!-- Search Bar -->
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search products..."
        class="search-input"
      />
  
      <!-- Category Filter -->
      <select v-model="selectedCategory" class="filter-select">
        <option value="">All Categories</option>
        <option value="Casket">Caskets</option>
        <option value="Coffin">Coffins</option>
        <option value="Urn">Urns</option>
        <option value="Pet Memorial">Pet Memorials</option>
      </select>
  
      <!-- Price Range Filter -->
      <div class="price-range">
        <label for="minPrice">Min Price:</label>
        <input
          type="number"
          v-model="minPrice"
          id="minPrice"
          placeholder="Min"
          class="price-input"
        />
        <label for="maxPrice">Max Price:</label>
        <input
          type="number"
          v-model="maxPrice"
          id="maxPrice"
          placeholder="Max"
          class="price-input"
        />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        searchQuery: '',
        selectedCategory: '',
        minPrice: null,
        maxPrice: null,
      };
    },
    watch: {
      searchQuery() {
        this.$emit('search', this.searchQuery);
      },
      selectedCategory() {
        this.$emit('filter-category', this.selectedCategory);
      },
      minPrice() {
        this.$emit('filter-price', { min: this.minPrice, max: this.maxPrice });
      },
      maxPrice() {
        this.$emit('filter-price', { min: this.minPrice, max: this.maxPrice });
      },
    },
  };
  </script>
  
  <style scoped>
  .search-and-filter {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    align-items: center;
  }
  
  .search-input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .filter-select {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .price-range {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  
  .price-input {
    width: 100px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  </style>