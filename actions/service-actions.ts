"use server"

import connectDB from "@/lib/db"
import Service from "@/models/Service"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createService(formData: FormData) {
    await connectDB()

    const title = formData.get("title")
    const description = formData.get("description")
    const details = formData.get("details")
    const href = formData.get("href")
    const icon = formData.get("icon")
    const order = formData.get("order")
    const image = formData.get("image")

    // Extract arrays from form data
    const features: string[] = []
    const benefits: string[] = []
    const gallery: string[] = []

    // Get all features and benefits from form data
    for (let [key, value] of formData.entries()) {
        if (key.startsWith('features[')) {
            features.push(value as string)
        } else if (key.startsWith('benefits[')) {
            benefits.push(value as string)
        } else if (key.startsWith('gallery[')) {
            gallery.push(value as string)
        }
    }

    if (!title) {
        return { error: "Title is required" }
    }

    try {
        await Service.create({
            title: title as string,
            description: description as string,
            details: details as string,
            href: href as string,
            icon: icon as string,
            image: image as string,
            order: order ? parseInt(order.toString()) : 0,
            features: features.length > 0 ? features : [],
            benefits: benefits.length > 0 ? benefits : [],
            gallery: gallery.length > 0 ? gallery : []
        })

        revalidatePath("/admin/services")
        revalidatePath("/services")
        revalidatePath("/")
    } catch (error) {
        console.error("Create service error:", error)
        return { error: "Failed to create service" }
    }

    redirect("/admin/services")
}

export async function updateService(id: string, formData: FormData) {
    await connectDB()

    const title = formData.get("title")
    const description = formData.get("description")
    const details = formData.get("details")
    const href = formData.get("href")
    const icon = formData.get("icon")
    const order = formData.get("order")
    const image = formData.get("image")

    // Extract arrays from form data
    const features: string[] = []
    const benefits: string[] = []
    const gallery: string[] = []

    // Get all features and benefits from form data
    for (let [key, value] of formData.entries()) {
        if (key.startsWith('features[')) {
            features.push(value as string)
        } else if (key.startsWith('benefits[')) {
            benefits.push(value as string)
        } else if (key.startsWith('gallery[')) {
            gallery.push(value as string)
        }
    }

    try {
        await Service.findByIdAndUpdate(id, {
            title: title as string,
            description: description as string,
            details: details as string,
            href: href as string,
            icon: icon as string,
            image: image as string,
            order: order ? parseInt(order.toString()) : 0,
            features: features.length > 0 ? features : [],
            benefits: benefits.length > 0 ? benefits : [],
            gallery: gallery.length > 0 ? gallery : [],
            updatedAt: new Date()
        })

        revalidatePath("/admin/services")
        revalidatePath("/services")
        revalidatePath("/")
    } catch (error) {
        console.error("Update service error:", error)
        return { error: "Failed to update service" }
    }

    redirect("/admin/services")
}

export async function deleteService(id: string) {
    await connectDB()
    await Service.findByIdAndDelete(id)
    revalidatePath("/admin/services")
    revalidatePath("/services")
    revalidatePath("/")
}

export async function getServices() {
    try {
        const db = await connectDB()
        if (!db) return []
        const services = await Service.find({}).sort({ order: 1 })
        return services
    } catch (e) {
        return []
    }
}
