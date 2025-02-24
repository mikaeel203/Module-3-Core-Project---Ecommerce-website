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
          <router-link to="/cart"><i class="bi bi-cart-fill"></i></router-link>
          <router-link to="/login"><i class="bi bi-person-circle"></i></router-link>
        </div>
      </div>
    </header>
  </template>
  
  <script>
  export default {
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
  
  .header-icons a {
    margin-left: 15px;
    color: #333;
    font-size: 1.2rem;
  }
  </style>