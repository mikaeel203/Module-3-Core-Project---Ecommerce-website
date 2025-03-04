<template>
    <div class="all-products-view">
      <!-- Back Navigation -->
      <div class="container">
        <div class="back-nav">
          <router-link to="/" class="back-link"><i class="fas fa-chevron-left"></i> Previous</router-link>
        </div>
      </div>
  
      <!-- Search and Filter -->
      <SearchAndFilter
        @search="handleSearch"
        @filter-category="handleCategoryFilter"
        @filter-price="handlePriceFilter"
      />
  
      <!-- Product Catalog Section -->
      <section class="catalog">
        <div class="container">
          <h1>All Products</h1>
          <p class="subtitle">Browse our entire collection of memorial products.</p>
  
          <div class="product-grid">
            <ProductCard
              v-for="product in filteredProducts"
              :key="product.product_id"
              :product="product"
            />
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  import ProductCard from '@/components/ProductCard.vue';
  import SearchAndFilter from '@/components/SearchAndFilter.vue';
  import { API_BASE_URL } from '@/config';
  
  export default {
    components: {
      ProductCard,
      SearchAndFilter,
    },
    data() {
      return {
        products: [], // All products fetched from the backend
        searchQuery: '', // Search term
        selectedCategory: '', // Selected category filter
        minPrice: null, // Minimum price filter
        maxPrice: null, // Maximum price filter
      };
    },
    computed: {
      filteredProducts() {
        return this.products.filter((product) => {
          // Filter by search query
          const matchesSearch = product.title
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase());
  
          // Filter by category
          const matchesCategory = this.selectedCategory
            ? product.category === this.selectedCategory
            : true;
  
          // Filter by price range
          const matchesPrice =
            (this.minPrice ? product.price >= this.minPrice : true) &&
            (this.maxPrice ? product.price <= this.maxPrice : true);
  
          return matchesSearch && matchesCategory && matchesPrice;
        });
      },
    },
    async created() {
      try {
        const response = await fetch(`${API_BASE_URL}/products`);
        if (response.ok) {
          this.products = await response.json();
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    methods: {
      handleSearch(query) {
        this.searchQuery = query;
      },
      handleCategoryFilter(category) {
        this.selectedCategory = category;
      },
      handlePriceFilter({ min, max }) {
        this.minPrice = min;
        this.maxPrice = max;
      },
    },
  };
  </script>
  
  <style scoped>
  .all-products-view {
    padding: 20px 0;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  .back-nav {
    margin-bottom: 20px;
  }
  
  .back-link {
    color: #333;
    text-decoration: none;
    display: flex;
    align-items: center;
    font-weight: 500;
  }
  
  .back-link i {
    margin-right: 5px;
  }
  
  .catalog {
    padding: 20px 0;
  }
  
  .catalog h1 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 10px;
    color: #333;
  }
  
  .subtitle {
    text-align: center;
    color: #666;
    margin-bottom: 40px;
  }
  
  .product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 30px;
  }
  </style>