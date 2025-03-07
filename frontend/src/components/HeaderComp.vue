<template>
  <header class="header">
    <div class="container">
      <div class="logo">Eternal Rest</div>
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
          <!-- Admin Dashboard Link -->
          <router-link v-if="isAdmin" to="/admin/dashboard" class="admin-dashboard-link">
            <i class="bi bi-speedometer2"></i> Admin Dashboard
          </router-link>
          <!-- Profile Icon -->
          <router-link to="/profile"><i class="bi bi-person-circle"></i></router-link>
          <!-- Logout Button -->
          <button @click="handleLogout" class="logout-btn">Logout</button>
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
    ...mapGetters(['isAuthenticated', 'isAdmin']), // Use Vuex getters
  },
  methods: {
  ...mapActions(['logout']),
  handleLogout() {
    this.logout(); // Call the logout action
    this.$router.push('/login'); // Redirect to the login page
  },
},
};
</script>


<style scoped>
.header {
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
}
</style>