
import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISEOConfig extends Document {
    configKey: string;
    globalAutoSEO: boolean;
    globalAutoInternalLinks: boolean;
    maxInternalLinksPerPost: number;
    defaultMetaKeywordsCount: number;
    siteName: string;
    defaultOGImage: string;
    twitterHandle: string;
}

const SEOConfigSchema = new Schema<ISEOConfig>(
    {
        configKey: { type: String, required: true, unique: true, default: "global" },
        globalAutoSEO: { type: Boolean, default: true },
        globalAutoInternalLinks: { type: Boolean, default: true },
        maxInternalLinksPerPost: { type: Number, default: 5 },
        defaultMetaKeywordsCount: { type: Number, default: 10 },
        siteName: { type: String, default: "" },
        defaultOGImage: { type: String, default: "" },
        twitterHandle: { type: String, default: "" },
    },
    { timestamps: true }
);

const SEOConfig: Model<ISEOConfig> =
    mongoose.models.SEOConfig || mongoose.model<ISEOConfig>("SEOConfig", SEOConfigSchema);

export default SEOConfig;
