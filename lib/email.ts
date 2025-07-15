// Email configuration
export const emailConfig = {
  host: process.env.EMAIL_SERVER_HOST!,
  port: Number.parseInt(process.env.EMAIL_SERVER_PORT || "587"),
  user: process.env.EMAIL_SERVER_USER!,
  password: process.env.EMAIL_SERVER_PASSWORD!,
  from: process.env.EMAIL_FROM!,
}

// Email templates
export const emailTemplates = {
  orderConfirmation: (order: any) => ({
    subject: `Order Confirmation - #${order.id}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #8B9467;">Thank you for your order!</h1>
        <p>Hi ${order.customerName},</p>
        <p>We've received your order and are preparing it for shipment.</p>
        
        <div style="background: #f5f5f5; padding: 20px; margin: 20px 0;">
          <h2>Order Details</h2>
          <p><strong>Order Number:</strong> #${order.id}</p>
          <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
          <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
        </div>

        <h3>Items Ordered:</h3>
        ${order.items
          .map(
            (item: any) => `
          <div style="border-bottom: 1px solid #eee; padding: 10px 0;">
            <p><strong>${item.name}</strong></p>
            <p>Size: ${item.size} | Color: ${item.color}</p>
            <p>Quantity: ${item.quantity} | Price: $${item.price.toFixed(2)}</p>
          </div>
        `,
          )
          .join("")}

        <div style="margin-top: 30px;">
          <h3>Shipping Address:</h3>
          <p>
            ${order.shippingAddress.name}<br>
            ${order.shippingAddress.street}<br>
            ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}<br>
            ${order.shippingAddress.country}
          </p>
        </div>

        <p style="margin-top: 30px;">
          You can track your order status in your account dashboard.
        </p>

        <p>Thank you for choosing Coralreaf!</p>
        <p>The Coralreaf Team</p>
      </div>
    `,
  }),

  shippingNotification: (order: any) => ({
    subject: `Your order #${order.id} has shipped!`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #8B9467;">Your order is on its way!</h1>
        <p>Hi ${order.customerName},</p>
        <p>Great news! Your order has been shipped and is on its way to you.</p>
        
        <div style="background: #f5f5f5; padding: 20px; margin: 20px 0;">
          <h2>Shipping Details</h2>
          <p><strong>Order Number:</strong> #${order.id}</p>
          <p><strong>Tracking Number:</strong> ${order.trackingNumber}</p>
          <p><strong>Estimated Delivery:</strong> 3-5 business days</p>
        </div>

        <p>You can track your package using the tracking number above.</p>
        <p>Thank you for your business!</p>
        <p>The Coralreaf Team</p>
      </div>
    `,
  }),

  welcomeEmail: (user: any) => ({
    subject: "Welcome to Coralreaf!",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #8B9467;">Welcome to Coralreaf!</h1>
        <p>Hi ${user.name},</p>
        <p>Thank you for joining our community of conscious consumers!</p>
        
        <p>At Coralreaf, we believe in sustainable fashion that doesn't compromise on style. 
        Explore our collection of eco-friendly clothing made with love for you and the planet.</p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXTAUTH_URL}/shop" 
             style="background: #8B9467; color: white; padding: 15px 30px; 
                    text-decoration: none; border-radius: 5px; display: inline-block;">
            Start Shopping
          </a>
        </div>

        <p>Happy shopping!</p>
        <p>The Coralreaf Team</p>
      </div>
    `,
  }),
}

// Send email function
export async function sendEmail(to: string, template: any) {
  try {
    const response = await fetch("/api/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to,
        subject: template.subject,
        html: template.html,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to send email")
    }

    return await response.json()
  } catch (error) {
    console.error("Error sending email:", error)
    throw error
  }
}
