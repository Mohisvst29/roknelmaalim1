import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Service from "@/models/Service";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI as string);
};

export async function PUT(req: NextRequest, { params }: { params: { id: string } | Promise<{ id: string }> }) {
  try {
    await connectDB();
    const resolvedParams = await Promise.resolve(params);
    const id = resolvedParams.id;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid Service ID" }, { status: 400 });
    }

    const data = await req.json();
    
    if (!data.href) {
      data.href = `/services/${data.title.replace(/\s+/g, '-').toLowerCase()}`;
    }

    const updatedService = await Service.findByIdAndUpdate(id, data, { new: true });
    if (!updatedService) return NextResponse.json({ error: "Service not found" }, { status: 404 });
    
    return NextResponse.json({ message: "Service updated successfully", service: updatedService });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } | Promise<{ id: string }> }) {
  try {
    await connectDB();
    const resolvedParams = await Promise.resolve(params);
    const id = resolvedParams.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid Service ID" }, { status: 400 });
    }

    const deletedService = await Service.findByIdAndDelete(id);
    if (!deletedService) return NextResponse.json({ error: "Service not found" }, { status: 404 });
    
    return NextResponse.json({ message: "Service deleted successfully" });
  } catch (error: any) {
    console.error("Delete Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
