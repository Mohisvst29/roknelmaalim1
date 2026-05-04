"use server"

import connectDB from "@/lib/db"
import Project from "@/models/Project"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createProject(formData: FormData) {
    await connectDB()

    const title = formData.get("title")
    const location = formData.get("location")
    const category = formData.get("category")
    const description = formData.get("description")
    const area = formData.get("area")
    const duration = formData.get("duration")
    const year = formData.get("year")
    const image = formData.get("image")
    const href = formData.get("href")

    // Extract arrays from form data
    const services: string[] = []
    const features: string[] = []
    const images: string[] = []

    // Get all services from form data
    for (let [key, value] of formData.entries()) {
        if (key.startsWith('services[')) {
            services.push(value as string)
        } else if (key.startsWith('features[')) {
            features.push(value as string)
        } else if (key.startsWith('images[')) {
            images.push(value as string)
        }
    }

    if (!title || !category) {
        return { error: "Title and Category are required" }
    }

    try {
        await Project.create({
            title: title as string,
            location: location as string,
            category: category as string,
            description: description as string,
            area: area as string,
            duration: duration as string,
            year: year as string,
            image: image as string,
            href: href as string,
            services: services.length > 0 ? services : [],
            features: features.length > 0 ? features : [],
            images: images.length > 0 ? images : []
        })

        revalidatePath("/admin/projects")
        revalidatePath("/projects")
        revalidatePath("/")
    } catch (error) {
        console.error("Create project error:", error)
        return { error: "Failed to create project" }
    }

    redirect("/admin/projects")
}

export async function updateProject(id: string, formData: FormData) {
    await connectDB()

    const title = formData.get("title")
    const location = formData.get("location")
    const category = formData.get("category")
    const description = formData.get("description")
    const area = formData.get("area")
    const duration = formData.get("duration")
    const year = formData.get("year")
    const image = formData.get("image")
    const href = formData.get("href")

    // Extract arrays from form data
    const services: string[] = []
    const features: string[] = []
    const images: string[] = []

    // Get all services from form data
    for (let [key, value] of formData.entries()) {
        if (key.startsWith('services[')) {
            services.push(value as string)
        } else if (key.startsWith('features[')) {
            features.push(value as string)
        } else if (key.startsWith('images[')) {
            images.push(value as string)
        }
    }

    try {
        await Project.findByIdAndUpdate(id, {
            title: title as string,
            location: location as string,
            category: category as string,
            description: description as string,
            area: area as string,
            duration: duration as string,
            year: year as string,
            image: image as string,
            href: href as string,
            services: services.length > 0 ? services : [],
            features: features.length > 0 ? features : [],
            images: images.length > 0 ? images : [],
            updatedAt: new Date()
        })

        revalidatePath("/admin/projects")
        revalidatePath("/projects")
        revalidatePath("/")
    } catch (error) {
        console.error("Update project error:", error)
        return { error: "Failed to update project" }
    }

    redirect("/admin/projects")
}

export async function deleteProject(id: string) {
    await connectDB()
    await Project.findByIdAndDelete(id)
    revalidatePath("/admin/projects")
    revalidatePath("/projects")
    revalidatePath("/")
}

export async function getProjects() {
    try {
        const db = await connectDB()
        if (!db) return []
        const projects = await Project.find({}).sort({ createdAt: -1 })
        return projects
    } catch (e) {
        return []
    }
}
