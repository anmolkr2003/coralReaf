// app/admin/returns/page.tsx
"use client"
import { useEffect, useState } from "react"

export default function AdminReturnsPage() {
  const [requests, setRequests] = useState<any[]>([])

  useEffect(() => {
    fetch("/api/admin/returns").then(res => res.json()).then(setRequests)
  }, [])

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">📋 Return Requests</h1>
      {requests.length === 0 ? (
        <p>No return requests yet.</p>
      ) : (
        <ul className="space-y-4">
          {requests.map((req, i) => (
            <li key={i} className="border rounded p-4">
              <p><strong>Order:</strong> {req.orderId}</p>
              <p><strong>Email:</strong> {req.email}</p>
              <p><strong>Reason:</strong> {req.reason}</p>
              <p><strong>Status:</strong> {req.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
