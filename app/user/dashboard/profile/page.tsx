// app/user/dashboard/profile/page.tsx
"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"

export default function UserProfilePage() {
  const { data: session, status } = useSession()
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (status === "loading") return
    if (!session?.user) {
      setError("User not authenticated")
      setLoading(false)
      return
    }
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/users/me", {
          headers: {
            Authorization: `Bearer ${session.user.email ?? ""}`,
          },
        })
        if (!res.ok) throw new Error("Failed to fetch user data")
        const data = await res.json()
        setUser(data.user)
        setName(data.user.name)
        setEmail(data.user.email)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [session, status])

  const handleSave = async () => {
    if (!user) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/users/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.user.email ?? ""}`,
        },
        body: JSON.stringify({ name, email }),
      })
      if (!res.ok) throw new Error("Failed to update user data")
      const updatedUser = await res.json()
      setUser(updatedUser)
      alert("Profile updated successfully")
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!user) return <div>No user data found.</div>

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold text-mud mb-6">My Profile</h1>

      <div className="space-y-4">
        <div>
          <label className="block mb-1 text-muted">Name</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label className="block mb-1 text-muted">Email</label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} disabled />
        </div>
        <Button onClick={handleSave} className="bg-primary text-white" disabled={loading}>
          Save Changes
        </Button>
      </div>
    </div>
  )
}
