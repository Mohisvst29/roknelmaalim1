const mongoose = require('mongoose');

const uri = 'mongodb+srv://nmudiamond_db_user:S9UZoVtIdVUjwZjt@cluster0.udkcwrg.mongodb.net/dgr_database?retryWrites=true&w=majority&appName=Cluster0';

async function updateAboutSummary() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to DB.");
    
    const db = mongoose.connection.useDb('dgr_database');
    const SiteSettings = db.collection('sitesettings');
    
    const settings = await SiteSettings.findOne({});
    
    const arContent = "شركة ركن المعالم للمقاولات ، متخصصون في مجال المقاولات العامة والإنشاءات و أعمال صيانة المباني و التشييد ، حيث نقدم خدمات و أعمال مقاولات عامة متكاملة تشمل إشراف وتنفيذ مشاريع المقاولات العامة في المملكة العربية السعودية ، و قد نفذ مدير الشركة المهندس محمد عقلان (مؤسسة النمطية سابقا) العديد من المشاريع و الأعمال الحكومية والخاصة و تم تسليمها على أكمل وجه و ضمان نيل رضى العملاء و تلبية كافة متطلباتهم.";
    const enContent = "Rukn Al-Ma'alim Contracting Company specializes in the field of general contracting, construction, building maintenance, and building. We provide integrated general contracting services and works, including the supervision and execution of general contracting projects in the Kingdom of Saudi Arabia. The company manager, Engineer Mohammed Aqlan (formerly Al-Namtia Establishment), has executed many governmental and private projects, delivered perfectly to ensure customer satisfaction and meet all their requirements.";

    if (settings) {
      await SiteSettings.updateOne(
        { _id: settings._id },
        { 
          $set: { 
            "home.aboutSummary": arContent,
            "home.aboutSummaryEn": enContent
          } 
        }
      );
      console.log("Settings fully updated!");
    }

  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected.");
  }
}

updateAboutSummary();
