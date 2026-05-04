

import mongoose from "mongoose"
import * as dotenv from "dotenv"
import path from "path"
import fs from "fs"

const envPath = path.resolve(process.cwd(), ".env.local");
console.log("Loading .env from:", envPath);
console.log("File exists:", fs.existsSync(envPath));

const result = dotenv.config({ path: envPath });

if (result.error) {
    console.error("Error loading .env file:", result.error);
}

console.log("Parsed env:", result.parsed);
console.log("MONGODB_URI from process.env:", process.env.MONGODB_URI);

import Project from "../models/Project"
import Service from "../models/Service"

const MONGODB_URI = "mongodb+srv://eslamabdaltif_db_user:oneone2@cluster0.zsrlmnu.mongodb.net/?appName=Cluster0"

if (!MONGODB_URI) {
    console.error("Please define the MONGODB_URI environment variable inside .env.local")
    process.exit(1)
}

const projects = [
    {
        image: "/modern-villa-construction-project.png",
        title: "فيلا سكنية فاخرة",
        location: "المدينة المنورة",
        category: "إنشائي",
        description: "فيلا حديثة بتصميم عصري وتشطيبات فاخرة",
        area: "500 م²",
        year: "2023",
    },
    {
        image: "/commercial-building-interior-design.png",
        title: "مجمع تجاري",
        location: "المدينة المنورة",
        category: "ديكور",
        description: "مجمع تجاري مصمم بعناية وديكوره فاخر",
        area: "1000 م²",
        year: "2022",
    },
    {
        image: "/road-construction.png",
        title: "مشروع طريق رئيسي",
        location: "المدينة المنورة",
        category: "طرق",
        description: "طريق رئيسي معمق ومتخصص",
        area: "2000 م²",
        year: "2021",
    },
    {
        image: "/office-renovation.png",
        title: "ترميم مبنى إداري",
        location: "المدينة المنورة",
        category: "ترميم",
        description: "مبنى إداري مترميم جيداً وحديثاً",
        area: "800 م²",
        year: "2020",
    },
    {
        image: "/residential-compound-construction.png",
        title: "مجمع سكني",
        location: "المدينة المنورة",
        category: "إنشائي",
        description: "مجمع سكني معمق ومتخصص",
        area: "1500 م²",
        year: "2019",
    },
    {
        image: "/luxury-hotel-interior-finishing.png",
        title: "فندق فاخر",
        location: "المدينة المنورة",
        category: "تشطيب",
        description: "فندق فاخر مترميم جيداً وحديثاً",
        area: "3000 م²",
        year: "2018",
    },
]

const services = [
    {
        icon: "Palette",
        title: "أعمال الديكور بالمدينة المنورة",
        description: "تصاميم داخلية وخارجية عصرية وأنيقة",
        details: "نقدم حلول تصميم متكاملة تشمل التصميم الداخلي والخارجي بأحدث الطرق والمواد عالية الجودة.",
        href: "/services/decoration",
        order: 1
    },
    {
        icon: "Building",
        title: "الأعمال الإنشائية بالمدينة المنورة",
        description: "بناء وتشييد المباني السكنية والتجارية",
        details: "خبرة واسعة في تنفيذ المشاريع الإنشائية من الأساسات حتى التشطيب النهائي.",
        href: "/services/construction",
        order: 2
    },
    {
        icon: "Wrench",
        title: "أعمال البنية التحتية بالمدينة المنورة",
        description: "أعمال البنية التحتية والمرافق العامة",
        details: "تنفيذ مشاريع البنية التحتية بما يشمل شبكات المياه والصرف الصحي والكهرباء.",
        href: "/services/infrastructure",
        order: 3
    },
    {
        icon: "Zap",
        title: "أعمال الكهروميكانيك بالمدينة المنورة",
        description: "تركيب وصيانة الأنظمة الكهربائية والميكانيكية",
        details: "فريق متخصص في تركيب وصيانة جميع الأنظمة الكهربائية والميكانيكية بأعلى معايير السلامة.",
        href: "/services/electromechanical",
        order: 4
    },
    {
        icon: "Hammer",
        title: "أعمال الحدادة بالمدينة المنورة",
        description: "تصنيع وتركيب الهياكل المعدنية",
        details: "تصنيع وتركيب الهياكل المعدنية والأبواب والنوافذ بدقة عالية وجودة ممتازة.",
        href: "/services/metalwork",
        order: 5
    },
    {
        icon: "Road", // Bold as Road in the component
        title: "أعمال الطرق بالمدينة المنورة",
        description: "إنشاء وصيانة الطرق والممرات",
        details: "خبرة في تنفيذ مشاريع الطرق والرصف بأحدث التقنيات والمعدات المتطورة.",
        href: "/services/roads",
        order: 6
    },
    {
        icon: "RefreshCw",
        title: "أعمال الترميم والتشطيب بالمدينة المنورة",
        description: "تجديد وترميم المباني القديمة",
        details: "إعادة تأهيل وترميم المباني القديمة بأساليب حديثة مع الحفاظ على الطابع المعماري الأصلي.",
        href: "/services/renovation",
        order: 7
    },
    {
        icon: "Building", // Duplicate icon in original
        title: "الخدمات العقارية بالمدينة المنورة",
        description: "حلول عقارية شاملة للأفراد والشركات",
        details: "نقدم خدمات عقارية متكاملة تشمل التسويق العقاري، إدارة الأملاك، الاستشارات، وتقييم العقارات بأعلى معايير الجودة.",
        href: "/services/real-estate",
        order: 8
    },
]


import SiteContent from "../models/SiteContent"

const siteContentData = [
    {
        key: "hero_slides",
        section: "home",
        type: "slides",
        value: [
            {
                id: 1,
                image: "/modern-construction-site.png",
                title: "مشاريع إنشائية متميزة بالمدينة المنورة",
                subtitle: "نحن نبني المستقبل بأيدي خبيرة وتقنيات حديثة",
            },
            {
                id: 2,
                image: "/تشطيبات شقق ( Apartment finishes ).png",
                title: "تشطيبات فاخرة بالمدينة المنورة",
                subtitle: "تصاميم داخلية وخارجية تلبي أعلى معايير الجودة والأناقة",
            },
            {
                id: 3,
                image: "/1 (15).jpg",
                title: "أعمال الطرق والبنية التحتية بالمدينة المنورة",
                subtitle: "حلول شاملة للبنية التحتية والطرق بأحدث المعايير",
            },
            {
                id: 4,
                image: "/images.png",
                title: "الأعمال الكهروميكانيكية بالمدينة المنورة",
                subtitle: "أنظمة كهربائية وميكانيكية متطورة وآمنة",
            },
            {
                id: 5,
                image: "/1 (3).png",
                title: "الترميم والتجديد بالمدينة المنورة",
                subtitle: "إعادة إحياء المباني بلمسة عصرية واحترافية",
            },
        ]
    },
    // Page Banners
    {
        key: "banner_projects",
        section: "projects",
        type: "banner",
        value: {
            image: "/bb.png",
            title: "معرض المشاريع بالمدينة المنورة",
            subtitle: "استعرض مجموعة من أفضل مشاريعنا المنجزة في المدينة المنورة التي تعكس خبرتنا وجودة عملنا"
        }
    },
    {
        key: "banner_services",
        section: "services",
        type: "banner",
        value: {
            image: "/aaa.png",
            title: "خدماتنا بالمدينة المنورة",
            subtitle: "نقدم مجموعة شاملة من الخدمات في مجال المقاولات والتشطيبات لتلبية جميع احتياجاتكم"
        }
    },
    {
        key: "banner_about",
        section: "about",
        type: "banner",
        value: {
            image: "/1 (11).png",
            title: "من نحن",
            subtitle: "شركه رائده في مجال المقاولات العامه والتشطيبات بالمدينه المنوره، نجمع بين الخبره العريقه والتقنيات الحديثه لتحقيق احلام عملائنا في البناء والتطوير"
        }
    },
    {
        key: "banner_contact",
        section: "contact",
        type: "banner",
        value: {
            image: "/mm.png",
            title: "تواصل معنا بالمدينة المنورة",
            subtitle: "نحن هنا بالمدينة المنورة لمساعدتك في تحقيق مشروع أحلامك. تواصل معنا الآن للحصول على استشارة مجانية"
        }
    },
    {
        key: "banner_blog",
        section: "blog",
        type: "banner",
        value: {
            image: "/aaa.png",
            title: "المدونة",
            subtitle: "اكتشف أحدث النصائح والاتجاهات في عالم البناء والتشطيب من خبراء المجال"
        }
    }
]

async function seed() {
    try {
        const conn = await mongoose.connect(MONGODB_URI!)
        console.log("Connected to MongoDB")

        // Seed Projects
        const projectCount = await Project.countDocuments()
        if (projectCount === 0) {
            console.log("Seeding Projects...")
            await Project.insertMany(projects)
            console.log("Projects seeded successfully.")
        } else {
            console.log(`Skipping Projects seed, ${projectCount} items found.`)
        }

        // Seed Services
        const serviceCount = await Service.countDocuments()
        if (serviceCount === 0) {
            console.log("Seeding Services...")
            await Service.insertMany(services)
            console.log("Services seeded successfully.")
        } else {
            console.log(`Skipping Services seed, ${serviceCount} items found.`)
        }

        // Seed Site Content
        for (const item of siteContentData) {
            const existing = await SiteContent.findOne({ key: item.key })
            if (!existing) {
                console.log(`Seeding SiteContent: ${item.key}`)
                await SiteContent.create(item)
            } else {
                console.log(`Skipping SiteContent: ${item.key}, already exists.`)
            }
        }

        console.log("Done.")
        process.exit(0)
    } catch (error) {
        console.error("Seeding error:", error)
        process.exit(1)
    }
}

seed()
