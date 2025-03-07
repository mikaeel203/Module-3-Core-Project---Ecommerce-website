import { createStore } from 'vuex';
import { API_BASE_URL } from '@/config';

const store = createStore({
  modules: {
    cart: {
      namespaced: true, // Ensure the module is namespaced
      state: {
        items: [], // Array of cart items
        loading: false, // Loading state for cart operations
      },
      mutations: {
        SET_CART(state, cartItems) {
          state.items = cartItems;
        },
        ADD_TO_CART(state, product) {
          const existingItem = state.items.find((item) => item.product_id === product.product_id);
          if (existingItem) {
            existingItem.quantity += product.quantity;
          } else {
            state.items.push({ ...product });
          }
        },
        REMOVE_FROM_CART(state, cartId) {
          state.items = state.items.filter((item) => item.cart_id !== cartId);
        },
        UPDATE_QUANTITY(state, { cartId, quantity }) {
          const item = state.items.find((item) => item.cart_id === cartId);
          if (item) {
            item.quantity = quantity;
          }
        },
        CLEAR_CART(state) {
          console.log('Clearing cart items...'); // Debugging
          state.items = [];
        },
        SET_LOADING(state, isLoading) {
          state.loading = isLoading;
        },
      },
      actions: {
        async fetchCart({ commit }) {
          commit('SET_LOADING', true);
          try {
            const response = await fetch(`${API_BASE_URL}/cart`, {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
              },
            });

            if (!response.ok) throw new Error('Failed to fetch cart');

            const cartItems = await response.json();
            commit('SET_CART', cartItems);
          } catch (error) {
            console.error('Error fetching cart:', error);
            commit('SET_CART', []); // Reset cart on error
          } finally {
            commit('SET_LOADING', false);
          }
        },
        async addToCart({ commit, dispatch }, { product_id, customize_id, quantity }) {
          commit('SET_LOADING', true);
          try {
            const response = await fetch(`${API_BASE_URL}/cart/add`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
              },
              body: JSON.stringify({ product_id, customize_id, quantity }),
            });

            if (!response.ok) throw new Error('Failed to add to cart');

            await dispatch('fetchCart'); // Refresh cart after adding
          } catch (error) {
            console.error('Error adding to cart:', error);
          } finally {
            commit('SET_LOADING', false);
          }
        },
        async removeFromCart({ commit, dispatch }, cartId) {
          commit('SET_LOADING', true);
          try {
            const response = await fetch(`${API_BASE_URL}/cart/remove/${cartId}`, {
              method: 'DELETE',
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
              },
            });

            if (!response.ok) throw new Error('Failed to remove from cart');

            await dispatch('fetchCart'); // Refresh cart after removal
          } catch (error) {
            console.error('Error removing from cart:', error);
          } finally {
            commit('SET_LOADING', false);
          }
        },
        async clearCart({ commit, dispatch }, user_id) {
          commit('SET_LOADING', true);
          try {
            const response = await fetch(`${API_BASE_URL}/cart/removeall/${user_id}`, {
              method: 'DELETE',
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
              },
            });

            if (!response.ok) throw new Error('Failed to remove from cart');

            await dispatch('fetchCart'); // Refresh cart after removal
          } catch (error) {
            console.error('Error removing from cart:', error);
          } finally {
            commit('SET_LOADING', false);
          }
        },
        async updateQuantity({ commit, dispatch }, { cartId, quantity }) {
          commit('SET_LOADING', true);
          try {
            const response = await fetch(`${API_BASE_URL}/cart/update`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
              },
              body: JSON.stringify({ cartId, quantity }),
            });

            if (!response.ok) throw new Error('Failed to update quantity');

            await dispatch('fetchCart'); // Refresh cart after update
          } catch (error) {
            console.error('Error updating quantity:', error);
          } finally {
            commit('SET_LOADING', false);
          }
        },
        // clearCart({ commit }) {
        //   console.log('Dispatching clearCart action...'); // Debugging
        //   commit('CLEAR_CART'); // Clear the cart
        // },
      },
      getters: {
        cartItems(state) {
          return state.items;
        },
        cartTotal(state) {
          return state.items.reduce((total, item) => total + item.price * item.quantity, 0);
        },
        isLoading(state) {
          return state.loading;
        },
      },
    },
  },

  state: {
    isAuthenticated: !!localStorage.getItem('token'), // Initialize based on token presence
    userRole: localStorage.getItem('role') || 'user', // Initialize user role
  },
  mutations: {
    SET_AUTH(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    SET_ROLE(state, role) {
      state.userRole = role;
    },
  },
  actions: {
    login({ commit }, { token, role }) {
      localStorage.setItem('token', token); // Store the token
      localStorage.setItem('role', role); // Store the user's role
      commit('SET_AUTH', true); // Update authentication state
      commit('SET_ROLE', role); // Update user role
    },
    logout({ commit }) {
      localStorage.removeItem('token'); // Remove the token
      localStorage.removeItem('role'); // Remove the user's role
      commit('SET_AUTH', false); // Update authentication state
      commit('SET_ROLE', 'user'); // Reset user role
    },
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
    isAdmin: (state) => state.userRole === 'admin',
  },
});


export default store;