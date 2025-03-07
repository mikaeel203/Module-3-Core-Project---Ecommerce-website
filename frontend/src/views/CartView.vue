<template>
  <div class="cart-container">
    <h2>Shopping Cart ({{ cartItems.length }} items)</h2>
    <div v-if="loading">Loading cart...</div>
    <template v-else>
      <div v-if="cartItems.length > 0">
        <!-- Cart Items -->
        <div v-for="item in cartItems" :key="item.cart_id" class="cart-item">
          <img :src="item.image_url" :alt="item.title" class="cart-item-image" />
          <div class="item-details">
            <h3>{{ item.title }}</h3>
            <p>R{{ formatPrice(item.price) }}</p>
            <div class="quantity-controls">
              <button @click="updateQuantity(item.cart_id, item.quantity - 1)">-</button>
              <input type="number" v-model.number="item.quantity" min="1" />
              <button @click="updateQuantity(item.cart_id, item.quantity + 1)">+</button>
            </div>
          </div>
          <button @click="removeItem(item.cart_id)" class="remove-item">Remove</button>
        </div>

        <!-- Cart Summary -->
        <div class="cart-summary">
          <div class="summary-item">
            <p>Subtotal</p>
            <p>R{{ formatPrice(cartSubtotal) }}</p>
          </div>
          <!-- <div class="summary-item">
            <p>Shipping</p>
            <p>Free</p>
          </div> -->
          <div class="summary-item">
            <p>Tax</p>
            <p>R{{ formatPrice(cartTax) }}</p>
          </div>
          <div class="summary-item total">
            <p>Total</p>
            <p>R{{ formatPrice(cartTotal) }}</p>
          </div>

          <!-- Proceed to Checkout Button -->
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
    return this.cartSubtotal * 0.08; // Assuming 8% tax
  },
  cartTotal() {
    // Ensure cartTotal is always a number
    return (this.cartSubtotal + this.cartTax) || 0;
  },
},async created() {
  await this.fetchCart();
  this.loading = false;
},
methods: {
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
    openImageModal(imageUrl) {
      this.modalImageUrl = imageUrl;
      this.showImageModal = true;
    },
    closeImageModal() {
      this.showImageModal = false;
    },
    formatPrice(price) {
      return parseFloat(price).toFixed(2);
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
        await this.fetchCart(); // Refresh cart after update
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
        await this.fetchCart(); // Refresh cart after removal
      } catch (error) {
        console.error('Error removing item:', error);
      }
    },
  },
  async mounted() {
    await this.fetchCart();
  },
};
</script>

<style scoped>
.cart-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 120px 30px 40px;
  font-family: 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.cart-container h2 {
  font-size: 2rem;
  margin-bottom: 30px;
  color: #333;
  font-weight: 600;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 15px;
}

.cart-item {
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  padding-bottom: 25px;
  border-bottom: 1px solid #eaeaea;
  transition: all 0.2s ease;
}

.cart-item:hover {
  background-color: #fafafa;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

.cart-item-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 30px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.cart-item-image:hover {
  transform: scale(1.05);
}

.item-details {
  flex: 1;
}

.item-details h3 {
  margin-bottom: 12px;
  font-size: 1.25rem;
  color: #222;
  font-weight: 500;
}

.item-details p {
  font-size: 1.1rem;
  color: #444;
  margin-bottom: 15px;
  font-weight: 600;
}

.quantity-controls {
  display: flex;
  align-items: center;
  margin-top: 12px;
}

.quantity-controls button {
  width: 36px;
  height: 36px;
  border: 1px solid #e0e0e0;
  background-color: #fff;
  cursor: pointer;
  border-radius: 50%;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.quantity-controls button:hover {
  background-color: #f4f4f4;
  color: #3366ff;
}

.quantity-controls input {
  width: 50px;
  height: 36px;
  text-align: center;
  margin: 0 10px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 1rem;
}

.remove-item {
  background-color: transparent;
  color: #ff4d4d;
  border: 1px solid #ff4d4d;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.2s;
  margin-left: 20px;
}

.remove-item:hover {
  background-color: #ff4d4d;
  color: white;
}

.cart-summary {
  margin-top: 30px;
  padding: 25px;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-size: 1.05rem;
  color: #555;
}

.summary-item.total {
  border-top: 2px solid #e6e6e6;
  padding-top: 15px;
  margin-top: 15px;
  font-weight: bold;
  font-size: 1.2rem;
  color: #222;
}

.checkout-btn {
  display: block;
  width: 100%;
  padding: 15px;
  background-color: #3366ff;
  color: white;
  border: none;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  margin-top: 25px;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(51, 102, 255, 0.2);
}

.checkout-btn:hover {
  background-color: #2855d9;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(51, 102, 255, 0.3);
}

.placeholder-image {
  width: 120px;
  height: 120px;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  color: #888;
  border-radius: 8px;
}

.image-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(3px);
}

.modal-image {
  max-width: 90%;
  max-height: 90%;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

/* Loading state styling */
.cart-container div[v-if="loading"] {
  text-align: center;
  padding: 40px 0;
  color: #666;
  font-size: 1.1rem;
}

/* Empty cart state */
.cart-container p[v-else] {
  text-align: center;
  padding: 40px 0;
  color: #666;
  font-size: 1.2rem;
}
</style>