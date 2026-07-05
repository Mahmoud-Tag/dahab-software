import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

const projects = [
  {
    title: 'متجر الأزياء الفاخرة',
    category: 'متاجر إلكترونية',
    catIcon: 'fas fa-shopping-cart',
    desc: 'منصة تجارة إلكترونية متكاملة مع بوابة دفع آمنة وإدارة مخزون ذكية.',
    fullDesc:
      'نظام متكامل للتجارة الإلكترونية مصمم خصيصاً لقطاع الأزياء.',
    image: '/portfolio-ecommerce.png',
    tags: ['Vue.js', 'Laravel', 'MySQL', 'Stripe'],
    year: '2024',
    type: 'ecommerce',
    downloadUrl: '#',
    features: ['نظام إدارة المنتجات والمخزون', 'بوابة دفع Stripe مدمجة'],
  },
  {
    title: 'تطبيق إدارة المالية',
    category: 'تطبيقات موبايل',
    catIcon: 'fas fa-mobile-alt',
    desc: 'تطبيق متكامل لإدارة الميزانيات الشخصية والمؤسسية مع تقارير تفاعلية.',
    fullDesc: 'تطبيق جوال يساعد المستخدمين على تتبع نفقاتهم ودخلهم اليومي.',
    image: '/portfolio-app.png',
    tags: ['Flutter', 'Firebase', 'Dart'],
    year: '2024',
    type: 'app',
    downloadUrl: '#',
    features: ['تتبع المصاريف والدخل لحظياً', 'تقارير ورسوم بيانية شهرية'],
  },
  {
    title: 'نظام إدارة الموارد البشرية',
    category: 'أنظمة إدارة',
    catIcon: 'fas fa-cogs',
    desc: 'نظام HR شامل يتيح إدارة الموظفين والحضور والرواتب ولوحة تحكم تفاعلية.',
    fullDesc: 'حل برمجي شامل للمؤسسات المتوسطة والكبيرة.',
    image: '/portfolio-system.png',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    year: '2023',
    type: 'system',
    downloadUrl: '#',
    features: ['إدارة ملفات الموظفين والوثائق', 'نظام الحضور والغياب الذكي'],
  },
  {
    title: 'موقع شركة التقنيات الذكية',
    category: 'مواقع ويب',
    catIcon: 'fas fa-globe',
    desc: 'موقع مؤسسي احترافي متعدد اللغات مع تصميم عصري وتحسين محركات البحث.',
    fullDesc: 'موقع إلكتروني تعريفي لشركة تقنية.',
    image: '/portfolio-website.png',
    tags: ['Next.js', 'Tailwind', 'SEO'],
    year: '2023',
    type: 'web',
    language: 'Next.js, React',
    downloadUrl: '#',
    features: ['سرعة تحميل فائقة', 'تحسين كامل لمحركات البحث (SEO)'],
  },
]

const partnerships = [
  {
    title: 'شراكة استراتيجية مع شركة البحر الأحمر',
    partnerName: 'شركة البحر الأحمر للخدمات',
    desc: 'تعاون لتطوير منصة رقمية وحلول متكاملة.',
    fullDesc: '<p>بدأت الشراكة في 2024 بهدف تنفيذ مشاريع تقنية وحلول سحابية متقدمة، تشمل تصميم وبناء نظم معلومات وإدارة بيانات العملاء.</p>',
    image: '/partnership-1.png',
    websiteUrl: 'https://example-partner.com',
    status: 'نشط',
  },
]

async function main() {
  const email = process.env.ADMIN_EMAIL ?? 'admin@dahab.tech'
  const password = process.env.ADMIN_PASSWORD ?? 'admin123'

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      name: 'Admin',
      email,
      password: await hash(password, 12),
    },
  })

  const count = await prisma.project.count()
  if (count === 0) {
    for (const project of projects) {
      await prisma.project.create({
        data: {
          ...project,
          tags: project.tags,
          features: project.features,
        },
      })
    }
  }

  const partnershipCount = await prisma.partnership.count()
  if (partnershipCount === 0) {
    for (const p of partnerships) {
      await prisma.partnership.create({ data: p })
    }
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
