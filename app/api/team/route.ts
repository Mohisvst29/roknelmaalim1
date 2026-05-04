import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import mongoose from "mongoose";
import TeamMember from "@/models/TeamMember";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI as string);
};

export async function GET() {
  try {
    await connectDB();
    const members = await TeamMember.find({}).sort({ createdAt: -1 });
    return NextResponse.json(members);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const data = await req.json();
    const newMember = await TeamMember.create(data);
    return NextResponse.json({ message: "Team member created successfully", member: newMember });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
