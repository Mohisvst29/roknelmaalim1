import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import TeamMember from "@/models/TeamMember";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI as string);
};

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const data = await req.json();
    const updatedMember = await TeamMember.findByIdAndUpdate(params.id, data, { new: true });
    if (!updatedMember) return NextResponse.json({ error: "Team member not found" }, { status: 404 });
    return NextResponse.json({ message: "Team member updated successfully", member: updatedMember });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const deletedMember = await TeamMember.findByIdAndDelete(params.id);
    if (!deletedMember) return NextResponse.json({ error: "Team member not found" }, { status: 404 });
    return NextResponse.json({ message: "Team member deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
