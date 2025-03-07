<template>
  <div class="checkout-container">
    <h2>Checkout</h2>
    <div class="checkout-steps">
      <!-- Step 1: Shipping Details -->
      <div v-if="step === 1" class="checkout-step">
        <h3>Shipping Details</h3>
        <form @submit.prevent="validateShipping">
          <input type="text" v-model="shipping.name" placeholder="Full Name" required />
          <input type="text" v-model="shipping.address" placeholder="Address" required />
          <input type="text" v-model="shipping.city" placeholder="City" required />
          <input type="text" v-model="shipping.state" placeholder="State" required />
          <input type="text" v-model="shipping.zip" placeholder="Zip Code" required />
          <p v-if="errors.zip" class="error-message">{{ errors.zip }}</p>
          <button type="submit">Next</button>
        </form>
      </div>
      <!-- Step 2: Payment Details -->
      <div v-if="step === 2" class="checkout-step">
        <h3>Payment Details</h3>
        <form @submit.prevent="validatePayment">
          <input type="text" v-model="payment.cardNumber" placeholder="Card Number" required />
          <p v-if="errors.cardNumber" class="error-message">{{ errors.cardNumber }}</p>
          
          <input type="text" v-model="payment.expiry" placeholder="Expiry Date (MM/YY)" required />
          <p v-if="errors.expiry" class="error-message">{{ errors.expiry }}</p>
          
          <input type="text" v-model="payment.cvv" placeholder="CVV" required />
          <p v-if="errors.cvv" class="error-message">{{ errors.cvv }}</p>
          
          <button type="submit">Next</button>
        </form>
      </div>
      <!-- Step 3: Review and Confirm -->
      <div v-if="step === 3" class="checkout-step">
        <h3>Review and Confirm</h3>
        <div class="order-summary">
          <h4>Order Summary</h4>
          <div v-for="item in cartItems" :key="item.cart_id" class="order-item">
            <p>{{ item.title }} (x{{ item.quantity }})</p>
            <p>R{{ item.price * item.quantity }}</p>
          </div>
          <p>Total: R{{ cartTotal.toFixed(2) }}</p>
        </div> <br>

        <button @click="placeOrder" :disabled="isPlacingOrder">
          {{ isPlacingOrder ? 'Placing Order...' : 'Place Order' }}
        </button>
      </div>
    </div>
    <!-- Error Message -->
    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>
<script>
import { API_BASE_URL } from '@/config';
export default {
  data() {
    return {
      step: 1,
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
      error: '',
      isPlacingOrder: false,
      cartItems: [], // Add cartItems to data
      errors: {
        zip: '',
        cardNumber: '',
        expiry: '',
        cvv: ''
      }
    };
  },
  computed: {
    cartTotal() {
      return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    },
  },
  async created() {
    await this.fetchCart(); // Fetch cart items when the component is created
  },
  methods: {
    goToStep(step) {
      this.step = step;
    },
    validateShipping() {
      // Reset errors
      this.errors.zip = '';
      
      // Validate zip code is 4 digits
      const zipRegex = /^\d{4}$/;
      if (!zipRegex.test(this.shipping.zip)) {
        this.errors.zip = 'Zip code must be 4 digits';
        return;
      }
      
      // If validation passes, proceed to next step
      this.goToStep(2);
    },
    validatePayment() {
      // Reset errors
      this.errors.cardNumber = '';
      this.errors.expiry = '';
      this.errors.cvv = '';
      
      let isValid = true;
      
      // Validate card number (9-11 digits)
      const cardNumberRegex = /^\d{9,11}$/;
      if (!cardNumberRegex.test(this.payment.cardNumber)) {
        this.errors.cardNumber = 'Card number must be 9-11 digits';
        isValid = false;
      }
      
      // Validate expiry date (MM/YY format and not older than current date)
      const expiryRegex = /^(0[1-9]|1[0-2])\/(\d{2})$/;
      if (!expiryRegex.test(this.payment.expiry)) {
        this.errors.expiry = 'Expiry date must be in MM/YY format';
        isValid = false;
      } else {
        const [month, year] = this.payment.expiry.split('/');
        const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
        const currentDate = new Date();
        
        if (expiryDate < currentDate) {
          this.errors.expiry = 'Expiry date cannot be in the past';
          isValid = false;
        }
      }
      
      // Validate CVV (3 digits)
      const cvvRegex = /^\d{3}$/;
      if (!cvvRegex.test(this.payment.cvv)) {
        this.errors.cvv = 'CVV must be 3 digits';
        isValid = false;
      }
      
      // If all validations pass, proceed to next step
      if (isValid) {
        this.goToStep(3);
      }
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
      } catch (err) {
        console.error('Error fetching cart:', err);
        this.cartItems = [];
      }
    },
    async placeOrder() {
      this.error = '';
      this.isPlacingOrder = true;
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          this.$router.push('/login');
          return;
        }
        const order = {
          shipping: this.shipping,
          payment: this.payment,
          items: this.cartItems,
          total: this.cartTotal,
        };
        const response = await fetch(`${API_BASE_URL}/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(order),
        });
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Failed to place order');
        }
        const orderData = await response.json();
        // Debugging: Log before clearing the cart
        console.log('Clearing cart...');
        // Clear the cart
        await this.$store.dispatch('cart/clearCart');
        // Debugging: Log after clearing the cart
        console.log('Cart cleared.');
        // Redirect to the order confirmation page
        this.$router.push({
          path: `/order-confirmation/${orderData.order_id}`,
          query: { order: JSON.stringify(orderData) },
        });
      } catch (err) {
        this.error = err.message || 'An error occurred. Please try again.';
      } finally {
        this.isPlacingOrder = false;
      }
    },
  },
};
</script>
<style scoped>
.checkout-container {
  max-width: 750px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: "Arial", sans-serif;
  padding-top: 100px;
}

h2,
h3 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.checkout-steps {
  background: #fff;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.checkout-step {
  display: flex;
  flex-direction: column;
  align-items: center;
}

form {
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s ease-in-out;
}

input:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
}

/* Gradient Button for "Next" */
button {
  width: 105.5%;
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

/* Gradient Effect */
button[type="submit"] {
  background: linear-gradient(45deg, #007bff, #0056b3);
  color: #fff;
}

button[type="submit"]:hover {
  background: linear-gradient(45deg, #0056b3, #003f80);
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.order-summary {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 10px;
  background: #f9f9f9;
}

.order-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.order-item:last-child {
  border-bottom: none;
}

.error-message {
  text-align: center;
  color: #ff4d4d;
  font-weight: bold;
  margin-top: 5px;
  font-size: 14px;
}
</style>