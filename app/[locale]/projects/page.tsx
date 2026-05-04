import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingContact from "@/components/floating-contact"
import PageBanner from "@/components/page-banner"
import ProjectsGallery from "@/components/projects-gallery"
import ProjectsStats from "@/components/projects-stats"
import { getProjects } from "@/actions/project-actions"
import connectDB from "@/lib/db"
import SiteSettings from "@/models/SiteSettings"

export const metadata = {
  title: "معرض المشاريع - ركن المعالم للمقاولات",
  description:
    "استعرض أفضل مشاريع شركة ركن المعالم للمقاولات في المقاولات، الأعمال المدنية، الاتصالات، وأنظمة التيار الخفيف في السعوديةالمدينة المنورة والمملكة.",
}

export default async function ProjectsPage() {
  await connectDB()

  const [projects, settings] = await Promise.all([
    getProjects(),
    SiteSettings.findOne({}).lean()
  ])

  const bannerImage = settings?.covers?.portfolio || ''
  const bannerTitle = 'معرض المشاريع'
  const bannerSubtitle = 'استعرض مجموعة من أفضل مشاريعنا المنجزة التي تعكس خبرتنا وجودة عملنا'

  const pageTitle =
    "معرض المشاريع - ركن المعالم للمقاولات"
  const pageDescription =
    "استعرض أفضل مشاريع شركة ركن المعالم للمقاولات في المقاولات، الأعمال المدنية، الاتصالات، وأنظمة التيار الخفيف."

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: pageTitle,
    description: pageDescription,
    url: "https://www.rukanalmaalim.com/projects",
    hasPart: projects.map((p: any) => ({
      "@type": "CreativeWork",
      name: p.title,
      description: p.description,
    }))
  }

  const plainProjects = JSON.parse(JSON.stringify(projects))

  return (
    <main className="min-h-screen">
      <Header />
      <PageBanner
        image={bannerImage}
        title={bannerTitle}
        subtitle={bannerSubtitle}
        fallbackImage=""
      />
      <ProjectsStats settings={plainSettings} />
      <ProjectsGallery projects={plainProjects} />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <Footer />
      <FloatingContact />
    </main>
  )
}
