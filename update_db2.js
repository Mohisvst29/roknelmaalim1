const mongoose = require('mongoose');

const uri = 'mongodb+srv://nmudiamond_db_user:S9UZoVtIdVUjwZjt@cluster0.udkcwrg.mongodb.net/dgr_database?retryWrites=true&w=majority&appName=Cluster0';

async function updateDb2() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to DB.");
    
    const db = mongoose.connection.useDb('dgr_database');
    const SiteSettings = db.collection('sitesettings');
    
    const settings = await SiteSettings.findOne({});
    
    const heroSlides = [
      {
        image: "https://res.cloudinary.com/dtgocm0ga/image/upload/v1730040510/hero1.jpg",
        title: "شركة ركن المعالم للمقاولات",
        titleEn: "Rukn Al-Ma'alim Contracting Company",
        subtitle: "شركة هندسية رائدة في التصميم المعماري والمدني تقدم حلول مبتكرة لمشاريع البناء والتطوير مع التركيز على الجودة والاستدامة.",
        subtitleEn: "A leading engineering company in architectural and civil design, providing innovative solutions for construction and development projects with a focus on quality and sustainability."
      },
      {
        image: "https://res.cloudinary.com/dtgocm0ga/image/upload/v1730040510/hero2.jpg",
        title: "جودة واستدامة",
        titleEn: "Quality and Sustainability",
        subtitle: "نلتزم بتقديم أعلى معايير الجودة في جميع مشاريعنا الإنشائية.",
        subtitleEn: "We are committed to delivering the highest quality standards in all our construction projects."
      }
    ];

    const updateData = {
      "seo.title": "شركة ركن المعالم للمقاولات",
      "seo.titleEn": "Rukn Al-Ma'alim Contracting Company",
      "seo.description": "شركة هندسية رائدة في التصميم المعماري والمدني تقدم حلول مبتكرة لمشاريع البناء والتطوير مع التركيز على الجودة والاستدامة.",
      "seo.descriptionEn": "A leading engineering company in architectural and civil design, providing innovative solutions for construction and development projects with a focus on quality and sustainability.",
      "about.content": `شركة ركن المعالم للمقاولات متخصصة في:
المقاولات العامة، الإنشاءات، صيانة المباني، والتشييد.

وتقدم خدمات متكاملة تشمل:
الإشراف على المشاريع والتنفيذ الكامل للمشاريع.

وقد نفذ مدير الشركة المهندس محمد عقلان العديد من المشاريع الحكومية والخاصة، وتم تسليمها بجودة عالية مع تحقيق رضا العملاء وتلبية جميع متطلباتهم.`,
      "about.contentEn": `Rukn Al-Ma'alim Contracting Company specializes in:
General Contracting, Construction, Building Maintenance, and Building.

We provide integrated services including:
Project supervision and full project execution.

The company manager, Engineer Mohammed Aqlan, has executed many government and private projects, delivered with high quality while achieving customer satisfaction and meeting all their requirements.`,
      "about.vision": "أن نكون شركة متميزة على مستوى المملكة ومن الشركات الرائدة في تلبية احتياجات العملاء.\nوذلك من خلال الخبرة والمعرفة الواسعة، وتقديم خدمات عمرانية بأعلى المعايير العالمية، والإبداع والتميز في التنفيذ.",
      "about.visionEn": "To be a distinguished company in the Kingdom and a leading company in meeting customer needs.\nThis is through extensive experience and knowledge, providing urban services at the highest global standards, and creativity and excellence in execution.",
      "about.mission": "نسعى إلى تقديم حلول بناء مبتكرة ومتميزة، وبناء بيئة أفضل للمجتمع تمكن الناس من العيش والعمل والنمو.\nمع الالتزام بأعلى معايير الجودة، والسلامة، والابتكار، والخدمة الاحترافية.",
      "about.missionEn": "We strive to provide innovative and distinct building solutions, build a better environment for the community, and empower people to live, work, and grow.\nWhile adhering to the highest standards of quality, safety, innovation, and professional service.",
      "hero": heroSlides
    };

    if (settings) {
      await SiteSettings.updateOne({ _id: settings._id }, { $set: updateData });
      console.log("Settings fully updated!");
    }

  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected.");
  }
}

updateDb2();
