const mongoose = require('mongoose');

const newUri = 'mongodb+srv://mshebl215_db_user:UkBZnzX6BqtO0Lag@cluster0.fq9jqba.mongodb.net/dgr_database?retryWrites=true&w=majority&appName=Cluster0';

async function check() {
  try {
    await mongoose.connect(newUri);
    const db = mongoose.connection.useDb('dgr_database');
    const SiteSettings = db.collection('sitesettings');
    const Services = db.collection('services');
    
    const countSettings = await SiteSettings.countDocuments();
    const countServices = await Services.countDocuments();
    
    console.log(`New DB has ${countSettings} settings and ${countServices} services.`);
  } catch(e) {
    console.error(e);
  } finally {
    mongoose.disconnect();
  }
}
check();
