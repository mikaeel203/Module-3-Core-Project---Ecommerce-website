<template>
  <div class="order-confirmation">
    <h2>Order Confirmation</h2>
    <div v-if="loading">Loading order details...</div>
    <div v-else>
      <p>Thank you for your order! Your order has been placed successfully.</p>

      <!-- Display order details -->
      <div v-if="order" class="order-details">
        <h3>Order Details</h3>
        <p><strong>Order ID:</strong> {{ order.order_id }}</p>
        <p><strong>Total:</strong> R{{ Number(order.total).toFixed(2) }}</p>
        <p><strong>Status:</strong> {{ order.status || 'Pending' }}</p>

        <!-- Display order items -->
        <div v-if="order.items && order.items.length > 0">
          <h4>Items:</h4>
          <div v-for="item in order.items" :key="item.product_id" class="order-item">
            <p>{{ item.title }} (x{{ item.quantity }})</p>
            <p>${{ (Number(item.price) * item.quantity).toFixed(2) }}</p>
          </div>
        </div>

        <!-- Display shipping details -->
        <div v-if="order.shipping" class="shipping-details">
          <h4>Shipping Details:</h4>
          <p><strong>Name:</strong> {{ order.shipping.name }}</p>
          <p><strong>Address:</strong> {{ order.shipping.address }}</p>
          <p><strong>City:</strong> {{ order.shipping.city }}</p>
          <p><strong>State:</strong> {{ order.shipping.state }}</p>
          <p><strong>Zip:</strong> {{ order.shipping.zip }}</p>
        </div>
      </div>

      <!-- Continue shopping button -->
      <router-link to="/" class="continue-shopping">Continue Shopping</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: null, // Order details
      loading: true, // Loading state
    };
  },
  async created() {
    // Retrieve the order details from the route query
    if (this.$route.query.order) {
      this.order = JSON.parse(this.$route.query.order);
    }
    this.loading = false;
  },
};
</script>

<style scoped>
.order-confirmation {
  max-width: 800px;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  padding-top: 100px;
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