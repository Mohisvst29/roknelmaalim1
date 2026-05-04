import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import mongoose from "mongoose";
import Project from "@/models/Project";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI as string);
};

export async function GET() {
  try {
    await connectDB();
    const projects = await Project.find({}).sort({ createdAt: -1 });
    return NextResponse.json(projects);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const data = await req.json();
    
    if (!data.href) {
      data.href = `/projects/${data.title.replace(/\s+/g, '-').toLowerCase()}`;
    }

    const newProject = await Project.create(data);
    return NextResponse.json({ message: "Project created successfully", project: newProject });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
