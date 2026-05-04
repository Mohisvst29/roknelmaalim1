"use server"

import connectDB from "@/lib/db"
import SiteContent from "@/models/SiteContent"
import { revalidatePath } from "next/cache"

export async function updateSiteContent(formData: FormData) {
    await connectDB()

    const entries = Array.from(formData.entries())

    try {
        for (const [key, value] of entries) {
            if (key.startsWith("content_")) {
                const actualKey = key.replace("content_", "")

                // Determine if we need to parse JSON (e.g. for slides or banners)
                let finalValue = value

                // Check if this key corresponds to a complex type that needs JSON parsing
                const needsJsonParse = actualKey === 'hero_slides' || actualKey.startsWith('banner_')

                if (needsJsonParse && typeof value === 'string') {
                    try {
                        finalValue = JSON.parse(value)
                    } catch (e) {
                        console.error(`Failed to parse JSON for ${actualKey}`, e)
                        continue // Skip invalid JSON
                    }
                }

                await SiteContent.findOneAndUpdate(
                    { key: actualKey },
                    {
                        key: actualKey,
                        value: finalValue,
                        lastUpdated: new Date()
                    },
                    { upsert: true, new: true }
                )
            }
        }

        revalidatePath("/")
        return { success: true }
    } catch (error) {
        console.error("Content update error:", error)
        return { error: "Failed to update content" }
    }
}
