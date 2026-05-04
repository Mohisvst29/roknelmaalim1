import { notFound } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingContact from "@/components/floating-contact"
import ProjectDetail from "@/components/project-detail"
import connectDB from "@/lib/db"
import Project from "@/models/Project"

export async function generateMetadata({ params }: { params: { slug: string } }) {
  await connectDB()
  try {
    const decodedSlug = decodeURIComponent(params.slug)
    let project = null;
    
    if (decodedSlug.match(/^[0-9a-fA-F]{24}$/)) {
      project = await Project.findById(decodedSlug)
    }
    
    if (!project) {
      project = await Project.findOne({
        $or: [
          { href: decodedSlug },
          { href: `/${decodedSlug}` },
          { href: `/projects/${decodedSlug}` },
          { title: decodedSlug }
        ]
      })
    }
    
    if (!project) {
      return {
        title: "المشروع غير موجود",
      }
    }
    return {
      title: `${project.title} - ركن المعالم للمقاولات`,
      description: project.description,
    }
  } catch (error) {
    return {
      title: "المشروع غير موجود",
    }
  }
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  await connectDB()
  let project = null
  
  try {
    const decodedSlug = decodeURIComponent(params.slug)
    let doc = null;
    
    // Check if it's a valid ObjectId
    if (decodedSlug.match(/^[0-9a-fA-F]{24}$/)) {
      doc = await Project.findById(decodedSlug)
    }
    
    // If not found or not an ObjectId, try matching href or title
    if (!doc) {
      doc = await Project.findOne({
        $or: [
          { href: decodedSlug },
          { href: `/${decodedSlug}` },
          { href: `/projects/${decodedSlug}` },
          { title: decodedSlug }
        ]
      })
    }
    
    if (doc) {
      project = JSON.parse(JSON.stringify(doc))
    }
  } catch (error) {
    console.error("Error fetching project:", error)
  }

  if (!project) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Header />
      <ProjectDetail project={project} />
      <Footer />
      <FloatingContact />
    </main>
  )
}
