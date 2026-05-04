import mongoose from "mongoose"
import * as dotenv from "dotenv"
import path from "path"

const envPath = path.resolve(process.cwd(), ".env.local");
dotenv.config({ path: envPath });

import Service from "../models/Service"

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
    console.error("Please define the MONGODB_URI environment variable inside .env.local")
    process.exit(1)
}

const services = [
  {
    title: "الأعمال المدنية والكهروميكانيكية | Civil Services & MEP",
    description: "حلول متكاملة لإنشاء المباني ومراكز البيانات وتوفير خدمات المقاولات الشاملة | Integrated solutions for building construction, data centers, and comprehensive contracting services.",
    details: `
<div class="space-y-8">
  <div dir="rtl" class="text-right">
    <h3 class="text-xl font-bold mb-4 text-[#0D2240]">نظرة عامة على الخدمات المدنية والكهروميكانيكية:</h3>
    <ul class="list-disc list-inside space-y-2 text-gray-700">
      <li>تشييد المباني.</li>
      <li>إنشاء مراكز البيانات.</li>
      <li>إنشاء الهياكل الفولاذية.</li>
      <li>تجهيز غرف المعدات.</li>
      <li>أنظمة تزويد الطاقة و أنظمة UPS.</li>
      <li>تركيب أنظمة التيار المستمر (DC).</li>
      <li>إنشاء أبراج الاتصالات.</li>
    </ul>
  </div>
  
  <hr class="border-gray-200" />
  
  <div dir="ltr" class="text-left font-sans">
    <h3 class="text-xl font-bold mb-4 text-[#0D2240]">Services Overview CIVIL SERVICES & MEP:</h3>
    <ul class="list-disc list-inside space-y-2 text-gray-700">
      <li>Building construction.</li>
      <li>Data center construction.</li>
      <li>Steel structure construction.</li>
      <li>Equipment Room Construction.</li>
      <li>Power supply & UPS systems.</li>
      <li>Dc System Installation.</li>
      <li>Telecom Tower Construction.</li>
    </ul>
  </div>
</div>
    `,
    icon: "Building2",
    href: "/services/civil-mep",
    image: "",
    features: [
      "جودة عالية واستخدام أفضل المواد | High quality materials",
      "التزام بالوقت والمواعيد | Strict time commitment"
    ],
    faqs: [
      { question: "ما هي المشاريع التي تنفذونها؟", answer: "ننفذ المباني السكنية، التجارية ومراكز البيانات." }
    ],
    order: 1
  },
  {
    title: "أنظمة التيار الخفيف | Low Current Services",
    description: "تطوير وتركيب أنظمة المراقبة، التحكم، وإدارة المباني الذكية | Supplying and installing smart monitoring, control, and building management systems.",
    details: `
<div class="space-y-8">
  <div dir="rtl" class="text-right">
    <h3 class="text-xl font-bold mb-4 text-[#0D2240]">نظرة عامة على أنظمة التيار الخفيف:</h3>
    <ul class="list-disc list-inside space-y-2 text-gray-700">
      <li>أنظمة المراقبة بالكاميرات (CCTV).</li>
      <li>المنازل الذكية وأنظمة إدارة المباني (BMS).</li>
      <li>أنظمة البث التلفزيوني عبر الإنترنت (IPTV).</li>
      <li>شاشات العرض الجدارية وحلول قاعات المؤتمرات.</li>
      <li>سنترالات وحلول الاتصال الهاتفي (PABX).</li>
      <li>الأنظمة الصوتية والمرئية.</li>
      <li>أنظمة النداء العام والصوتيات.</li>
      <li>أنظمة التحكم بالدخول والحضور والانصراف.</li>
      <li>أنظمة استدعاء الممرضات.</li>
      <li>حلول إنذار الحريق.</li>
    </ul>
  </div>

  <hr class="border-gray-200" />

  <div dir="ltr" class="text-left font-sans">
    <h3 class="text-xl font-bold mb-4 text-[#0D2240]">Services Overview LOW CURRENT SERVICES:</h3>
    <ul class="list-disc list-inside space-y-2 text-gray-700">
      <li>CCTV Surveillance System.</li>
      <li>Smart Home & BMS System.</li>
      <li>IPTV System.</li>
      <li>Video wall Display / Conference Solution.</li>
      <li>PABX and Telephony Solution.</li>
      <li>Audio Visual System.</li>
      <li>Public Address and sound system.</li>
      <li>Access Control & Time Attendance Systems.</li>
      <li>Nurse Call System.</li>
      <li>Fire Alarm solutions.</li>
    </ul>
  </div>
</div>
    `,
    icon: "Zap",
    href: "/services/low-current",
    image: "",
    features: [
      "تأمين المنشآت بأنظمة ذكية | Smart building security",
      "تحكم موحد | Unified control systems"
    ],
    faqs: [
      { question: "هل الأنظمة تدعم الجوال؟", answer: "نعم، جميع الأنظمة تدعم المراقبة والتحكم عن بعد." }
    ],
    order: 2
  },
  {
    title: "البنية التحتية والاتصالات | Infrastructure Services",
    description: "تطوير وصيانة شبكات الاتصالات المتقدمة وتأمين البنية التحتية | Developing and maintaining advanced telecom networks and infrastructure.",
    details: `
<div class="space-y-8">
  <div dir="rtl" class="text-right">
    <h3 class="text-xl font-bold mb-4 text-[#0D2240]">نظرة عامة على خدمات البنية التحتية:</h3>
    <ul class="list-disc list-inside space-y-2 text-gray-700">
      <li>تركيب وتشغيل ودمج معدات شبكات 2G، 3G، و LTE، واختبار ودعم كافة تقنيات الاتصالات بما في ذلك معدات BSS، مواقع MSC، البوابات، و ATM.</li>
      <li>المنصات ومعدات الاتصالات الأخرى.</li>
      <li>تخطيط الشبكات.</li>
      <li>تخطيط الشبكات اللاسلكية والراديوية.</li>
      <li>خدمات تحسين الشبكة بما في ذلك التخطيط واختبارات القيادة.</li>
      <li>خدمات خط البصر (LOS).</li>
      <li>تخطيط الإرسال (Transmission Planning).</li>
      <li>توريد معدات الاختبار.</li>
      <li>خدمات التغطية الداخلية (IBS Services).</li>
    </ul>
  </div>

  <hr class="border-gray-200" />

  <div dir="ltr" class="text-left font-sans">
    <h3 class="text-xl font-bold mb-4 text-[#0D2240]">Services Overview Infrastructure:</h3>
    <ul class="list-disc list-inside space-y-2 text-gray-700">
      <li>Installation, Commissioning, Integration of Multi-vendor Equipment for 2G, 3G, and LTE, Also Testing and Support of all Types of Telecommunication Technologies Including BSS Equipment, MSC Sites, Gateways, ATM.</li>
      <li>Platform and Other Telecommunication Related Equipment.</li>
      <li>Network Planning.</li>
      <li>Radio Network Planning.</li>
      <li>Network Optimization Services including planning & Drive Test.</li>
      <li>LOS Services.</li>
      <li>Transmission Planning.</li>
      <li>Supply of Test Equipment.</li>
      <li>IBS Services.</li>
    </ul>
  </div>
</div>
    `,
    icon: "Network",
    href: "/services/infrastructure",
    image: "",
    features: [
      "أداء عالٍ للشبكات | High performance networks",
      "أحدث المعايير التقنية | Latest tech standards"
    ],
    faqs: [
      { question: "هل توفرون الصيانة للشبكات؟", answer: "نعم، نقدم عقود صيانة دورية | Yes, we provide periodic maintenance contracts." }
    ],
    order: 3
  }
]

async function seed() {
    try {
        await mongoose.connect(MONGODB_URI!)
        console.log("Connected to MongoDB")

        console.log("Clearing old services...")
        await Service.deleteMany({})

        console.log("Seeding bilingual services...")
        await Service.insertMany(services)
        console.log("Bilingual Services seeded successfully.")

        process.exit(0)
    } catch (error) {
        console.error("Seeding error:", error)
        process.exit(1)
    }
}

seed()
