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

export default function BlogAdmin() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  
  const [formData, setFormData] = useState<Partial<any>>({
    title: "", titleEn: "", excerpt: "", excerptEn: "", content: "", contentEn: "", author: "", authorEn: "", featuredImage: "", isPublished: true
  })

  const fetchPosts = () => {
    setLoading(true)
    fetch('/api/blog')
      .then(res => res.json())
      .then(data => {
        setPosts(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const resetForm = () => {
    setFormData({ title: "", titleEn: "", excerpt: "", excerptEn: "", content: "", contentEn: "", author: "", authorEn: "", featuredImage: "", isPublished: true })
    setEditingId(null)
  }

  const handleEdit = (post: any) => {
    setFormData({
      title: post.title || "", titleEn: post.titleEn || "",
      excerpt: post.excerpt || "", excerptEn: post.excerptEn || "",
      content: post.content || "", contentEn: post.contentEn || "",
      author: post.author || "", authorEn: post.authorEn || "",
      featuredImage: post.featuredImage || "",
      isPublished: post.isPublished !== undefined ? post.isPublished : true
    })
    setEditingId(post._id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من الحذف؟")) return
    try {
      const res = await fetch(`/api/blog/${id}`, { method: 'DELETE' })
      if (res.ok) {
        toast.success("تم الحذف بنجاح")
        fetchPosts()
      }
    } catch {
      toast.error("حدث خطأ أثناء الحذف")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = editingId ? `/api/blog/${editingId}` : '/api/blog'
      const method = editingId ? 'PUT' : 'POST'
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        toast.success(editingId ? "تم التعديل بنجاح" : "تمت الإضافة بنجاح")
        resetForm()
        fetchPosts()
      } else {
        toast.error("حدث خطأ")
      }
    } catch {
      toast.error("حدث خطأ")
    }
  }

  return (
    <div className="space-y-8" dir="rtl">
      <h2 className="text-2xl font-bold tracking-tight text-slate-800">إدارة المدونة والمقالات</h2>

      <Card>
        <CardHeader>
          <CardTitle>{editingId ? "تعديل مقال" : "إضافة مقال جديد"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>عنوان المقال (بالعربية)</Label>
                <Input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>عنوان المقال (بالإنجليزية)</Label>
                <Input value={formData.titleEn || ''} onChange={e => setFormData({...formData, titleEn: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>الكاتب (بالعربية)</Label>
                <Input value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>الكاتب (بالإنجليزية)</Label>
                <Input value={formData.authorEn || ''} onChange={e => setFormData({...formData, authorEn: e.target.value})} />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>مقتطف (Excerpt) - بالعربية</Label>
                <Textarea value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>مقتطف (Excerpt) - بالإنجليزية</Label>
                <Textarea value={formData.excerptEn || ''} onChange={e => setFormData({...formData, excerptEn: e.target.value})} />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>محتوى المقال (بالعربية)</Label>
                <Textarea className="min-h-[200px]" required value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>محتوى المقال (بالإنجليزية)</Label>
                <Textarea className="min-h-[200px]" value={formData.contentEn || ''} onChange={e => setFormData({...formData, contentEn: e.target.value})} />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>صورة المقال</Label>
                <div className="flex items-center gap-4">
                  {formData.featuredImage && <img src={formData.featuredImage} alt="Preview" className="h-16 rounded" />}
                  <CldUploadWidget 
                    signatureEndpoint="/api/cloudinary/sign"
                    onSuccess={(result: any) => setFormData({...formData, featuredImage: result.info.secure_url})}
                  >
                    {({ open }) => (
                      <Button type="button" variant="outline" onClick={() => open()}><ImageIcon className="w-4 h-4 ml-2"/> رفع صورة</Button>
                    )}
                  </CldUploadWidget>
                </div>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse mt-8">
                <input 
                  type="checkbox" 
                  id="isPublished" 
                  checked={formData.isPublished} 
                  onChange={e => setFormData({...formData, isPublished: e.target.checked})}
                  className="w-4 h-4"
                />
                <Label htmlFor="isPublished">نشر المقال (يظهر للزوار)</Label>
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
        ) : posts.length === 0 ? (
          <div>لا توجد مقالات.</div>
        ) : (
          posts.map((post) => (
            <Card key={post._id} className="overflow-hidden">
              {post.featuredImage && <img src={post.featuredImage} alt={post.title} className="w-full h-40 object-cover" />}
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg line-clamp-1">{post.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${post.isPublished ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {post.isPublished ? 'منشور' : 'مسودة'}
                  </span>
                </div>
                <p className="text-slate-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex justify-between items-center mt-4 pt-4 border-t">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(post)}>
                    <Edit className="w-4 h-4 ml-1" /> تعديل
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(post._id)}>
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
