<template>
  <div class="cart-container">
    <h2>Shopping Cart</h2>
    <div v-if="loading">Loading cart...</div>
    <template v-else>
      <div v-if="cartItems.length > 0">
        <div v-for="item in cartItems" :key="item.cart_id" class="cart-item">
          <img :src="item.image_url" :alt="item.title" class="cart-item-image" />
          <div class="cart-item-details">
            <h3>{{ item.title }}</h3>
            <p>R{{ item.price }}</p>
            <p v-if="item.custom_color">Color: {{ item.custom_color }}</p>
            <p v-if="item.custom_wood_type">Wood Type: {{ item.custom_wood_type }}</p>
            <div class="quantity-controls">
              <button @click="updateQuantity(item.cart_id, item.quantity - 1)">-</button>
              <input type="number" v-model.number="item.quantity" min="1" />
              <button @click="updateQuantity(item.cart_id, item.quantity + 1)">+</button>
            </div>
            <button @click="removeItem(item.cart_id)" class="remove-item">Remove</button>
          </div>
        </div>
        <div class="cart-summary">
          <p>Total: R{{ cartTotal.toFixed(2) }}</p>
          <router-link to="/checkout" class="checkout-btn">Proceed to Checkout</router-link>
        </div>
      </div>
      <p v-else>Your cart is empty.</p>
    </template>
  </div>
</template>

<script>
import { API_BASE_URL } from '@/config';
export default {
  data() {
    return {
      loading: true
    };
  },
  computed: {
    cartItems() {
      return this.$store.state.cart || [];
    },
    cartTotal() {
      return this.$store.getters.cartTotal;
    }
  },
  async mounted() {
    await this.$store.dispatch('fetchCart');
    this.loading = false;
  },
  methods: {
    async updateQuantity(cart_id, newQuantity) {
      if (newQuantity < 1) return;
      
      try {
        await fetch(`${API_BASE_URL}/cart/update`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ cart_id, quantity: newQuantity })
        });
        this.$store.dispatch('fetchCart');
      } catch (error) {
        console.error('Error updating quantity:', error);
      }
    },
    async removeItem(cart_id) {
      try {
        await fetch(`${API_BASE_URL}/cart/remove/${cart_id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.$store.dispatch('fetchCart');
      } catch (error) {
        console.error('Error removing item:', error);
      }
    }
  }
};
</script>

<style scoped>
.cart-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.cart-item {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 20px;
}

.cart-item-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

.cart-item-details {
  flex: 1;
}

.quantity-controls {
  display: flex;
  gap: 10px;
  align-items: center;
}

.quantity-controls input {
  width: 50px;
  text-align: center;
}

.remove-item {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

.cart-summary {
  text-align: right;
  margin-top: 20px;
}

.checkout-btn {
  background-color: #3366ff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}
</style>