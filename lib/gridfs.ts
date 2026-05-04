import mongoose from "mongoose"
import connectDB from "./db"

let gridFSBucket: mongoose.mongo.GridFSBucket

export async function getGridFSBucket() {
    const conn = await connectDB()

    if (!gridFSBucket) {
        const db = conn.connection.db
        if (!db) {
            throw new Error("Database connection not ready")
        }
        gridFSBucket = new mongoose.mongo.GridFSBucket(db, {
            bucketName: "images",
        })
    }

    return gridFSBucket
}
