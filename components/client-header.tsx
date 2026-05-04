"use client"

import { useState } from "react"
import { Link } from "@/navigation"
import { usePathname, useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown, Globe } from "lucide-react"

export default function ClientHeader({ logoUrl = "/logo.png", logoHeight = "48", services = [] }: { logoUrl?: string, logoHeight?: string, services?: any[] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  
  const pathname = usePathname()
  const router = useRouter()
  const t = useTranslations("Navigation")
  const locale = pathname.startsWith('/en') ? 'en' : 'ar'

  const toggleLanguage = () => {
    const newLocale = locale === 'ar' ? 'en' : 'ar'
    // Replace the first segment of the path with the new locale
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(newPath || `/${newLocale}`)
  }

  const dynamicSubItems = services.length > 0 ? services.map(s => ({
    name: locale === 'en' && s.titleEn ? s.titleEn : s.title,
    href: s.href
  })) : [
    { name: locale === 'en' ? "Civil and MEP Works" : "الأعمال المدنية والكهروميكانيكية", href: "/services/civil-mep" },
    { name: locale === 'en' ? "Low Current Systems" : "أنظمة التيار الخفيف", href: "/services/low-current" },
    { name: locale === 'en' ? "Infrastructure & Telecom" : "البنية التحتية والاتصالات", href: "/services/infrastructure" },
  ];

  const navigation = [
    { name: t("home"), href: "/" },
    { name: t("about"), href: "/about" },
    {
      name: t("services"),
      href: "/services",
      hasDropdown: true,
      subItems: dynamicSubItems,
    },
    { name: t("portfolio"), href: "/projects" },
    { name: t("blog"), href: "/blog" },
  ]

  return (
    <header className="fixed top-0 left-0 w-full z-[9999]">
      <div className="bg-white/90 backdrop-blur-md shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              {logoUrl !== '/logo.png' ? (
                <img
                  src={logoUrl}
                  alt="ركن المعالم للمقاولات"
                  style={{ height: `${logoHeight}px`, width: 'auto' }}
                />
              ) : (
                <div className="flex items-center">
                  <div className="bg-[#C4D600] text-[#0D2240] font-black text-2xl p-2 rounded mr-2 ml-2">RM</div>
                  <div className="flex flex-col">
                    <span className="font-black text-xl leading-none text-[#0D2240]">ركن المعالم</span>
                    <span className="text-xs font-bold text-[#2D3640] tracking-wider">للمقاولات</span>
                  </div>
                </div>
              )}
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-x-8">
              {navigation.map((item) => (
                <div key={item.name} className="relative group">
                  {item.hasDropdown ? (
                    <>
                      <Link
                        href={item.href}
                        className="flex items-center text-[#0D2240] hover:text-[#C4D600] font-medium transition-colors"
                      >
                        {item.name}
                        <ChevronDown className="w-4 h-4 mr-1" />
                      </Link>

                      <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                        <div className="py-2">
                          {item.subItems?.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href || "#"}
                              className="block px-4 py-2 text-[#0D2240] hover:text-[#C4D600] hover:bg-gray-50 transition-colors"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link href={item.href} className="text-[#0D2240] hover:text-[#C4D600] font-medium transition-colors">
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Actions */}
            <div className="hidden md:flex items-center gap-x-4 pr-8">
              <button 
                onClick={toggleLanguage}
                className="flex items-center text-[#0D2240] hover:text-[#C4D600] font-bold px-2 py-1 border-2 border-transparent hover:border-[#C4D600] rounded transition-all"
              >
                <Globe className="w-5 h-5 mx-1" />
                {locale === 'ar' ? 'EN' : 'عربي'}
              </button>

              <Link href="/contact">
                <Button className="bg-[#C4D600] hover:bg-[#b3c200] text-[#0D2240] font-medium px-8">
                  {t("contact")}
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-4 lg:hidden">
              <button 
                onClick={toggleLanguage}
                className="flex items-center text-[#0D2240] hover:text-[#C4D600] font-bold"
              >
                {locale === 'ar' ? 'EN' : 'AR'}
              </button>
              <button className="p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="w-6 h-6 text-[#0D2240]" /> : <Menu className="w-6 h-6 text-[#0D2240]" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t bg-white max-h-[calc(100vh-80px)] overflow-y-auto">
              <nav className="flex flex-col space-y-4 px-4">
                {navigation.map((item) => (
                  <div key={item.name}>
                    {item.hasDropdown ? (
                      <>
                        <button
                          onClick={() => setIsServicesOpen(!isServicesOpen)}
                          className="flex items-center justify-between w-full text-[#0D2240] hover:text-[#C4D600] font-medium transition-colors text-right"
                        >
                          {item.name}
                          <ChevronDown className={`w-4 h-4 transition-transform ${isServicesOpen ? "rotate-180" : ""}`} />
                        </button>
                        {isServicesOpen && (
                          <div className="mt-2 mr-4 space-y-2">
                            {item.subItems?.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href || "#"}
                                className="block text-[#2D3640] hover:text-[#C4D600] transition-colors text-sm"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-[#0D2240] hover:text-[#C4D600] font-medium transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}

                <div className="pt-4 border-t">
                  <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-[#C4D600] hover:bg-[#b3c200] text-[#0D2240] font-medium">
                      {t("contact")}
                    </Button>
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
