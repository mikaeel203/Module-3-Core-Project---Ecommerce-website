# Modern E-commerce Website

[![Screenshot of Homepage](https://github.com/SivuyileMtwetwe/Images/blob/f17e405968c32b9c8f5b10b08954b222e780d5ef/asserts/Screenshot%202025-04-10%20143333.png)](https://module-3-core-project-ecommerce-website.vercel.app/)
[![Cart Animation](https://github.com/SivuyileMtwetwe/Images/blob/5d3461c4fdf1f92b52a2b82d4b2cbbe1ed780e6a/asserts/ScreenRecording2025-04-10144135-ezgif.com-video-to-gif-converter.gif)](https://module-3-core-project-ecommerce-website.vercel.app/)

A modern e-commerce platform built with React and Node.js that provides a seamless shopping experience with real-time cart updates, secure checkout, and responsive design.

## Table of Contents
- [Live Demo](#live-demo)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Key Features](#key-features)
- [Usage Instructions](#usage-instructions)
- [Potential Improvements](#potential-improvements)
- [Authors](#authors)

## Live Demo
[View Live Demo](https://module-3-core-project-ecommerce-website.vercel.app/)

## Technologies Used
- **Front-end:** 
  - Vuet.js
  - HTML5/CSS3
  - JavaScript (ES6+)
- **Back-end:** 
  - Node.js
  - Express.js
- **Database:** MongoDB
- **Additional Tools:**
  - RESTful API
  - JWT Authentication
  - Axios for API calls

## Setup Instructions

1. **Prerequisites:**
   * Node.js (v14 or higher)
   * MongoDB installed and running
   * Git

2. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/ecommerce-website.git
   cd ecommerce-website
   ```

3. **Install Dependencies:**
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

4. **Environment Setup:**
   * Create `.env` files in both frontend and backend directories
   * Backend (.env):
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your_jwt_secret
   ```
   * Frontend (.env):
   ```
   REACT_APP_API_URL=http://localhost:3000/api
   ```

5. **Start Development Servers:**
   ```bash
   # Start backend server
   cd backend
   npm start

   # Start frontend server (in new terminal)
   cd frontend
   npm start
   ```

Visit `http://localhost:3000` to view the application.

## Key Features
- **User Authentication:**
  - Secure registration and login
  - JWT-based authentication
- **Product Management:**
  - Browse products by category
  - Search functionality
  - Detailed product views
- **Shopping Cart:**
  - Real-time cart updates
  - Price calculations
  - Quantity management
- **Checkout Process:**
  - Multi-step checkout
  - Order summary
  - Address management
- **Responsive Design:**
  - Mobile-first approach
  - Cross-browser compatibility
- **Admin Dashboard:**
  - Product management
  - Order tracking
  - User management

## Usage Instructions
1. Register for an account or login
2. Browse products by category or search
3. Add items to cart
4. Proceed to checkout
5. Complete payment process
6. Track your order

## Potential Improvements
- [ ] Implement real-time order tracking
- [ ] Add product reviews and ratings
- [ ] Integrate multiple payment gateways
- [ ] Add wishlist functionality
- [ ] Implement social login options
- [ ] Add email notifications
- [ ] Implement product recommendations


## Authors
- **Sivuyile Mtwetwe**
  - GitHub: [@sivuyilemtwetwe](https://github.com/sivuyilemtwetwe)

- **Zenande Nocanda**
  - GitHub: [@NocandaZen](https://github.com/NocandaZen)

- **Luke Smurt**
  - GitHub: [@RSAHolt](https://github.com/RSAHolt)

- **Mikaeel Sedick**
  - GitHub: [@mikaeel203](https://github.com/mikaeel203)