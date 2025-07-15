export interface PaymentMethod {
  id: string
  type: "card" | "paypal" | "apple_pay" | "google_pay"
  last4?: string
  brand?: string
  expiryMonth?: number
  expiryYear?: number
  isDefault: boolean
}

export interface PaymentIntent {
  id: string
  amount: number
  currency: string
  status:
    | "requires_payment_method"
    | "requires_confirmation"
    | "requires_action"
    | "processing"
    | "succeeded"
    | "canceled"
  clientSecret: string
  paymentMethod?: PaymentMethod
}

export interface PaymentResult {
  success: boolean
  paymentIntent?: PaymentIntent
  error?: string
}

export interface StripePaymentData {
  paymentIntentId: string
  amount: number
  currency: string
  status: string
  receiptUrl?: string
}

export interface PayPalPaymentData {
  orderId: string
  payerId: string
  amount: number
  currency: string
  status: string
}

export type PaymentProvider = "stripe" | "paypal"

export interface PaymentConfig {
  provider: PaymentProvider
  amount: number
  currency: string
  description?: string
  metadata?: Record<string, string>
}
