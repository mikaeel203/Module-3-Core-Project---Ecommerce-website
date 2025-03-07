<template>
    <div class="register-container">
      <h2>Register</h2>
      <form @submit.prevent="register">
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
        <button type="submit" class="register-btn">Register</button>
      </form>
  
      <!-- Link to Login Page -->
      <p class="login-link">
        Already have an account? <router-link to="/login">Login here</router-link>.
      </p>
  
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
      async register() {
        // Reset error message
        this.error = '';
  
        // Validate inputs
        if (!this.email || !this.password) {
          this.error = 'Please fill in all fields.';
          return;
        }
  
        try {
          // Send registration request to the backend
          const response = await fetch(`${API_BASE_URL}/auth/register`, {
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
            // Registration successful
            alert('Registration successful! Please login.');
            this.$router.push('/login'); // Redirect to login page
          } else {
            // Handle errors
            const data = await response.json();
            this.error = data.message || 'Registration failed. Please try again.';
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
  .register-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
    padding-top: 100px !important;
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
  
  .register-btn {
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
  
  .register-btn:hover {
    background-color: #2855d9;
  }
  
  .login-link {
    margin-top: 15px;
    font-size: 14px;
  }
  
  .login-link a {
    color: #3366ff;
    text-decoration: none;
  }
  
  .login-link a:hover {
    text-decoration: underline;
  }
  
  .error-message {
    color: #ff4d4d;
    margin-top: 15px;
    font-size: 14px;
  }
  </style>