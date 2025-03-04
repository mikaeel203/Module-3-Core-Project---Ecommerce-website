<template>
  <div class="catalog-page">
    <!-- Back Navigation -->
    <div class="container">
      <div class="back-nav">
        <router-link to="/" class="back-link"><i class="fas fa-chevron-left"></i> Previous</router-link>
      </div>
    </div>

    <!-- Product Catalog Section -->
    <section class="catalog">
      <div class="container">
        <h1>Our Caskets</h1>
        <p class="subtitle">Browse our carefully curated selection of caskets.</p>

        <div class="product-grid">
          <ProductCard v-for="product in filteredProducts" :key="product.product_id" :product="product" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue';
import { API_BASE_URL } from '@/config';

export default {
  components: {
    ProductCard,
  },
  data() {
    return {
      products: [],
    };
  },
  computed: {
    filteredProducts() {
      return this.products.filter(product => product.category === 'Casket');
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
};
</script>

  <style scoped>
  /* General Styles */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }
  
  body {
    background-color: #f8f9fa;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  .btn {
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    border: none;
  }
  
  /* Header Styles */
  .header {
    background-color: white;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    padding: 15px 0;
    width: 100%;
  }
  
  .header .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .logo {
    font-size: 1.5rem;
    font-weight: 600;
    color: #333;
  }
  
  .nav-menu ul {
    display: flex;
    list-style: none;
  }
  
  .nav-menu li {
    margin-left: 20px;
  }
  
  .nav-menu a {
    text-decoration: none;
    color: #333;
    font-weight: 500;
  }
  
  .header-icons i {
    margin-left: 15px;
    cursor: pointer;
    color: #333;
  }
  
  /* Back Navigation */
  .back-nav {
    padding: 20px 0;
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
  
  /* Catalog Section */
  .catalog {
    padding: 20px 0 60px;
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
  
  .product-card {
    background-color: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    transition: transform 0.3s, box-shadow 0.3s;
  }
  
  .product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
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
  
  .view-details i {
    margin-left: 5px;
    font-size: 0.8rem;
    transition: transform 0.3s;
  }
  
  .view-details:hover {
    color: #344b6e;
  }
  
  .view-details:hover i {
    transform: translateX(3px);
  }
  
  /* Testimonials Section */
  .testimonials {
    padding: 60px 0;
    background-color: white;
    width: 100%;
  }
  
  .testimonials h2 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 40px;
    color: #333;
  }
  
  .testimonial-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
  }
  
  .testimonial-card {
    padding: 25px;
    border-radius: 8px;
    border: 1px solid #eee;
    transition: transform 0.3s, box-shadow 0.3s;
  }
  
  .testimonial-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  }
  
  .testimonial-header {
    display: flex;
    margin-bottom: 15px;
  }
  
  .client-image {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 15px;
  }
  
  .client-info h4 {
    margin-bottom: 5px;
    color: #333;
  }
  
  .location {
    color: #666;
    font-size: 0.9rem;
  }
  
  .quote {
    color: #444;
    line-height: 1.6;
    font-style: italic;
  }
  
  /* Footer */
  .footer {
    background-color: #1a2940;
    color: white;
    padding: 60px 0 20px;
    width: 100%;
  }
  
  .footer-sections {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 40px;
  }
  
  .footer-section h3 {
    margin-bottom: 20px;
    font-size: 1.2rem;
  }
  
  .footer-section p {
    margin-bottom: 10px;
    color: #ccc;
  }
  
  .footer-section ul {
    list-style: none;
  }
  
  .footer-section li {
    margin-bottom: 10px;
  }
  
  .footer-section a {
    color: #ccc;
    text-decoration: none;
    transition: color 0.3s;
  }
  
  .footer-section a:hover {
    color: white;
  }
  
  .newsletter-form {
    display: flex;
    margin-top: 15px;
  }
  
  .newsletter-form input {
    flex: 1;
    padding: 10px;
    border: none;
    border-radius: 4px 0 0 4px;
  }
  
  .subscribe-btn {
    background-color: #344b6e;
    color: white;
    border-radius: 0 4px 4px 0;
  }
  
  .copyright {
    text-align: center;
    margin-top: 60px;
    padding-top: 20px;
    border-top: 1px solid #344b6e;
    font-size: 0.9rem;
    color: #ccc;
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .product-grid {
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    }
    
    .testimonial-grid {
      grid-template-columns: 1fr;
    }
    
    .footer-sections {
      grid-template-columns: 1fr;
      text-align: center;
    }
    
    .newsletter-form {
      justify-content: center;
    }
  }
  </style>