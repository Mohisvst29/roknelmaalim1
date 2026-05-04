"use server"

import { getGridFSBucket } from "@/lib/gridfs"
import connectDB from "@/lib/db"
import { revalidatePath } from "next/cache"
import { nanoid } from "nanoid"

export async function uploadImage(formData: FormData) {
    try {
        const file = formData.get("file") as File
        if (!file) {
            return { error: "No file provided" }
        }

        await connectDB()
        const bucket = await getGridFSBucket()

        // Generate a unique safe filename
        // Sanitizing original name and appending unique ID
        const safeName = file.name.replace(/[^a-z0-9.]/gi, '_').toLowerCase()
        const uniqueFilename = `${nanoid(8)}-${safeName}`

        const buffer = Buffer.from(await file.arrayBuffer())

        // Upload stream
        const uploadStream = bucket.openUploadStream(uniqueFilename, {
            metadata: {
                contentType: file.type,
                originalName: file.name
            }
        })

        // Write buffer to stream
        // Using a promise wrapper to handle stream completion
        await new Promise((resolve, reject) => {
            uploadStream.end(buffer, (error: any) => {
                if (error) reject(error)
                else resolve(true)
            })
        })

        revalidatePath("/admin/media")

        return {
            success: true,
            url: `/api/images/${uniqueFilename}`,
            filename: uniqueFilename
        }

    } catch (error) {
        console.error("Upload error:", error)
        return { error: "Upload failed" }
    }
}
