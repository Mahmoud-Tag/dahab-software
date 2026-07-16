// src/app/portfolio/[slug]/page.tsx
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import FooterSection from '@/components/FooterSection'
import Breadcrumbs from '@/components/Breadcrumbs'
import CTASection from '@/components/CTASection'
import { getProject, listProjects } from '@/api/projects/service'
import type { ProjectItem } from '@/data/portfolio'
import { projects } from '@/data/portfolio'
import { portfolioTypeLabel } from '@/utils/format'
import styles from './project.module.css'

type RouteParams = Promise<{ slug: string }>

type ApiProject = {
  id: number
  title: string
  category: string
  desc: string | null
  fullDesc: string | null
  image: string | null
  images?: string[]
  tags: string[]
  year: string | null
  type: string | null
  language: string | null
  downloads: number
  downloadUrl: string | null
  websiteUrl: string | null
  status: string | null
  features: string[]
  created_at: string
  updated_at: string
  views: number
}

type ProjectDetails = {
  title: string
  category: string
  description: string
  image: string
  images?: string[]
  technologies: string[]
  features: string[]
  year?: string | null
  type?: string | null
  language?: string | null
  status?: string | null
  websiteUrl?: string | null
  downloadUrl?: string | null
  downloads?: number
  views?: number
  canonicalSlug?: string
}

const fallbackImages: Record<string, string> = {
  web: '/portfolio-website.png',
  app: '/portfolio-app.png',
  system: '/portfolio-system.png',
  ecommerce: '/portfolio-ecommerce.png',
  ai: '/portfolio-system.png',
  resource: '/portfolio-system.png',
}

const defaultFeatures = [
  'واجهة استخدام سهلة وسريعة الاستجابة',
  'بنية تقنية قابلة للتطوير والتحديث',
  'تجربة مصممة حول أهداف العميل واحتياجات المستخدمين',
  'تهيئة أساسية للأداء وتحسين الظهور في محركات البحث',
]

function getStaticProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}

async function getApiProjectBySlug(slug: string): Promise<ApiProject | null> {
  const asNumber = Number(slug)

  try {
    if (Number.isFinite(asNumber) && Number.isInteger(asNumber)) {
      return (await getProject(asNumber)) as ApiProject | null
    }

    const all = (await listProjects()) as (ApiProject & { slug?: string })[]
    return all.find((p) => p.slug === slug) ?? null
  } catch {
    return null
  }
}

function normalizeProject(project: ProjectItem | ApiProject): ProjectDetails {
  if ('slug' in project) {
    return {
      title: project.title,
      category: project.category,
      description: project.description,
      image: fallbackImages.web,
      technologies: project.technologies,
      features: defaultFeatures,
      status: 'live',
      canonicalSlug: project.slug,
    }
  }

  const type = project.type || 'web'

  return {
    title: project.title,
    category: project.category || portfolioTypeLabel(type),
    description: project.fullDesc || project.desc || 'تفاصيل هذا المشروع غير متاحة حاليًا.',
    image: project.image || fallbackImages[type] || '/portfolio-website.png',
    images: 'images' in project && Array.isArray(project.images) ? project.images : [],
    technologies: project.tags ?? [],
    features: project.features?.length ? project.features : defaultFeatures,
    year: project.year,
    type,
    language: project.language,
    status: project.status,
    websiteUrl: project.websiteUrl,
    downloadUrl: project.downloadUrl,
    downloads: project.downloads,
    views: project.views,
    canonicalSlug: String(project.id),
  }
}

async function getProjectDetails(slug: string) {
  const staticProject = getStaticProject(slug)
  if (staticProject) return normalizeProject(staticProject)

  const apiProject = await getApiProjectBySlug(slug)
  if (apiProject) return normalizeProject(apiProject)

  return null
}

function formatMetric(value?: number) {
  return new Intl.NumberFormat('ar-EG').format(value ?? 0)
}

export async function generateMetadata({ params }: { params: RouteParams }): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectDetails(slug)

  if (!project) {
    return {
      title: 'مشروع غير موجود | دهب سوفت وير',
      description: 'الصفحة المطلوبة غير موجودة.',
    }
  }

  return {
    title: `${project.title} | دهب سوفت وير`,
    description: project.description,
    alternates: project.canonicalSlug ? { canonical: `/portfolio/${project.canonicalSlug}` } : undefined,
    openGraph: {
      title: `${project.title} | دهب سوفت وير`,
      description: project.description,
      images: [project.image],
      type: 'website',
    },
    robots: { index: true, follow: true },
  }
}

export default async function ProjectPage({ params }: { params: RouteParams }) {
  const { slug } = await params
  const project = await getProjectDetails(slug)

  if (!project) {
    notFound()
  }

  const statusLabel = project.status === 'development' ? 'قيد التطوير' : 'متاح'
  const stats = [
    { label: 'النوع', value: project.type ? portfolioTypeLabel(project.type) : project.category },
    { label: 'السنة', value: project.year || '2024' },
    { label: 'اللغة', value: project.language || 'عربي' },
    { label: 'الحالة', value: statusLabel },
  ]

  return (
    <div>
      <Navbar />
      <main className={styles.page}>
        <div className="container">
          <Breadcrumbs
            items={[
              { label: 'الرئيسية', href: '/' },
              { label: 'أعمالنا', href: '/portfolio' },
              { label: project.title },
            ]}
          />

          <section className={styles.hero}>
            <div className={styles.heroContent}>
              <span className={styles.eyebrow}>{project.category}</span>
              <h1 className={styles.title}>{project.title}</h1>
              <p className={styles.description}>{project.description}</p>

              <div className={styles.actions}>
                {project.websiteUrl && (
                  <Link href={project.websiteUrl} className={styles.primaryAction} target="_blank" rel="noreferrer">
                    زيارة المشروع
                    <i className="fas fa-arrow-up-right-from-square" />
                  </Link>
                )}
                {project.downloadUrl && (
                  <Link href={project.downloadUrl} className={styles.secondaryAction} target="_blank" rel="noreferrer">
                    تحميل المشروع
                    <i className="fas fa-download" />
                  </Link>
                )}
              </div>
            </div>

            <div className={styles.heroMedia}>
              <Image src={project.image} alt={project.title} fill priority className={styles.heroImage} sizes="(max-width: 768px) 100vw, 46vw" />
            </div>
          </section>

          <section className={styles.statsGrid} aria-label="معلومات المشروع">
            {stats.map((stat) => (
              <div className={styles.statCard} key={stat.label}>
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
              </div>
            ))}
            <div className={styles.statCard}>
              <span>المشاهدات</span>
              <strong>{formatMetric(project.views)}</strong>
            </div>
            <div className={styles.statCard}>
              <span>التحميلات</span>
              <strong>{formatMetric(project.downloads)}</strong>
            </div>
          </section>

          <section className={styles.contentGrid}>
            <article className={styles.panel}>
              <span className={styles.sectionLabel}>نظرة عامة</span>
              <h2>ما الذي يقدمه المشروع؟</h2>
              <p>{project.description}</p>
              <p>
                تم بناء هذا العمل ليجمع بين وضوح التجربة، سرعة الأداء، وقابلية التوسع، مع مراعاة أن يكون الحل قابلًا للتطوير حسب احتياجات النشاط التجاري في المراحل القادمة.
              </p>
            </article>

            <aside className={styles.panel}>
              <span className={styles.sectionLabel}>التقنيات</span>
              <h2>الأدوات المستخدمة</h2>
              <ul className={styles.techList}>
                {project.technologies.length > 0 ? (
                  project.technologies.map((tech) => <li key={tech}>{tech}</li>)
                ) : (
                  <li>حل مخصص حسب متطلبات المشروع</li>
                )}
              </ul>
            </aside>
          </section>

          <section className={styles.featuresSection}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>المميزات</span>
              <h2>تفاصيل العمل الرئيسية</h2>
            </div>
            <div className={styles.featuresGrid}>
              {project.features.map((feature, index) => (
                <div className={styles.featureCard} key={`${feature}-${index}`}>
                  <span className={styles.featureIcon}>{index + 1}</span>
                  <p>{feature}</p>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.gallery}>
            <div className={styles.galleryHeader}>
              <span className={styles.sectionLabel}>معاينة</span>
              <h2>واجهة المشروع</h2>
              <p>مجموعة من الصور التوضيحية للمشروع وواجهات الاستخدام.</p>
            </div>
            
            <div className={styles.galleryGrid}>
              <div className={`${styles.galleryImageWrap} ${styles.main}`}>
                <Image src={project.image} alt={`معاينة ${project.title}`} fill className={styles.galleryImage} sizes="(max-width: 768px) 100vw, 1200px" />
              </div>
              
              {project.images && project.images.map((imgUrl, idx) => (
                <div key={idx} className={styles.galleryImageWrap}>
                  <Image src={imgUrl} alt={`معاينة إضافية ${idx + 1}`} fill className={styles.galleryImage} sizes="(max-width: 768px) 100vw, 600px" />
                </div>
              ))}
            </div>
          </section>

          <section className={styles.cta}>
            <CTASection
              title="هل تريد مشروعًا مماثلًا؟"
              subtitle="دعنا نبني لك حلولًا رقمية تناسب احتياجاتك وتدعم نمو مشروعك."
              buttonText="تواصل معنا"
              href="/contact"
            />
          </section>
        </div>
      </main>
      <FooterSection />
    </div>
  )
}
