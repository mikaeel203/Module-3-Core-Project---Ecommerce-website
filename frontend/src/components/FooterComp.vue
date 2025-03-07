<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-sections">
        <div class="footer-section">
          <h3>six ft. Boutique</h3>
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
          <p><i class="bi bi-telephone-fill icon"></i> (123) 123-4567</p>
          <p><i class="bi bi-envelope-at-fill icon"></i> info@eternalrest.com</p>
        </div>
        <div class="footer-section newsletter">
          <h3>Newsletter</h3>
          <div class="newsletter-form">
            <input type="email" placeholder="Your email" />
            <button class="btn subscribe-btn">Subscribe</button>
          </div>
        </div>
      </div>
      <div class="copyright">
        <p>&copy; {{ currentYear }} 6ft Boutique. All rights reserved.</p>
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
  padding: 60px ;
  margin-top: 40px;
  width: 100%;
  font-family: "Arial", sans-serif;

}

.footer-sections {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  text-align: left;
}

.footer-section h3 {
  margin-bottom: 15px;
  font-size: 1.3rem;
  font-weight: bold;
}

.footer-section p,
.footer-section li {
  color: #ccc;
  font-size: 1rem;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section li {
  margin-bottom: 10px;
}

.footer-section a {
  color: #ccc;
  text-decoration: none;
  transition: color 0.3s ease-in-out;
  font-weight: 500;
}

.footer-section a:hover {
  color: white;
  text-decoration: underline;
}

.icon {
  color: #ccc;
  margin-right: 10px;
  font-size: 1.1rem;
}

.newsletter-form {
  display: flex;
  margin-top: 10px;
}

.newsletter-form input {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 4px 0 0 4px;
  font-size: 1rem;
}

.subscribe-btn {
  background-color: #344b6e;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  padding: 12px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
}

.subscribe-btn:hover {
  background-color: #3a5b80;
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
