import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import mongoose from "mongoose";
import SiteSettings from "@/models/SiteSettings";

// We need a helper to ensure DB connection
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI as string);
};

export async function GET() {
  try {
    await connectDB();
    const settings = await SiteSettings.findOne({});
    if (!settings) {
      return NextResponse.json({ error: "Settings not found" }, { status: 404 });
    }
    return NextResponse.json(settings);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const data = await req.json();
    
    // Remove immutable fields to prevent update errors
    delete data._id;
    delete data.__v;
    delete data.createdAt;
    delete data.updatedAt;

    // Use findOneAndUpdate with upsert to correctly handle deep nested merges
    const updatedSettings = await SiteSettings.findOneAndUpdate({}, data, { 
      new: true, 
      upsert: true,
      runValidators: true
    });
    
    return NextResponse.json({ message: "Settings updated successfully", settings: updatedSettings });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
