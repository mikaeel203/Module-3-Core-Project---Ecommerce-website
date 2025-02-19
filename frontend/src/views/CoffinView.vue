<template>
    <div class="catalog-page">
      <!-- Header -->
      <header class="header">
        <div class="container">
          <div class="logo">Eternal Rest</div>
          <nav class="nav-menu">
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Products</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </nav>
          <div class="header-icons">
            <i class="fas fa-search"></i>
            <i class="fas fa-shopping-cart"></i>
          </div>
        </div>
      </header>
  
      <!-- Back Navigation -->
      <div class="container">
        <div class="back-nav">
          <a href="#" class="back-link"><i class="fas fa-chevron-left"></i> Previous</a>
        </div>
      </div>
  
      <!-- Product Catalog Section -->
      <section class="catalog">
        <div class="container">
          <h1>Our coffins</h1>
          <p class="subtitle">Browse our carefully curated selection of memorial products</p>
          
          <div class="product-grid">
            <!-- Product cards dynamically generated from products data -->
            <div v-for="product in products" :key="product.id" class="product-card">
              <div class="product-image">
                <img :src='require("../assets/HomepageCoffin.png")' :alt="product.name">
              </div>
              <div class="product-details">
                <h3>{{ product.name }}</h3>
                <p>{{ product.description }}</p>
                <p class="price">R{{ formatPrice(product.price) }}</p>
                <a href="#" class="view-details">View More Details <i class="fas fa-arrow-right"></i></a>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Testimonials Section -->
      <section class="testimonials">
        <div class="container">
          <h2>What Our Clients Say</h2>
          
          <div class="testimonial-grid">
            <div v-for="testimonial in testimonials" :key="testimonial.id" class="testimonial-card">
              <div class="testimonial-header">
                <img :src="testimonial.image" :alt="testimonial.name" class="client-image">
                <div class="client-info">
                  <h4>{{ testimonial.name }}</h4>
                  <p class="location">{{ testimonial.location }}</p>
                </div>
              </div>
              <p class="quote">"{{ testimonial.quote }}"</p>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Footer -->
      <footer class="footer">
        <div class="container">
          <div class="footer-sections">
            <div class="footer-section">
              <h3>Eternal Rest</h3>
              <p>Providing dignified memorials for your loved ones since 2000.</p>
            </div>
            
            <div class="footer-section">
              <h3>Quick Links</h3>
              <ul>
                <li><a href="#">Products</a></li>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#">FAQ</a></li>
              </ul>
            </div>
            
            <div class="footer-section">
              <h3>Contact Us</h3>
              <p><i class="fas fa-phone"></i> (555) 123-4567</p>
              <p><i class="fas fa-envelope"></i> info@eternalrest.com</p>
            </div>
            
            <div class="footer-section">
              <h3>Newsletter</h3>
              <div class="newsletter-form">
                <input type="email" placeholder="Your email">
                <button class="btn subscribe-btn">Subscribe</button>
              </div>
            </div>
          </div>
          
          <div class="copyright">
            <p>© 2025 Eternal Rest. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CatalogPage',
    data() {
      return {
        // Sample product data - would be fetched from backend in real application
        products: [
          {
            id: 1,
            name: 'coffin Name',
            description: 'A short description about the coffin',
            price: 10000.00,
            image: '/images/coffin1.jpg'
          },
          {
            id: 2,
            name: 'coffin Name',
            description: 'A short description about the coffin',
            price: 10000.00,
            image: '/images/coffin1.jpg'
          },
          {
            id: 3,
            name: 'coffin Name',
            description: 'A short description about the coffin',
            price: 10000.00,
            image: '/images/coffin1.jpg'
          },
          {
            id: 4,
            name: 'coffin Name',
            description: 'A short description about the coffin',
            price: 10000.00,
            image: '/images/coffin1.jpg'
          },
          {
            id: 5,
            name: 'coffin Name',
            description: 'A short description about the coffin',
            price: 10000.00,
            image: '/images/coffin1.jpg'
          },
          {
            id: 6,
            name: 'coffin Name',
            description: 'A short description about the coffin',
            price: 10000.00,
            image: '/images/coffin1.jpg'
          },
          {
            id: 7,
            name: 'coffin Name',
            description: 'A short description about the coffin',
            price: 10000.00,
            image: '/images/coffin1.jpg'
          },
          {
            id: 8,
            name: 'coffin Name',
            description: 'A short description about the coffin',
            price: 10000.00,
            image: '/images/coffin1.jpg'
          },
          {
            id: 9,
            name: 'coffin Name',
            description: 'A short description about the coffin',
            price: 10000.00,
            image: '/images/coffin1.jpg'
          },
          {
            id: 10,
            name: 'coffin Name',
            description: 'A short description about the coffin',
            price: 10000.00,
            image: '/images/coffin1.jpg'
          },
          {
            id: 11,
            name: 'coffin Name',
            description: 'A short description about the coffin',
            price: 10000.00,
            image: '/images/coffin1.jpg'
          },
          {
            id: 12,
            name: 'coffin Name',
            description: 'A short description about the coffin',
            price: 10000.00,
            image: '/images/coffin1.jpg'
          },
        ],
        // Sample testimonial data - would also be fetched from backend
        testimonials: [
          {
            id: 1,
            name: 'Sarah Johnson',
            location: 'New York',
            quote: 'The quality and craftsmanship exceeded our expectations. The staff was compassionate and helpful throughout the process.',
            image: '/images/client1.jpg'
          },
          {
            id: 2,
            name: 'Michael Smith',
            location: 'Chicago',
            quote: 'We were touched by the attention to detail and the beautiful customization options available for our father\'s memorial.',
            image: '/images/client2.jpg'
          },
          {
            id: 3,
            name: 'Emily Davis',
            location: 'Los Angeles',
            quote: 'The pet memorial we received was beautiful and helped us honor our beloved companion in a meaningful way.',
            image: '/images/client3.jpg'
          }
        ]
      }
    },
    methods: {
      // Format price with commas
      formatPrice(price) {
        return price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
      },
      // Method to fetch products from backend API
      fetchProducts() {
        // This would be an actual API call in production
        // Example:
        // axios.get('/api/products')
        //   .then(response => {
        //     this.products = response.data;
        //   })
        //   .catch(error => {
        //     console.error('Error fetching products:', error);
        //   });
      }
    },
    created() {
      // Lifecycle hook to fetch data when component is created
      // this.fetchProducts();
    }
  }
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