<template>
  <div class="profile-container">
    <h2>Profile</h2>

    <!-- Display Profile Details -->
    <div v-if="profile">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          id="name"
          v-model="profile.name"
          placeholder="Enter your name"
        />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model="profile.email"
          placeholder="Enter your email"
        />
      </div>

      <div class="form-group">
        <label for="phone">Phone</label>
        <input
          type="text"
          id="phone"
          v-model="profile.phone"
          placeholder="Enter your phone number"
        />
      </div>

      <!-- Update Button -->
      <button @click="updateProfile" class="update-btn">Update Profile</button>

      <!-- Success/Error Message -->
      <p v-if="message" :class="messageClass">{{ message }}</p>
    </div>

    <!-- Loading State -->
    <p v-else class="loading">Loading profile...</p>
  </div>
</template>

<script>
import { API_BASE_URL } from '@/config';

export default {
  data() {
    return {
      profile: null, // User profile data
      message: '', // Success/error message
      messageClass: '', // CSS class for the message
    };
  },
  async created() {
    await this.fetchProfile();
  },
  methods: {
    async fetchProfile() {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/users/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          this.profile = await response.json();
        } else {
          this.showMessage('Failed to fetch profile', 'error');
        }
      } catch (err) {
        this.showMessage('An error occurred', 'error');
        console.error(err);
      }
    },
    async updateProfile() {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/users/profile`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(this.profile),
        });

        if (response.ok) {
          this.showMessage('Profile updated successfully', 'success');
        } else {
          this.showMessage('Failed to update profile', 'error');
        }
      } catch (err) {
        this.showMessage('An error occurred', 'error');
        console.error(err);
      }
    },
    showMessage(message, type) {
      this.message = message;
      this.messageClass = type === 'success' ? 'success-message' : 'error-message';
      setTimeout(() => (this.message = ''), 3000); // Clear message after 3 seconds
    },
  },
};
</script>

<style scoped>
.profile-container {
  max-width: 600px;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  padding-top: 100px;
}

.form-group {
  margin-bottom: 15px;
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

.update-btn {
  padding: 10px 20px;
  background-color: #3366ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.update-btn:hover {
  background-color: #2855d9;
}

.loading {
  text-align: center;
  font-size: 18px;
  color: #666;
}

.success-message {
  color: #4caf50;
  margin-top: 15px;
}

.error-message {
  color: #ff4d4d;
  margin-top: 15px;
}
</style>