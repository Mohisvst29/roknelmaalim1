import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI || ""

interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

const globalWithMongoose = global as typeof global & {
  mongoose: MongooseCache
}

let cached: MongooseCache = globalWithMongoose.mongoose

if (!cached) {
  cached = globalWithMongoose.mongoose = { conn: null, promise: null }
}

async function connectDB() {
  if (!MONGODB_URI) {
    console.warn("Please define the MONGODB_URI environment variable inside .env.local")
    return null
  }
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

export default connectDB
