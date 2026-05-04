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
        area: { type: String },
        areaEn: { type: String },
        duration: { type: String },
        durationEn: { type: String },
        year: { type: String },
        href: { type: String },
        image: { type: String },
        images: [{ type: String }],
        mapLink: { type: String },
        services: [{ type: String }],
        features: [{ type: String }],
    },
    { timestamps: true }
)

const Project: Model<IProject> = mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema)

export default Project
