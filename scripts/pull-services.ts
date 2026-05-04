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
    title: "الأعمال المدنية والكهروميكانيكية",
    description: "حلول متكاملة لإنشاء المباني ومراكز البيانات وتوفير خدمات المقاولات الشاملة (CIVIL SERVICES & MEP).",
    details: `
      <h2>الأعمال المدنية والكهروميكانيكية (CIVIL SERVICES & MEP)</h2>
      <p>نقدم مجموعة متكاملة من الخدمات المدنية والكهروميكانيكية لضمان تنفيذ المشاريع بأعلى معايير الجودة:</p>
      <ul>
        <li>تشييد المباني (Building construction).</li>
        <li>إنشاء مراكز البيانات (Data center construction).</li>
        <li>إنشاء الهياكل الفولاذية (Steel structure construction).</li>
        <li>تجهيز غرف المعدات (Equipment Room Construction).</li>
        <li>أنظمة تزويد الطاقة و UPS (Power supply & UPS systems).</li>
        <li>تركيب أنظمة التيار المستمر (Dc System Installation).</li>
        <li>إنشاء أبراج الاتصالات (Telecom Tower Construction).</li>
      </ul>
    `,
    icon: "Building2",
    href: "/services/civil-mep",
    image: "/service-civil.jpg",
    features: [
      "جودة عالية واستخدام أفضل المواد وأحدث التقنيات",
      "التزام بالوقت وتسليم المشاريع في المواعيد المحددة"
    ],
    faqs: [
      { question: "ما هي المشاريع التي تنفذونها؟", answer: "ننفذ المباني السكنية، التجارية، المشاريع الحكومية ومراكز البيانات بجميع مراحلها." }
    ],
    order: 1
  },
  {
    title: "أنظمة التيار الخفيف",
    description: "متخصصون في توريد وتركيب أنظمة التيار الخفيف والمراقبة والتحكم (LOW CURRENT SERVICES).",
    details: `
      <h2>أنظمة التيار الخفيف (LOW CURRENT SERVICES)</h2>
      <p>تعتبر أنظمة التيار الخفيف ضرورة لحماية وتنظيم العمليات داخل المنشآت. نوفر أحدث التقنيات لضمان الأمان والتحكم الكامل:</p>
      <ul>
        <li>أنظمة المراقبة بالكاميرات (CCTV Surveillance System).</li>
        <li>المنازل الذكية وأنظمة إدارة المباني (Smart Home & BMS System).</li>
        <li>أنظمة البث التلفزيوني عبر الإنترنت (IPTV System).</li>
        <li>شاشات العرض الجدارية / حلول قاعات المؤتمرات (Video wall Display / Conference Solution).</li>
        <li>سنترالات وحلول الاتصال الهاتفي (PABX and Telephony Solution).</li>
        <li>الأنظمة الصوتية والمرئية (Audio Visual System).</li>
        <li>أنظمة النداء العام والصوتيات (Public Address and sound system).</li>
        <li>أنظمة التحكم بالدخول والحضور والانصراف (Access Control & Time Attendance Systems).</li>
        <li>أنظمة استدعاء الممرضات (Nurse Call System).</li>
        <li>حلول إنذار الحريق (Fire Alarm solutions).</li>
      </ul>
    `,
    icon: "Zap",
    href: "/services/low-current",
    image: "/service-low-current.jpg",
    features: [
      "تأمين المنشآت بأنظمة حماية ذكية ومتقدمة",
      "تكامل الأنظمة للتحكم الموحد"
    ],
    faqs: [
      { question: "هل يمكن ربط أنظمة المراقبة بالهاتف المحمول؟", answer: "بالتأكيد، جميع أنظمتنا تدعم المراقبة والتحكم عن بعد عبر التطبيقات الذكية." }
    ],
    order: 2
  },
  {
    title: "البنية التحتية والاتصالات",
    description: "تطوير وصيانة شبكات الاتصالات المتقدمة وتأمين البنية التحتية (Infrastructure).",
    details: `
      <h2>البنية التحتية والاتصالات (Infrastructure)</h2>
      <p>تعد البنية التحتية للاتصالات العصب الرئيسي لنجاح أي منشأة. نقدم حلولاً ذكية ومتكاملة لتأسيس وتوسعة الشبكات:</p>
      <ul>
        <li>تركيب وتشغيل ودمج معدات لشبكات 2G، 3G، و LTE، واختبار ودعم كافة تقنيات الاتصالات بما في ذلك BSS، ومواقع MSC، والبوابات Gateway، و ATM (Installation, Commissioning, Integration of Multi-vendor Equipment for 2G, 3G, and LTE, Also Testing and Support of all Types of Telecommunication Technologies Including BSS Equipment, MSC Sites, Gateways, ATM).</li>
        <li>المنصات ومعدات الاتصالات الأخرى (Platform and Other Telecommunication Related Equipment).</li>
        <li>تخطيط الشبكات (Network Planning).</li>
        <li>تخطيط الشبكات اللاسلكية والراديوية (Radio Network Planning).</li>
        <li>خدمات تحسين الشبكة بما في ذلك التخطيط واختبارات القيادة (Network Optimization Services including planning & Drive Test).</li>
        <li>خدمات خط البصر (LOS Services).</li>
        <li>تخطيط الإرسال (Transmission Planning).</li>
        <li>توريد معدات الاختبار (Supply of Test Equipment).</li>
        <li>خدمات التغطية الداخلية (IBS Services).</li>
      </ul>
    `,
    icon: "Network",
    href: "/services/infrastructure",
    image: "/service-telecom.jpg",
    features: [
      "شبكات موثوقة بأداء عالٍ واستقرار تام",
      "دعم أحدث المعايير في تكنولوجيا الاتصالات"
    ],
    faqs: [
      { question: "هل توفرون الصيانة للشبكات؟", answer: "نعم، نقدم عقود صيانة دورية لضمان كفاءة الشبكات وعدم انقطاع الخدمة." }
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

        console.log("Seeding new services...")
        await Service.insertMany(services)
        console.log("Services seeded successfully.")

        process.exit(0)
    } catch (error) {
        console.error("Seeding error:", error)
        process.exit(1)
    }
}

seed()
