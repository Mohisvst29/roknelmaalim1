const mongoose = require('mongoose');

const uri = 'mongodb+srv://mshebl215_db_user:UkBZnzX6BqtO0Lag@cluster0.fq9jqba.mongodb.net/dgr_database?retryWrites=true&w=majority&appName=Cluster0';

async function seed() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to new DB.");
    
    const db = mongoose.connection.useDb('dgr_database');
    const SiteSettings = db.collection('sitesettings');
    const Services = db.collection('services');
    const Projects = db.collection('projects');
    const Users = db.collection('users');
    
    // Wipe everything
    await SiteSettings.deleteMany({});
    await Services.deleteMany({});
    await Projects.deleteMany({});
    await Users.deleteMany({});
    console.log("Wiped all collections.");

    // Seed SiteSettings
    await SiteSettings.insertOne({
      seo: {
        title: "شركة ركن المعالم للمقاولات",
        titleEn: "Rukn Al-Ma'alim Contracting Company",
        description: "شركة هندسية رائدة في التصميم المعماري والمدني تقدم حلول مبتكرة لمشاريع البناء والتطوير مع التركيز على الجودة والاستدامة.",
        descriptionEn: "A leading engineering company in architectural and civil design, providing innovative solutions for construction and development projects with a focus on quality and sustainability."
      },
      about: {
        content: "شركة ركن المعالم للمقاولات ، متخصصون في مجال المقاولات العامة والإنشاءات و أعمال صيانة المباني و التشييد ، حيث نقدم خدمات و أعمال مقاولات عامة متكاملة تشمل إشراف وتنفيذ مشاريع المقاولات العامة في المملكة العربية السعودية ، و قد نفذ مدير الشركة المهندس محمد عقلان (مؤسسة النمطية سابقا) العديد من المشاريع و الأعمال الحكومية والخاصة و تم تسليمها على أكمل وجه و ضمان نيل رضى العملاء و تلبية كافة متطلباتهم.",
        contentEn: "Rukn Al-Ma'alim Contracting Company specializes in the field of general contracting, construction, building maintenance, and building. We provide integrated general contracting services and works, including the supervision and execution of general contracting projects in the Kingdom of Saudi Arabia. The company manager, Engineer Mohammed Aqlan (formerly Al-Namtia Establishment), has executed many governmental and private projects, delivered perfectly to ensure customer satisfaction and meet all their requirements.",
        mission: "نسعى إلى تقديم حلول بناء مبتكرة ومتميزة، وبناء بيئة أفضل للمجتمع تمكن الناس من العيش والعمل والنمو.\nمع الالتزام بأعلى معايير الجودة، والسلامة، والابتكار، والخدمة الاحترافية.",
        missionEn: "We strive to provide innovative and distinct building solutions, build a better environment for the community, and empower people to live, work, and grow.\nWhile adhering to the highest standards of quality, safety, innovation, and professional service.",
        vision: "أن نكون شركة متميزة على مستوى المملكة ومن الشركات الرائدة في تلبية احتياجات العملاء.\nوذلك من خلال الخبرة والمعرفة الواسعة، وتقديم خدمات عمرانية بأعلى المعايير العالمية، والإبداع والتميز في التنفيذ.",
        visionEn: "To be a distinguished company in the Kingdom and a leading company in meeting customer needs.\nThis is through extensive experience and knowledge, providing urban services at the highest global standards, and creativity and excellence in execution."
      },
      contact: {
        addresses: ["المملكة العربية السعودية، المدينة المنورة"],
        addressesEn: ["Saudi Arabia, Al Madinah Al Munawwarah"],
        mapLinks: ["https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3693.255618853708!2d39.598656!3d24.458410999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjTCsDI3JzMwLjMiTiAzOcKwMzUnNTUuMiJF!5e1!3m2!1sar!2ssa!4v1777907342295!5m2!1sar!2ssa"]
      },
      home: {
        aboutSummary: "شركة ركن المعالم للمقاولات ، متخصصون في مجال المقاولات العامة والإنشاءات و أعمال صيانة المباني و التشييد ، حيث نقدم خدمات و أعمال مقاولات عامة متكاملة تشمل إشراف وتنفيذ مشاريع المقاولات العامة في المملكة العربية السعودية ، و قد نفذ مدير الشركة المهندس محمد عقلان (مؤسسة النمطية سابقا) العديد من المشاريع و الأعمال الحكومية والخاصة و تم تسليمها على أكمل وجه و ضمان نيل رضى العملاء و تلبية كافة متطلباتهم.",
        aboutSummaryEn: "Rukn Al-Ma'alim Contracting Company specializes in the field of general contracting, construction, building maintenance, and building. We provide integrated general contracting services and works, including the supervision and execution of general contracting projects in the Kingdom of Saudi Arabia. The company manager, Engineer Mohammed Aqlan (formerly Al-Namtia Establishment), has executed many governmental and private projects, delivered perfectly to ensure customer satisfaction and meet all their requirements."
      }
    });
    console.log("Seeded SiteSettings.");

    // Seed Services
    const servicesToInsert = [
      {
        "title": "المقاولات العامة",
        "titleEn": "General Contracting",
        "description": "تقديم خدمات مقاولات عامة متكاملة تشمل الإشراف والتنفيذ للمشاريع الخاصة والحكومية.",
        "descriptionEn": "Providing integrated general contracting services including supervision and execution for private and public projects.",
        "icon": "Building",
        "href": "/services/general-contracting",
        "features": ["التنفيذ الكامل", "إشراف دقيق"],
        "order": 1
      },
      {
        "title": "تنفيذ المشاريع",
        "titleEn": "Project Execution",
        "description": "تنفيذ المشاريع الهندسية والإنشائية وفق أعلى المعايير مع ضمان الالتزام بالمواعيد والمواصفات.",
        "descriptionEn": "Execution of engineering and construction projects to the highest standards, ensuring compliance with deadlines and specifications.",
        "icon": "Hammer",
        "href": "/services/project-execution",
        "features": ["مشاريع حكومية", "مشاريع خاصة"],
        "order": 2
      },
      {
        "title": "التصميم المعماري",
        "titleEn": "Architectural Design",
        "description": "حلول تصميم معماري مبتكرة تدمج بين الجمال والوظيفة لتلبي احتياجات العملاء.",
        "descriptionEn": "Innovative architectural design solutions that blend beauty and function to meet client needs.",
        "icon": "PenTool",
        "href": "/services/architectural-design",
        "features": ["تصميم حديث", "حلول مبتكرة"],
        "order": 3
      },
      {
        "title": "التصميم المدني",
        "titleEn": "Civil Design",
        "description": "إعداد تصاميم هندسية مدنية دقيقة تضمن الأمان والاستدامة في كافة المنشآت.",
        "descriptionEn": "Preparation of precise civil engineering designs ensuring safety and sustainability in all structures.",
        "icon": "Ruler",
        "href": "/services/civil-design",
        "features": ["مخططات دقيقة", "استدامة"],
        "order": 4
      },
      {
        "title": "الإشراف الهندسي",
        "titleEn": "Engineering Supervision",
        "description": "إشراف هندسي متكامل للتأكد من جودة التنفيذ وتطابق الأعمال مع المخططات المعتمدة.",
        "descriptionEn": "Comprehensive engineering supervision to ensure execution quality and compliance with approved plans.",
        "icon": "Eye",
        "href": "/services/engineering-supervision",
        "features": ["رقابة جودة", "التزام بالمخططات"],
        "order": 5
      },
      {
        "title": "صيانة المباني",
        "titleEn": "Building Maintenance",
        "description": "خدمات صيانة دورية وشاملة للمباني لضمان كفاءة تشغيلها وزيادة عمرها الافتراضي.",
        "descriptionEn": "Periodic and comprehensive building maintenance services to ensure operational efficiency and extend lifespan.",
        "icon": "Wrench",
        "href": "/services/building-maintenance",
        "features": ["صيانة دورية", "صيانة شاملة"],
        "order": 6
      },
      {
        "title": "التطوير العمراني",
        "titleEn": "Urban Development",
        "description": "مشاريع تطوير عمراني تهدف لتحسين البيئة المبنية وتلبية متطلبات النمو السكاني والاقتصادي.",
        "descriptionEn": "Urban development projects aimed at improving the built environment and meeting population and economic growth demands.",
        "icon": "Map",
        "href": "/services/urban-development",
        "features": ["تخطيط حضري", "بيئة مستدامة"],
        "order": 7
      }
    ];

    await Services.insertMany(servicesToInsert);
    console.log("Seeded Services.");

  } catch(e) {
    console.error(e);
  } finally {
    mongoose.disconnect();
  }
}

seed();
