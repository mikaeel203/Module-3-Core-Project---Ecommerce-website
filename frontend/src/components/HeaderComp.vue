<template>

  <header class="header">

    <div class="container">
      <div class="logo">
        <img src="https://images.vexels.com/media/users/3/269843/isolated/preview/8753fcdba7f74cdccd19597669d7c10a-halloween-coffin-icon-with-a-rose.png" alt="">
        6ft Boutique
      </div>
      <nav class="nav-menu">
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/caskets">Caskets</router-link></li>
          <li><router-link to="/coffins">Coffins</router-link></li>
          <li><router-link to="/urns">Urns</router-link></li>
          <li><router-link to="/petmemorials">Pet Memorials</router-link></li>
        </ul>
      </nav>
      <div class="header-icons">
        <!-- Cart Icon -->
        <router-link to="/cart"><i class="bi bi-cart-fill"></i></router-link>

        <!-- Profile Icon or Login/Register Buttons -->
        <template v-if="isAuthenticated">
          <!-- Profile Icon -->
          <router-link to="/profile"><i class="bi bi-person-circle"></i></router-link>
          <!-- Logout Button -->
          <button @click="logout" class="logout-btn">Logout</button>
        </template>
        <template v-else>
          <!-- Login and Register Buttons -->
          <router-link to="/login" class="auth-btn">Login</router-link>
          <router-link to="/register" class="auth-btn">Register</router-link>
        </template>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters(['isAuthenticated']), // Use Vuex getter for authentication state
  },
  methods: {
    ...mapActions(['logout']), // Use Vuex action for logout
  },
};
</script>

<style scoped>
/* .header {
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 15px 0;
  width: 100%;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
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

.header-icons {
  display: flex;
  align-items: center;
  gap: 15px;
}

.header-icons a {
  color: #333;
  font-size: 1.2rem;
  text-decoration: none;
}

.auth-btn {
  padding: 5px 10px;
  border: 1px solid #333;
  border-radius: 4px;
  color: #333;
  text-decoration: none;
  font-size: 0.9rem;
  transition: background-color 0.3s, color 0.3s;
}

.auth-btn:hover {
  background-color: #333;
  color: white;
}

.logout-btn {
  padding: 5px 10px;
  border: 1px solid #ff4d4d;
  border-radius: 4px;
  background-color: #ff4d4d;
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.logout-btn:hover {
  background-color: #e60000;
} */

header {
  background-color: #fff;
  color: #222;
  padding: 5px 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position:absolute;
  top: 0;
  width: 100%;
  z-index: 1; /* Keep header content above the image */
  overflow: visible; /* Allow image to overflow */
}

img {
  /* position: sticky; */
  top: 2px; /* Adjust as needed */
  /* bottom: 2px; */
  left: 5px; /* Adjust as needed */
  width: 80px; /* Size of the image */
  height: 80px;
  border-radius: 50%;
  background-color: #fff; /* White background */
  padding-right: 3px;
  padding-left: 10px;
  z-index: 2; /* Keep image above content */
  transform: rotate(-15deg)
}
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1300px;
  padding: 0 5px;
  position: relative; /* Allow positioning of the image */
}

.logo {
  display: flex;
  padding-left: 1px;
  align-items: center;
  font-size: 55px;
  /* font-weight: bold; */
  font-family: 'Brush Script MT', cursive;
  color: #222;
}

.nav-menu ul {
  list-style: none;
  display: flex;
  gap: 25px;
  margin: 0;
  padding: 0;
}

.nav-menu ul li a {
  color: #444;
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
  transition: all 0.3s ease-in-out;
  position: relative;
}

.nav-menu ul li a::after {
  content: "";
  display: block;
  width: 0;
  height: 2px;
  background: #e3b04b;
  transition: width 0.3s ease-in-out;
  position: absolute;
  bottom: -5px;
  left: 0;
}

.nav-menu ul li a:hover::after {
  width: 100%;
}

.header-icons {
  display: flex;
  align-items: center;
  gap: 15px;
}

.header-icons a,
.header-icons button {
  background: none;
  border: none;
  color: #444;
  font-size: 22px;
  cursor: pointer;
  transition: color 0.3s ease-in-out;
}

.header-icons a:hover,
.header-icons button:hover {
  color: #e3b04b;
}

.header-icons .auth-btn {
  padding: 6px 12px;
  border-radius: 20px;
  border: 1px solid #e3b04b;
  text-decoration: none;
  color: #e3b04b;
  font-weight: 500;
  transition: all 0.3s ease-in-out;
}

.header-icons .auth-btn:hover {
  background-color: #e3b04b;
  color: #fff;
}

.auth-btn {
  padding: 5px 10px;
  border: 1px solid #333;
  border-radius: 4px;
  color: #333;
  text-decoration: none;
  font-size: 0.9rem;
  transition: background-color 0.3s, color 0.3s;
}

.auth-btn:hover {
  background-color: #333;
  color: white;
}

.logout-btn {
  padding: 5px 10px;
  border: 1px solid #ff4d4d;
  border-radius: 4px;
  background-color: #ff4d4d;
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.logout-btn:hover {
  background-color: #e60000 !important;
  color :rgb(245, 245, 245) !important;
}


@media (max-width: 768px) {
  .container {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .nav-menu ul {
    flex-direction: column;
    gap: 10px;
  }

  .header-icons {
    margin-top: 10px;
  }
}

</style>