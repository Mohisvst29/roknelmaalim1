import { NextResponse } from "next/server"
export const dynamic = "force-dynamic";
import connectDB from "@/lib/db"
import Partner from "@/models/Partner"

export async function GET() {
  try {
    const db = await connectDB()
    if (!db) return NextResponse.json([])
    const partners = await Partner.find().sort({ order: 1, createdAt: -1 })
    return NextResponse.json(partners)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch partners" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    await connectDB()
    const data = await req.json()
    const partner = await Partner.create(data)
    return NextResponse.json(partner, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create partner" }, { status: 500 })
  }
}
