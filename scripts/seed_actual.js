const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const SiteSettings = require("../models/SiteSettings").default || require("../models/SiteSettings");

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    const settingsData = {
      hero: [
        {
          title: "بناء المستقبل اليوم",
          subtitle: "نحن في النمو الماسي نقدم حلولاً مبتكرة ومتكاملة في مجال المقاولات والإنشاءات لنبني مستقبلاً يليق بطموحاتكم.",
          image: "https://images.unsplash.com/photo-1541881451221-7058a5e8c2ec?q=80&w=2000&auto=format&fit=crop"
        },
        {
          title: "جودة لا تضاهى",
          subtitle: "أعلى معايير الجودة في كل مشروع ننفذه.",
          image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000&auto=format&fit=crop"
        }
      ],
      home: {
        aboutSummary: "النمو الماسي هي شركة رائدة في مجال المقاولات، نجمع بين الخبرة العريقة وأحدث التقنيات لتقديم مشاريع تلبي وتتجاوز توقعات عملائنا.",
      },
      about: {
        content: "في النمو الماسي، نحن لا نبني مجرد مباني، بل نبني مستقبلاً مشرقاً وعلاقات طويلة الأمد مع عملائنا. منذ تأسيسنا، التزمنا بتقديم أعلى مستويات الجودة والاحترافية في جميع مشاريعنا، سواء كانت سكنية أو تجارية أو صناعية.",
        vision: "أن نكون الشركة الرائدة والأكثر ثقة في قطاع المقاولات على مستوى المنطقة، ونساهم في تحقيق التنمية المستدامة برؤية 2030.",
        mission: "تقديم خدمات هندسية وإنشائية متميزة تلبي تطلعات عملائنا من خلال فريق عمل محترف واستخدام أحدث التقنيات وأفضل ممارسات إدارة المشاريع.",
        goals: "الالتزام الدقيق بالجداول الزمنية والميزانيات، وتطبيق أعلى معايير السلامة والجودة العالمية.",
        images: [
          "https://images.unsplash.com/photo-1541881451221-7058a5e8c2ec?w=800&q=80"
        ]
      },
      seo: {
        title: "النمو الماسي | للمقاولات",
        description: "شركة مقاولات رائدة متخصصة في البناء والتشييد بأعلى معايير الجودة",
        keywords: "مقاولات, بناء, تشييد, تصميم هندسي, النمو الماسي"
      },
      contact: {
        phones: ["+966505123456"],
        whatsapps: ["+966536788004", "+966541430116"],
        emails: ["info@diamond-growth.com"],
        addresses: ["طريق الملك فهد، الرياض، المملكة العربية السعودية"],
        mapLinks: ["https://maps.google.com/?q=Riyadh"]
      },
      social: {
        facebook: "https://facebook.com/diamondgrowth",
        twitter: "https://twitter.com/diamondgrowth",
        instagram: "https://instagram.com/diamondgrowth",
        linkedin: "https://linkedin.com/company/diamondgrowth",
        snapchat: ""
      },
      partners: [],
      achievements: {
        projectsCompleted: 150,
        satisfiedClients: 120,
        yearsExperience: 15,
        experts: 45
      },
      covers: {
        about: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000",
        services: "https://images.unsplash.com/photo-1541881451221-7058a5e8c2ec?q=80&w=2000",
        portfolio: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000",
        contact: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000",
        blog: "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=2000"
      },
      colors: {
        primary: "#0D2240",
        secondary: "#1A365D"
      }
    };

    const updated = await SiteSettings.findOneAndUpdate({}, settingsData, { upsert: true, new: true });
    console.log("Settings successfully seeded:", updated._id);

    process.exit(0);
  } catch (error) {
    console.error("Error seeding:", error);
    process.exit(1);
  }
}

seed();
