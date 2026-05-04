"use client"

import { useState } from "react"
import { createService, updateService } from "@/actions/service-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import * as LucideIcons from "lucide-react"

interface ServiceFormProps {
    service?: any
    isEdit?: boolean
}

// Common icons for construction/architectural services
const COMMON_ICONS = [
    "Building", "Home", "Hammer", "Ruler", "PenTool", "HardHat",
    "Truck", "Wrench", "DraftingCompass", "PaintBucket", "Layers",
    "Maximize", "Minimize", "Grid", "Box", "Layout"
]

export default function ServiceForm({ service, isEdit }: ServiceFormProps) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [selectedIcon, setSelectedIcon] = useState(service?.icon || "HelpCircle")
    const [features, setFeatures] = useState<string[]>(service?.features || [])
    const [benefits, setBenefits] = useState<string[]>(service?.benefits || [])
    const [imageUrl, setImageUrl] = useState(service?.image || "")
    const [gallery, setGallery] = useState<string[]>(service?.gallery || [])
    const [newFeature, setNewFeature] = useState("")
    const [newBenefit, setNewBenefit] = useState("")

    async function handleSubmit(formData: FormData) {
        setIsSubmitting(true)

        // Ensure icon is set
        formData.set("icon", selectedIcon)

        // Add arrays to form data
        if (features.length > 0) {
            features.forEach((feature, index) => {
                formData.append(`features[${index}]`, feature)
            })
        }
        if (benefits.length > 0) {
            benefits.forEach((benefit, index) => {
                formData.append(`benefits[${index}]`, benefit)
            })
        }

        formData.set("image", imageUrl)
        if (gallery.length > 0) {
            gallery.forEach((img, index) => {
                formData.append(`gallery[${index}]`, img)
            })
        }

        // Generate href from title if not provided
        const title = formData.get("title") as string
        const existingHref = formData.get("href") as string
        if (title && !existingHref) {
            const href = `/services/${title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()}-${Date.now()}`
            formData.set("href", href)
        }

        if (isEdit && service) {
            await updateService(service._id, formData)
        } else {
            await createService(formData)
        }

        setIsSubmitting(false)
    }

    const addFeature = () => {
        if (newFeature.trim()) {
            setFeatures([...features, newFeature.trim()])
            setNewFeature("")
        }
    }

    const addBenefit = () => {
        if (newBenefit.trim()) {
            setBenefits([...benefits, newBenefit.trim()])
            setNewBenefit("")
        }
    }

    const removeItem = (index: number, type: 'features' | 'benefits') => {
        if (type === 'features') {
            setFeatures(features.filter((_, i) => i !== index))
        } else if (type === 'benefits') {
            setBenefits(benefits.filter((_, i) => i !== index))
        }
    }

    const IconPreview = (LucideIcons as any)[selectedIcon] || LucideIcons.HelpCircle

    return (
        <form action={handleSubmit} className="space-y-8 max-w-4xl bg-white p-8 rounded-xl border shadow-sm">
            <div className="grid gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-[#0D2240]">المعلومات الأساسية</h3>
                    <div className="grid gap-2">
                        <Label htmlFor="title" className="text-right">عنوان الخدمة</Label>
                        <Input id="title" name="title" defaultValue={service?.title} required className="text-right" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description" className="text-right">وصف مختصر</Label>
                        <Textarea id="description" name="description" defaultValue={service?.description} required className="text-right h-24" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="details" className="text-right">تفاصيل كاملة</Label>
                        <Textarea id="details" name="details" defaultValue={service?.details} required className="text-right min-h-[150px]" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="order" className="text-right">الترتيب</Label>
                            <Input id="order" name="order" type="number" defaultValue={service?.order || 0} className="text-right" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="href" className="text-right">الرابط (يتم إنشاؤه تلقائياً)</Label>
                            <Input id="href" name="href" defaultValue={service?.href} placeholder="/services/service-name" className="text-right" dir="ltr" />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-[#0D2240]">الصور</h3>

                    <div className="grid gap-2">
                        <Label htmlFor="image" className="text-right">صورة الخدمة الرئيسية</Label>
                        <div className="flex gap-2 items-center">
                            <Input
                                id="image"
                                name="image"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                className="text-right"
                                placeholder="/path/to/image.jpg"
                            />
                            <Input
                                type="file"
                                accept="image/*"
                                className="w-24"
                                onChange={async (e) => {
                                    const file = e.target.files?.[0]
                                    if (!file) return
                                    const formData = new FormData()
                                    formData.append("file", file)
                                    try {
                                        const res = await fetch("/api/upload", { method: "POST", body: formData })
                                        if (res.ok) {
                                            const data = await res.json()
                                            setImageUrl(data.url)
                                        }
                                    } catch (err) {
                                        console.error(err)
                                    }
                                }}
                            />
                        </div>
                        {imageUrl && (
                            <div className="mt-2 h-32 w-full max-w-xs relative rounded-lg overflow-hidden border">
                                <img src={imageUrl} alt="preview" className="object-cover w-full h-full" />
                            </div>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <Label className="text-right">معرض الصور</Label>
                        <div className="flex gap-2 items-center">
                            <Input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={async (e) => {
                                    const files = e.target.files
                                    if (!files || files.length === 0) return

                                    for (let i = 0; i < files.length; i++) {
                                        const formData = new FormData()
                                        formData.append("file", files[i])
                                        try {
                                            const res = await fetch("/api/upload", { method: "POST", body: formData })
                                            if (res.ok) {
                                                const data = await res.json()
                                                setGallery(prev => [...prev, data.url])
                                            }
                                        } catch (err) {
                                            console.error(err)
                                        }
                                    }
                                }}
                            />
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                            {gallery.map((img, idx) => (
                                <div key={idx} className="relative group h-24 rounded-lg overflow-hidden border">
                                    <img src={img} alt={`gallery-${idx}`} className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => setGallery(prev => prev.filter((_, i) => i !== idx))}
                                        className="absolute top-1 right-1 bg-red-500/80 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <LucideIcons.Trash2 className="w-4 h-4" />
                                    </button>
                                    <input type="hidden" name={`gallery[${idx}]`} value={img} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-[#0D2240]">الصور</h3>

                    <div className="grid gap-2">
                        <Label htmlFor="image" className="text-right">صورة الخدمة الرئيسية</Label>
                        <div className="flex gap-2 items-center">
                            <Input
                                id="image"
                                name="image"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                className="text-right"
                                placeholder="/path/to/image.jpg"
                            />
                            <Input
                                type="file"
                                accept="image/*"
                                className="w-24"
                                onChange={async (e) => {
                                    const file = e.target.files?.[0]
                                    if (!file) return
                                    const formData = new FormData()
                                    formData.append("file", file)
                                    try {
                                        const res = await fetch("/api/upload", { method: "POST", body: formData })
                                        if (res.ok) {
                                            const data = await res.json()
                                            setImageUrl(data.url)
                                        }
                                    } catch (err) {
                                        console.error(err)
                                    }
                                }}
                            />
                        </div>
                        {imageUrl && (
                            <div className="mt-2 h-32 w-full max-w-xs relative rounded-lg overflow-hidden border">
                                <img src={imageUrl} alt="preview" className="object-cover w-full h-full" />
                            </div>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <Label className="text-right">معرض الصور</Label>
                        <div className="flex gap-2 items-center">
                            <Input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={async (e) => {
                                    const files = e.target.files
                                    if (!files || files.length === 0) return

                                    for (let i = 0; i < files.length; i++) {
                                        const formData = new FormData()
                                        formData.append("file", files[i])
                                        try {
                                            const res = await fetch("/api/upload", { method: "POST", body: formData })
                                            if (res.ok) {
                                                const data = await res.json()
                                                setGallery(prev => [...prev, data.url])
                                            }
                                        } catch (err) {
                                            console.error(err)
                                        }
                                    }
                                }}
                            />
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                            {gallery.map((img, idx) => (
                                <div key={idx} className="relative group h-24 rounded-lg overflow-hidden border">
                                    <img src={img} alt={`gallery-${idx}`} className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => setGallery(prev => prev.filter((_, i) => i !== idx))}
                                        className="absolute top-1 right-1 bg-red-500/80 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <LucideIcons.Trash2 className="w-4 h-4" />
                                    </button>
                                    <input type="hidden" name={`gallery[${idx}]`} value={img} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Icon Selection */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-[#0D2240]">الأيقونة</h3>
                    <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg border">
                        <div className="p-3 bg-white border rounded-lg shadow-sm">
                            <IconPreview className="w-8 h-8 text-[#0D2240]" />
                        </div>
                        <div className="flex-1">
                            <Input
                                value={selectedIcon}
                                onChange={(e) => setSelectedIcon(e.target.value)}
                                placeholder="Icon name (e.g. Building)"
                                className="mb-2"
                            />
                            <p className="text-xs text-muted-foreground">اكتب اسم أيقونة Lucide أو اختر من الأسفل</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-8 gap-2">
                        {COMMON_ICONS.map((iconName) => {
                            const Icon = (LucideIcons as any)[iconName]
                            if (!Icon) return null
                            return (
                                <button
                                    key={iconName}
                                    type="button"
                                    onClick={() => setSelectedIcon(iconName)}
                                    className={`p-2 rounded border hover:bg-gray-100 flex items-center justify-center transition-colors ${selectedIcon === iconName ? 'bg-blue-50 border-blue-500 text-blue-600' : 'bg-white'}`}
                                    title={iconName}
                                >
                                    <Icon className="w-5 h-5" />
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Features */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-[#0D2240]">مميزات الخدمة</h3>
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

                {/* Benefits */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-[#0D2240]">فوائد الخدمة</h3>
                    <div className="flex gap-2">
                        <Input
                            value={newBenefit}
                            onChange={(e) => setNewBenefit(e.target.value)}
                            placeholder="أدخل فائدة"
                            className="text-right"
                        />
                        <Button type="button" onClick={addBenefit} variant="outline" size="sm">
                            إضافة
                        </Button>
                    </div>
                    {benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                            <span className="flex-1">{benefit}</span>
                            <Button type="button" onClick={() => removeItem(index, 'benefits')} variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
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
                    {isSubmitting ? "جاري الحفظ..." : "حفظ الخدمة"}
                </Button>
            </div>
        </form>
    )
}
