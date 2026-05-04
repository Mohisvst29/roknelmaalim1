"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, FileText, Image as ImageIcon, Users } from "lucide-react"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    services: 0,
    portfolio: 0,
    team: 0,
    blog: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real implementation, this would fetch from /api/stats
    setStats({
      services: 5,
      portfolio: 12,
      team: 8,
      blog: 15
    })
    setLoading(false)
  }, [])

  const statCards = [
    { title: "إجمالي الخدمات", value: stats.services, icon: Briefcase, color: "text-blue-600", bg: "bg-blue-100" },
    { title: "مشاريع المعرض", value: stats.portfolio, icon: ImageIcon, color: "text-green-600", bg: "bg-green-100" },
    { title: "فريق العمل", value: stats.team, icon: Users, color: "text-purple-600", bg: "bg-purple-100" },
    { title: "المقالات", value: stats.blog, icon: FileText, color: "text-amber-600", bg: "bg-amber-100" },
  ]

  if (loading) {
    return <div className="flex justify-center items-center h-64">جاري التحميل...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-800">نظرة عامة</h2>
        <p className="text-slate-500">مرحباً بك في لوحة تحكم موقع ركن المعالم للمقاولات</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, i) => {
          const Icon = stat.icon
          return (
            <Card key={i} className="border-none shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-full ${stat.bg}`}>
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-800">{stat.value}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>
      
      <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold text-slate-800 mb-4">تعليمات سريعة</h3>
        <ul className="space-y-3 text-slate-600">
          <li>• استخدم <strong>إعدادات الموقع</strong> لتعديل صور الهيرو، نصوص من نحن، شركاء النجاح، أرقام الإنجازات، وبيانات التواصل.</li>
          <li>• استخدم <strong>الخدمات</strong> لإضافة وتعديل خدمات الشركة بالصور والنصوص التفصيلية.</li>
          <li>• قسم <strong>معرض الأعمال</strong> يتيح لك إضافة مشاريع الشركة مدعمة بالصور ومقاطع الفيديو.</li>
          <li>• قسم <strong>فريق العمل</strong> يسمح لك بإضافة الموظفين ومناصبهم.</li>
        </ul>
      </div>
    </div>
  )
}
