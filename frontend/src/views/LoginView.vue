<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <!-- Email Input -->
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model="email"
          placeholder="Enter your email"
          required
        />
      </div>

      <!-- Password Input -->
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="Enter your password"
          required
        />
      </div>

      <!-- Submit Button -->
      <button type="submit" class="login-btn">Login</button>
    </form>

    <!-- Error Message -->
    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<script>
import { API_BASE_URL } from '@/config';

export default {
  data() {
    return {
      email: '', // User's email
      password: '', // User's password
      error: '', // Error message
    };
  },
  methods: {
    async login() {
      // Reset error message
      this.error = '';

      // Validate inputs
      if (!this.email || !this.password) {
        this.error = 'Please fill in all fields.';
        return;
      }

      try {
        // Send login request to the backend
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          }),
        });

        // Handle response
        if (response.ok) {
          // Login successful
          const data = await response.json();
          localStorage.setItem('token', data.token); // Store the JWT token
          this.$router.push('/'); // Redirect to the home page
        } else {
          // Handle errors
          const data = await response.json();
          this.error = data.message || 'Login failed. Please try again.';
        }
      } catch (err) {
        // Handle network errors
        this.error = 'An error occurred. Please try again.';
        console.error(err);
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.login-btn {
  width: 100%;
  padding: 10px;
  background-color: #3366ff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-btn:hover {
  background-color: #2855d9;
}

.error-message {
  color: #ff4d4d;
  margin-top: 15px;
  font-size: 14px;
}
</style>