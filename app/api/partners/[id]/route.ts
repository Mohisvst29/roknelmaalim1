import { NextResponse } from "next/server"
export const dynamic = "force-dynamic";
import connectDB from "@/lib/db"
import Partner from "@/models/Partner"

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const db = await connectDB()
    if (!db) return NextResponse.json({ error: "Database not connected" }, { status: 503 })
    const partner = await Partner.findById(params.id)
    if (!partner) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json(partner)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch partner" }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const data = await req.json()
    const partner = await Partner.findByIdAndUpdate(params.id, data, { new: true })
    if (!partner) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json(partner)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update partner" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const partner = await Partner.findByIdAndDelete(params.id)
    if (!partner) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete partner" }, { status: 500 })
  }
}
