import { notFound } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingContact from "@/components/floating-contact"
import ServiceDetail from "@/components/service-detail"
import { getServices } from "@/actions/service-actions"
import connectDB from "@/lib/db"

export const dynamic = "force-dynamic"

export async function generateMetadata({ params }: { params: { slug: string } }) {
  await connectDB()
  const services = await getServices() || []
  const decodedSlug = decodeURIComponent(params.slug)
  const service = services.find((s: any) => {
    if (!s.href) return false;
    const sSlug = s.href.split('/').pop() || "";
    return sSlug === params.slug || decodeURIComponent(sSlug) === decodedSlug || s.href === `/services/${decodedSlug}`;
  })

  if (!service) {
    return {
      title: "الخدمة غير موجودة",
    }
  }

  return {
    title: `${service.title} - ركن المعالم للمقاولات`,
    description: service.description,
  }
}

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  await connectDB()
  const services = await getServices() || []
  const decodedSlug = decodeURIComponent(params.slug)
  const dbService = services.find((s: any) => {
    if (!s.href) return false;
    const sSlug = s.href.split('/').pop() || "";
    return sSlug === params.slug || decodeURIComponent(sSlug) === decodedSlug || s.href === `/services/${decodedSlug}`;
  })

  if (!dbService) {
    notFound()
  }

  const plainService = JSON.parse(JSON.stringify(dbService))
  // Map details to content for backward compatibility with ServiceDetail UI
  if (plainService.details && !plainService.content) {
      plainService.content = plainService.details
  }

  return (
    <main className="min-h-screen">
      <Header />
      <ServiceDetail service={plainService} />
      <Footer />
      <FloatingContact />
    </main>
  )
}
