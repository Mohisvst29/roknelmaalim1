const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

// Since we are running this using ts-node or node directly, we use raw schemas
const SiteSettingsSchema = new mongoose.Schema({
  seo: {
    title: { type: String, default: 'النمو الماسي' },
    description: { type: String, default: '' },
    keywords: { type: String, default: '' },
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
    subtitle: { type: String },
  }],
  about: {
    images: [{ type: String }],
    content: { type: String, default: '' },
    vision: { type: String, default: '' },
    mission: { type: String, default: '' },
    goals: { type: String, default: '' },
  },
  home: {
    aboutSummary: { type: String, default: '' },
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
    whatsapp: { type: String, default: '' },
    emails: [{ type: String }],
    addresses: [{ type: String }],
    mapLink: { type: String, default: '' },
  },
  achievements: {
    projectsCompleted: { type: Number, default: 100 },
    satisfiedClients: { type: Number, default: 50 },
    yearsExperience: { type: Number, default: 10 },
    experts: { type: Number, default: 20 },
  }
});

const AdminUserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
});

const SiteSettings = mongoose.models.SiteSettings || mongoose.model("SiteSettings", SiteSettingsSchema);
const AdminUser = mongoose.models.AdminUser || mongoose.model("AdminUser", AdminUserSchema);

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to DB");

  // 1. Admin User
  const existingAdmin = await AdminUser.findOne({ username: 'admin' });
  if (!existingAdmin) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash('admin123', salt);
    await AdminUser.create({ username: 'admin', passwordHash: hash });
    console.log("Admin user created");
  }

  // 2. Site Settings
  await SiteSettings.deleteMany({});
  await SiteSettings.create({
    seo: {
      title: 'شركة النمو الماسي للمقاولات والاتصالات',
      description: 'متخصصون في الأعمال المدنية والكهروميكانيكية والاتصالات في السعودية والأردن',
      keywords: 'مقاولات, اتصالات, تيار خفيف, السعودية, الأردن'
    },
    logo: {
      url: '/logo.png', // Assuming current logo
      width: 150,
      height: 50
    },
    colors: {
      primary: '#0D2240',
      secondary: '#1A365D',
      text: '#4A5568',
      heading: '#0D2240'
    },
    hero: [
      {
        image: '/hero-1.jpg', // we will use placeholders or current images if we know them
        title: 'نحو مستقبل أفضل مع النمو الماسي',
        subtitle: 'نبني رؤيتك بأعلى معايير الجودة والاحترافية في قطاع المقاولات والاتصالات'
      },
      {
        image: '/hero-2.jpg',
        title: 'حلول كهروميكانيكية متكاملة',
        subtitle: 'أحدث التقنيات وأفضل الكفاءات لضمان نجاح مشاريعك'
      }
    ],
    about: {
      images: ['/about-1.jpg', '/about-2.jpg'],
      content: 'تأسس المقر الرئيسي لشركة النمو الماسي للمقاولات في الأردن عام 2012، وانطلقت لاحقاً في عام 2023 لافتتاح فرعها في المملكة العربية السعودية.',
      vision: 'أن نكون الخيار الأول في قطاع المقاولات والاتصالات في المنطقة.',
      mission: 'تقديم أعلى جودة للعملاء.',
      goals: 'التوسع المستمر والابتكار.'
    },
    home: {
      aboutSummary: 'شركة النمو الماسي متخصصة في الأعمال المدنية، الاتصالات، أنظمة التيار الخفيف، والخدمات الكهروميكانيكية.'
    },
    covers: {
      about: '/cover-about.jpg',
      services: '/cover-services.jpg',
      portfolio: '/cover-portfolio.jpg',
      contact: '/cover-contact.jpg',
      blog: '/cover-blog.jpg'
    },
    contact: {
      phones: ['+966500000000', '+962790000000'],
      whatsapp: '+966500000000',
      emails: ['info@diamondgrowth.com'],
      addresses: ['الرياض، المملكة العربية السعودية', 'عمان، الأردن'],
      mapLink: 'https://maps.google.com/?q=Riyadh'
    },
    achievements: {
      projectsCompleted: 150,
      satisfiedClients: 120,
      yearsExperience: 12,
      experts: 50
    }
  });
  console.log("SiteSettings seeded");
  
  process.exit(0);
}

seed().catch(console.error);
