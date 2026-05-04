const mongoose = require('mongoose');

const uri = 'mongodb+srv://mshebl215_db_user:UkBZnzX6BqtO0Lag@cluster0.fq9jqba.mongodb.net/dgr_database?retryWrites=true&w=majority&appName=Cluster0';

async function seedProjects() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to new DB.");
    
    const db = mongoose.connection.useDb('dgr_database');
    const Projects = db.collection('projects');
    
    await Projects.deleteMany({});
    
    const categories = [
      { id: "مجمع سكني", nameEn: "Residential Complex" },
      { id: "جسر", nameEn: "Bridge" },
      { id: "مبنى سكني", nameEn: "Residential Building" },
      { id: "سكن اجتماعي", nameEn: "Social Housing" },
      { id: "مسجد", nameEn: "Mosque" },
      { id: "مكتب إداري", nameEn: "Administrative Office" },
      { id: "مركز ترفيهي", nameEn: "Entertainment Center" },
      { id: "فندق", nameEn: "Hotel" },
      { id: "مشاريع متعددة", nameEn: "Multiple Projects" }
    ];

    const defaultImage = "https://res.cloudinary.com/dtgocm0ga/image/upload/v1730040510/hero1.jpg";

    const projectsToInsert = categories.map((cat, i) => ({
      title: `مشروع ${cat.id} النموذجي`,
      titleEn: `Typical ${cat.nameEn} Project`,
      location: "السعودية، المدينة المنورة",
      locationEn: "Saudi Arabia, Al Madinah",
      category: cat.id,
      categoryEn: cat.nameEn,
      description: `تم تنفيذ أعمال التصميم والإنشاء لمشروع ${cat.id} وفق أعلى معايير الجودة والاستدامة، ليكون معلماً مميزاً في المنطقة.`,
      descriptionEn: `The design and construction of the ${cat.nameEn} project was carried out according to the highest standards of quality and sustainability, to be a distinctive landmark in the region.`,
      area: `${1000 + i * 500} متر مربع`,
      areaEn: `${1000 + i * 500} Sqm`,
      duration: "12 شهر",
      durationEn: "12 Months",
      year: "2024",
      href: `/projects/dummy-${i}`,
      image: defaultImage,
      images: [defaultImage, defaultImage],
      services: ["المقاولات العامة", "التصميم المعماري"],
      features: ["جودة عالية", "تسليم في الموعد", "مطابقة للمواصفات"],
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    await Projects.insertMany(projectsToInsert);
    console.log(`Seeded ${projectsToInsert.length} projects.`);

  } catch(e) {
    console.error(e);
  } finally {
    mongoose.disconnect();
  }
}

seedProjects();
