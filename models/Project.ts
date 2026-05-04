import mongoose, { Schema, Document, Model } from "mongoose"

export interface IProject extends Document {
    title: string
    titleEn?: string
    location: string
    locationEn?: string
    category: string
    categoryEn?: string
    description: string
    descriptionEn?: string
    area: string
    areaEn?: string
    duration: string
    durationEn?: string
    year: string
    href: string
    image: string
    images: string[]
    mapLink?: string
    services: string[]
    features: string[]
    createdAt: Date
    updatedAt: Date
}

const ProjectSchema = new Schema<IProject>(
    {
        title: { type: String, required: true },
        titleEn: { type: String },
        location: { type: String, required: true },
        locationEn: { type: String },
        category: { type: String, required: true },
        categoryEn: { type: String },
        description: { type: String, required: true },
        descriptionEn: { type: String },
        area: { type: String, required: true },
        areaEn: { type: String },
        duration: { type: String, required: true },
        durationEn: { type: String },
        year: { type: String, required: true },
        href: { type: String, required: true },
        image: { type: String, required: true },
        images: [{ type: String, required: true }],
        mapLink: { type: String },
        services: [{ type: String, required: true }],
        features: [{ type: String, required: true }],
    },
    { timestamps: true }
)

const Project: Model<IProject> = mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema)

export default Project
