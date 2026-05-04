const mongoose = require('mongoose');

const uri = 'mongodb+srv://nmudiamond_db_user:S9UZoVtIdVUjwZjt@cluster0.udkcwrg.mongodb.net/?appName=Cluster0';

async function run() {
  try {
    await mongoose.connect(uri);
    console.log("Successfully connected to MongoDB.");
  } catch (error) {
    console.error("Connection failed:", error.message);
  } finally {
    await mongoose.disconnect();
  }
}

run();
