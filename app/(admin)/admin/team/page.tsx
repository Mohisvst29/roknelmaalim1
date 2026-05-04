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

export default function TeamAdmin() {
  const [members, setMembers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    name: "",
    jobTitle: "",
    shortText: "",
    image: ""
  })

  const fetchMembers = () => {
    setLoading(true)
    fetch('/api/team')
      .then(res => res.json())
      .then(data => {
        setMembers(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }

  useEffect(() => {
    fetchMembers()
  }, [])

  const resetForm = () => {
    setFormData({ name: "", jobTitle: "", shortText: "", image: "" })
    setEditingId(null)
  }

  const handleEdit = (member: any) => {
    setFormData({
      name: member.name,
      jobTitle: member.jobTitle,
      shortText: member.shortText,
      image: member.image
    })
    setEditingId(member._id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من الحذف؟")) return
    try {
      const res = await fetch(`/api/team/${id}`, { method: 'DELETE' })
      if (res.ok) {
        toast.success("تم الحذف بنجاح")
        fetchMembers()
      }
    } catch {
      toast.error("حدث خطأ أثناء الحذف")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = editingId ? `/api/team/${editingId}` : '/api/team'
      const method = editingId ? 'PUT' : 'POST'
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        toast.success(editingId ? "تم التعديل بنجاح" : "تمت الإضافة بنجاح")
        resetForm()
        fetchMembers()
      } else {
        toast.error("حدث خطأ")
      }
    } catch {
      toast.error("حدث خطأ")
    }
  }

  return (
    <div className="space-y-8" dir="rtl">
      <h2 className="text-2xl font-bold tracking-tight text-slate-800">فريق العمل</h2>

      <Card>
        <CardHeader>
          <CardTitle>{editingId ? "تعديل عضو" : "إضافة عضو جديد"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>الاسم</Label>
                <Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>المسمى الوظيفي</Label>
                <Input required value={formData.jobTitle} onChange={e => setFormData({...formData, jobTitle: e.target.value})} />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>نبذة قصيرة</Label>
              <Textarea required value={formData.shortText} onChange={e => setFormData({...formData, shortText: e.target.value})} />
            </div>

            <div className="space-y-2">
              <Label>صورة العضو</Label>
              <div className="flex items-center gap-4">
                {formData.image && <img src={formData.image} alt="Preview" className="h-16 rounded" />}
                <CldUploadWidget 
                  signatureEndpoint="/api/cloudinary/sign"
                  onSuccess={(result: any) => setFormData({...formData, image: result.info.secure_url})}
                >
                  {({ open }) => (
                    <Button type="button" variant="outline" onClick={() => open()}><ImageIcon className="w-4 h-4 ml-2"/> رفع صورة</Button>
                  )}
                </CldUploadWidget>
              </div>
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="bg-slate-800">{editingId ? "حفظ" : "إضافة"}</Button>
              {editingId && <Button type="button" variant="outline" onClick={resetForm}>إلغاء</Button>}
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {loading ? (
          <div>جاري التحميل...</div>
        ) : members.length === 0 ? (
          <div>لا يوجد أعضاء.</div>
        ) : (
          members.map((member) => (
            <Card key={member._id} className="overflow-hidden">
              {member.image && <img src={member.image} alt={member.name} className="w-full h-48 object-cover" />}
              <CardContent className="p-4 text-center">
                <h3 className="font-bold text-lg">{member.name}</h3>
                <p className="text-blue-600 text-sm mb-2">{member.jobTitle}</p>
                <p className="text-slate-600 text-sm mb-4 line-clamp-2">{member.shortText}</p>
                <div className="flex justify-center items-center gap-2 mt-4 pt-4 border-t">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(member)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(member._id)}>
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
