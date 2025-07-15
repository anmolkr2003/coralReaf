"use client"

import React, { useEffect, useState } from "react"
import { UserLayout } from "./layout"
import { useSession } from "next-auth/react"

type User = {
  id: string
  name: string
  email: string
  role: string
}

const UserDashboard: React.FC = () => {
  const { data: session, status } = useSession()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

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

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/users/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.email ?? ""}`,
        },
        body: JSON.stringify({ name, email }),
      })
      if (!res.ok) throw new Error("Failed to update user data")
      const updatedUser = await res.json()
      setUser(updatedUser)
      alert("User updated successfully")
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
    <UserLayout>
      <div className="max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label htmlFor="name" className="block font-medium mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            Update
          </button>
        </form>
      </div>
    </UserLayout>
  )
}

export default UserDashboard
