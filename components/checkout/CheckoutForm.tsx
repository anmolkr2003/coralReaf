"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/hooks/useCart"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { ShippingAddressForm } from "./ShippingAddressForm"
import { PaymentForm } from "./PaymentForm"
import { OrderSummary } from "./OrderSummary"
import { Truck, CreditCard, User, CheckCircle, X } from "lucide-react"
import type { ShippingAddress } from "@/types/order"

export default function CheckoutForm({ setShowCheckoutForm }: { setShowCheckoutForm: (show: boolean) => void }) {
  const router = useRouter()
  const { items, total, clearCart } = useCart()

  const [currentStep, setCurrentStep] = useState("shipping")
  const [isGuest, setIsGuest] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(true)
  
  const [formData, setFormData] = useState({
    email: "",
    shippingAddress: {} as Partial<ShippingAddress>,
    billingAddress: {} as Partial<ShippingAddress>,
    sameAsShipping: true,
    paymentMethod: "stripe",
    saveInfo: false,
  })

  const steps = [
    { id: "shipping", title: "Shipping", icon: Truck },
    { id: "payment", title: "Payment", icon: CreditCard },
    { id: "review", title: "Review", icon: User },
    { id: "confirmation", title: "Confirmation", icon: CheckCircle },
  ]

  const handleNext = () => {
    const stepOrder = ["shipping", "payment", "review", "confirmation"]
    const currentIndex = stepOrder.indexOf(currentStep)
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1])
    }
  }

  const handleBack = () => {
  const stepOrder = ["shipping", "payment", "review", "confirmation"]
  const currentIndex = stepOrder.indexOf(currentStep)
 
  if (currentStep === "shipping") {
    setShowCheckoutForm(false) 
    router.push("/shop")
     // redirect to cart page
  } else if (currentIndex > 0) {
    setCurrentStep(stepOrder[currentIndex - 1])
  }
  
}


  const handleSubmitOrder = async () => {
    setLoading(true)
    try {
      const orderData = {
        items,
        total,
        email: formData.email,
        shippingAddress: formData.shippingAddress,
        billingAddress: formData.sameAsShipping ? formData.shippingAddress : formData.billingAddress,
        paymentMethod: formData.paymentMethod,
      }

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      })

      if (response.ok) {
        const order = await response.json()
        clearCart()
        setCurrentStep("confirmation")
        router.push(`/orders/${order.id}`)
      } else {
        throw new Error("Failed to create order")
      }
    } catch (error) {
      alert("Failed to create order. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="fixed inset-0 z-50 bg-cream flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-mud">Your cart is empty</h1>
          <Button onClick={() => router.push("/shop")}>Continue Shopping</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-cream overflow-auto py-8 px-4">
      <div className="container max-w-6xl mx-auto relative">

       
        {/* Stepper Progress */}
        <div className="mb-8 flex items-center justify-center gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isActive = step.id === currentStep
            const isCompleted = steps.findIndex((s) => s.id === currentStep) > index

            return (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    isActive
                      ? "border-olive bg-olive text-cream"
                      : isCompleted
                      ? "border-green-500 bg-green-500 text-white"
                      : "border-gray-300 bg-white text-gray-400"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`ml-2 text-sm font-medium ${isActive ? "text-olive" : isCompleted ? "text-green-500" : "text-gray-400"}`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && <div className={`w-16 h-0.5 ml-4 ${isCompleted ? "bg-green-500" : "bg-gray-300"}`} />}
              </div>
            )
          })}
        </div>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">

            {/* Shipping */}
            {currentStep === "shipping" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="w-5 h-5" />
                    Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Guest */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="guest"
                      checked={isGuest}
                      onCheckedChange={(checked) => setIsGuest(checked === true)}
                    />
                    <Label htmlFor="guest">Checkout as guest</Label>
                  </div>
                  {isGuest && (
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                        placeholder="your@email.com"
                      />
                    </div>
                  )}

                  <Separator />
                  <ShippingAddressForm
                    address={formData.shippingAddress}
                    onChange={(address: Partial<ShippingAddress>) =>
                      setFormData((prev) => ({ ...prev, shippingAddress: address }))
                    }
                  />

                  <div className="flex justify-between">
                     <Button variant="outline" onClick={handleBack}>Back</Button>

  <Button onClick={handleNext} className="bg-red-600 hover:bg-red-700 text-white">
    Continue to Payment
  </Button>
</div>

                </CardContent>
              </Card>
            )}

            {/* Payment */}
            {currentStep === "payment" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="sameAsShipping"
                      checked={formData.sameAsShipping}
                      onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, sameAsShipping: checked as boolean }))}
                    />
                    <Label htmlFor="sameAsShipping">Billing address same as shipping</Label>
                  </div>
                  {!formData.sameAsShipping && (
                    <ShippingAddressForm
                      address={formData.billingAddress}
                      onChange={(address) => setFormData((prev) => ({ ...prev, billingAddress: address }))}
                      title="Billing Address"
                    />
                  )}

                  <RadioGroup
                    value={formData.paymentMethod}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, paymentMethod: value }))}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="stripe" id="stripe" />
                      <Label htmlFor="stripe">Credit/Debit Card</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal">PayPal</Label>
                    </div>
                  </RadioGroup>

                  <PaymentForm paymentMethod={formData.paymentMethod} amount={total} />

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={handleBack}>Back</Button>
                    <Button onClick={handleNext} className="bg-red-600 hover:bg-red-700 text-white">Review</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Review */}
            {currentStep === "review" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5"  />
                    Review Your Order
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <h3 className="font-semibold">Items</h3>
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">{item.size} • {item.color} • Qty: {item.quantity}</p>
                      </div>
                      <p>${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}

                  <Separator />

                  <div>
                    <h3 className="font-semibold mb-2">Shipping Address</h3>
                    <div className="bg-gray-100 p-4 rounded-lg space-y-1 text-sm">
                      <p>{formData.shippingAddress.name}</p>
                      <p>{formData.shippingAddress.street}</p>
                      {formData.shippingAddress.street2 && <p>{formData.shippingAddress.street2}</p>}
                      <p>{formData.shippingAddress.city}, {formData.shippingAddress.state} {formData.shippingAddress.zipCode}</p>
                      <p>{formData.shippingAddress.country}</p>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={handleBack}>Back</Button>
                    <Button onClick={handleSubmitOrder} className="bg-olive bg-red-600 hover:bg-red-700 text-white" disabled={loading}>
                      {loading ? "Placing Order..." : "Place Order"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  )
}
