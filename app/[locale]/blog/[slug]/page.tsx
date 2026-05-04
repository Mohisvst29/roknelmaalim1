import { notFound } from "next/navigation"
import Head from "next/head"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingContact from "@/components/floating-contact"
import BlogPost from "@/components/blog-post"

const mockPosts = [
  {
    slug: "importance-of-civil-works",
    title: "أهمية الأعمال المدنية في المشاريع الكبرى",
    excerpt: "تعرف على الدور الحيوي الذي تلعبه الأعمال المدنية في استقرار ومتانة المشاريع الإنشائية.",
    content: "<p>الأعمال المدنية هي الأساس الذي تُبنى عليه جميع المشاريع الإنشائية، حيث تلعب دوراً حاسماً في ضمان استقرار المباني وسلامتها عبر الزمن.</p><p>نحن في ركن المعالم للمقاولات نؤمن بأن جودة الأعمال المدنية تعني جودة المشروع بأكمله، لذلك نستخدم أفضل التقنيات والمواد لتحقيق أعلى المعايير الممكنة.</p>",
    featuredImage: "/service-civil.jpg",
    publishedAt: "2024-01-15T10:00:00Z",
    author: "شركة ركن المعالم للمقاولات",
    tags: ["أعمال مدنية", "إنشاءات", "مقاولات"]
  },
  {
    slug: "future-of-telecom",
    title: "مستقبل شبكات الاتصالات في البنية التحتية",
    excerpt: "كيف تساهم شبكات الألياف الضوئية في تعزيز كفاءة الاتصالات للشركات والمؤسسات.",
    content: "<p>في ظل التحول الرقمي السريع، أصبحت شبكات الاتصالات من أهم عناصر البنية التحتية للمدن الذكية والمؤسسات الحديثة.</p><p>توفر شبكات الألياف الضوئية سرعات نقل بيانات هائلة، مما يعزز من قدرة المؤسسات على أداء أعمالها بكفاءة وموثوقية عالية، وهذا ما نحرص على تقديمه في ركن المعالم للمقاولات.</p>",
    featuredImage: "/service-telecom.jpg",
    publishedAt: "2024-02-20T14:30:00Z",
    author: "شركة ركن المعالم للمقاولات",
    tags: ["اتصالات", "ألياف ضوئية", "بنية تحتية"]
  }
]

export const revalidate = 3600

export async function generateStaticParams() {
  return mockPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = mockPosts.find((p) => p.slug === decodeURIComponent(params.slug))

  if (!post) {
    return { title: "المقال غير موجود" }
  }

  const metaTitle = `${post.title} - مدونة ركن المعالم للمقاولات`
  const metaDescription = post.excerpt

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: post.tags.join(', '),
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: `https://www.rukanalmaalim.com/blog/${post.slug}`,
      images: post.featuredImage
        ? [`https://www.rukanalmaalim.com${post.featuredImage}`]
        : [`https://www.rukanalmaalim.com/aaa.png`],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: post.featuredImage
        ? [`https://www.rukanalmaalim.com${post.featuredImage}`]
        : [`https://www.rukanalmaalim.com/aaa.png`],
    },
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = mockPosts.find((p) => p.slug === decodeURIComponent(params.slug))

  if (!post) notFound()

  const title = post.title
  const description = post.excerpt
  const url = `https://www.rukanalmaalim.com/blog/${post.slug}`
  const image = post.featuredImage
    ? `https://www.rukanalmaalim.com${post.featuredImage}`
    : "https://www.rukanalmaalim.com/aaa.png"
  const publishedDate = post.publishedAt.split("T")[0]

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    image: image,
    author: { "@type": "Person", name: "شركة ركن المعالم للمقاولات" },
    publisher: {
      "@type": "Organization",
      name: "شركة ركن المعالم للمقاولات",
      logo: { "@type": "ImageObject", url: "https://www.rukanalmaalim.com/logo.png" },
    },
    datePublished: publishedDate,
    dateModified: publishedDate,
    description: description,
    url: url,
  }

  const postData = {
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    image: post.featuredImage,
    publishedDate: publishedDate,
    author: post.author,
    tags: post.tags,
    internalLinksApplied: [],
  }

  const relatedPosts = mockPosts
    .filter((p) => p.slug !== decodeURIComponent(params.slug))
    .map(p => ({
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt,
      image: p.featuredImage
    }))

  return (
    <main className="min-h-screen bg-white">
      <Head>
        <title>{title} - مدونة ركن المعالم للمقاولات</title>
        <meta name="description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </Head>

      <Header />

      <div className="text-black 
        [&_.prose_a]:text-blue-700 [&_.prose_a]:hover:text-blue-500 
        [&_.prose_.internal-link]:text-[#0D2240] [&_.prose_.internal-link]:font-bold [&_.prose_.internal-link]:underline [&_.prose_.internal-link]:decoration-[#C4D600] [&_.prose_.internal-link]:decoration-2 [&_.prose_.internal-link]:underline-offset-4
        hover:[&_.prose_.internal-link]:text-[#C4D600] transition-colors">
        <BlogPost post={postData} relatedPosts={relatedPosts} />
      </div>

      <Footer />
      <FloatingContact />
    </main>
  )
}
