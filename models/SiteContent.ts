import mongoose, { Schema, Document, Model } from "mongoose"

export interface ISiteContent extends Document {
    key: string
    section: string
    value: any
    type: string
    lastUpdated: Date
}

const SiteContentSchema = new Schema<ISiteContent>(
    {
        key: { type: String, required: true, unique: true },
        section: { type: String, required: true },
        value: { type: Schema.Types.Mixed, required: true },
        type: { type: String, default: 'text' },
        lastUpdated: { type: Date, default: Date.now },
    }
)

const SiteContent: Model<ISiteContent> = mongoose.models.SiteContent || mongoose.model<ISiteContent>("SiteContent", SiteContentSchema)

export default SiteContent
