"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { CldUploadWidget } from "next-cloudinary"
import { Trash2, Plus, Edit, Image as ImageIcon } from "lucide-react"

export default function ServicesAdmin() {
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  
  // Form State
  const [formData, setFormData] = useState<Partial<any>>({
    title: "",
    titleEn: "",
    description: "",
    descriptionEn: "",
    details: "",
    detailsEn: "",
    icon: "Wrench",
    image: "",
    gallery: [] as string[],
    features: [] as string[],
    benefits: [] as string[],
    order: 0
  })

  const fetchServices = () => {
    setLoading(true)
    fetch('/api/services')
      .then(res => res.json())
      .then(data => {
        setServices(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }

  useEffect(() => {
    fetchServices()
  }, [])

  const resetForm = () => {
    setFormData({ title: "", titleEn: "", description: "", descriptionEn: "", details: "", detailsEn: "", icon: "", image: "", gallery: [], features: [], benefits: [] })
    setEditingId(null)
  }

  const handleEdit = (service: any) => {
    setFormData({
      title: service.title || "",
      titleEn: service.titleEn || "",
      description: service.description || "",
      descriptionEn: service.descriptionEn || "",
      details: service.details || "",
      detailsEn: service.detailsEn || "",
      icon: service.icon || "",
      image: service.image || "",
      gallery: service.gallery || [],
      features: service.features || [],
      benefits: service.benefits || []
    })
    setEditingId(service._id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذه الخدمة؟")) return
    try {
      const res = await fetch(`/api/services/${id}`, { method: 'DELETE' })
      if (res.ok) {
        toast.success("تم الحذف بنجاح")
        fetchServices()
      } else {
        const errData = await res.json()
        toast.error(errData.error || "حدث خطأ أثناء الحذف")
        console.error("Delete error:", errData)
      }
    } catch (error: any) {
      toast.error(error.message || "حدث خطأ أثناء الحذف")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = editingId ? `/api/services/${editingId}` : '/api/services'
      const method = editingId ? 'PUT' : 'POST'
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        toast.success(editingId ? "تم التعديل بنجاح" : "تمت الإضافة بنجاح")
        resetForm()
        fetchServices()
      } else {
        toast.error("حدث خطأ")
      }
    } catch {
      toast.error("حدث خطأ")
    }
  }

  return (
    <div className="space-y-8" dir="rtl">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight text-slate-800">إدارة الخدمات</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{editingId ? "تعديل خدمة" : "إضافة خدمة جديدة"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>عنوان الخدمة (بالعربية)</Label>
                    <Input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
                  </div>
                  <div className="space-y-2">
                    <Label>عنوان الخدمة (بالإنجليزية) اختياري</Label>
                    <Input value={formData.titleEn || ''} onChange={e => setFormData({ ...formData, titleEn: e.target.value })} placeholder="مثال: Civil Works" />
                  </div>
                  <div className="space-y-2">
                    <Label>وصف مختصر (بالعربية)</Label>
                    <Textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required />
                  </div>
                  <div className="space-y-2">
                    <Label>وصف مختصر (بالإنجليزية) اختياري</Label>
                    <Textarea value={formData.descriptionEn || ''} onChange={e => setFormData({ ...formData, descriptionEn: e.target.value })} placeholder="Brief description in English" />
                  </div>
                  <div className="space-y-2">
                    <Label>التفاصيل الكاملة (بالعربية)</Label>
                    <Textarea value={formData.details} onChange={e => setFormData({ ...formData, details: e.target.value })} rows={5} required />
                  </div>
                  <div className="space-y-2">
                    <Label>التفاصيل الكاملة (بالإنجليزية) اختياري</Label>
                    <Textarea value={formData.detailsEn || ''} onChange={e => setFormData({ ...formData, detailsEn: e.target.value })} rows={5} placeholder="Full details in English" />
                  </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>مميزات الخدمة (كل ميزة في سطر)</Label>
                <Textarea value={(formData.features || []).join('\n')} onChange={e => setFormData({ ...formData, features: e.target.value.split('\n').filter(Boolean) })} rows={4} placeholder="الميزة الأولى&#10;الميزة الثانية" />
              </div>
              <div className="space-y-2">
                <Label>فوائد الخدمة (كل فائدة في سطر)</Label>
                <Textarea value={(formData.benefits || []).join('\n')} onChange={e => setFormData({ ...formData, benefits: e.target.value.split('\n').filter(Boolean) })} rows={4} placeholder="الفائدة الأولى&#10;الفائدة الثانية" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>الصورة الرئيسية</Label>
                <div className="flex items-center gap-4">
                  {formData.image && <img src={formData.image} alt="Preview" className="h-16 rounded" />}
                  <CldUploadWidget 
                    signatureEndpoint="/api/cloudinary/sign"
                    onSuccess={(result: any) => setFormData((prev: any) => ({...prev, image: result.info.secure_url}))}
                  >
                    {({ open }) => (
                      <Button type="button" variant="outline" onClick={() => open()}><ImageIcon className="w-4 h-4 ml-2"/> رفع صورة</Button>
                    )}
                  </CldUploadWidget>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="bg-slate-800 hover:bg-slate-700">{editingId ? "حفظ التعديلات" : "إضافة الخدمة"}</Button>
              {editingId && <Button type="button" variant="outline" onClick={resetForm}>إلغاء التعديل</Button>}
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div>جاري التحميل...</div>
        ) : services.length === 0 ? (
          <div>لا توجد خدمات مضافة حالياً.</div>
        ) : (
          services.map((service) => (
            <Card key={service._id} className="overflow-hidden">
              {service.image && <img src={service.image} alt={service.title} className="w-full h-40 object-cover" />}
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2">{service.title}</h3>
                <p className="text-slate-600 text-sm mb-4 line-clamp-2">{service.description}</p>
                <div className="flex justify-between items-center mt-4 pt-4 border-t">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(service)}>
                    <Edit className="w-4 h-4 ml-1" /> تعديل
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(service._id)}>
                    <Trash2 className="w-4 h-4 ml-1" /> حذف
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
