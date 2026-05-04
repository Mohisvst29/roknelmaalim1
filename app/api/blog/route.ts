import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import mongoose from "mongoose";
import Post from "@/models/Post";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI as string);
};

export async function GET() {
  try {
    await connectDB();
    const posts = await Post.find({}).sort({ createdAt: -1 });
    return NextResponse.json(posts);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const data = await req.json();
    
    if (!data.slug) {
      data.slug = data.title.replace(/\s+/g, '-').toLowerCase();
    }

    const newPost = await Post.create(data);
    return NextResponse.json({ message: "Post created successfully", post: newPost });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
