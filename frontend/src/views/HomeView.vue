<template>
  <div class="memorial-site">
    <!-- Header is already included in App.vue -->
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h1>Dignified Memorials for Loved Ones – Humans and Pets</h1>
          <p>Crafting beautiful, lasting tributes to honor and remember those we cherish.</p>
          <router-link to="/all-products" class="btn primary-btn">View Collections</router-link>
        </div>
        <div class="hero-image">
          <img src="../assets/heroimage.png" alt="Dignified memorial casket with flowers" />
        </div>
      </div>
    </section>

    <!-- Our Collections Section -->
    <section class="collections">
      <div class="container">
        <h2>Our Collections</h2>
        <p>Browse our carefully curated selection of memorial products:</p>

        <div class="collection-grid">
          <!-- Caskets Card -->
          <router-link to="/caskets" class="collection-card">
            <img src="../assets/HomepageCasket.png" alt="Caskets" />
            <h3>Caskets</h3>
            <p>Handcrafted with dignity and respect.</p>
            <span class="view-collection">View Collection →</span>
          </router-link>

          <!-- Coffins Card -->
          <router-link to="/coffins" class="collection-card">
            <img src="../assets/HomepageCoffin.png" alt="Coffins" />
            <h3>Coffins</h3>
            <p>Traditional and contemporary designs.</p>
            <span class="view-collection">View Collection →</span>
          </router-link>

          <!-- Urns Card -->
          <router-link to="/urns" class="collection-card">
            <img src="../assets/HomepageUrn.png" alt="Urns" />
            <h3>Urns</h3>
            <p>Beautiful, artful memorials for ashes.</p>
            <span class="view-collection">View Collection →</span>
          </router-link>

          <!-- Pet Memorials Card -->
          <router-link to="/petmemorials" class="collection-card">
            <img src="../assets/HomepagePetMemo.png" alt="Pet Memorials" />
            <h3>Pet Memorials</h3>
            <p>Honor your beloved family pet.</p>
            <span class="view-collection">View Collection →</span>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Our Commitment Section -->
    <section class="commitment">
      <div class="container">
        <h2>Our Commitment to You</h2>
        <p>For over two decades, we've been dedicated to providing families with memorial products that honor your loved ones with dignity and respect. We carefully source all our materials to create quality craftsmanship.</p>
        <button class="btn secondary-btn">Learn More About Us</button>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials">
      <div class="container">
        <h2>What Our Clients Say</h2>
        
        <div class="testimonial-grid">
          <div class="testimonial-card">
            <img src="../assets/Sarah.png" alt="Client picture" class="client-image">
            <h4>Sarah Johnson</h4>
            <p class="location">New York</p>
            <p class="quote">"The quality and craftsmanship exceeded our expectations. The staff was compassionate and guided us through the process."</p>
          </div>
          
          <div class="testimonial-card">
            <img src="../assets/Micheal.png" alt="Client picture" class="client-image">
            <h4>Michael Smith</h4>
            <p class="location">Chicago</p>
            <p class="quote">"We were touched by the attention to detail and the heartfelt communication efforts throughout this difficult time."</p>
          </div>
          
          <div class="testimonial-card">
            <img src="../assets/Emily.png" alt="Client picture" class="client-image">
            <h4>Emily Harris</h4>
            <p class="location">Los Angeles</p>
            <p class="quote">"Their pet memorial we received was beautiful and helped us honor our beloved companion during a difficult time."</p>
          </div>
        </div>
      </div>
    </section>


  </div>
</template>

<script>
export default {

  setup() {
        const currentYear = new Date().getFullYear();
        return { currentYear };
    },
  data() {
    return {
      // Any data you need for the component
    }
  },
  methods: {
    // Methods if needed
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

.memorial-site {
  width: 100%;
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

.primary-btn {
  background-color: #1a2940;
  color: white;
}

.secondary-btn {
  background-color: transparent;
  border: 1px solid #1a2940;
  color: #1a2940;
}

.subscribe-btn {
  background-color: #1a2940;
  color: white;
}

/* Header Styles */
.header {
  width: 100%;
  padding: 20px 0;
}

.header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: 600;
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
}

/* Hero Section */
.hero {
  padding: 40px 0;
}

.hero .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.hero-content {
  flex: 1;
  padding-right: 40px;
}

.hero-content h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  line-height: 1.2;
  color: #1a2940;
}

.hero-content p {
  margin-bottom: 30px;
  color: #555;
}

.hero-image {
  flex: 1;
}

.hero-image img {
  width: 100%;
  border-radius: 8px;
}

/* Collections Section */
.collections {
  padding: 60px 0;
  text-align: center;
}

.collections h2 {
  font-size: 2rem;
  margin-bottom: 10px;
  color: #1a2940;
}

.collections > p {
  margin-bottom: 40px;
  color: #555;
}

.collection-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.collection-card {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.collection-card:hover {
  transform: translateY(-5px);
}

.collection-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.collection-card h3 {
  padding: 15px 15px 5px;
  color: #1a2940;
}

.collection-card p {
  padding: 0 15px 15px;
  color: #666;
}

.view-collection {
  display: inline-block;
  padding: 5px 15px 15px;
  color: #1a2940;
  text-decoration: none;
  font-weight: 500;
}

/* Commitment Section */
.commitment {
  padding: 60px 0;
  text-align: center;
  background-color: #f9f9f9;
  margin: 20px 0;
  width: 100%;
}

.commitment h2 {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #1a2940;
}

.commitment p {
  max-width: 800px;
  margin: 0 auto 30px;
  color: #555;
  line-height: 1.6;
}

/* Testimonials Section */
.testimonials {
  padding: 60px 0;
  text-align: center;
  width: 100%;
}

.testimonials h2 {
  font-size: 2rem;
  margin-bottom: 40px;
  color: #1a2940;
}

.testimonial-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.testimonial-card {
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
}

.client-image {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 15px;
}

.testimonial-card h4 {
  margin-bottom: 5px;
  color: #1a2940;
}

.location {
  color: #666;
  font-style: italic;
  margin-bottom: 15px;
}

.quote {
  color: #444;
  line-height: 1.6;
  font-style: italic;
}

/* Footer - Now Full-Width */
.footer {
  background-color: #1a2940;
  color: white;
  padding: 60px 0 20px;
  margin-top: 40px;
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

.newsletter-form button {
  border-radius: 0 4px 4px 0;
}

.copyright {
  text-align: center;
  margin-top: 60px;
  padding-top: 20px;
  border-top: 1px solid #3a4a60;
  font-size: 0.9rem;
  color: #ccc;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero .container {
    flex-direction: column;
  }
  
  .hero-content {
    padding-right: 0;
    margin-bottom: 30px;
  }
  
  .collection-grid,
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