const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const ServiceSchema = new mongoose.Schema({
  title: String,
  description: String,
  icon: String,
  image: String,
  features: [String],
});

const ProjectSchema = new mongoose.Schema({
  title: String,
  location: String,
  category: String,
  description: String,
  area: String,
  year: String,
  image: String,
});

const Service = mongoose.models.Service || mongoose.model("Service", ServiceSchema);
const Project = mongoose.models.Project || mongoose.model("Project", ProjectSchema);

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to DB");

  const existingServices = await Service.countDocuments();
  if (existingServices === 0) {
    await Service.insertMany([
      {
        title: "الأعمال المدنية والإنشائية",
        description: "تنفيذ كافة الأعمال المدنية للمشاريع السكنية والتجارية بأعلى معايير الجودة",
        icon: "Building2",
        image: "https://images.unsplash.com/photo-1541881451221-7058a5e8c2ec?q=80&w=2000",
        features: ["تنفيذ الهياكل الخرسانية", "أعمال التشطيبات", "البنية التحتية"]
      },
      {
        title: "أنظمة الاتصالات",
        description: "تصميم وتنفيذ شبكات الاتصالات المتطورة للمباني والمنشآت",
        icon: "Network",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000",
        features: ["شبكات الفايبر", "أنظمة السنترال", "البنية التحتية للاتصالات"]
      },
      {
        title: "الخدمات الكهروميكانيكية",
        description: "حلول متكاملة في الأعمال الكهربائية والميكانيكية والتكييف",
        icon: "Zap",
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000",
        features: ["أنظمة التكييف المركزي", "التمديدات الكهربائية", "أنظمة مكافحة الحريق"]
      }
    ]);
    console.log("Seeded services");
  }

  const existingProjects = await Project.countDocuments();
  if (existingProjects === 0) {
    await Project.insertMany([
      {
        title: "مجمع الرياض التجاري",
        location: "الرياض، السعودية",
        category: "تجاري",
        description: "تنفيذ الأعمال الإنشائية والكهروميكانيكية لمجمع تجاري متكامل",
        area: "15,000 متر مربع",
        year: "2023",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000"
      },
      {
        title: "برج الاتصالات الذكي",
        location: "عمان، الأردن",
        category: "اتصالات",
        description: "تطوير البنية التحتية لشبكات الاتصالات المتقدمة",
        area: "5,000 متر مربع",
        year: "2022",
        image: "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=2000"
      },
      {
        title: "مستشفى الحياة",
        location: "جدة، السعودية",
        category: "طبي",
        description: "تنفيذ أنظمة التيار الخفيف والمراقبة للمستشفى",
        area: "20,000 متر مربع",
        year: "2024",
        image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2000"
      }
    ]);
    console.log("Seeded projects");
  }

  process.exit(0);
}

seed().catch(console.error);
