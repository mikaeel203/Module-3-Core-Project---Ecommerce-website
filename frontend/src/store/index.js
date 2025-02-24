import { createStore } from 'vuex';

const store = createStore({
  modules: {
    cart: {
      state: {
        items: [], // Array of cart items
      },
      mutations: {
        ADD_TO_CART(state, product) {
          const existingItem = state.items.find((item) => item.id === product.id);
          if (existingItem) {
            existingItem.quantity += product.quantity;
          } else {
            state.items.push({ ...product });
          }
        },
        REMOVE_FROM_CART(state, productId) {
          state.items = state.items.filter((item) => item.id !== productId);
        },
        UPDATE_QUANTITY(state, { productId, quantity }) {
          const item = state.items.find((item) => item.id === productId);
          if (item) {
            item.quantity = quantity;
          }
        },
        CLEAR_CART(state) {
          state.items = [];
        },
      },
      actions: {
        addToCart({ commit }, product) {
          commit('ADD_TO_CART', product);
        },
        removeFromCart({ commit }, productId) {
          commit('REMOVE_FROM_CART', productId);
        },
        updateQuantity({ commit }, payload) {
          commit('UPDATE_QUANTITY', payload);
        },
        clearCart({ commit }) {
          commit('CLEAR_CART');
        },
      },
      getters: {
        cartItems(state) {
          return state.items;
        },
        cartTotal(state) {
          return state.items.reduce((total, item) => total + item.price * item.quantity, 0);
        },
      },
    },
    wishlist: {
      state: {
        items: [], // Array of wishlist items
      },
      mutations: {
        ADD_TO_WISHLIST(state, product) {
          state.items.push(product);
        },
        REMOVE_FROM_WISHLIST(state, productId) {
          state.items = state.items.filter((item) => item.id !== productId);
        },
      },
      actions: {
        addToWishlist({ commit }, product) {
          commit('ADD_TO_WISHLIST', product);
        },
        removeFromWishlist({ commit }, productId) {
          commit('REMOVE_FROM_WISHLIST', productId);
        },
      },
      getters: {
        wishlistItems(state) {
          return state.items;
        },
      },
    },
  },
});

export default store;