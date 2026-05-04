import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import mongoose from "mongoose";
import Service from "@/models/Service";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI as string);
};

export async function GET() {
  try {
    await connectDB();
    const services = await Service.find({}).sort({ order: 1, createdAt: -1 });
    return NextResponse.json(services);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const data = await req.json();
    
    // Auto-generate href if not provided
    if (!data.href) {
      data.href = `/services/${data.title.replace(/\s+/g, '-').toLowerCase()}`;
    }

    const newService = await Service.create(data);
    return NextResponse.json({ message: "Service created successfully", service: newService });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
