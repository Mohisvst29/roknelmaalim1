"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { 
  LayoutDashboard, 
  Settings, 
  Briefcase, 
  Image as ImageIcon, 
  Users, 
  FileText, 
  LogOut,
  Menu,
  X
} from "lucide-react"
import { Toaster } from "sonner"

const sidebarItems = [
  { name: "الرئيسية", href: "/admin", icon: LayoutDashboard },
  { name: "إعدادات الموقع", href: "/admin/settings", icon: Settings },
  { name: "الخدمات", href: "/admin/services", icon: Briefcase },
  { name: "معرض الأعمال", href: "/admin/portfolio", icon: ImageIcon },
  { name: "فريق العمل", href: "/admin/team", icon: Users },
  { name: "المدونة", href: "/admin/blog", icon: FileText },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleLogout = async () => {
    // Basic logout logic (will integrate properly with next-auth or custom API later)
    document.cookie = "admin-auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    router.push("/admin/login")
  }

  return (
    <div className="flex h-screen bg-gray-100" dir="rtl">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 right-0 z-50 w-64 bg-white border-l shadow-lg transform transition-transform duration-300 md:relative md:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <h1 className="text-xl font-bold text-slate-800">لوحة التحكم</h1>
          <button className="md:hidden" onClick={() => setIsSidebarOpen(false)}>
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>
        <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-4rem)]">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? "bg-slate-800 text-white" 
                    : "text-slate-600 hover:bg-slate-100"
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            )
          })}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-red-600 hover:bg-red-50 w-full text-right mt-8"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">تسجيل الخروج</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="flex items-center justify-between h-16 px-6 bg-white border-b shadow-sm">
          <button className="md:hidden" onClick={() => setIsSidebarOpen(true)}>
            <Menu className="w-6 h-6 text-slate-600" />
          </button>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-slate-600">أهلاً بك، المدير العام</span>
            <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold">
              A
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-slate-50">
          {children}
        </main>
      </div>
      <Toaster richColors position="top-center" />
    </div>
  )
}
