"use client"

import { useState } from "react"
import { createPost, updatePost } from "@/actions/blog-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import TiptapEditor from "@/components/tiptap-editor"
import { useRouter } from "next/navigation"

interface PostFormProps {
    post?: any
    isEdit?: boolean
}

export default function PostForm({ post, isEdit }: PostFormProps) {
    const router = useRouter()
    const [content, setContent] = useState(post?.content || "")
    const [isSubmitting, setIsSubmitting] = useState(false)

    async function handleSubmit(formData: FormData) {
        setIsSubmitting(true)
        formData.append("content", content)

        if (isEdit && post) {
            await updatePost(post._id, formData)
        } else {
            await createPost(formData)
        }

        setIsSubmitting(false)
    }

    return (
        <form action={handleSubmit} className="space-y-8 max-w-4xl">
            <div className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" name="title" defaultValue={post?.title} required />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="slug">Slug (URL)</Label>
                    <Input id="slug" name="slug" defaultValue={post?.slug} required />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea id="excerpt" name="excerpt" defaultValue={post?.excerpt} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="featuredImage">Featured Image</Label>
                    <div className="flex gap-2">
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                                const file = e.target.files?.[0]
                                if (!file) return

                                const formData = new FormData()
                                formData.append("file", file)

                                try {
                                    setIsSubmitting(true)
                                    const res = await fetch("/api/upload", {
                                        method: "POST",
                                        body: formData
                                    })

                                    if (!res.ok) throw new Error("Upload failed")

                                    const data = await res.json()
                                    // Set the value of the image input
                                    const imageInput = document.getElementById("featuredImage") as HTMLInputElement
                                    if (imageInput) {
                                        imageInput.value = data.url
                                        imageInput.dispatchEvent(new Event('change', { bubbles: true }))
                                    }
                                } catch (error) {
                                    console.error("Upload error:", error)
                                    alert("Upload failed")
                                } finally {
                                    setIsSubmitting(false)
                                }
                            }}
                        />
                    </div>
                    <Input
                        id="featuredImage"
                        name="featuredImage"
                        defaultValue={post?.featuredImage}
                        placeholder="/api/images/..."
                        readOnly
                        className="bg-gray-50"
                    />
                    {post?.featuredImage && (
                        <div className="mt-2">
                            <img src={post.featuredImage} alt="Preview" className="h-40 w-auto object-cover rounded border" />
                        </div>
                    )}
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="author">Author</Label>
                    <Input id="author" name="author" defaultValue={post?.author || "مؤسسة ركن المعالم للمقاولات"} />
                </div>

                <div className="flex items-center gap-2">
                    <Switch id="isPublished" name="isPublished" defaultChecked={post?.isPublished} />
                    <Label htmlFor="isPublished">Publish immediately</Label>
                </div>

                <div className="space-y-4 p-4 border rounded-lg bg-gray-50/50">
                    <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-500">SEO & Linking Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                            <Switch id="autoSEO" name="autoSEO" defaultChecked={post?.autoSEO ?? true} />
                            <Label htmlFor="autoSEO">Automatic SEO Metadata</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <Switch id="autoInternalLinks" name="autoInternalLinks" defaultChecked={post?.autoInternalLinks ?? true} />
                            <Label htmlFor="autoInternalLinks">Automatic Internal Links</Label>
                        </div>
                    </div>
                </div>

                <div className="grid gap-2">
                    <Label>Content</Label>
                    <TiptapEditor content={content} onChange={setContent} />
                </div>
            </div>

            <div className="flex gap-4">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                    Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save Post"}
                </Button>
            </div>
        </form>
    )
}
