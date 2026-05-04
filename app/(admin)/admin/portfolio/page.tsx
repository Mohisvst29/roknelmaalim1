"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { CldUploadWidget } from "next-cloudinary"
import { Trash2, Edit, Image as ImageIcon } from "lucide-react"

export default function PortfolioAdmin() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  
  const [formData, setFormData] = useState<Partial<any>>({
    title: "", titleEn: "", location: "", locationEn: "", category: "", categoryEn: "", description: "", descriptionEn: "", area: "", areaEn: "", duration: "", durationEn: "", year: "", image: "", images: [], mapLink: "", services: [], features: []
  })

  const fetchProjects = () => {
    setLoading(true)
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(data => {
        setProjects(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const resetForm = () => {
    setFormData({
      title: "", titleEn: "", location: "", locationEn: "", category: "", categoryEn: "", description: "", descriptionEn: "", area: "", areaEn: "", duration: "", durationEn: "", year: "", image: "", images: [], mapLink: "", services: [], features: []
    })
    setEditingId(null)
  }

  const handleEdit = (project: any) => {
    setFormData({
      title: project.title, titleEn: project.titleEn,
      location: project.location, locationEn: project.locationEn,
      category: project.category, categoryEn: project.categoryEn,
      description: project.description, descriptionEn: project.descriptionEn,
      area: project.area, areaEn: project.areaEn,
      duration: project.duration, durationEn: project.durationEn,
      year: project.year,
      image: project.image,
      images: project.images || [],
      mapLink: project.mapLink || "",
      services: project.services || [],
      features: project.features || []
    })
    setEditingId(project._id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من الحذف؟")) return
    try {
      const res = await fetch(`/api/portfolio/${id}`, { method: 'DELETE' })
      if (res.ok) {
        toast.success("تم الحذف بنجاح")
        fetchProjects()
      }
    } catch {
      toast.error("حدث خطأ أثناء الحذف")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = editingId ? `/api/portfolio/${editingId}` : '/api/portfolio'
      const method = editingId ? 'PUT' : 'POST'
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        toast.success(editingId ? "تم التعديل بنجاح" : "تمت الإضافة بنجاح")
        resetForm()
        fetchProjects()
      } else {
        toast.error("حدث خطأ")
      }
    } catch {
      toast.error("حدث خطأ")
    }
  }

  return (
    <div className="space-y-8" dir="rtl">
      <h2 className="text-2xl font-bold tracking-tight text-slate-800">معرض الأعمال</h2>

      <Card>
        <CardHeader>
          <CardTitle>{editingId ? "تعديل مشروع" : "إضافة مشروع جديد"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label>اسم المشروع (بالعربية)</Label>
                <Input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>اسم المشروع (بالإنجليزية)</Label>
                <Input value={formData.titleEn || ''} onChange={e => setFormData({...formData, titleEn: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>القسم (بالعربية)</Label>
                <Input required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>القسم (بالإنجليزية)</Label>
                <Input value={formData.categoryEn || ''} onChange={e => setFormData({...formData, categoryEn: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>الموقع (بالعربية)</Label>
                <Input required value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>الموقع (بالإنجليزية)</Label>
                <Input value={formData.locationEn || ''} onChange={e => setFormData({...formData, locationEn: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>المساحة (بالعربية)</Label>
                <Input value={formData.area} onChange={e => setFormData({...formData, area: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>المساحة (بالإنجليزية)</Label>
                <Input value={formData.areaEn || ''} onChange={e => setFormData({...formData, areaEn: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>سنة التنفيذ</Label>
                <Input value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} />
              </div>
              <div className="space-y-2 lg:col-span-3">
                <Label>رابط خريطة المشروع (Google Maps Link)</Label>
                <Input value={formData.mapLink || ''} onChange={e => setFormData({...formData, mapLink: e.target.value})} dir="ltr" placeholder="https://maps.google.com/..." />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>الوصف (بالعربية)</Label>
                <Textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>الوصف (بالإنجليزية)</Label>
                <Textarea value={formData.descriptionEn || ''} onChange={e => setFormData({...formData, descriptionEn: e.target.value})} />
              </div>
            </div>

            <div className="space-y-4">
              <Label>الصور</Label>
              <div className="flex items-center gap-4 border p-4 rounded-md flex-wrap">
                {formData.image && (
                  <div className="relative group">
                    <img src={formData.image} alt="Main" className="h-20 w-20 object-cover rounded ring-2 ring-primary" />
                    <span className="absolute bottom-0 text-[10px] bg-black text-white px-1 w-full text-center">الرئيسية</span>
                    <button type="button" onClick={() => setFormData((prev: any) => ({ ...prev, image: "" }))} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100"><Trash2 className="w-3 h-3" /></button>
                  </div>
                )}
                {formData.images?.map((img: string, i: number) => (
                  <div key={i} className="relative group">
                    <img src={img} alt={`Img ${i}`} className="h-20 w-20 object-cover rounded" />
                    <button type="button" onClick={() => setFormData((prev: any) => ({ ...prev, images: prev.images.filter((_: any, idx: number) => idx !== i) }))} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100"><Trash2 className="w-3 h-3" /></button>
                  </div>
                ))}
                
                <div className="flex flex-col gap-2">
                  <CldUploadWidget 
                    signatureEndpoint="/api/cloudinary/sign"
                    onSuccess={(result: any) => setFormData((prev: any) => ({...prev, image: result.info.secure_url}))}
                  >
                    {({ open }) => (
                      <Button type="button" variant="outline" size="sm" onClick={() => open()}><ImageIcon className="w-4 h-4 ml-2"/>صورة رئيسية</Button>
                    )}
                  </CldUploadWidget>

                  <CldUploadWidget 
                    signatureEndpoint="/api/cloudinary/sign"
                    onSuccess={(result: any) => setFormData((prev: any) => ({...prev, images: [...(prev.images || []), result.info.secure_url]}))}
                  >
                    {({ open }) => (
                      <Button type="button" variant="outline" size="sm" onClick={() => open()}><ImageIcon className="w-4 h-4 ml-2"/>صور إضافية</Button>
                    )}
                  </CldUploadWidget>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="bg-slate-800">{editingId ? "حفظ" : "إضافة"}</Button>
              {editingId && <Button type="button" variant="outline" onClick={resetForm}>إلغاء</Button>}
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div>جاري التحميل...</div>
        ) : projects.length === 0 ? (
          <div>لا يوجد مشاريع.</div>
        ) : (
          projects.map((project) => (
            <Card key={project._id} className="overflow-hidden">
              {project.image && <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />}
              <CardContent className="p-4">
                <h3 className="font-bold text-lg">{project.title}</h3>
                <p className="text-blue-600 text-sm mb-2">{project.category}</p>
                <div className="flex justify-between items-center mt-4 pt-4 border-t">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(project)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(project._id)}>
                    <Trash2 className="w-4 h-4" />
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
