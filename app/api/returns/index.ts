// File: pages/api/returns/index.ts (Return Request Creation & Listing)
import { NextApiRequest, NextApiResponse } from "next"

let returnRequests: any[] = []

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.status(200).json(returnRequests)
  }

  if (req.method === "POST") {
    const { orderId, email, reason, customerId } = req.body

    if (!orderId || !email || !reason) {
      return res.status(400).json({ error: "All fields are required" })
    }

    const newReturn = {
      id: `${Date.now()}`,
      orderId,
      email,
      reason,
      customerId,
      status: "pending",
      createdAt: new Date().toISOString(),
    }

    // TODO: Replace with actual DB insert
    returnRequests.push(newReturn)

    // Email simulation
    console.log(`Return request received for Order ${orderId} from ${email}`)

    return res.status(201).json({ message: "Return request created", return: newReturn })
  }

  res.status(405).json({ message: "Method not allowed" })
}
