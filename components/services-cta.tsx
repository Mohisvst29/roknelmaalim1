import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Link } from "@/navigation"
import { Phone, MessageCircle } from "lucide-react"

export default function ServicesCTA() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <Card className="p-12 bg-gradient-to-r from-[#0D2240] to-[#1a3a5c] text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">هل تحتاج إلى استشارة مجانية بالسعوديةالمدينة المنورة؟</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            تواصل معنا الآن للحصول على استشارة مجانية وعرض سعر مخصص لمشروعك في السعوديةالمدينة المنورة
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-[#C4D600] text-[#0D2240] hover:bg-[#C4D600]/90 px-8">
                <MessageCircle className="w-5 h-5 ml-2" />
                احصل على عرض سعر
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#0D2240] px-8 bg-transparent"
            >
              <Phone className="w-5 h-5 ml-2" />
              اتصل بنا الآن
            </Button>
          </div>
        </Card>
      </div>
    </section>
  )
}
