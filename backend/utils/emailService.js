import nodemailer from 'nodemailer';

// Create a transporter object using Gmail (or any other email service)
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use 'gmail' for Gmail or configure for other services
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASSWORD, // Your email password or app-specific password
  },
});

/**
 * Send an order confirmation email to the user.
 * @param {string} email - The user's email address.
 * @param {object} order - The order details.
 */
export const sendOrderConfirmationEmail = async (email, order) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender email address
      to: email, // Recipient email address
      subject: 'Order Confirmation', // Email subject
      html: `
        <h1>Thank you for your order!</h1>
        <p>Your order has been placed successfully.</p>
        <h2>Order Details</h2>
        <p><strong>Order ID:</strong> ${order.order_id}</p>
        <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
        <p><strong>Status:</strong> ${order.status}</p>
        <h3>Shipping Details</h3>
        <p><strong>Name:</strong> ${order.shipping.name}</p>
        <p><strong>Address:</strong> ${order.shipping.address}</p>
        <p><strong>City:</strong> ${order.shipping.city}</p>
        <p><strong>State:</strong> ${order.shipping.state}</p>
        <p><strong>Zip:</strong> ${order.shipping.zip}</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('Order confirmation email sent successfully.');
  } catch (err) {
    console.error('Error sending order confirmation email:', err);
  }
};