<template>
    <div class="order-confirmation-container">
      <h2>Order Confirmation</h2>
      <p>Thank you for your order! Your order has been placed successfully.</p>
      <router-link to="/" class="continue-shopping">Continue Shopping</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'OrderConfirmation',
  };
  </script>
  
  <style scoped>
  .order-confirmation-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
  }
  
  .continue-shopping {
    display: inline-block;
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #3366ff;
    color: white;
    text-decoration: none;
    border-radius: 4px;
  }
  
  .continue-shopping:hover {
    background-color: #2855d9;
  }
  </style>