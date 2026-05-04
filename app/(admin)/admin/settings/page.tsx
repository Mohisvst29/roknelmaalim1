"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { CldUploadWidget } from "next-cloudinary"
import { Trash2, Plus, Image as ImageIcon } from "lucide-react"

export default function SettingsPage() {
  const [settings, setSettings] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // Account State
  const [account, setAccount] = useState({ username: '', newPassword: '' })

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        setSettings(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  const handleSave = async () => {
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      })
      if (res.ok) {
        toast.success("تم حفظ الإعدادات بنجاح")
      } else {
        toast.error("حدث خطأ أثناء الحفظ")
      }

      // If account changed
      if (account.username || account.newPassword) {
        await fetch('/api/admin/account', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(account)
        })
        toast.success("تم تحديث بيانات الحساب بنجاح")
      }

    } catch (err) {
      toast.error("حدث خطأ أثناء الحفظ")
    }
  }

  // Helper for arrays
  const handleArrayChange = (field: string, index: number, value: string) => {
    const newArr = [...(settings.contact[field] || [])]
    newArr[index] = value
    setSettings({...settings, contact: {...settings.contact, [field]: newArr}})
  }
  const addArrayItem = (field: string) => {
    setSettings({...settings, contact: {...settings.contact, [field]: [...(settings.contact[field] || []), ""]}})
  }
  const removeArrayItem = (field: string, index: number) => {
    const newArr = [...(settings.contact[field] || [])]
    newArr.splice(index, 1)
    setSettings({...settings, contact: {...settings.contact, [field]: newArr}})
  }

  if (loading) return <div>جاري التحميل...</div>
  if (!settings) return <div>لم يتم العثور على الإعدادات</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded shadow-sm sticky top-0 z-10 border-b">
        <h2 className="text-2xl font-bold tracking-tight text-slate-800">إعدادات الموقع الشاملة</h2>
        <Button onClick={handleSave} className="bg-slate-800 hover:bg-slate-700 px-8">حفظ كافة التغييرات</Button>
      </div>

      <Tabs defaultValue="hero" className="w-full" dir="rtl">
        <TabsList className="mb-4 flex flex-wrap h-auto bg-white shadow-sm p-2 gap-2 rounded-lg border">
          <TabsTrigger value="hero">الرئيسية (الهيرو)</TabsTrigger>
          <TabsTrigger value="about">من نحن</TabsTrigger>
          <TabsTrigger value="covers">صور الأغلفة</TabsTrigger>
          <TabsTrigger value="contact">التواصل والخرائط</TabsTrigger>
          <TabsTrigger value="social">السوشيال ميديا</TabsTrigger>
          <TabsTrigger value="partners">شركاء النجاح</TabsTrigger>
          <TabsTrigger value="team">فريق العمل</TabsTrigger>
          <TabsTrigger value="identity">الهوية والألوان</TabsTrigger>
          <TabsTrigger value="achievements">أرقام الإنجازات</TabsTrigger>
          <TabsTrigger value="seo">السيو (SEO)</TabsTrigger>
          <TabsTrigger value="account">حساب الإدارة</TabsTrigger>
        </TabsList>

        {/* Hero Slider */}
        <TabsContent value="hero">
          <Card>
            <CardHeader>
              <CardTitle>شرائح الواجهة الرئيسية (الهيرو)</CardTitle>
              <CardDescription>أضف أكثر من صورة متحركة للواجهة الرئيسية مع نصوصها</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {settings.hero?.map((slide: any, index: number) => (
                <div key={index} className="border p-4 rounded-lg relative bg-slate-50">
                  <Button variant="destructive" size="icon" className="absolute top-2 left-2" onClick={() => {
                    const newHero = [...settings.hero];
                    newHero.splice(index, 1);
                    setSettings({...settings, hero: newHero});
                  }}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>العنوان الرئيسي (بالعربية)</Label>
                        <Input value={slide.title} onChange={e => {
                          const newHero = [...settings.hero];
                          newHero[index].title = e.target.value;
                          setSettings({...settings, hero: newHero});
                        }} />
                      </div>
                      <div className="space-y-2">
                        <Label>العنوان الرئيسي (بالإنجليزية)</Label>
                        <Input value={slide.titleEn || ''} onChange={e => {
                          const newHero = [...settings.hero];
                          newHero[index].titleEn = e.target.value;
                          setSettings({...settings, hero: newHero});
                        }} />
                      </div>
                      <div className="space-y-2">
                        <Label>النص الفرعي (بالعربية)</Label>
                        <Textarea value={slide.subtitle} onChange={e => {
                          const newHero = [...settings.hero];
                          newHero[index].subtitle = e.target.value;
                          setSettings({...settings, hero: newHero});
                        }} />
                      </div>
                      <div className="space-y-2">
                        <Label>النص الفرعي (بالإنجليزية)</Label>
                        <Textarea value={slide.subtitleEn || ''} onChange={e => {
                          const newHero = [...settings.hero];
                          newHero[index].subtitleEn = e.target.value;
                          setSettings({...settings, hero: newHero});
                        }} />
                      </div>
                    </div>
                    <div className="space-y-2 flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-lg p-4">
                      {slide.image ? (
                        <img src={slide.image} alt="Slide" className="max-h-40 rounded" />
                      ) : (
                        <div className="text-slate-400">لا توجد صورة</div>
                      )}
                      <CldUploadWidget 
                      signatureEndpoint="/api/cloudinary/sign"
                        onSuccess={(result: any) => {
                          setSettings((prev: any) => {
                            const newHero = [...(prev.hero || [])];
                            newHero[index] = { ...newHero[index], image: result.info.secure_url };
                            return { ...prev, hero: newHero };
                          });
                        }}
                      >
                        {({ open }) => (
                          <Button type="button" variant="outline" className="mt-2" onClick={() => open()}>
                            تغيير الصورة
                          </Button>
                        )}
                      </CldUploadWidget>
                    </div>
                  </div>
                </div>
              ))}
              <Button type="button" onClick={() => {
                setSettings({...settings, hero: [...(settings.hero || []), { title: '', subtitle: '', image: '' }]})
              }}>
                <Plus className="w-4 h-4 ml-2" />
                إضافة شريحة جديدة
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Covers */}
        <TabsContent value="covers">
          <Card>
            <CardHeader>
              <CardTitle>صور الأغلفة للأقسام</CardTitle>
              <CardDescription>اختر صورة الغلاف العلوية التي تظهر في كل صفحة</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-8">
              {[
                { id: 'about', label: 'غلاف صفحة من نحن' },
                { id: 'services', label: 'غلاف صفحة الخدمات' },
                { id: 'portfolio', label: 'غلاف صفحة معرض الأعمال' },
                { id: 'contact', label: 'غلاف صفحة تواصل معنا' },
                { id: 'blog', label: 'غلاف صفحة المدونة' },
              ].map((cover) => (
                <div key={cover.id} className="space-y-2 border p-4 rounded bg-slate-50">
                  <Label className="font-bold text-md">{cover.label}</Label>
                  <div className="flex items-center gap-4 mt-2">
                    {settings.covers?.[cover.id] && <img src={settings.covers[cover.id]} alt="Cover" className="h-16 w-32 object-cover rounded" />}
                    <CldUploadWidget 
                      signatureEndpoint="/api/cloudinary/sign"
                      onSuccess={(result: any) => setSettings((prev: any) => ({...prev, covers: {...prev.covers, [cover.id]: result.info.secure_url}}))}
                    >
                      {({ open }) => (
                        <Button type="button" variant="outline" onClick={() => open()}>رفع غلاف</Button>
                      )}
                    </CldUploadWidget>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* About Us */}
        <TabsContent value="about">
          <Card>
            <CardHeader><CardTitle>محتوى "من نحن"</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>نص موجز للرئيسية (بالعربية)</Label>
                <Textarea className="min-h-[100px]" value={settings.home?.aboutSummary || ''} onChange={e => setSettings({...settings, home: {...settings.home, aboutSummary: e.target.value}})} />
              </div>
              <div className="space-y-2">
                <Label>نص موجز للرئيسية (بالإنجليزية)</Label>
                <Textarea className="min-h-[100px]" value={settings.home?.aboutSummaryEn || ''} onChange={e => setSettings({...settings, home: {...settings.home, aboutSummaryEn: e.target.value}})} />
              </div>
              <div className="space-y-2">
                <Label>الوصف الكامل لصفحة من نحن (بالعربية)</Label>
                <Textarea className="min-h-[150px]" value={settings.about?.content || ''} onChange={e => setSettings({...settings, about: {...settings.about, content: e.target.value}})} />
              </div>
              <div className="space-y-2">
                <Label>الوصف الكامل لصفحة من نحن (بالإنجليزية)</Label>
                <Textarea className="min-h-[150px]" value={settings.about?.contentEn || ''} onChange={e => setSettings({...settings, about: {...settings.about, contentEn: e.target.value}})} />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>رؤيتنا (بالعربية)</Label>
                  <Textarea value={settings.about?.vision || ''} onChange={e => setSettings({...settings, about: {...settings.about, vision: e.target.value}})} />
                </div>
                <div className="space-y-2">
                  <Label>رؤيتنا (بالإنجليزية)</Label>
                  <Textarea value={settings.about?.visionEn || ''} onChange={e => setSettings({...settings, about: {...settings.about, visionEn: e.target.value}})} />
                </div>
                <div className="space-y-2">
                  <Label>رسالتنا (بالعربية)</Label>
                  <Textarea value={settings.about?.mission || ''} onChange={e => setSettings({...settings, about: {...settings.about, mission: e.target.value}})} />
                </div>
                <div className="space-y-2">
                  <Label>رسالتنا (بالإنجليزية)</Label>
                  <Textarea value={settings.about?.missionEn || ''} onChange={e => setSettings({...settings, about: {...settings.about, missionEn: e.target.value}})} />
                </div>
                <div className="space-y-2">
                  <Label>أهدافنا (بالعربية)</Label>
                  <Textarea value={settings.about?.goals || ''} onChange={e => setSettings({...settings, about: {...settings.about, goals: e.target.value}})} />
                </div>
                <div className="space-y-2">
                  <Label>أهدافنا (بالإنجليزية)</Label>
                  <Textarea value={settings.about?.goalsEn || ''} onChange={e => setSettings({...settings, about: {...settings.about, goalsEn: e.target.value}})} />
                </div>
              </div>
              <div className="space-y-4">
                <Label>صور من نحن (يمكن إضافة أكثر من صورة)</Label>
                <div className="flex flex-wrap gap-4">
                  {settings.about?.images?.map((img: string, i: number) => (
                    <div key={i} className="relative group">
                      <img src={img} className="h-24 w-24 object-cover rounded shadow" />
                      <button onClick={() => {
                        const newImgs = [...settings.about.images];
                        newImgs.splice(i, 1);
                        setSettings({...settings, about: {...settings.about, images: newImgs}})
                      }} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow">
                        <Trash2 className="w-4 h-4"/>
                      </button>
                    </div>
                  ))}
                  <CldUploadWidget 
                    signatureEndpoint="/api/cloudinary/sign"
                    onSuccess={(result: any) => setSettings((prev: any) => ({...prev, about: {...prev.about, images: [...(prev.about?.images || []), result.info.secure_url]}}))}
                  >
                    {({ open }) => (
                      <button type="button" onClick={() => open()} className="h-24 w-24 border-2 border-dashed rounded flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition">
                        <Plus className="w-8 h-8" />
                      </button>
                    )}
                  </CldUploadWidget>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Multiple */}
        <TabsContent value="contact">
          <Card>
            <CardHeader><CardTitle>بيانات التواصل المتعددة</CardTitle></CardHeader>
            <CardContent className="space-y-8">
              {[
                { id: 'phones', label: 'أرقام الهاتف المباشرة', placeholder: 'مثال: +96650000000' },
                { id: 'whatsapps', label: 'أرقام الواتساب', placeholder: 'مثال: +96650000000' },
                { id: 'emails', label: 'البريد الإلكتروني', placeholder: 'مثال: info@example.com' },
                { id: 'addresses', label: 'العناوين', placeholder: 'مثال: الرياض، السعودية' },
                { id: 'mapLinks', label: 'روابط خرائط جوجل', placeholder: 'https://maps.google.com/...' },
              ].map((field) => (
                <div key={field.id} className="space-y-3 bg-slate-50 p-4 rounded border">
                  <Label className="font-bold text-lg">{field.label}</Label>
                  {(settings.contact?.[field.id] || []).map((val: string, index: number) => (
                    <div key={index} className="flex gap-2">
                      <Input value={val} placeholder={field.placeholder} onChange={e => handleArrayChange(field.id, index, e.target.value)} />
                      <Button variant="destructive" size="icon" onClick={() => removeArrayItem(field.id, index)}><Trash2 className="w-4 h-4"/></Button>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={() => addArrayItem(field.id)}>+ إضافة جديد</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social Media */}
        <TabsContent value="social">
          <Card>
            <CardHeader><CardTitle>حسابات التواصل الاجتماعي</CardTitle></CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              {[
                { id: 'facebook', label: 'فيسبوك' },
                { id: 'twitter', label: 'تويتر (X)' },
                { id: 'instagram', label: 'انستغرام' },
                { id: 'linkedin', label: 'لينكد إن' },
                { id: 'snapchat', label: 'سناب شات' }
              ].map((social) => (
                <div key={social.id} className="space-y-2">
                  <Label>{social.label}</Label>
                  <Input dir="ltr" placeholder="https://" value={settings.social?.[social.id] || ''} onChange={e => setSettings({...settings, social: {...settings.social, [social.id]: e.target.value}})} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Success Partners */}
        <TabsContent value="partners">
          <Card>
            <CardHeader><CardTitle>شركاء النجاح</CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                {settings.partners?.map((logo: string, i: number) => (
                  <div key={i} className="relative group border rounded p-2 bg-white flex items-center justify-center w-32 h-32">
                    <img src={logo} className="max-w-full max-h-full object-contain" />
                    <button onClick={() => {
                      const newLogos = [...settings.partners];
                      newLogos.splice(i, 1);
                      setSettings({...settings, partners: newLogos})
                    }} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow">
                      <Trash2 className="w-4 h-4"/>
                    </button>
                  </div>
                ))}
                <CldUploadWidget 
                  signatureEndpoint="/api/cloudinary/sign"
                  onSuccess={(result: any) => setSettings((prev: any) => ({...prev, partners: [...(prev.partners || []), result.info.secure_url]}))}
                >
                  {({ open }) => (
                    <button type="button" onClick={() => open()} className="w-32 h-32 border-2 border-dashed rounded flex flex-col items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition">
                      <Plus className="w-8 h-8 mb-2" />
                      <span>إضافة شعار</span>
                    </button>
                  )}
                </CldUploadWidget>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Achievements */}
        <TabsContent value="achievements">
          <Card>
            <CardHeader><CardTitle>أرقام الإنجازات</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>المشاريع المنجزة</Label>
                <Input type="number" value={settings.achievements?.projectsCompleted || 0} onChange={e => setSettings({...settings, achievements: {...settings.achievements, projectsCompleted: parseInt(e.target.value)}})} />
              </div>
              <div className="space-y-2">
                <Label>العملاء الراضون</Label>
                <Input type="number" value={settings.achievements?.satisfiedClients || 0} onChange={e => setSettings({...settings, achievements: {...settings.achievements, satisfiedClients: parseInt(e.target.value)}})} />
              </div>
              <div className="space-y-2">
                <Label>سنوات الخبرة</Label>
                <Input type="number" value={settings.achievements?.yearsExperience || 0} onChange={e => setSettings({...settings, achievements: {...settings.achievements, yearsExperience: parseInt(e.target.value)}})} />
              </div>
              <div className="space-y-2">
                <Label>الخبراء والمهندسون</Label>
                <Input type="number" value={settings.achievements?.experts || 0} onChange={e => setSettings({...settings, achievements: {...settings.achievements, experts: parseInt(e.target.value)}})} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Team Members */}
        <TabsContent value="team">
          <Card>
            <CardHeader><CardTitle>فريق العمل</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              {settings.team?.map((member: any, index: number) => (
                <div key={index} className="border p-4 rounded-lg relative bg-slate-50">
                  <Button variant="destructive" size="icon" className="absolute top-2 left-2" onClick={() => {
                    const newTeam = [...settings.team];
                    newTeam.splice(index, 1);
                    setSettings({...settings, team: newTeam});
                  }}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>الاسم (بالعربية)</Label>
                        <Input value={member.name} onChange={e => {
                          const newTeam = [...settings.team];
                          newTeam[index].name = e.target.value;
                          setSettings({...settings, team: newTeam});
                        }} />
                      </div>
                      <div className="space-y-2">
                        <Label>الاسم (بالإنجليزية)</Label>
                        <Input value={member.nameEn || ''} onChange={e => {
                          const newTeam = [...settings.team];
                          newTeam[index].nameEn = e.target.value;
                          setSettings({...settings, team: newTeam});
                        }} />
                      </div>
                      <div className="space-y-2">
                        <Label>المسمى الوظيفي (بالعربية)</Label>
                        <Input value={member.position} onChange={e => {
                          const newTeam = [...settings.team];
                          newTeam[index].position = e.target.value;
                          setSettings({...settings, team: newTeam});
                        }} />
                      </div>
                      <div className="space-y-2">
                        <Label>المسمى الوظيفي (بالإنجليزية)</Label>
                        <Input value={member.positionEn || ''} onChange={e => {
                          const newTeam = [...settings.team];
                          newTeam[index].positionEn = e.target.value;
                          setSettings({...settings, team: newTeam});
                        }} />
                      </div>
                      <div className="space-y-2">
                        <Label>الوصف (بالعربية)</Label>
                        <Textarea value={member.description} onChange={e => {
                          const newTeam = [...settings.team];
                          newTeam[index].description = e.target.value;
                          setSettings({...settings, team: newTeam});
                        }} />
                      </div>
                      <div className="space-y-2">
                        <Label>الوصف (بالإنجليزية)</Label>
                        <Textarea value={member.descriptionEn || ''} onChange={e => {
                          const newTeam = [...settings.team];
                          newTeam[index].descriptionEn = e.target.value;
                          setSettings({...settings, team: newTeam});
                        }} />
                      </div>
                    </div>
                    <div className="space-y-2 flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-lg p-4">
                      {member.image ? (
                        <img src={member.image} alt="Member" className="max-h-40 rounded" />
                      ) : (
                        <div className="text-slate-400">لا توجد صورة</div>
                      )}
                      <CldUploadWidget 
                        signatureEndpoint="/api/cloudinary/sign"
                        onSuccess={(result: any) => {
                          setSettings((prev: any) => {
                            const newTeam = [...(prev.team || [])];
                            newTeam[index] = { ...newTeam[index], image: result.info.secure_url };
                            return { ...prev, team: newTeam };
                          });
                        }}
                      >
                        {({ open }) => (
                          <Button type="button" variant="outline" className="mt-2" onClick={() => open()}>
                            تغيير الصورة
                          </Button>
                        )}
                      </CldUploadWidget>
                    </div>
                  </div>
                </div>
              ))}
              <Button type="button" onClick={() => {
                setSettings({...settings, team: [...(settings.team || []), { name: '', position: '', image: '', description: '' }]})
              }}>
                <Plus className="w-4 h-4 ml-2" />
                إضافة عضو جديد
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Identity & Logo */}
        <TabsContent value="identity">
          <Card className="mb-6">
            <CardHeader><CardTitle>الشعار (Logo)</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>الشعار الحالي</Label>
                <div className="bg-slate-100 p-4 rounded inline-block">
                  {settings.logo?.url && (
                    <img src={settings.logo.url} alt="Logo" className="max-w-[200px]" />
                  )}
                </div>
                <br/>
                <CldUploadWidget 
                  signatureEndpoint="/api/cloudinary/sign"
                  onSuccess={(result: any) => {
                    setSettings((prev: any) => ({...prev, logo: {...prev.logo, url: result.info.secure_url}}))
                  }}
                >
                  {({ open }) => (
                    <Button type="button" variant="outline" onClick={() => open()}>
                      رفع شعار جديد
                    </Button>
                  )}
                </CldUploadWidget>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4 max-w-sm">
                <div className="space-y-2">
                  <Label>العرض (px)</Label>
                  <Input type="number" value={settings.logo?.width || 150} onChange={e => setSettings({...settings, logo: {...settings.logo, width: parseInt(e.target.value)}})} />
                </div>
                <div className="space-y-2">
                  <Label>الارتفاع (px)</Label>
                  <Input type="number" value={settings.logo?.height || 50} onChange={e => setSettings({...settings, logo: {...settings.logo, height: parseInt(e.target.value)}})} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>ألوان الموقع</CardTitle></CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>اللون الأساسي (Primary)</Label>
                <div className="flex gap-2">
                  <Input type="color" className="w-16 h-10 p-1" value={settings.colors?.primary || '#0D2240'} onChange={e => setSettings({...settings, colors: {...settings.colors, primary: e.target.value}})} />
                  <Input value={settings.colors?.primary || '#0D2240'} onChange={e => setSettings({...settings, colors: {...settings.colors, primary: e.target.value}})} dir="ltr" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>اللون الثانوي (Secondary)</Label>
                <div className="flex gap-2">
                  <Input type="color" className="w-16 h-10 p-1" value={settings.colors?.secondary || '#1A365D'} onChange={e => setSettings({...settings, colors: {...settings.colors, secondary: e.target.value}})} />
                  <Input value={settings.colors?.secondary || '#1A365D'} onChange={e => setSettings({...settings, colors: {...settings.colors, secondary: e.target.value}})} dir="ltr" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SEO Settings */}
        <TabsContent value="seo">
          <Card>
            <CardHeader><CardTitle>إعدادات محركات البحث</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>عنوان الموقع (Title) - بالعربية</Label>
                <Input 
                  value={settings.seo?.title || ''} 
                  onChange={e => setSettings({...settings, seo: {...settings.seo, title: e.target.value}})} 
                />
              </div>
              <div className="space-y-2">
                <Label>عنوان الموقع (Title) - بالإنجليزية</Label>
                <Input 
                  value={settings.seo?.titleEn || ''} 
                  onChange={e => setSettings({...settings, seo: {...settings.seo, titleEn: e.target.value}})} 
                />
              </div>
              <div className="space-y-2">
                <Label>وصف الموقع (Description) - بالعربية</Label>
                <Textarea 
                  value={settings.seo?.description || ''} 
                  onChange={e => setSettings({...settings, seo: {...settings.seo, description: e.target.value}})} 
                />
              </div>
              <div className="space-y-2">
                <Label>وصف الموقع (Description) - بالإنجليزية</Label>
                <Textarea 
                  value={settings.seo?.descriptionEn || ''} 
                  onChange={e => setSettings({...settings, seo: {...settings.seo, descriptionEn: e.target.value}})} 
                />
              </div>
              <div className="space-y-2">
                <Label>الكلمات المفتاحية (Keywords) - بالعربية</Label>
                <Textarea 
                  value={settings.seo?.keywords || ''} 
                  onChange={e => setSettings({...settings, seo: {...settings.seo, keywords: e.target.value}})} 
                />
              </div>
              <div className="space-y-2">
                <Label>الكلمات المفتاحية (Keywords) - بالإنجليزية</Label>
                <Textarea 
                  value={settings.seo?.keywordsEn || ''} 
                  onChange={e => setSettings({...settings, seo: {...settings.seo, keywordsEn: e.target.value}})} 
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Account Admin */}
        <TabsContent value="account">
          <Card>
            <CardHeader><CardTitle>تغيير بيانات تسجيل الدخول للوحة التحكم</CardTitle></CardHeader>
            <CardContent className="space-y-4 max-w-md">
              <div className="space-y-2">
                <Label>اسم المستخدم الجديد</Label>
                <Input value={account.username} onChange={e => setAccount({...account, username: e.target.value})} placeholder="اتركه فارغاً لعدم التغيير" />
              </div>
              <div className="space-y-2">
                <Label>كلمة المرور الجديدة</Label>
                <Input type="password" value={account.newPassword} onChange={e => setAccount({...account, newPassword: e.target.value})} placeholder="اتركها فارغة لعدم التغيير" />
              </div>
              <p className="text-xs text-red-500">سيتم حفظ هذه البيانات عند ضغطك على زر "حفظ كافة التغييرات" في الأعلى.</p>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  )
}
