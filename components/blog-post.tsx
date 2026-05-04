import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "@/navigation"
import { ArrowLeft, Calendar, Clock, User, Share2 } from "lucide-react"

interface BlogPostProps {
  post: {
    title: string
    excerpt?: string
    content?: string
    author: string
    publishedDate: string
    image?: string
    tags: string[]
    internalLinksApplied?: string[]
  }
  relatedPosts?: {
    title: string
    slug: string
    excerpt: string
    image?: string
  }[]
}

export default function BlogPost({ post, relatedPosts = [] }: BlogPostProps) {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-r from-[#0D2240] to-[#1a3a5c]">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-white text-center">
            <div className="bg-[#C4D600] text-[#0D2240] px-4 py-2 rounded-full text-sm font-medium inline-block mb-4">
              مقال
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">{post.title}</h1>
            <p className="text-xl md:text-2xl leading-relaxed text-balance opacity-90 mb-8">{post.excerpt}</p>

            <div className="flex flex-wrap justify-center items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.publishedDate).toLocaleDateString("ar-SA")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>5 دقائق قراءة</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-3">
                {/* Featured Image */}
                <div className="relative mb-8">
                  <img
                    src={
                      post.image ||
                      ""
                    }
                    alt={post.title}
                    className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
                  />
                </div>

                {/* Article Body */}
                <div
                  className="prose prose-lg max-w-none text-[#2D3640] leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: post.content || '' }}
                />

                {/* Tags */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-bold text-[#0D2240] mb-4">الكلمات المفتاحية</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-[#C4D600]/10 text-[#0D2240] px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Share Section */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-[#0D2240]">شارك المقال</h3>
                    <Button size="sm" className="bg-[#C4D600] text-[#0D2240] hover:bg-[#C4D600]/90">
                      <Share2 className="w-4 h-4 ml-2" />
                      مشاركة
                    </Button>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                {/* Author Info */}
                <Card className="p-6 mb-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#C4D600] rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="w-8 h-8 text-[#0D2240]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#0D2240] mb-1">{post.author}</h3>
                    <p className="text-[#2D3640] text-sm mb-4">خبير في مجال البناء والتشطيب مع سنوات من الخبرة العملية</p>
                  </div>
                </Card>

                {/* Related Articles */}
                <Card className="p-6">
                  <h3 className="text-lg font-bold text-[#0D2240] mb-4">مقالات ذات صلة</h3>
                  <div className="space-y-4">
                    {relatedPosts.length > 0 ? (
                      relatedPosts.map((related, index) => (
                        <div key={index} className={index !== relatedPosts.length - 1 ? "border-b border-gray-200 pb-4" : ""}>
                          <Link href={`/blog/${related.slug}`} className="group block">
                            <h4 className="text-sm font-medium text-[#0D2240] mb-2 group-hover:text-[#C4D600] transition-colors">{related.title}</h4>
                            <p className="text-xs text-[#2D3640] line-clamp-2">{related.excerpt}</p>
                          </Link>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">لا توجد مقالات ذات صلة حالياً</p>
                    )}
                  </div>
                </Card>
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-16 pt-8 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <Link href="/blog">
                  <Button
                    variant="outline"
                    className="border-[#0D2240] text-[#0D2240] hover:bg-[#0D2240] hover:text-white bg-transparent"
                  >
                    <ArrowLeft className="w-4 h-4 ml-2" />
                    العودة للمدونة
                  </Button>
                </Link>

                <Link href="/contact">
                  <Button className="bg-[#C4D600] text-[#0D2240] hover:bg-[#C4D600]/90">تواصل معنا</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
