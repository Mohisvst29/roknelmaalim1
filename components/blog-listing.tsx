"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "@/navigation"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"

const blogPosts = [
  {
    slug: "construction-tips-2024",
    title: "أهم النصائح للبناء في عام 2024",
    excerpt: "دليل شامل لأحدث تقنيات البناء والمواد المستخدمة في المشاريع الحديثة",
    author: "م. أحمد محمد",
    publishDate: "2024-01-15",
    readTime: "5 دقائق",
    category: "نصائح البناء",
    image: "/blog/construction-tips-2024.jpg",
    tags: ["البناء", "التقنيات الحديثة", "الاستدامة"],
  },
  {
    slug: "interior-design-trends",
    title: "اتجاهات التصميم الداخلي لعام 2024",
    excerpt: "استكشف أحدث صيحات التصميم الداخلي والألوان والمواد المستخدمة في المنازل العصرية",
    author: "م. فاطمة العلي",
    publishDate: "2024-01-10",
    readTime: "4 دقائق",
    category: "التصميم الداخلي",
    image: "/blog/interior-design-trends.jpg",
    tags: ["التصميم الداخلي", "الألوان", "الاتجاهات"],
  },
  {
    slug: "sustainable-construction",
    title: "البناء المستدام: المستقبل الأخضر للمقاولات",
    excerpt: "كيف تساهم تقنيات البناء المستدام في حماية البيئة وتوفير التكاليف على المدى الطويل",
    author: "ركن المعالم للمقاولات",
    publishDate: "2024-01-05",
    readTime: "6 دقائق",
    category: "الاستدامة",
    image: "/blog/sustainable-construction.jpg",
    tags: ["الاستدامة", "البناء الأخضر", "الطاقة المتجددة"],
  },
  {
    slug: "project-management-best-practices",
    title: "أفضل ممارسات إدارة مشاريع البناء",
    excerpt: "دليل شامل لإدارة مشاريع البناء بكفاءة وضمان التسليم في الوقت المحدد وبالجودة المطلوبة",
    author: "أ. محمد السعد",
    publishDate: "2023-12-28",
    readTime: "7 دقائق",
    category: "إدارة المشاريع",
    image: "/blog/project-management.jpg",
    tags: ["إدارة المشاريع", "التخطيط", "الجودة"],
  },
  {
    slug: "renovation-vs-new-construction",
    title: "الترميم مقابل البناء الجديد: أيهما الأفضل؟",
    excerpt: "مقارنة شاملة بين خيارات الترميم والبناء الجديد لمساعدتك في اتخاذ القرار الأمثل لمشروعك",
    author: "م. أحمد محمد",
    publishDate: "2023-12-20",
    readTime: "5 دقائق",
    category: "الترميم",
    image: "/blog/renovation-vs-new.jpg",
    tags: ["الترميم", "البناء الجديد", "التكلفة"],
  },
  {
    slug: "safety-in-construction",
    title: "السلامة في مواقع البناء: أولوية قصوى",
    excerpt: "أهمية تطبيق معايير السلامة الصارمة في مواقع البناء وكيفية حماية العمال والممتلكات",
    author: "أ. محمد السعد",
    publishDate: "2023-12-15",
    readTime: "4 دقائق",
    category: "السلامة",
    image: "/blog/construction-safety.jpg",
    tags: ["السلامة", "الحماية", "التدريب"],
  },
]

const categories = [
  { id: "all", name: "جميع المقالات" },
  { id: "نصائح البناء", name: "نصائح البناء" },
  { id: "التصميم الداخلي", name: "التصميم الداخلي" },
  { id: "الاستدامة", name: "الاستدامة" },
  { id: "إدارة المشاريع", name: "إدارة المشاريع" },
  { id: "الترميم", name: "الترميم" },
  { id: "السلامة", name: "السلامة" },
]

export default function BlogListing() {
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredPosts =
    activeCategory === "all" ? blogPosts : blogPosts.filter((post) => post.category === activeCategory)

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0D2240] mb-4">أحدث المقالات</h2>
          <p className="text-lg text-[#2D3640] max-w-2xl mx-auto">
            تابع أحدث النصائح والاتجاهات في عالم البناء والتشطيب
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 ${
                activeCategory === category.id
                  ? "bg-[#C4D600] text-[#0D2240] hover:bg-[#C4D600]/90"
                  : "border-[#0D2240] text-[#0D2240] hover:bg-[#0D2240] hover:text-white"
              }`}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <Card key={post.slug} className="overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="relative">
                <img
                  src={
                    post.image ||
                    ""
                  }
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 right-4 bg-[#C4D600] text-[#0D2240] px-3 py-1 rounded-full text-sm font-medium">
                  {post.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#0D2240] mb-3 line-clamp-2">{post.title}</h3>
                <p className="text-[#2D3640] mb-4 leading-relaxed line-clamp-3">{post.excerpt}</p>

                <div className="flex items-center gap-4 text-sm text-[#2D3640] mb-4">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(post.publishDate).toLocaleDateString("ar-SA")}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-[#2D3640] px-2 py-1 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>

                <Link href={`/blog/${post.slug}`}>
                  <Button className="w-full bg-[#0D2240] hover:bg-[#0D2240]/90 text-white">
                    اقرأ المقال
                    <ArrowLeft className="w-4 h-4 mr-2" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
