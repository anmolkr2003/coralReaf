"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Truck, Clock, CheckCircle, AlertTriangle } from "lucide-react"

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("")
  const [trackingData, setTrackingData] = useState<{
    status?: string
    details?: string
    estimatedDelivery?: string
  } | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock tracking logic (replace with API call in production)
    if (orderNumber) {
      const mockStatus = Math.random() > 0.3 ? "In Transit" : "Delivered"
      setTrackingData({
        status: mockStatus,
        details: mockStatus === "In Transit" ? "Your order is on its way to Palam, Sector 7, Dwarka." : "Delivered on July 08, 2025.",
        estimatedDelivery: mockStatus === "In Transit" ? "Expected by July 12, 2025" : "",
      })
    } else {
      setTrackingData(null)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <Card className="max-w-lg mx-auto bg-accent shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-foreground font-poppins">Track Your Order</CardTitle>
              <p className="text-muted mt-2">Enter your order number to check the status</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="order-number" className="text-muted font-semibold">
                    Order Number *
                  </Label>
                  <Input
                    id="order-number"
                    type="text"
                    placeholder="e.g., ORD123456789"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    className="mt-2"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary hover:bg-highlight text-primary-foreground rounded-full btn-hover-lift"
                >
                  Track Order
                </Button>
              </form>

              {trackingData && (
                <div className="mt-6 space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Order Status</h3>
                  <div className="flex items-center space-x-2">
                    {trackingData.status === "In Transit" && <Truck className="w-5 h-5 text-primary" />}
                    {trackingData.status === "Delivered" && <CheckCircle className="w-5 h-5 text-green-600" />}
                    {trackingData.status === "Delayed" && <AlertTriangle className="w-5 h-5 text-yellow-600" />}
                    <Badge className="bg-primary/10 text-primary">
                      {trackingData.status}
                    </Badge>
                  </div>
                  <p className="text-muted">{trackingData.details}</p>
                  {trackingData.estimatedDelivery && (
                    <p className="text-muted">Estimated Delivery: {trackingData.estimatedDelivery}</p>
                  )}
                  <Link href="/contact" className="text-sm text-primary hover:underline">
                    Need help? Contact us
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}