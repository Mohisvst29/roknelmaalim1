"use client"

import { useState } from "react"
import { createProject, updateProject } from "@/actions/project-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"

interface ProjectFormProps {
    project?: any
    isEdit?: boolean
}

export default function ProjectForm({ project, isEdit }: ProjectFormProps) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [services, setServices] = useState<string[]>(project?.services || [])
    const [features, setFeatures] = useState<string[]>(project?.features || [])
    const [images, setImages] = useState<string[]>(project?.images || [])
    const [newService, setNewService] = useState("")
    const [newFeature, setNewFeature] = useState("")
    const [newImage, setNewImage] = useState("")

    async function handleSubmit(formData: FormData) {
        setIsSubmitting(true)

        // Add arrays to form data
        if (services.length > 0) {
            services.forEach((service, index) => {
                formData.append(`services[${index}]`, service)
            })
        }
        if (features.length > 0) {
            features.forEach((feature, index) => {
                formData.append(`features[${index}]`, feature)
            })
        }
        if (images.length > 0) {
            images.forEach((image, index) => {
                formData.append(`images[${index}]`, image)
            })
        }

        // Generate href from title
        const title = formData.get("title") as string
        if (title) {
            const href = `/projects/${title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()}-${Date.now()}`
            formData.append("href", href)
        }

        if (isEdit && project) {
            await updateProject(project._id, formData)
        } else {
            await createProject(formData)
        }

        setIsSubmitting(false)
    }

    const addService = () => {
        if (newService.trim()) {
            setServices([...services, newService.trim()])
            setNewService("")
        }
    }

    const addFeature = () => {
        if (newFeature.trim()) {
            setFeatures([...features, newFeature.trim()])
            setNewFeature("")
        }
    }

    const addImage = () => {
        if (newImage.trim()) {
            setImages([...images, newImage.trim()])
            setNewImage("")
        }
    }

    const removeItem = (index: number, type: 'services' | 'features' | 'images') => {
        if (type === 'services') {
            setServices(services.filter((_, i) => i !== index))
        } else if (type === 'features') {
            setFeatures(features.filter((_, i) => i !== index))
        } else if (type === 'images') {
            setImages(images.filter((_, i) => i !== index))
        }
    }

    return (
        <form action={handleSubmit} className="space-y-8 max-w-4xl bg-white p-8 rounded-xl border shadow-sm">
            <div className="grid gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-[#0D2240]">المعلومات الأساسية</h3>
                    <div className="grid gap-2">
                        <Label htmlFor="title" className="text-right">اسم المشروع</Label>
                        <Input id="title" name="title" defaultValue={project?.title} required className="text-right" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="category" className="text-right">التصنيف</Label>
                            <Select name="category" defaultValue={project?.category} required>
                                <SelectTrigger className="text-right">
                                    <SelectValue placeholder="اختر التصنيف" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="residential">سكني</SelectItem>
                                    <SelectItem value="commercial">تجاري</SelectItem>
                                    <SelectItem value="industrial">صناعي</SelectItem>
                                    <SelectItem value="renovation">ترميم</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="location" className="text-right">الموقع</Label>
                            <Input id="location" name="location" defaultValue={project?.location} required className="text-right" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="area" className="text-right">المساحة</Label>
                            <Input id="area" name="area" defaultValue={project?.area} placeholder="مثال: 500 م²" required className="text-right" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="duration" className="text-right">مدة التنفيذ</Label>
                            <Input id="duration" name="duration" defaultValue={project?.duration} placeholder="مثال: 6 أشهر" required className="text-right" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="year" className="text-right">سنة التنفيذ</Label>
                            <Input id="year" name="year" defaultValue={project?.year} placeholder="مثال: 2024" required className="text-right" />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description" className="text-right">وصف المشروع</Label>
                        <Textarea id="description" name="description" defaultValue={project?.description} required className="text-right min-h-[150px]" />
                    </div>
                </div>

                {/* Images */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-[#0D2240]">صور المشروع</h3>
                    
                    <div className="grid gap-2">
                        <Label htmlFor="imageUpload" className="text-right">رفع صورة رئيسية</Label>
                        <div className="flex gap-2">
                            <Input
                                id="imageUpload"
                                type="file"
                                className="text-right"
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
                                        const imageInput = document.getElementById("image") as HTMLInputElement
                                        if (imageInput) {
                                            imageInput.value = data.url
                                        }
                                    } catch (error) {
                                        console.error("Upload error:", error)
                                        alert("فشل رفع الصورة")
                                    } finally {
                                        setIsSubmitting(false)
                                    }
                                }}
                            />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="image" className="text-right">رابط الصورة الرئيسية</Label>
                        <Input id="image" name="image" defaultValue={project?.image} placeholder="/api/images/..." required dir="ltr" readOnly className="bg-gray-50" />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-right">صور إضافية</Label>
                        <div className="flex gap-2">
                            <Input
                                value={newImage}
                                onChange={(e) => setNewImage(e.target.value)}
                                placeholder="أدخل رابط الصورة"
                                className="text-right"
                                dir="ltr"
                            />
                            <Button type="button" onClick={addImage} variant="outline" size="sm">
                                إضافة
                            </Button>
                        </div>
                        {images.map((image, index) => (
                            <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                                <span className="text-sm flex-1 text-left" dir="ltr">{image}</span>
                                <Button type="button" onClick={() => removeItem(index, 'images')} variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                                    حذف
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Services */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-[#0D2240]">الخدمات المقدمة</h3>
                    <div className="flex gap-2">
                        <Input
                            value={newService}
                            onChange={(e) => setNewService(e.target.value)}
                            placeholder="أدخل خدمة"
                            className="text-right"
                        />
                        <Button type="button" onClick={addService} variant="outline" size="sm">
                            إضافة
                        </Button>
                    </div>
                    {services.map((service, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                            <span className="flex-1">{service}</span>
                            <Button type="button" onClick={() => removeItem(index, 'services')} variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                                حذف
                            </Button>
                        </div>
                    ))}
                </div>

                {/* Features */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-[#0D2240]">مميزات المشروع</h3>
                    <div className="flex gap-2">
                        <Input
                            value={newFeature}
                            onChange={(e) => setNewFeature(e.target.value)}
                            placeholder="أدخل ميزة"
                            className="text-right"
                        />
                        <Button type="button" onClick={addFeature} variant="outline" size="sm">
                            إضافة
                        </Button>
                    </div>
                    {features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                            <span className="flex-1">{feature}</span>
                            <Button type="button" onClick={() => removeItem(index, 'features')} variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                                حذف
                            </Button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex gap-4 justify-end pt-4">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                    إلغاء
                </Button>
                <Button type="submit" disabled={isSubmitting} className="bg-[#0D2240] hover:bg-[#1a3a5c]">
                    {isSubmitting ? "جاري الحفظ..." : "حفظ المشروع"}
                </Button>
            </div>
        </form>
    )
}
