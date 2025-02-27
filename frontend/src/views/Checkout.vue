<template>
    <div class="checkout-container">
      <h2>Checkout</h2>
      <div class="checkout-steps">
        <!-- Step 1: Shipping Details -->
        <div v-if="step === 1" class="checkout-step">
          <h3>Shipping Details</h3>
          <form @submit.prevent="goToStep(2)">
            <input type="text" v-model="shipping.name" placeholder="Full Name" required />
            <input type="text" v-model="shipping.address" placeholder="Address" required />
            <input type="text" v-model="shipping.city" placeholder="City" required />
            <input type="text" v-model="shipping.state" placeholder="State" required />
            <input type="text" v-model="shipping.zip" placeholder="Zip Code" required />
            <button type="submit">Next</button>
          </form>
        </div>
  
        <!-- Step 2: Payment Details -->
        <div v-if="step === 2" class="checkout-step">
          <h3>Payment Details</h3>
          <form @submit.prevent="goToStep(3)">
            <input type="text" v-model="payment.cardNumber" placeholder="Card Number" required />
            <input type="text" v-model="payment.expiry" placeholder="Expiry Date" required />
            <input type="text" v-model="payment.cvv" placeholder="CVV" required />
            <button type="submit">Next</button>
          </form>
        </div>
  
        <!-- Step 3: Review and Confirm -->
        <div v-if="step === 3" class="checkout-step">
          <h3>Review and Confirm</h3>
          <div class="order-summary">
            <h4>Order Summary</h4>
            <div v-for="item in cartItems" :key="item.id" class="order-item">
              <p>{{ item.name }} (x{{ item.quantity }})</p>
              <p>${{ item.price.toFixed(2) }}</p>
            </div>
            <p>Total: ${{ cartTotal.toFixed(2) }}</p>
          </div>
          <button @click="placeOrder">Place Order</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  
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
      };
    },
    computed: {
      ...mapGetters('cart', ['cartItems', 'cartTotal']),
    },
    methods: {
      ...mapActions('cart', ['clearCart']),
      goToStep(step) {
        this.step = step;
      },
      async placeOrder() {
        const order = {
          shipping: this.shipping,
          payment: this.payment,
          items: this.cartItems,
          total: this.cartTotal,
        };
  
        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(order),
        });
  
        if (response.ok) {
          this.clearCart();
          this.$router.push('/order-confirmation');
        } else {
          alert('Failed to place order');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .checkout-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .checkout-steps {
    margin-top: 20px;
  }
  
  .checkout-step {
    margin-bottom: 20px;
  }
  
  .order-summary {
    border: 1px solid #ddd;
    padding: 20px;
    margin-bottom: 20px;
  }
  
  .order-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  </style>