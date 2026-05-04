const mongoose = require('mongoose');

const uri = 'mongodb+srv://nmudiamond_db_user:S9UZoVtIdVUjwZjt@cluster0.udkcwrg.mongodb.net/dgr_database?retryWrites=true&w=majority&appName=Cluster0';

const servicesData = [
  {
    title: "المقاولات العامة",
    titleEn: "General Contracting",
    description: "خدمات المقاولات العامة المتكاملة لجميع أنواع المباني.",
    descriptionEn: "Integrated general contracting services for all types of buildings.",
    details: "نقوم بتنفيذ جميع أعمال المقاولات العامة بمختلف أنواعها، بما يشمل البناء والتشطيب وتسليم المفتاح مع ضمان أعلى معايير الجودة.",
    detailsEn: "We execute all types of general contracting works, including building, finishing, and turnkey projects with the highest quality standards.",
    href: "/services/general-contracting",
    icon: "Building2",
    image: "https://res.cloudinary.com/dtgocm0ga/image/upload/v1730040510/hero1.jpg",
    order: 1,
    features: ["جودة التنفيذ", "الالتزام بالوقت", "كفاءة الموارد"],
    benefits: ["ضمان الأعمال", "توفير التكاليف", "راحة البال"]
  },
  {
    title: "تنفيذ المشاريع",
    titleEn: "Project Execution",
    description: "تنفيذ دقيق لكافة المشاريع الحكومية والخاصة.",
    descriptionEn: "Precise execution for all governmental and private projects.",
    details: "نحن ندير عملية التنفيذ بكفاءة عالية وفق أفضل الممارسات الهندسية مع الحرص التام على التسليم في الوقت المحدد.",
    detailsEn: "We manage the execution process with high efficiency according to the best engineering practices, ensuring on-time delivery.",
    href: "/services/project-execution",
    icon: "HardHat",
    image: "https://res.cloudinary.com/dtgocm0ga/image/upload/v1730040510/hero2.jpg",
    order: 2,
    features: ["إدارة احترافية", "تنفيذ دقيق", "متابعة مستمرة"],
    benefits: ["تسليم في الوقت", "مطابقة المواصفات", "سلامة المشروع"]
  },
  {
    title: "التصميم المعماري",
    titleEn: "Architectural Design",
    description: "تصاميم معمارية مبتكرة وعصرية تلبي تطلعاتك.",
    descriptionEn: "Innovative and modern architectural designs that meet your aspirations.",
    details: "نقدم حلول تصميم معماري تجمع بين الجمال والوظيفة العمليّة لنحقق الاستغلال الأمثل للمساحات.",
    detailsEn: "We provide architectural design solutions that combine beauty and practical function to achieve optimal space utilization.",
    href: "/services/architectural-design",
    icon: "PenTool",
    image: "https://res.cloudinary.com/dtgocm0ga/image/upload/v1730040510/hero1.jpg",
    order: 3,
    features: ["تصميم عصري", "استغلال المساحات", "أفكار مبتكرة"],
    benefits: ["جمال الواجهات", "راحة الاستخدام", "تميز المشروع"]
  },
  {
    title: "التصميم المدني",
    titleEn: "Civil Design",
    description: "تصميم المخططات المدنية والإنشائية بأعلى معايير الأمان.",
    descriptionEn: "Designing civil and structural plans with the highest safety standards.",
    details: "نقوم بإعداد كافة التصاميم الإنشائية والمدنية لضمان متانة وصلابة المباني ومقاومتها لكافة العوامل الطبيعية.",
    detailsEn: "We prepare all structural and civil designs to ensure the durability and solidity of buildings against all natural factors.",
    href: "/services/civil-design",
    icon: "Ruler",
    image: "https://res.cloudinary.com/dtgocm0ga/image/upload/v1730040510/hero2.jpg",
    order: 4,
    features: ["أمان وسلامة", "دقة الحسابات", "مطابقة الأكواد"],
    benefits: ["عمر افتراضي أطول", "حماية الممتلكات", "استدامة"]
  },
  {
    title: "الإشراف الهندسي",
    titleEn: "Engineering Supervision",
    description: "متابعة وإشراف دقيق على جميع مراحل التنفيذ.",
    descriptionEn: "Precise monitoring and supervision of all execution phases.",
    details: "فريقنا الهندسي المتخصص يقوم بالإشراف الميداني اليومي لضمان تطبيق التصاميم بدقة ومراقبة جودة المواد المستخدمة.",
    detailsEn: "Our specialized engineering team conducts daily field supervision to ensure designs are applied accurately and material quality is monitored.",
    href: "/services/engineering-supervision",
    icon: "Eye",
    image: "https://res.cloudinary.com/dtgocm0ga/image/upload/v1730040510/hero1.jpg",
    order: 5,
    features: ["مراقبة الجودة", "تقارير دورية", "فريق مختص"],
    benefits: ["ضمان المطابقة", "منع الأخطاء", "التزام بالجدول الزمني"]
  },
  {
    title: "صيانة المباني",
    titleEn: "Building Maintenance",
    description: "صيانة شاملة للحفاظ على جودة المباني وكفاءتها.",
    descriptionEn: "Comprehensive maintenance to preserve building quality and efficiency.",
    details: "نوفر برامج صيانة دورية وقائية وعلاجية لكافة المنشآت والمرافق لضمان استمرارية عملها بكفاءة.",
    detailsEn: "We provide periodic, preventive, and corrective maintenance programs for all facilities to ensure their continuous efficient operation.",
    href: "/services/building-maintenance",
    icon: "Wrench",
    image: "https://res.cloudinary.com/dtgocm0ga/image/upload/v1730040510/hero2.jpg",
    order: 6,
    features: ["صيانة وقائية", "استجابة سريعة", "فريق فني"],
    benefits: ["إطالة عمر المبنى", "بيئة آمنة", "كفاءة مستمرة"]
  },
  {
    title: "التطوير العمراني",
    titleEn: "Urban Development",
    description: "إدارة وتطوير المشاريع العقارية والعمرانية.",
    descriptionEn: "Managing and developing real estate and urban projects.",
    details: "نساهم في تطوير البيئة العمرانية من خلال مشاريع بنية تحتية ومخططات إسكان متطورة ومستدامة.",
    detailsEn: "We contribute to developing the urban environment through advanced and sustainable infrastructure and housing projects.",
    href: "/services/urban-development",
    icon: "Map",
    image: "https://res.cloudinary.com/dtgocm0ga/image/upload/v1730040510/hero1.jpg",
    order: 7,
    features: ["تخطيط مستدام", "دراسة جدوى", "بنية تحتية متطورة"],
    benefits: ["ارتقاء بالبيئة", "مردود استثماري", "جودة حياة"]
  }
];

async function updateServices() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to DB.");
    
    const db = mongoose.connection.useDb('dgr_database');
    const Service = db.collection('services');
    
    // Clear all existing services
    await Service.deleteMany({});
    console.log("Cleared old services.");

    // Insert new services
    await Service.insertMany(servicesData);
    console.log("Inserted new services.");

    // Now update SiteSettings to remove Jordan from contact addresses
    const SiteSettings = db.collection('sitesettings');
    const settings = await SiteSettings.findOne({});
    if (settings) {
      let addresses = settings.contact?.addresses || [];
      // Remove Jordan, update KSA to Madinah
      addresses = ["المملكة العربية السعودية، المدينة المنورة"];
      let addressesEn = ["Saudi Arabia, Al Madinah Al Munawwarah"];
      
      await SiteSettings.updateOne(
        { _id: settings._id },
        { 
          $set: { 
            "contact.addresses": addresses,
            "contact.addressesEn": addressesEn
          } 
        }
      );
      console.log("Updated SiteSettings addresses.");
    }

  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected.");
  }
}

updateServices();
