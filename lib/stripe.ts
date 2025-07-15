import { loadStripe } from "@stripe/stripe-js"

// Initialize Stripe
export const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

// Stripe configuration
export const stripeConfig = {
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
  secretKey: process.env.STRIPE_SECRET_KEY!,
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
}

// Payment intent creation
export async function createPaymentIntent(amount: number, currency = "usd") {
  try {
    const response = await fetch("/api/payments/stripe/create-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100), // Convert to cents
        currency,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to create payment intent")
    }

    return await response.json()
  } catch (error) {
    console.error("Error creating payment intent:", error)
    throw error
  }
}

// Confirm payment
export async function confirmPayment(paymentIntentId: string) {
  try {
    const response = await fetch("/api/payments/stripe/confirm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paymentIntentId,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to confirm payment")
    }

    return await response.json()
  } catch (error) {
    console.error("Error confirming payment:", error)
    throw error
  }
}
