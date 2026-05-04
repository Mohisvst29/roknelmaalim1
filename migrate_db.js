const mongoose = require('mongoose');

const oldUri = 'mongodb+srv://nmudiamond_db_user:S9UZoVtIdVUjwZjt@cluster0.udkcwrg.mongodb.net/dgr_database?retryWrites=true&w=majority&appName=Cluster0';
const newUri = 'mongodb+srv://mshebl215_db_user:UkBZnzX6BqtO0Lag@cluster0.fq9jqba.mongodb.net/dgr_database?retryWrites=true&w=majority&appName=Cluster0';

async function migrate() {
  let oldConn, newConn;
  try {
    oldConn = await mongoose.createConnection(oldUri).asPromise();
    newConn = await mongoose.createConnection(newUri).asPromise();
    
    console.log("Connected to both databases.");
    
    const collections = ['sitesettings', 'services', 'users', 'projects'];
    
    for (const collName of collections) {
      const oldColl = oldConn.collection(collName);
      const newColl = newConn.collection(collName);
      
      const docs = await oldColl.find({}).toArray();
      console.log(`Found ${docs.length} documents in ${collName}`);
      
      if (docs.length > 0) {
        await newColl.deleteMany({});
        await newColl.insertMany(docs);
        console.log(`Migrated ${docs.length} documents to ${collName}`);
      }
    }
    console.log("Migration complete.");
  } catch(e) {
    console.error(e);
  } finally {
    if (oldConn) await oldConn.close();
    if (newConn) await newConn.close();
  }
}

migrate();
