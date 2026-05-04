import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import mongoose from "mongoose";
import AdminUser from "@/models/AdminUser";
import bcrypt from "bcryptjs";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI as string);
};

export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const data = await req.json();
    
    // Get the first admin user (assuming single admin for now)
    const admin = await AdminUser.findOne({});
    
    if (!admin) {
      // If none exists, create one
      if (data.username && data.newPassword) {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(data.newPassword, salt);
        await AdminUser.create({ username: data.username, passwordHash });
        return NextResponse.json({ message: "Account created" });
      }
      return NextResponse.json({ error: "No admin found to update" }, { status: 404 });
    }

    if (data.username) {
      admin.username = data.username;
    }
    
    if (data.newPassword) {
      const salt = await bcrypt.genSalt(10);
      admin.passwordHash = await bcrypt.hash(data.newPassword, salt);
    }

    await admin.save();
    
    return NextResponse.json({ message: "Account updated successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
