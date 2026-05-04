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
    const project = await Project.findById(params.slug)
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
    const doc = await Project.findById(params.slug)
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
