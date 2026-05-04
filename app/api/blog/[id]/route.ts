import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Post from "@/models/Post";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI as string);
};

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const data = await req.json();
    
    if (data.title && !data.slug) {
      data.slug = data.title.replace(/\s+/g, '-').toLowerCase();
    }

    const updatedPost = await Post.findByIdAndUpdate(params.id, data, { new: true });
    if (!updatedPost) return NextResponse.json({ error: "Post not found" }, { status: 404 });
    return NextResponse.json({ message: "Post updated successfully", post: updatedPost });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const deletedPost = await Post.findByIdAndDelete(params.id);
    if (!deletedPost) return NextResponse.json({ error: "Post not found" }, { status: 404 });
    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
