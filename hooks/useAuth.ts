"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export function useAuth() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const login = async (email: string, password: string) => {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      throw new Error("Invalid credentials")
    }

    return result
  }

  const logout = async () => {
    await signOut({ redirect: false })
    router.push("/")
  }

  const loginWithGoogle = async () => {
    await signIn("google", { callbackUrl: "/" })
  }

  return {
    user: session?.user,
    isAuthenticated: !!session,
    isAdmin: session?.user?.role === "admin",
    isLoading: status === "loading",
    login,
    logout,
    loginWithGoogle,
  }
}
