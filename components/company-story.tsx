import { Card } from "@/components/ui/card"
import { getLocale, getTranslations } from "next-intl/server"

export default async function CompanyStory({ settings }: { settings?: any }) {
  const locale = await getLocale()
  const t = await getTranslations("About")

  const content = locale === 'en' && settings?.about?.contentEn 
    ? settings.about.contentEn 
    : settings?.about?.content || `شركة ركن المعالم للمقاولات ، متخصصون في مجال المقاولات العامة والإنشاءات و أعمال صيانة المباني و التشييد ، حيث نقدم خدمات و أعمال مقاولات عامة متكاملة تشمل إشراف وتنفيذ مشاريع المقاولات العامة في المملكة العربية السعودية ، و قد نفذ مدير الشركة المهندس محمد عقلان (مؤسسة النمطية سابقا) العديد من المشاريع و الأعمال الحكومية والخاصة و تم تسليمها على أكمل وجه و ضمان نيل رضى العملاء و تلبية كافة متطلباتهم`;

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0D2240] mb-8">{t("successStory")}</h2>
            <div className="space-y-6 text-lg text-[#2D3640] leading-relaxed whitespace-pre-line">
              <p>{content}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Card className="p-6 text-center bg-[#C4D600]/10 hover:bg-[#C4D600]/20 transition-colors">
              <div className="text-4xl font-bold text-[#0D2240] mb-2">+{settings?.achievements?.projectsCompleted || 110}</div>
              <div className="text-[#2D3640] font-medium">{t("completedProjects")}</div>
            </Card>
            <Card className="p-6 text-center bg-[#0D2240]/10 hover:bg-[#0D2240]/20 transition-colors">
              <div className="text-4xl font-bold text-[#C4D600] mb-2">+{settings?.achievements?.satisfiedClients || 100}</div>
              <div className="text-[#2D3640] font-medium">{t("satisfiedClients")}</div>
            </Card>
            <Card className="p-6 text-center bg-[#0D2240]/10 hover:bg-[#0D2240]/20 transition-colors">
              <div className="text-4xl font-bold text-[#C4D600] mb-2">{settings?.achievements?.yearsExperience || 15}</div>
              <div className="text-[#2D3640] font-medium">{t("yearsExperience")}</div>
            </Card>
            <Card className="p-6 text-center bg-[#C4D600]/10 hover:bg-[#C4D600]/20 transition-colors">
              <div className="text-4xl font-bold text-[#0D2240] mb-2">+{settings?.achievements?.experts || 45}</div>
              <div className="text-[#2D3640] font-medium">{t("experts")}</div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
