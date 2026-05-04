const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI || 'mongodb+srv://mshebl215_db_user:UkBZnzX6BqtO0Lag@cluster0.fq9jqba.mongodb.net/dgr_database?retryWrites=true&w=majority&appName=Cluster0';

async function view() {
  try {
    await mongoose.connect(uri);
    const db = mongoose.connection.useDb('dgr_database');
    const SiteSettings = db.collection('sitesettings');
    const settings = await SiteSettings.findOne({});
    console.log(JSON.stringify(settings, null, 2));
  } catch(e) {
    console.error(e);
  } finally {
    mongoose.disconnect();
  }
}
view();
