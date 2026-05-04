import { Card } from "@/components/ui/card"

import { getLocale, getTranslations } from "next-intl/server"

interface TeamSectionProps {
  teamMembers?: {
    name: string;
    nameEn?: string;
    position: string;
    positionEn?: string;
    image: string;
    description: string;
    descriptionEn?: string;
  }[]
}

export default async function TeamSection({ teamMembers = [] }: TeamSectionProps) {
  const locale = await getLocale()
  const t = await getTranslations("About")

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0D2240] mb-4">
            {t("team")}
          </h2>
          <p className="text-lg text-[#2D3640] max-w-2xl mx-auto">
            {t("teamSubtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.length > 0 ? teamMembers.map((member, index) => (
            <Card key={index} className="overflow-hidden text-center hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={member.image || ""}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#0D2240] mb-2">{locale === 'en' && member.nameEn ? member.nameEn : member.name}</h3>
                <p className="text-[#C4D600] font-medium mb-3">{locale === 'en' && member.positionEn ? member.positionEn : member.position}</p>
                <p className="text-[#2D3640] text-sm leading-relaxed">{locale === 'en' && member.descriptionEn ? member.descriptionEn : member.description}</p>
              </div>
            </Card>
          )) : (
            <div className="col-span-full text-center text-gray-500 py-8">
              {locale === 'en' ? 'No team members added yet' : 'لا يوجد أعضاء مضافين حالياً'}
            </div>
          )}
        </div>

        <div className="mt-16 text-center">
          <Card className="p-8 bg-[#0D2240] text-white max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">{t("joinTeam")}</h3>
            <p className="text-lg mb-6 opacity-90">{t("joinTeamSubtitle")}</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-[#C4D600] text-[#0D2240] px-4 py-2 rounded-full font-medium">{t("civilEngineers")}</span>
              <span className="bg-[#C4D600] text-[#0D2240] px-4 py-2 rounded-full font-medium">{t("telecomEngineers")}</span>
              <span className="bg-[#C4D600] text-[#0D2240] px-4 py-2 rounded-full font-medium">{t("specializedTechs")}</span>
              <span className="bg-[#C4D600] text-[#0D2240] px-4 py-2 rounded-full font-medium">{t("projectSupervisors")}</span>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
