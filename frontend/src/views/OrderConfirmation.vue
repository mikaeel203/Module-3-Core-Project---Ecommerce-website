<template>
  <div class="order-confirmation">
    <h2>Order Confirmation</h2>
    <div v-if="loading">Loading order details...</div>
    <div v-else>
      <p>Thank you for your order! Your order has been placed successfully.</p>

      <!-- Display order details if order exists -->
      <div v-if="order" class="order-details">
        <h3>Order Details</h3>
        <p><strong>Order ID:</strong> {{ order.order_id }}</p>
        <p><strong>Total:</strong> ${{ order.total?.toFixed(2) }}</p>
        <p><strong>Status:</strong> {{ order.status }}</p>

        <!-- Display shipping details if shipping exists -->
        <div v-if="order.shipping" class="shipping-details">
          <h3>Shipping Details</h3>
          <p><strong>Name:</strong> {{ order.shipping.name }}</p>
          <p><strong>Address:</strong> {{ order.shipping.address }}</p>
          <p><strong>City:</strong> {{ order.shipping.city }}</p>
          <p><strong>State:</strong> {{ order.shipping.state }}</p>
          <p><strong>Zip:</strong> {{ order.shipping.zip }}</p>
        </div>
      </div>

      <!-- Display a message if order is not found -->
      <p v-else>No order details found.</p>

      <router-link to="/" class="continue-shopping">Continue Shopping</router-link>
    </div>
  </div>
</template>

<script>
import { API_BASE_URL } from '@/config';

export default {
  data() {
    return {
      order: null, // Initialize order as null
      loading: true, // Add a loading state
    };
  },
  async created() {
    const orderId = this.$route.params.orderId; // Get orderId from the route
    if (orderId) {
      await this.fetchOrder(orderId);
    }
    this.loading = false;
  },
  methods: {
    async fetchOrder(orderId) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch order details');
        this.order = await response.json();
      } catch (err) {
        console.error('Error fetching order:', err);
        this.order = null; // Set order to null if fetching fails
      }
    },
  },
};
</script>

<style scoped>
.order-confirmation {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.order-details, .shipping-details {
  margin-top: 20px;
  text-align: left;
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