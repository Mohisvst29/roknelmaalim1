"use server"

import connectDB from "@/lib/db"
import Post from "@/models/Post"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { processSingleBlog, processAllBlogs } from "@/lib/blog-processor"

export async function createPost(formData: FormData) {
    await connectDB()

    const title = formData.get("title")?.toString()
    const slug = formData.get("slug")?.toString()
    const content = formData.get("content")?.toString()
    const excerpt = formData.get("excerpt")?.toString()
    const featuredImage = formData.get("featuredImage")?.toString()
    const isPublished = formData.get("isPublished") === "on"
    const author = formData.get("author")?.toString()
    const tags = formData.get("tags")?.toString()
    const autoSEO = formData.get("autoSEO") === "on"
    const autoInternalLinks = formData.get("autoInternalLinks") === "on"
    const metaTitle = formData.get("metaTitle")?.toString()
    const metaDescription = formData.get("metaDescription")?.toString()
    const metaKeywords = formData.get("metaKeywords")?.toString()

    if (!title || !slug) {
        return { error: "Title and Slug are required" }
    }

    try {
        const post = await Post.create({
            title,
            slug,
            content,
            excerpt,
            featuredImage,
            isPublished,
            author,
            tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
            autoSEO,
            autoInternalLinks,
            metaTitle,
            metaDescription,
            metaKeywords: metaKeywords ? metaKeywords.split(',').map(keyword => keyword.trim()) : [],
            publishedAt: isPublished ? new Date() : undefined
        })

        // Process the post for internal links and SEO
        if (content && autoInternalLinks) {
            await processSingleBlog(post._id.toString())
        }

        revalidatePath("/admin/blog")
        revalidatePath("/blog")
    } catch (error: any) {
        if (error.code === 11000) {
            return { error: "Slug already exists" }
        }
        return { error: "Failed to create post" }
    }

    redirect("/admin/blog")
}

export async function updatePost(id: string, formData: FormData) {
    await connectDB()

    const title = formData.get("title")?.toString()
    const slug = formData.get("slug")?.toString()
    const content = formData.get("content")?.toString()
    const excerpt = formData.get("excerpt")?.toString()
    const featuredImage = formData.get("featuredImage")?.toString()
    const isPublished = formData.get("isPublished") === "on"
    const author = formData.get("author")?.toString()
    const tags = formData.get("tags")?.toString()
    const autoSEO = formData.get("autoSEO") === "on"
    const autoInternalLinks = formData.get("autoInternalLinks") === "on"
    const metaTitle = formData.get("metaTitle")?.toString()
    const metaDescription = formData.get("metaDescription")?.toString()
    const metaKeywords = formData.get("metaKeywords")?.toString()

    try {
        const post = await Post.findByIdAndUpdate(id, {
            title,
            slug,
            content,
            excerpt,
            featuredImage,
            isPublished,
            author,
            tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
            autoSEO,
            autoInternalLinks,
            metaTitle,
            metaDescription,
            metaKeywords: metaKeywords ? metaKeywords.split(',').map(keyword => keyword.trim()) : [],
            updatedAt: new Date(),
            ...(isPublished ? { publishedAt: new Date() } : {})
        })

        // Process the post for internal links and SEO
        if (content && autoInternalLinks) {
            await processSingleBlog(id)
        }

        revalidatePath("/admin/blog")
        revalidatePath("/blog")
        revalidatePath(`/blog/${slug}`)
    } catch (error) {
        return { error: "Failed to update post" }
    }

    redirect("/admin/blog")
}

export async function deletePost(id: string) {
    await connectDB()
    await Post.findByIdAndDelete(id)
    revalidatePath("/admin/blog")
    revalidatePath("/blog")
}

export async function getPosts() {
    try {
        const db = await connectDB()
        if (!db) return []
        const posts = await Post.find({}).sort({ createdAt: -1 })
        return posts
    } catch (e) {
        return []
    }
}

export async function getPostBySlug(slug: string) {
    await connectDB()
    const post = await Post.findOne({ slug })
    return post
}

export async function reprocessAllBlogs() {
    try {
        const updatedCount = await processAllBlogs()
        revalidatePath("/blog")
        revalidatePath("/admin/blog")
        return { success: true, updatedCount }
    } catch (error) {
        console.error("Error reprocessing blogs:", error)
        return { error: "Failed to reprocess blogs" }
    }
}
