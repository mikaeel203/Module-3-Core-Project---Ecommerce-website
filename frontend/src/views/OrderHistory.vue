<template>
  <div class="order-history">
    <h2>Order History</h2>
    <div v-if="loading">Loading orders...</div>
    <div v-else>
      <div v-if="orders.length > 0">
        <div v-for="order in orders" :key="order.order_id" class="order-item">
          <p><strong>Order ID:</strong> {{ order.order_id }}</p>
          <p><strong>Total:</strong> ${{ order.total.toFixed(2) }}</p>
          <p><strong>Date:</strong> {{ new Date(order.order_date).toLocaleDateString() }}</p>
          <p><strong>Status:</strong> {{ order.status }}</p>
          <router-link :to="`/orders/${order.order_id}`" class="view-details">View Details</router-link>
        </div>
      </div>
      <p v-else>No orders found.</p>
    </div>
  </div>
</template>

<script>
import { API_BASE_URL } from '@/config';

export default {
  data() {
    return {
      orders: [],
      loading: true,
    };
  },
  async created() {
    await this.fetchOrders();
    this.loading = false;
  },
  methods: {
    async fetchOrders() {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/orders`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch orders');
        this.orders = await response.json();
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    },
  },
};
</script>

<style scoped>
.order-history {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.order-item {
  border-bottom: 1px solid #ddd;
  padding: 20px 0;
}

.view-details {
  display: inline-block;
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #3366ff;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}

.view-details:hover {
  background-color: #2855d9;
}
</style>