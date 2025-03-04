<template>
  <div class="cart-container">
    <h2>Shopping Cart ({{ cartItems.length }} items)</h2>
    <div v-if="loading">Loading cart...</div>
    <template v-else>
      <div v-if="cartItems.length > 0">
        <div v-for="item in cartItems" :key="item.cart_id" class="cart-item">
          <!-- Display the first image of the product -->
          <img :src="item.image_url" :alt="item.title" class="cart-item-image" />
          
          <div class="item-details">
            <h3>{{ item.title }}</h3>
            <p>${{ formatPrice(item.price) }}</p>
            <div class="item-options">
              <p v-if="item.custom_color">Color: {{ item.custom_color }}</p>
              <p v-if="item.custom_wood_type">Material: {{ item.custom_wood_type }}</p>
            </div>
            <div class="quantity-controls">
              <button @click="updateQuantity(item.cart_id, item.quantity - 1)">-</button>
              <input type="number" v-model.number="item.quantity" min="1" />
              <button @click="updateQuantity(item.cart_id, item.quantity + 1)">+</button>
            </div>
          </div>
          <button @click="removeItem(item.cart_id)" class="remove-item">Remove</button>
        </div>
        <div v-if="showImageModal" class="image-modal" @click="closeImageModal">
    <img :src="modalImageUrl" alt="Product Image" class="modal-image" />
  </div>
        <div class="cart-summary">
          <div class="summary-item">
            <p>Subtotal</p>
            <p>R{{ formatPrice(cartSubtotal) }}</p>
          </div>
          <div class="summary-item">
            <p>Shipping</p>
            <p>Free</p>
          </div>
          <div class="summary-item">
            <p>Tax</p>
            <p>R{{ formatPrice(cartTax) }}</p>
          </div>
          <div class="summary-item total">
            <p>Total</p>
            <p>R{{ formatPrice(cartTotal) }}</p>
          </div>
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
      cartItems: [],
      loading: true,
    };
  },
  computed: {
    cartSubtotal() {
      return this.cartItems.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);
    },
    cartTax() {
      return this.cartSubtotal * 0.08; // Assuming 8% tax rate
    },
    cartTotal() {
      return this.cartSubtotal + this.cartTax;
    },
  },
  methods: {
    openImageModal(imageUrl) {
      this.modalImageUrl = imageUrl;
      this.showImageModal = true;
    },
    closeImageModal() {
      this.showImageModal = false;
    },
    formatPrice(price) {
      return parseFloat(price).toFixed(2); // Ensure price is a number and format it
    },
    async fetchCart() {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/cart`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch cart');

        this.cartItems = await response.json();
      } catch (error) {
        console.error('Error fetching cart:', error);
        this.cartItems = [];
      }
    },
    async updateQuantity(cart_id, newQuantity) {
      if (newQuantity < 1) return;

      try {
        const token = localStorage.getItem('token');
        await fetch(`${API_BASE_URL}/cart/update/${cart_id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ quantity: newQuantity }),
        });
        await this.fetchCart();
      } catch (error) {
        console.error('Error updating quantity:', error);
      }
    },
    async removeItem(cart_id) {
      try {
        const token = localStorage.getItem('token');
        await fetch(`${API_BASE_URL}/cart/remove/${cart_id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` },
        });
        await this.fetchCart();
      } catch (error) {
        console.error('Error removing item:', error);
      }
    },
  },
  async mounted() {
    await this.fetchCart();
    this.loading = false;
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
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 20px 0;
}

.cart-item-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 20px;
}

.item-details {
  flex: 1;
}

.item-details h3 {
  margin-bottom: 10px;
}

.item-options p {
  margin: 5px 0;
  color: #666;
}

.quantity-controls {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.quantity-controls button {
  padding: 5px 10px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  cursor: pointer;
}

.quantity-controls input {
  width: 50px;
  text-align: center;
  margin: 0 10px;
}

.remove-item {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

.cart-summary {
  margin-top: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.summary-item.total {
  border-top: 1px solid #ddd;
  padding-top: 10px;
  font-weight: bold;
}

.checkout-btn {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #3366ff;
  color: white;
  border: none;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  margin-top: 20px;
}

.checkout-btn:hover {
  background-color: #2855d9;
}

.placeholder-image {
  width: 100px;
  height: 100px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  color: #666;


}

.image-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-image {
  max-width: 90%;
  max-height: 90%;
  border-radius: 8px;
}
</style>