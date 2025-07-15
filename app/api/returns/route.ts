// app/api/returns/route.ts
import { NextResponse } from "next/server"

// In-memory storage (replace with DB in prod)
let returnRequests: any[] = []

export async function POST(req: Request) {
  const body = await req.json()
  returnRequests.push({ ...body, status: "Pending" })
  return NextResponse.json({ success: true })
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const orderId = searchParams.get("orderId")
  const found = returnRequests.find((r) => r.orderId === orderId)
  return NextResponse.json({ status: found?.status || null })
}
