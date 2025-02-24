<template>
    <div class="profile-container">
      <h2>Profile</h2>
      <form @submit.prevent="updateProfile">
        <input type="text" v-model="profile.name" placeholder="Full Name" required />
        <input type="email" v-model="profile.email" placeholder="Email" required />
        <input type="text" v-model="profile.phone" placeholder="Phone" />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        profile: {
          name: '',
          email: '',
          phone: '',
        },
      };
    },
    async created() {
      const response = await fetch('/api/profile', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      });
      this.profile = await response.json();
    },
    methods: {
      async updateProfile() {
        const response = await fetch('/api/profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(this.profile),
        });
  
        if (response.ok) {
          alert('Profile updated successfully');
        } else {
          alert('Failed to update profile');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .profile-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  input {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #3366ff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  </style>