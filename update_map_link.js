const mongoose = require('mongoose');

const uri = 'mongodb+srv://nmudiamond_db_user:S9UZoVtIdVUjwZjt@cluster0.udkcwrg.mongodb.net/dgr_database?retryWrites=true&w=majority&appName=Cluster0';

async function updateMapLink() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to DB.");
    
    const db = mongoose.connection.useDb('dgr_database');
    const SiteSettings = db.collection('sitesettings');
    
    const settings = await SiteSettings.findOne({});
    
    const newMapLink = "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3693.255618853708!2d39.598656!3d24.458410999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjTCsDI3JzMwLjMiTiAzOcKwMzUnNTUuMiJF!5e1!3m2!1sar!2ssa!4v1777907342295!5m2!1sar!2ssa";

    if (settings) {
      await SiteSettings.updateOne(
        { _id: settings._id },
        { 
          $set: { 
            "contact.mapLinks": [newMapLink]
          } 
        }
      );
      console.log("Map link successfully updated!");
    }

  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected.");
  }
}

updateMapLink();
