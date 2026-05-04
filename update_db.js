const mongoose = require('mongoose');

const uri = 'mongodb+srv://nmudiamond_db_user:S9UZoVtIdVUjwZjt@cluster0.udkcwrg.mongodb.net/dgr_database?retryWrites=true&w=majority&appName=Cluster0';

async function updateDb() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to DB.");
    
    // We update the single site settings document
    const db = mongoose.connection.useDb('dgr_database');
    const SiteSettings = db.collection('sitesettings');
    
    const settings = await SiteSettings.findOne({});
    const updateData = { 
      "seo.title": "شركة ركن المعالم للمقاولات",
      "seo.titleEn": "Rukn Al-Ma'alim Contracting Company",
      "seo.description": "شركة هندسية رائدة في التصميم المعماري والمدني تقدم حلول مبتكرة لمشاريع البناء والتطوير مع التركيز على الجودة والاستدامة.",
      "about.content": `شركة ركن المعالم للمقاولات متخصصة في:
المقاولات العامة، الإنشاءات، صيانة المباني، والتشييد.

وتقدم خدمات متكاملة تشمل:
الإشراف على المشاريع والتنفيذ الكامل للمشاريع.

وقد نفذ مدير الشركة المهندس محمد عقلان العديد من المشاريع الحكومية والخاصة، وتم تسليمها بجودة عالية مع تحقيق رضا العملاء وتلبية جميع متطلباتهم.`,
      "about.vision": "أن نكون شركة متميزة على مستوى المملكة ومن الشركات الرائدة في تلبية احتياجات العملاء.\nوذلك من خلال الخبرة والمعرفة الواسعة، وتقديم خدمات عمرانية بأعلى المعايير العالمية، والإبداع والتميز في التنفيذ.",
      "about.mission": "نسعى إلى تقديم حلول بناء مبتكرة ومتميزة، وبناء بيئة أفضل للمجتمع تمكن الناس من العيش والعمل والنمو.\nمع الالتزام بأعلى معايير الجودة، والسلامة، والابتكار، والخدمة الاحترافية."
    };

    if (settings) {
      console.log("Found settings, updating...");
      await SiteSettings.updateOne({ _id: settings._id }, { $set: updateData });
      console.log("Settings updated successfully.");
    } else {
      console.log("No settings found, creating one...");
      await SiteSettings.insertOne(updateData);
      console.log("Settings created successfully.");
    }

  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected.");
  }
}

updateDb();
