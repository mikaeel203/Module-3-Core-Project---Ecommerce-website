<template>
    <div class="eternal-rest-container">
      <!-- Navigation Header -->
      <!-- <header class="header">
        <div class="brand">EternalRest</div>
        <nav class="main-nav">
          <a href="#">Home</a>
          <a href="#">Products</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">Caskets</a>
          <a href="#">Coffins</a>
          <a href="#">Urns</a>
          <a href="#">Pet Memorials</a>
        </nav>
        <div class="user-actions">
          <button class="wishlist-btn">
            <i class="fa fa-heart-o"></i>
          </button>
          <button class="cart-btn">
            <i class="fa fa-shopping-cart"></i>
            <span class="cart-count">{{ cartItems.length }}</span>
          </button>
        </div>
      </header> -->
  
      <!-- Product Detail Section (shown conditionally when viewing a product) -->
      <section v-if="currentProductView" class="product-detail">
        <a href="#" class="back-link" @click.prevent="returnToCart">
          <i class="fa fa-arrow-left"></i> Previous
        </a>
  
        <div class="product-display">
          <div class="product-images">
            <div class="main-image">
              <img :src="currentProductView.mainImage" :alt="currentProductView.name" />
            </div>
            <div class="thumbnail-gallery">
              <div 
                v-for="(thumbnail, index) in currentProductView.thumbnails" 
                :key="index"
                :class="['thumbnail', index === selectedThumbnail ? 'active' : '']"
                @click="selectedThumbnail = index"
              >
                <img :src="thumbnail" :alt="`${currentProductView.name} Thumbnail ${index + 1}`" />
              </div>
            </div>
          </div>
  
          <div class="product-info">
            <h1 class="product-title">{{ currentProductView.name }}</h1>
            
            <div class="product-rating">
              <div class="stars">
                <i v-for="n in 5" :key="n" :class="getStarClass(n, currentProductView.rating)"></i>
              </div>
              <span class="review-count">({{ currentProductView.reviewCount }} reviews)</span>
            </div>
            
            <div class="product-price">
              <h2>{{ formatPrice(currentProductView.price) }}</h2>
            </div>
            
            <div class="product-options">
              <div v-if="currentProductView.interiorColors" class="option-group">
                <label>Interior Color</label>
                <div class="color-options">
                  <button 
                    v-for="color in currentProductView.interiorColors" 
                    :key="color.value"
                    :class="['color-option', color.value, selectedColor === color.value ? 'selected' : '']"
                    @click="selectedColor = color.value"
                  ></button>
                </div>
              </div>
              
              <div v-if="currentProductView.handleStyles" class="option-group">
                <label>Handle Style</label>
                <div class="select-wrapper">
                  <select v-model="selectedHandle" class="handle-select">
                    <option 
                      v-for="handle in currentProductView.handleStyles" 
                      :key="handle.id" 
                      :value="handle.name"
                    >{{ handle.name }}</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div class="product-actions">
              <div class="quantity-selector">
                <button @click="updateProductQuantity(-1)" class="quantity-btn decrease">-</button>
                <input type="text" v-model.number="productQuantity" class="quantity-input" />
                <button @click="updateProductQuantity(1)" class="quantity-btn increase">+</button>
              </div>
              
              <button @click="addCurrentProductToCart" class="add-to-cart-btn">Add to Cart</button>
            </div>
            
            <button @click="addToWishlist(currentProductView.id)" class="wishlist-btn-large">
              <i class="fa fa-heart-o"></i> Add to Wishlist
            </button>
            
            <div class="product-features">
              <div class="feature">
                <i class="fa fa-truck"></i>
                <div class="feature-text">
                  <strong>Free Delivery</strong>
                  <p>2-3 business days</p>
                </div>
              </div>
              
              <div class="feature">
                <i class="fa fa-shield"></i>
                <div class="feature-text">
                  <strong>Quality Guarantee</strong>
                  <p>1 year warranty</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Shopping Cart Section -->
      <section v-if="!currentProductView" class="shopping-cart">
        <div class="cart-header">
          <div class="brand">EternalRest</div>
          <nav class="cart-nav">
            <a href="#">Caskets</a>
            <a href="#">Coffins</a>
            <a href="#">Urns</a>
            <a href="#">Pet Memorials</a>
          </nav>
          <div class="user-actions">
            <button class="wishlist-btn">
              <i class="fa fa-heart-o"></i>
            </button>
            <button class="cart-btn">
              <i class="fa fa-shopping-cart"></i>
              <span class="cart-count">{{ cartItems.length }}</span>
            </button>
          </div>
        </div>
        
        <h2 class="cart-title">Shopping Cart ({{ cartItems.length }} items)</h2>
        
        <div v-if="cartItems.length > 0" class="cart-content">
          <div class="cart-items">
            <div v-for="item in cartItems" :key="item.id" class="cart-item">
              <div class="item-image">
                <img :src="item.image" :alt="item.name" />
              </div>
              <div class="item-details">
                <h3>{{ item.name }}</h3>
                <p v-if="item.interior">Interior: {{ item.interior }}</p>
                <p v-if="item.handle">Handle: {{ item.handle }}</p>
                <p v-if="item.color">Color: {{ item.color }}</p>
                <p v-if="item.size">Size: {{ item.size }}</p>
                <div class="item-quantity">
                  <button @click="updateCartItemQuantity(item.id, -1)" class="quantity-btn decrease">-</button>
                  <input type="text" v-model.number="item.quantity" class="quantity-input" />
                  <button @click="updateCartItemQuantity(item.id, 1)" class="quantity-btn increase">+</button>
                  <button @click="removeFromCart(item.id)" class="remove-item">
                    <i class="fa fa-trash"></i>
                  </button>
                </div>
              </div>
              <div class="item-price">{{ formatPrice(item.price) }}</div>
            </div>
          </div>
          
          <div class="order-summary">
            <h3>Order Summary</h3>
            <div class="summary-row">
              <span>Subtotal</span>
              <span>{{ formatPrice(subtotal) }}</span>
            </div>
            <div class="summary-row">
              <span>Shipping</span>
              <span>{{ shipping === 0 ? 'Free' : formatPrice(shipping) }}</span>
            </div>
            <div class="summary-row">
              <span>Tax</span>
              <span>{{ formatPrice(tax) }}</span>
            </div>
            <div class="summary-row total">
              <span>Total</span>
              <span>{{ formatPrice(total) }}</span>
            </div>
            
            <button @click="proceedToCheckout" class="checkout-btn">Proceed to Checkout</button>
            
            <div class="secure-checkout">
              <i class="fa fa-lock"></i> Secure Checkout
            </div>
          </div>
        </div>
        
        <div v-else class="empty-cart">
          <p>Your cart is empty.</p>
          <button @click="continueShopping" class="continue-shopping-btn">Continue Shopping</button>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isLoading: true,
        cartItems: [],
        currentProductView: null,
        selectedThumbnail: 0,
        selectedColor: 'white',
        selectedHandle: '',
        productQuantity: 1,
        shipping: 0,
        taxRate: 0.08 // 8% tax rate
      };
    },
    computed: {
      subtotal() {
        return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
      tax() {
        return this.subtotal * this.taxRate;
      },
      total() {
        return this.subtotal + this.shipping + this.tax;
      }
    },
    methods: {
      // Fetch cart items from server
      fetchCartItems() {
        this.isLoading = true;
        
        // Replace with your actual API call
        fetch('/api/cart')
          .then(response => response.json())
          .then(data => {
            this.cartItems = data.items;
            this.shipping = data.shipping || 0;
            this.isLoading = false;
          })
          .catch(error => {
            console.error('Error fetching cart items:', error);
            this.isLoading = false;
            
            // Fallback data for demo purposes
            this.cartItems = [
              {
                id: 1,
                name: 'Premium Mahogany Casket',
                interior: 'White Velvet',
                handle: 'Classic Brass',
                price: 3499.00,
                quantity: 1,
                image: './assets/mahogany-casket-cart.jpg'
              },
              {
                id: 2,
                name: 'Classic Ceramic Urn',
                color: 'White',
                size: 'Large',
                price: 299.00,
                quantity: 1,
                image: './assets/ceramic-urn-cart.jpg'
              }
            ];
          });
      },
      
      // View product details
      viewProductDetails(productId) {
        // Replace with your actual API call
        fetch(`/api/products/${productId}`)
          .then(response => response.json())
          .then(data => {
            this.currentProductView = data;
            this.selectedColor = data.interiorColors?.[0]?.value || 'white';
            this.selectedHandle = data.handleStyles?.[0]?.name || '';
            this.productQuantity = 1;
          })
          .catch(error => {
            console.error('Error fetching product details:', error);
          });
      },
      
      // Return to cart view
      returnToCart() {
        this.currentProductView = null;
        this.fetchCartItems(); // Refresh cart data
      },
      
      // Update product quantity in the product view
      updateProductQuantity(change) {
        const newQuantity = this.productQuantity + change;
        if (newQuantity > 0) {
          this.productQuantity = newQuantity;
        }
      },
      
      // Add current product to cart
      addCurrentProductToCart() {
        if (!this.currentProductView) return;
        
        const productToAdd = {
          productId: this.currentProductView.id,
          quantity: this.productQuantity,
          options: {
            color: this.selectedColor,
            handle: this.selectedHandle
          }
        };
        
        // Replace with your actual API call
        fetch('/api/cart/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productToAdd)
        })
          .then(response => response.json())
          .then(data => {
            // Show success notification
            alert('Product added to cart successfully');
            this.returnToCart(data);
          })
          .catch(error => {
            console.error('Error adding product to cart:', error);
          });
      },
      
      // Update cart item quantity
      updateCartItemQuantity(itemId, change) {
        const item = this.cartItems.find(item => item.id === itemId);
        if (!item) return;
        
        const newQuantity = item.quantity + change;
        if (newQuantity <= 0) {
          this.removeFromCart(itemId);
          return;
        }
        
        // Optimistic UI update
        item.quantity = newQuantity;
        
        // Replace with your actual API call
        fetch(`/api/cart/update`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ itemId, quantity: newQuantity })
        })
          .catch(error => {
            console.error('Error updating cart item quantity:', error);
            // Revert optimistic update on error
            this.fetchCartItems();
          });
      },
      
      // Remove item from cart
      removeFromCart(itemId) {
        // Optimistic UI update
        this.cartItems = this.cartItems.filter(item => item.id !== itemId);
        
        // Replace with your actual API call
        fetch(`/api/cart/remove`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ itemId })
        })
          .catch(error => {
            console.error('Error removing item from cart:', error);
            // Revert optimistic update on error
            this.fetchCartItems();
          });
      },
      
      // Add to wishlist
      addToWishlist(productId) {
        // Replace with your actual API call
        fetch('/api/wishlist/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productId })
        })
          .then(() => {
            alert('Product added to wishlist');
          })
          .catch(error => {
            console.error('Error adding to wishlist:', error);
          });
      },
      
      // Proceed to checkout
      proceedToCheckout() {
        // Replace with your checkout logic
        window.location.href = '/checkout';
      },
      
      // Continue shopping
      continueShopping() {
        window.location.href = '/';
      },
      
      // Format price with appropriate currency symbol and separator
      formatPrice(price) {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(price);
      },
      
      // Get appropriate star class based on rating
      getStarClass(position, rating) {
        if (rating >= position) return 'fa fa-star';
        if (rating >= position - 0.5) return 'fa fa-star-half-o';
        return 'fa fa-star-o';
      }
    },
    mounted() {
      this.fetchCartItems();
    }
  };
  </script>
  
  <style scoped>
  .eternal-rest-container {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    max-width: 1200px;
    margin: 0 auto;
    color: #333;
  }
  
  /* Header Styles */
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
    border-bottom: 1px solid #eee;
  }
  
  .brand {
    font-size: 1.5rem;
    font-weight: bold;
  }
  
  .main-nav {
    display: flex;
    gap: 1.5rem;
  }
  
  .main-nav a {
    text-decoration: none;
    color: #555;
  }
  
  .user-actions {
    display: flex;
    gap: 1rem;
  }
  
  .wishlist-btn, .cart-btn {
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    position: relative;
  }
  
  .cart-count {
    position: absolute;
    top: -8px;
    right: -8px;
    background-color: #e53e3e;
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
  }
  
  /* Product Detail Styles */
  .product-detail {
    margin: 2rem 0;
  }
  
  .back-link {
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    color: #555;
    margin-bottom: 1.5rem;
  }
  
  .product-display {
    display: flex;
    gap: 2rem;
  }
  
  .product-images {
    flex: 1;
  }
  
  .main-image {
    margin-bottom: 1rem;
    border: 1px solid #eee;
    border-radius: 4px;
    overflow: hidden;
  }
  
  .main-image img {
    width: 100%;
    height: auto;
    display: block;
  }
  
  .thumbnail-gallery {
    display: flex;
    gap: 0.5rem;
  }
  
  .thumbnail {
    width: 80px;
    height: 80px;
    border: 1px solid #eee;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
  }
  
  .thumbnail.active {
    border-color: #3182ce;
  }
  
  .thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .product-info {
    flex: 1;
  }
  
  .product-title {
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
  }
  
  .product-rating {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .stars {
    color: #f6ad55;
    margin-right: 0.5rem;
  }
  
  .review-count {
    color: #718096;
  }
  
  .product-price h2 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }
  
  .option-group {
    margin-bottom: 1.5rem;
  }
  
  .option-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  .color-options {
    display: flex;
    gap: 0.5rem;
  }
  
  .color-option {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid transparent;
    cursor: pointer;
  }
  
  .color-option.selected {
    border-color: #3182ce;
  }
  
  .color-option.white {
    background-color: #fff;
    border: 2px solid #e2e8f0;
  }
  
  .color-option.blue {
    background-color: #e6f0ff;
  }
  
  .color-option.pink {
    background-color: #ffe6e6;
  }
  
  .color-option.black {
    background-color: #202020;
  }
  
  .select-wrapper {
    position: relative;
  }
  
  .handle-select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    appearance: none;
    background-color: white;
  }
  
  .select-wrapper::after {
    content: '▼';
    font-size: 0.8rem;
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }
  
  .product-actions {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  
  .quantity-selector {
    display: flex;
    align-items: center;
  }
  
  .quantity-btn {
    width: 36px;
    height: 36px;
    border: 1px solid #e2e8f0;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  
  .quantity-btn.decrease {
    border-radius: 4px 0 0 4px;
  }
  
  .quantity-btn.increase {
    border-radius: 0 4px 4px 0;
  }
  
  .quantity-input {
    width: 50px;
    height: 36px;
    border-top: 1px solid #e2e8f0;
    border-bottom: 1px solid #e2e8f0;
    border-left: none;
    border-right: none;
    text-align: center;
  }
  
  .add-to-cart-btn {
    background-color: #3182ce;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 0 2rem;
    height: 36px;
    cursor: pointer;
    flex-grow: 1;
  }
  
  .wishlist-btn-large {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    background-color: white;
    margin-bottom: 1.5rem;
    cursor: pointer;
  }
  
  .product-features {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .feature {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .feature i {
    font-size: 1.5rem;
    color: #718096;
  }
  
  .feature-text strong {
    display: block;
    margin-bottom: 0.25rem;
  }
  
  .feature-text p {
    margin: 0;
    color: #718096;
  }
  
  /* Shopping Cart Styles */
  .shopping-cart {
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid #eee;
  }
  
  .cart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }
  
  .cart-nav {
    display: flex;
    gap: 1.5rem;
  }
  
  .cart-nav a {
    text-decoration: none;
    color: #555;
  }
  
  .cart-title {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  .cart-content {
    display: flex;
    gap: 2rem;
  }
  
  .cart-items {
    flex-grow: 1;
  }
  
  .cart-item {
    display: flex;
    gap: 1rem;
    padding: 1.5rem 0;
    border-bottom: 1px solid #eee;
  }
  
  .item-image {
    width: 120px;
    height: 120px;
  }
  
  .item-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
  }
  
  .item-details {
    flex-grow: 1;
  }
  
  .item-details h3 {
    margin: 0 0 0.5rem;
    font-size: 1.1rem;
  }
  
  .item-details p {
    margin: 0.25rem 0;
    color: #718096;
  }
  
  .item-quantity {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1rem;
  }
  
  .remove-item {
    background: none;
    border: none;
    color: #e53e3e;
    cursor: pointer;
    margin-left: 1rem;
  }
  
  .item-price {
    font-weight: bold;
    font-size: 1.1rem;
  }
  
  .order-summary {
    width: 300px;
  }
  
  .order-summary h3 {
    margin-top: 0;
    margin-bottom: 1rem;
  }
  
  .summary-row {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
  }
  
  .summary-row.total {
    font-weight: bold;
    font-size: 1.1rem;
    border-top: 1px solid #eee;
    padding-top: 1rem;
    margin-top: 1rem;
  }
  
  .checkout-btn {
    width: 100%;
    padding: 0.75rem;
    background-color: #3182ce;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin: 1.5rem 0;
  }
  
  .secure-checkout {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    color: #718096;
    font-size: 0.9rem;
  }
  
  .empty-cart {
    text-align: center;
    padding: 3rem 0;
  }
  
  .continue-shopping-btn {
    padding: 0.75rem 2rem;
    background-color: #3182ce;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 1rem;
  }
  </style>