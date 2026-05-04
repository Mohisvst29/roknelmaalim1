import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Project from "@/models/Project";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI as string);
};

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const data = await req.json();
    
    if (!data.href) {
      data.href = `/projects/${data.title.replace(/\s+/g, '-').toLowerCase()}`;
    }

    const updatedProject = await Project.findByIdAndUpdate(params.id, data, { new: true });
    if (!updatedProject) return NextResponse.json({ error: "Project not found" }, { status: 404 });
    
    return NextResponse.json({ message: "Project updated successfully", project: updatedProject });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const deletedProject = await Project.findByIdAndDelete(params.id);
    if (!deletedProject) return NextResponse.json({ error: "Project not found" }, { status: 404 });
    
    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
