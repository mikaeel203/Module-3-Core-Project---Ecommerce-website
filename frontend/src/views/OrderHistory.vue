<template>
    <div class="order-history-container">
      <h2>Order History</h2>
      <div v-if="orders.length > 0">
        <div v-for="order in orders" :key="order.id" class="order-item">
          <p>Order #{{ order.id }}</p>
          <p>Total: ${{ order.total.toFixed(2) }}</p>
          <p>Date: {{ new Date(order.date).toLocaleDateString() }}</p>
        </div>
      </div>
      <p v-else>No orders found.</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        orders: [],
      };
    },
    async created() {
      const response = await fetch('/api/orders', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      });
      this.orders = await response.json();
    },
  };
  </script>
  
  <style scoped>
  .order-history-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .order-item {
    border-bottom: 1px solid #ddd;
    padding: 10px 0;
  }
  </style>