// app/user/dashboard/orders/page.tsx
"use client"

import { useOrders } from "@/lib/data-store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function UserOrdersPage() {
  const { orders } = useOrders()
  const currentUserId = "user123" // Replace with auth-based user ID

  const myOrders = orders.filter((order) => order.userId === currentUserId)

  return (
    <div>
      <h1 className="text-2xl font-bold text-mud mb-6">My Orders</h1>

      {myOrders.length === 0 ? (
        <p className="text-muted">You haven’t placed any orders yet.</p>
      ) : (
        <div className="space-y-6">
          {myOrders.map((order) => (
            <Card key={order.id}>
              <CardHeader className="flex justify-between items-center">
                <CardTitle>Order #{order.id}</CardTitle>
                <Badge>{order.status}</Badge>
              </CardHeader>
              <CardContent className="text-muted text-sm">
                <p>Total: ₹{order.total}</p>
                <p>Items: {order.items.length}</p>
                <p>Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
