import Header from "@/components/header"
import HeroSlider from "@/components/hero-slider"
import AboutSection from "@/components/about-section"
import ServicesSection from "@/components/services-section"
import ProjectsSection from "@/components/projects-section"
import AchievementsCounter from "@/components/achievements-counter"
import MapSection from "@/components/map-section"
import Footer from "@/components/footer"
import FloatingContact from "@/components/floating-contact"
import SuccessPartners from "@/components/success-partners"
import { getProjects } from "@/actions/project-actions"
import { getServices } from "@/actions/service-actions"
import SiteSettings from "@/models/SiteSettings"
import connectDB from "@/lib/db"

export default async function HomePage() {
  let dbServices = []
  let dbProjects = []
  let settings: any = {}

  try {
    await connectDB()
    dbServices = await getServices()
    dbProjects = await getProjects()
    settings = await SiteSettings.findOne({}).lean() || {}
  } catch (error) {
    console.error("Database connection failed on homepage:", error)
  }
  
  const heroSlides = settings.hero?.length > 0 ? settings.hero : []

  const plainProjects = JSON.parse(JSON.stringify(dbProjects))
  const plainServices = JSON.parse(JSON.stringify(dbServices))
  const plainSettings = JSON.parse(JSON.stringify(settings))

  return (
    <main className="min-h-screen">
      <Header />
      <HeroSlider slides={heroSlides} />
      <AboutSection settings={plainSettings} />
      <ServicesSection services={plainServices} />
      <ProjectsSection projects={plainProjects} />
      <SuccessPartners settings={plainSettings} />
      <MapSection settings={plainSettings} />
      <AchievementsCounter settings={plainSettings} />
      <Footer />
      <FloatingContact />
    </main>
  )
}
