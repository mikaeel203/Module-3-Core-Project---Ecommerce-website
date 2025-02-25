<template>
    <footer class="footer">
      <div class="container">
        <div class="footer-sections">
          <div class="footer-section">
            <h3>Eternal Rest</h3>
            <p>Providing dignified memorials for your loved ones since 2002.</p>
          </div>
          <div class="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><router-link to="/">Home</router-link></li>
              <li><router-link to="/caskets">Caskets</router-link></li>
              <li><router-link to="/coffins">Coffins</router-link></li>
              <li><router-link to="/urns">Urns</router-link></li>
              <li><router-link to="/petmemorials">Pet Memorials</router-link></li>
            </ul>
          </div>
          <div class="footer-section">
            <h3>Contact Us</h3>
            <p><i class="bi bi-telephone-fill"></i> (123) 123-4567</p>
            <p><i class="bi bi-envelope-at-fill"></i> info@eternalrest.com</p>
          </div>
          <div class="footer-section">
            <h3>Newsletter</h3>
            <div class="newsletter-form">
              <input type="email" placeholder="Your email" />
              <button class="btn subscribe-btn">Subscribe</button>
            </div>
          </div>
        </div>
        <div class="copyright">
          <p>&copy; {{ currentYear }} Eternal Rest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentYear: new Date().getFullYear(),
      };
    },
  };
  </script>
  
  <style scoped>
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
  
  .subscribe-btn {
    background-color: #344b6e;
    color: white;
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
  </style>