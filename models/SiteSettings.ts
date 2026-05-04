import mongoose, { Schema, Document, Model } from "mongoose"

export interface ISiteSettings extends Document {
  // Global SEO
  seo: {
    title: string;
    titleEn?: string;
    description: string;
    descriptionEn?: string;
    keywords: string;
    keywordsEn?: string;
  };
  // Logo
  logo: {
    url: string;
    width: number;
    height: number;
  };
  // Colors
  colors: {
    primary: string;
    secondary: string;
    text: string;
    heading: string;
  };
  // Hero Images & Text
  hero: {
    image: string;
    title: string;
    titleEn?: string;
    subtitle: string;
    subtitleEn?: string;
  }[];
  // About Us Page Data
  about: {
    images: string[];
    content: string;
    contentEn?: string;
    vision: string;
    visionEn?: string;
    mission: string;
    missionEn?: string;
    goals: string;
    goalsEn?: string;
  };
  // Home Page Summaries
  home: {
    aboutSummary: string;
    aboutSummaryEn?: string;
  };
  // Covers for various pages
  covers: {
    about: string;
    services: string;
    portfolio: string;
    contact: string;
    blog: string;
  };
  // Contact info
  contact: {
    phones: string[];
    whatsapps: string[];
    emails: string[];
    addresses: string[];
    addressesEn?: string[];
    mapLinks: string[];
  };
  // Social Media
  social: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
    snapchat: string;
  };
  // Success Partners
  partners: string[];
  // Team Members
  team: {
    name: string;
    nameEn?: string;
    position: string;
    positionEn?: string;
    image: string;
    description: string;
    descriptionEn?: string;
  }[];
  // Achievements
  achievements: {
    projectsCompleted: number;
    satisfiedClients: number;
    yearsExperience: number;
    experts: number;
  };
}

const SiteSettingsSchema = new Schema<ISiteSettings>({
  seo: {
    title: { type: String, default: 'النمو الماسي' },
    titleEn: { type: String, default: 'النمو الماسي' },
    description: { type: String, default: '' },
    descriptionEn: { type: String, default: '' },
    keywords: { type: String, default: '' },
    keywordsEn: { type: String, default: '' },
  },
  logo: {
    url: { type: String, default: '/logo.png' },
    width: { type: Number, default: 150 },
    height: { type: Number, default: 50 },
  },
  colors: {
    primary: { type: String, default: '#0f172a' },
    secondary: { type: String, default: '#334155' },
    text: { type: String, default: '#475569' },
    heading: { type: String, default: '#0f172a' },
  },
  hero: [{
    image: { type: String },
    title: { type: String },
    titleEn: { type: String },
    subtitle: { type: String },
    subtitleEn: { type: String },
  }],
  about: {
    images: [{ type: String }],
    content: { type: String, default: '' },
    contentEn: { type: String, default: '' },
    vision: { type: String, default: '' },
    visionEn: { type: String, default: '' },
    mission: { type: String, default: '' },
    missionEn: { type: String, default: '' },
    goals: { type: String, default: '' },
    goalsEn: { type: String, default: '' },
  },
  home: {
    aboutSummary: { type: String, default: '' },
    aboutSummaryEn: { type: String, default: '' },
  },
  covers: {
    about: { type: String, default: '/default-cover.jpg' },
    services: { type: String, default: '/default-cover.jpg' },
    portfolio: { type: String, default: '/default-cover.jpg' },
    contact: { type: String, default: '/default-cover.jpg' },
    blog: { type: String, default: '/default-cover.jpg' },
  },
  contact: {
    phones: [{ type: String }],
    whatsapps: [{ type: String }],
    emails: [{ type: String }],
    addresses: [{ type: String }],
    addressesEn: [{ type: String }],
    mapLinks: [{ type: String }],
  },
  social: {
    facebook: { type: String, default: '' },
    twitter: { type: String, default: '' },
    instagram: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    snapchat: { type: String, default: '' },
  },
  partners: [{ type: String }],
  team: [{
    name: { type: String },
    nameEn: { type: String },
    position: { type: String },
    positionEn: { type: String },
    image: { type: String },
    description: { type: String },
    descriptionEn: { type: String },
  }],
  achievements: {
    projectsCompleted: { type: Number, default: 100 },
    satisfiedClients: { type: Number, default: 50 },
    yearsExperience: { type: Number, default: 10 },
    experts: { type: Number, default: 20 },
  }
}, { timestamps: true });

const SiteSettings: Model<ISiteSettings> = mongoose.models.SiteSettings || mongoose.model<ISiteSettings>("SiteSettings", SiteSettingsSchema);
export default SiteSettings;
