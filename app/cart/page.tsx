"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from "@/hooks/useCart"
import { Plus, Minus, X, ShoppingBag, ArrowLeft } from "lucide-react"

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, tax, shipping, total, itemCount } = useCart()

  return (
    <main className="min-h-screen bg-primary/10 py-10">
      <div className=" px-4 bg-primary/10">
        {items.length === 0 ? (
          <div className="flex flex-col items-center text-center mt-20">
            <ShoppingBag className="w-20 h-20 text-gray-300 mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Your cart is empty</h1>
            <p className="text-gray-600 mb-6">
              Looks like you haven’t added any items yet.
            </p>
            <Button className="bg-red-600 hover:bg-red-700 text-white" asChild>
              <Link href="/shop">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continue Shopping
              </Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
              <p className="text-gray-700">{itemCount} {itemCount === 1 ? "item" : "items"} in your cart</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <Card key={item.id} className="bg-white border border-gray-200 shadow-sm">
                    <CardContent className="p-4 flex items-center space-x-4">
                      <div className="relative w-20 h-20">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-600">Size: {item.size} • Color: {item.color}</p>
                        <p className="font-medium text-red-600 mt-1">${item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span>{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500"
                        >
                          <X className="w-5 h-5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Order Summary */}
              <Card className="bg-white border border-gray-200 shadow-sm sticky top-6 h-fit">
                <CardHeader>
                  <CardTitle className="text-gray-800">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-semibold text-base">
                    <span>Total</span>
                    <span className="text-red-600">${total.toFixed(2)}</span>
                  </div>

                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white mt-4">Checkout</Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/shop">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Continue Shopping
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </main>
  )
}
