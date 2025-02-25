<template>
  <div class="cart-container">
    <h2>Shopping Cart</h2>
    <div v-if="cartItems.length > 0">
      <div v-for="item in cartItems" :key="item.id" class="cart-item">
        <img :src="item.image" :alt="item.name" class="cart-item-image" />
        <div class="cart-item-details">
          <h3>{{ item.name }}</h3>
          <p>${{ item.price.toFixed(2) }}</p>
          <div class="quantity-controls">
            <button @click="updateQuantity(item.id, item.quantity - 1)">-</button>
            <input type="number" v-model.number="item.quantity" min="1" />
            <button @click="updateQuantity(item.id, item.quantity + 1)">+</button>
          </div>
          <button @click="removeFromCart(item.id)" class="remove-item">Remove</button>
        </div>
      </div>
      <div class="cart-summary">
        <p>Subtotal: ${{ cartTotal.toFixed(2) }}</p>
        <button @click="proceedToCheckout" class="checkout-btn">Proceed to Checkout</button>
      </div>
    </div>
    <p v-else>Your cart is empty.</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters('cart', ['cartItems', 'cartTotal']),
  },
  methods: {
    ...mapActions('cart', ['removeFromCart', 'updateQuantity', 'clearCart']),
    updateQuantity(productId, quantity) {
      if (quantity < 1) return;
      this.updateQuantity({ productId, quantity });
    },
    proceedToCheckout() {
      this.$router.push('/checkout');
    },
  },
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