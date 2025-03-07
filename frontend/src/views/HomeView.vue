<template>
  <div class="memorial-site">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-overlay"></div>
      <div class="container">
        <div class="hero-content">
          <h1>Honoring Lives with Timeless Customisable Elegance</h1>
          <p>Exquisite memorial creations that celebrate the beauty of remembered lives, crafted with reverence and artistry.</p>
          <router-link to="/all-products" class="btn primary-btn">Explore Our Collections</router-link>
        </div>
        <div class="hero-image">
          <img src="../assets/heroimage.png" alt="Dignified memorial scene" />
        </div>
      </div>
    </section>

    <!-- Our Collections Section -->
    <section class="collections">
      <div class="container">
        <h2>Curated Collections</h2>
        <p>Each piece in our collection is thoughtfully designed to provide a dignified tribute to your loved ones, combining traditional craftsmanship with contemporary elegance.</p>

        <div class="collection-grid">
          <!-- Caskets Card -->
          <router-link to="/caskets" class="collection-card">
            <div class="card-image">
              <img src="../assets/HomepageCasket.png" alt="Caskets" />
            </div>
            <div class="card-content">
              <h3>Caskets</h3>
              <p>Masterfully crafted with the finest materials, our caskets embody dignity and reverence for your loved ones.</p>
              <span class="view-collection">Discover Collection</span>
            </div>
          </router-link>

          <!-- Coffins Card -->
          <router-link to="/coffins" class="collection-card">
            <div class="card-image">
              <img src="../assets/HomepageCoffin.png" alt="Coffins" />
            </div>
            <div class="card-content">
              <h3>Coffins</h3>
              <p>Timeless designs that honor tradition while embracing contemporary sensibilities and exceptional craftsmanship.</p>
              <span class="view-collection">Discover Collection</span>
            </div>
          </router-link>

          <!-- Urns Card -->
          <router-link to="/urns" class="collection-card">
            <div class="card-image">
              <img src="../assets/HomepageUrn.png" alt="Urns" />
            </div>
            <div class="card-content">
              <h3>Urns</h3>
              <p>Artful vessels that beautifully preserve memories, handcrafted with attention to every detail.</p>
              <span class="view-collection">Discover Collection</span>
            </div>
          </router-link>

          <!-- Pet Memorials Card -->
          <router-link to="/petmemorials" class="collection-card">
            <div class="card-image">
              <img src="../assets/HomepagePetMemo.png" alt="Pet Memorials" />
            </div>
            <div class="card-content">
              <h3>Pet Memorials</h3>
              <p>Thoughtful tributes that honor the cherished companions who brought joy and companionship to your life.</p>
              <span class="view-collection">Discover Collection</span>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Our Commitment Section -->
    <section class="commitment">
      <div class="container">
        <h2>Our Enduring Commitment</h2>
        <p>For over two decades, we have dedicated ourselves to the art of creating memorial tributes that truly honor lives. Each piece represents our unwavering commitment to excellence, compassion, and respect.</p>
        <button class="btn secondary-btn">Discover Our Story</button>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials">
      <div class="container">
        <h2>Heartfelt Reflections</h2>
        
        <div class="testimonial-grid">
          <div class="testimonial-card">
            <img src="../assets/Sarah.png" alt="Client picture" class="client-image">
            <h4>Sarah Johnson</h4>
            <p class="location">New York</p>
            <p class="quote">"The exquisite craftsmanship of their work brought a sense of peace during our time of grief. Their attentive care and guidance made an unbearable process bearable."</p>
          </div>
          
          <div class="testimonial-card">
            <img src="../assets/Micheal.png" alt="Client picture" class="client-image">
            <h4>Michael Smith</h4>
            <p class="location">Chicago</p>
            <p class="quote">"We were deeply moved by the thoughtful details and the quiet elegance of their work. Their compassionate approach made us feel supported throughout this difficult journey."</p>
          </div>
          
          <div class="testimonial-card">
            <img src="../assets/Emily.png" alt="Client picture" class="client-image">
            <h4>Emily Harris</h4>
            <p class="location">Los Angeles</p>
            <p class="quote">"The memorial they created for our beloved companion was a work of art that captured his spirit perfectly. It has become a treasured reminder of the joy he brought to our lives."</p>
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
      // Data required for the component
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
}

.memorial-site {
  width: 100%;
  font-family: 'Cormorant Garamond', serif;
  color: #333;
  background-color: #f8f7f4;
  line-height: 1.6;
}

.container {
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 20px;
}

.btn {
  padding: 14px 30px;
  border-radius: 2px;
  cursor: pointer;
  font-weight: 500;
  border: none;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 0.85rem;
}

.primary-btn {
  background-color: #1a2940;
  color: white;
  box-shadow: 0 5px 15px rgba(26, 41, 64, 0.2);
}

.primary-btn:hover {
  background-color: #263a5c;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(26, 41, 64, 0.3);
}

.secondary-btn {
  background-color: transparent;
  border: 1px solid #1a2940;
  color: #1a2940;
  transition: all 0.3s ease;
}

.secondary-btn:hover {
  background-color: #1a2940;
  color: white;
  transform: translateY(-2px);
}

/* Hero Section */
.hero {
  position: relative;
  padding: 120px 0;
  background-color: #f0f0f0;
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, rgba(26, 41, 64, 0.1), rgba(26, 41, 64, 0.05));
}

.hero .container {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.hero-content {
  flex: 1;
  padding-right: 60px;
}

.hero-content h1 {
  font-size: 3.2rem;
  margin-bottom: 25px;
  line-height: 1.2;
  color: #1a2940;
  font-weight: 300;
  letter-spacing: 1px;
}

.hero-content p {
  margin-bottom: 35px;
  color: #555;
  font-size: 1.2rem;
  line-height: 1.8;
}

.hero-image {
  flex: 1;
  position: relative;
}

.hero-image img {
  width: 100%;
  border-radius: 2px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.5s ease;
}

.hero-image img:hover {
  transform: scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

/* Collections Section */
.collections {
  padding: 120px 0;
  text-align: center;
  background-color: #fff;
}

.collections h2 {
  font-size: 2.5rem;
  margin-bottom: 15px;
  color: #1a2940;
  font-weight: 300;
  letter-spacing: 1px;
}

.collections > p {
  margin-bottom: 60px;
  color: #666;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  font-size: 1.1rem;
}

.collection-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  margin-top: 50px;
}

.collection-card {
  position: relative;
  border-radius: 2px;
  overflow: hidden;
  height: 450px;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.collection-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
}

.card-image {
  position: relative;
  height: 100%;
  overflow: hidden;
}

.card-image::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 30%, rgba(0, 0, 0, 0) 100%);
  opacity: 0.7;
  transition: opacity 0.5s ease;
}

.collection-card:hover .card-image::after {
  opacity: 0.9;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.7s ease;
}

.collection-card:hover .card-image img {
  transform: scale(1.1);
}

.card-content {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 30px;
  text-align: left;
  z-index: 2;
  color: white;
  transform: translateY(60px);
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.collection-card:hover .card-content {
  transform: translateY(0);
}

.collection-card h3 {
  font-size: 1.8rem;
  margin-bottom: 15px;
  color: white;
  position: relative;
  font-weight: 400;
  transition: transform 0.5s ease;
}

.collection-card:not(:hover) h3 {
  transform: translateY(-40px);
}

.collection-card h3::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 40px;
  height: 1px;
  background-color: white;
  transition: width 0.5s ease;
}

.collection-card:hover h3::after {
  width: 70px;
}

.collection-card p {
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 20px;
  line-height: 1.6;
  font-size: 1rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease;
  transition-delay: 0.1s;
}

.collection-card:hover p {
  opacity: 1;
  transform: translateY(0);
}

.view-collection {
  display: inline-block;
  color: white;
  text-decoration: none;
  font-weight: 400;
  letter-spacing: 1px;
  font-size: 0.9rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease;
  transition-delay: 0.2s;
  text-transform: uppercase;
}

.collection-card:hover .view-collection {
  opacity: 1;
  transform: translateY(0);
}

.view-collection::after {
  content: '→';
  margin-left: 5px;
  transition: transform 0.3s ease;
}

.collection-card:hover .view-collection::after {
  transform: translateX(5px);
}

/* Commitment Section */
.commitment {
  padding: 120px 0;
  text-align: center;
  background-color: #f8f7f4;
  position: relative;
  overflow: hidden;
}

.commitment::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  opacity: 0.5;
}

.commitment .container {
  position: relative;
  z-index: 1;
}

.commitment h2 {
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: #1a2940;
  font-weight: 300;
  letter-spacing: 1px;
}

.commitment p {
  max-width: 800px;
  margin: 0 auto 40px;
  color: #555;
  line-height: 1.8;
  font-size: 1.1rem;
}

/* Testimonials Section */
.testimonials {
  padding: 120px 0;
  text-align: center;
  background-color: white;
}

.testimonials h2 {
  font-size: 2.5rem;
  margin-bottom: 60px;
  color: #1a2940;
  font-weight: 300;
  letter-spacing: 1px;
}

.testimonial-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
}

.testimonial-card {
  padding: 40px 30px;
  border-radius: 2px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
  background-color: #fff;
}

.testimonial-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.testimonial-card::before {
  content: '"';
  position: absolute;
  top: 20px;
  left: 25px;
  font-size: 5rem;
  color: rgba(26, 41, 64, 0.07);
  font-family: Georgia, serif;
  line-height: 0;
}

.client-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto 20px;
  border: 3px solid #f8f7f4;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.testimonial-card h4 {
  margin-bottom: 5px;
  color: #1a2940;
  font-size: 1.2rem;
  font-weight: 500;
}

.location {
  color: #888;
  font-style: italic;
  margin-bottom: 25px;
  font-size: 0.9rem;
}

.quote {
  color: #444;
  line-height: 1.8;
  font-style: italic;
  font-size: 1rem;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .collection-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 1024px) {
  .hero .container {
    flex-direction: column;
  }
  
  .hero-content {
    padding-right: 0;
    margin-bottom: 40px;
    text-align: center;
  }
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2.5rem;
  }
  
  .hero-content p {
    font-size: 1.1rem;
  }
  
  .collection-grid,
  .testimonial-grid {
    grid-template-columns: 1fr;
  }

  .collection-card {
    height: 400px;
  }

  .card-content {
    transform: translateY(0);
  }

  .collection-card:not(:hover) h3 {
    transform: translateY(0);
  }

  .collection-card p,
  .view-collection {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>