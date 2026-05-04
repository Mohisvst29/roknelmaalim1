
import { NextRequest, NextResponse } from "next/server"
import { getGridFSBucket } from "@/lib/gridfs"
import { nanoid } from "nanoid"

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData()
        const file = formData.get("file") as File | null

        if (!file) {
            return new NextResponse("No file uploaded", { status: 400 })
        }

        const buffer = Buffer.from(await file.arrayBuffer())
        const filename = `${nanoid()}-${file.name}`
        const bucket = await getGridFSBucket()

        // Create upload stream
        const uploadStream = bucket.openUploadStream(filename, {
            metadata: {
                originalName: file.name,
                contentType: file.type,
            },
        })

        // Write buffer to stream
        const stream = new ReadableStream({
            start(controller) {
                controller.enqueue(buffer)
                controller.close()
            },
        })

        // @ts-ignore
        await new Promise((resolve, reject) => {
            uploadStream.on("finish", resolve)
            uploadStream.on("error", reject)
            uploadStream.end(buffer)
        })

        const imageUrl = `/api/images/${filename}`

        return NextResponse.json({ url: imageUrl })
    } catch (error) {
        console.error("Upload error:", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}
