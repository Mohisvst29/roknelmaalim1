import { NextRequest, NextResponse } from "next/server"
import { getGridFSBucket } from "@/lib/gridfs"
import connectDB from "@/lib/db"
import mongoose from "mongoose"

export const dynamic = "force-dynamic"

export async function GET(
    req: NextRequest,
    { params }: { params: { filename: string } }
) {
    try {
        await connectDB()
        const bucket = await getGridFSBucket()
        const filename = params.filename

        // Find the file in the files collection
        const files = await bucket.find({ filename }).toArray()

        if (!files || files.length === 0) {
            return new NextResponse("File not found", { status: 404 })
        }

        const file = files[0]

        // Create a readable stream from GridFS
        const downloadStream = bucket.openDownloadStreamByName(filename)

        // Convert the Node.js Readable stream to a Web ReadableStream
        // @ts-ignore
        const readableStream = new ReadableStream({
            start(controller) {
                downloadStream.on("data", (chunk) => controller.enqueue(chunk))
                downloadStream.on("end", () => controller.close())
                downloadStream.on("error", (err) => controller.error(err))
            },
        })

        // Determine content type (fallback to application/octet-stream)
        const contentType = file.metadata && (file.metadata as any).contentType
            ? (file.metadata as any).contentType
            : "application/octet-stream"

        return new NextResponse(readableStream, {
            headers: {
                "Content-Type": contentType,
                "Cache-Control": "public, max-age=31536000, immutable",
            },
        })

    } catch (error) {
        console.error("Error serving image:", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}
