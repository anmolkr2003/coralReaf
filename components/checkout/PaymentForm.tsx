"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { loadStripe, Stripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CreditCard, Shield } from "lucide-react"

interface PaymentFormProps {
  paymentMethod: string
  amount: number
  onPaymentSuccess?: (paymentData: any) => void
  onPaymentError?: (error: string) => void
}

function StripePaymentForm({
  amount,
  onPaymentSuccess,
  onPaymentError,
}: Omit<PaymentFormProps, "paymentMethod">) {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/payments/stripe/create-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: Math.round(amount * 100) }),
      })

      const { clientSecret } = await response.json()

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      })

      if (result.error) {
        setError(result.error.message || "Payment failed")
        onPaymentError?.(result.error.message || "Payment failed")
      } else if (result.paymentIntent?.status === "succeeded") {
        onPaymentSuccess?.(result.paymentIntent)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Payment failed"
      setError(errorMessage)
      onPaymentError?.(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 border rounded-lg">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
            },
          }}
        />
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Shield className="w-4 h-4" />
        <span>Your payment information is secure and encrypted</span>
      </div>

      <Button type="submit" disabled={!stripe || loading} className="w-full bg-olive hover:bg-olive/90">
        {loading ? "Processing..." : `Pay $${amount.toFixed(2)}`}
      </Button>
    </form>
  )
}

function PayPalPaymentForm({
  amount,
  onPaymentSuccess,
  onPaymentError,
}: Omit<PaymentFormProps, "paymentMethod">) {
  return (
    <div className="space-y-4">
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={async () => {
          const res = await fetch("/api/payments/paypal/create-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: amount.toFixed(2) }),
          })
          const { id } = await res.json()
          return id
        }}
        onApprove={async (data) => {
          const res = await fetch("/api/payments/paypal/capture", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderId: data.orderID }),
          })
          const details = await res.json()
          onPaymentSuccess?.(details)
        }}
        onError={(err) => {
          console.error("PayPal error:", err)
          onPaymentError?.("PayPal payment failed")
        }}
      />

      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Shield className="w-4 h-4" />
        <span>Secure payment powered by PayPal</span>
      </div>
    </div>
  )
}

export function PaymentForm({
  paymentMethod,
  amount,
  onPaymentSuccess,
  onPaymentError,
}: PaymentFormProps) {
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null)

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    if (!key) {
      console.warn("⚠️ Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY in .env.local")
      return
    }
    setStripePromise(loadStripe(key))
  }, [])

  if (paymentMethod === "stripe") {
    if (!stripePromise) {
      return (
        <div className="text-red-500 text-sm">
          Stripe not initialized. Please check your publishable key.
        </div>
      )
    }

    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="w-5 h-5" />
            <h3 className="font-semibold">Credit or Debit Card</h3>
          </div>
          <Elements stripe={stripePromise}>
            <StripePaymentForm
              amount={amount}
              onPaymentSuccess={onPaymentSuccess}
              onPaymentError={onPaymentError}
            />
          </Elements>
        </CardContent>
      </Card>
    )
  }

  if (paymentMethod === "paypal") {
    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
    if (!clientId) {
      return (
        <div className="text-red-500 text-sm">
          PayPal not initialized. Please check your PayPal client ID.
        </div>
      )
    }

    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-5 h-5 bg-blue-600 rounded" />
            <h3 className="font-semibold">PayPal</h3>
          </div>
          <PayPalScriptProvider
            options={{
              clientId: clientId,
              currency: "USD",
            }}
          >
            ...
          </PayPalScriptProvider>
        </CardContent>
      </Card>
    )
  }

  return null
}
