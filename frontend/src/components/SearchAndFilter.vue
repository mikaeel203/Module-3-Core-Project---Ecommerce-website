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
         min="0"/>
        <label for="maxPrice">Max Price:</label>
        <input
          type="number"
          v-model="maxPrice"
          id="maxPrice"
          placeholder="Max"
          class="price-input"
          min="0" />
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
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
  align-items: center;
  padding: 15px;
}

.search-input,
.filter-select,
.price-input {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 25px;
  font-size: 16px;
  transition: all 0.3s ease-in-out;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
}

.search-input {
  flex: 1;
}

.filter-select {
  min-width: 150px;
  background: white;
  cursor: pointer;
}

.price-range {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
}

.price-input {
  width: 120px;
}

.search-input:focus,
.filter-select:focus,
.price-input:focus {
  border-color: #1a2940;
  outline: none;
  box-shadow: 0 0 8px rgba(26, 41, 64, 0.3);
}

.filter-select:hover,
.price-input:hover,
.search-input:hover {
  transform: scale(1.02);
}

@media (max-width: 768px) {
  .search-and-filter {
    flex-direction: column;
    align-items: stretch;
  }

  .price-range {
    flex-direction: column;
    align-items: stretch;
  }

  .price-input {
    width: 100%;
  }
}

  </style>