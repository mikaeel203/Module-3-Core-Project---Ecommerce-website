<template>
  <div class="checkout-container">
    <h2>Checkout</h2>

    <!-- Shipping Details -->
    <div class="checkout-section">
      <h3>Shipping Details</h3>
      <form @submit.prevent="goToPayment">
        <input type="text" v-model="shipping.name" placeholder="Full Name" required />
        <input type="text" v-model="shipping.address" placeholder="Address" required />
        <input type="text" v-model="shipping.city" placeholder="City" required />
        <input type="text" v-model="shipping.state" placeholder="State" required />
        <input type="text" v-model="shipping.zip" placeholder="Zip Code" required />
        <button type="submit">Next</button>
      </form>
    </div>

    <!-- Payment Details -->
    <div v-if="step === 2" class="checkout-section">
      <h3>Payment Details</h3>
      <form @submit.prevent="placeOrder">
        <input type="text" v-model="payment.cardNumber" placeholder="Card Number" required />
        <input type="text" v-model="payment.expiry" placeholder="Expiry Date (MM/YY)" required />
        <input type="text" v-model="payment.cvv" placeholder="CVV" required />
        <button type="submit">Place Order</button>
      </form>
    </div>

    <!-- Order Summary -->
    <div class="order-summary">
      <h3>Order Summary</h3>
      <div v-for="item in cartItems" :key="item.cart_id" class="order-item">
        <p>{{ item.title }} (x{{ item.quantity }})</p>
        <p>${{ formatPrice(item.price * item.quantity) }}</p>
      </div>
      <div class="summary-item">
        <p>Subtotal</p>
        <p>${{ formatPrice(cartSubtotal) }}</p>
      </div>
      <div class="summary-item">
        <p>Tax</p>
        <p>${{ formatPrice(cartTax) }}</p>
      </div>
      <div class="summary-item total">
        <p>Total</p>
        <p>${{ formatPrice(cartTotal) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { API_BASE_URL } from '@/config';

export default {
  data() {
    return {
      step: 1, // 1: Shipping, 2: Payment
      shipping: {
        name: '',
        address: '',
        city: '',
        state: '',
        zip: '',
      },
      payment: {
        cardNumber: '',
        expiry: '',
        cvv: '',
      },
      cartItems: [],
      cartSubtotal: 0,
      cartTax: 0,
      cartTotal: 0,
    };
  },
  computed: {
    isAuthenticated() {
      return !!localStorage.getItem('token');
    },
  },
  methods: {
    formatPrice(price) {
      return parseFloat(price).toFixed(2);
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
        this.cartSubtotal = this.cartItems.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);
        this.cartTax = this.cartSubtotal * 0.08; // 8% tax
        this.cartTotal = this.cartSubtotal + this.cartTax;
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    },
    goToPayment() {
      this.step = 2; // Move to payment step
    },
    async placeOrder() {
      if (!this.isAuthenticated) {
        this.$router.push('/login');
        return;
      }

      const order = {
        shipping: this.shipping,
        payment: this.payment,
        items: this.cartItems,
        total: this.cartTotal,
      };

      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(order),
        });

        if (response.ok) {
          this.$router.push('/order-confirmation'); // Redirect to confirmation page
        } else {
          alert('Failed to place order');
        }
      } catch (error) {
        console.error('Error placing order:', error);
        alert('An error occurred. Please try again.');
      }
    },
  },
  async mounted() {
    await this.fetchCart();
  },
};
</script>

<style scoped>
.checkout-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.checkout-section {
  margin-bottom: 20px;
}

.order-summary {
  border: 1px solid #ddd;
  padding: 20px;
  margin-top: 20px;
}

.order-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
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

button {
  padding: 10px 20px;
  background-color: #3366ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #2855d9;
}
</style>