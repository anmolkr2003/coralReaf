"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface ReturnFormProps {
  onSuccess?: () => void
}

export default function ReturnRequestForm({ onSuccess }: ReturnFormProps) {
  const [form, setForm] = useState({
    orderId: "",
    email: "",
    reason: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!form.orderId || !form.email || !form.reason) {
      alert("Please fill in all fields")
      return
    }

    setLoading(true)

    try {
      const res = await fetch("/api/returns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setSubmitted(true)
        setForm({ orderId: "", email: "", reason: "" })
        if (onSuccess) onSuccess()
      } else {
        alert("Something went wrong. Try again.")
      }
    } catch (error) {
      alert("Network error. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-green-600 font-medium">
        ✅ Return request submitted successfully!
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div>
        <Label>Order ID</Label>
        <Input
          placeholder="Enter your order ID"
          value={form.orderId}
          onChange={(e) => setForm({ ...form, orderId: e.target.value })}
        />
      </div>
      <div>
        <Label>Email</Label>
        <Input
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>
      <div>
        <Label>Reason for Return</Label>
        <Textarea
          rows={3}
          placeholder="Explain the reason for return..."
          value={form.reason}
          onChange={(e) => setForm({ ...form, reason: e.target.value })}
        />
      </div>
      <Button
        onClick={handleSubmit}
        className="bg-red-600 hover:bg-red-700 text-white"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Return Request"}
      </Button>
    </div>
  )
}
