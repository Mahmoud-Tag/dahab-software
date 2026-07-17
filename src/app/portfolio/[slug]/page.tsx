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
import { CountUp, Reveal } from '@/components/ProjectPageClient'


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

type GalleryItem = { src: string; alt: string }

function safeArray<T>(value: T[] | undefined | null): T[] {
  return Array.isArray(value) ? value : []
}

export default async function ProjectPage({ params }: { params: RouteParams }) {
  const { slug } = await params
  const project = await getProjectDetails(slug)

  if (!project) {
    notFound()
  }

  const statusLabel = project.status === 'development' ? 'قيد التطوير' : 'متاح'
  const galleryItems: GalleryItem[] = [
    { src: project.image, alt: `معاينة ${project.title}` },
    ...safeArray(project.images).map((src, idx) => ({ src, alt: `معاينة إضافية ${idx + 1}` })),
  ]

  const stats = [
    { icon: 'type', label: 'النوع', value: project.type ? portfolioTypeLabel(project.type) : project.category },
    { icon: 'year', label: 'السنة', value: project.year || '2024' },
    { icon: 'lang', label: 'اللغة', value: project.language || 'عربي' },
    { icon: 'status', label: 'الحالة', value: statusLabel },
    { icon: 'views', label: 'المشاهدات', value:  '99+', metric: true },
    { icon: 'downloads', label: 'التحميلات', value: project.downloads ?? 0, metric: true },
  ] as const

  return (
    <div className={styles.root}>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.bgDecor} aria-hidden="true">
          <div className={styles.blurCircleA} />
          <div className={styles.blurCircleB} />
          <div className={styles.blurCircleC} />
          <div className={styles.gridOverlay} />
        </div>

        <div className="container">
          <Breadcrumbs
            items={[
              { label: 'الرئيسية', href: '/' },
              { label: 'أعمالنا', href: '/portfolio' },
              { label: project.title },
            ]}
          />

          <section className={styles.hero} aria-label={`دراسة حالة: ${project.title}`}>
            <div className={styles.heroGlow} aria-hidden="true" />

            <div className={styles.heroInner}>
              <div className={styles.heroLeft}>
                <Reveal variant="left" className={styles.heroCard}>
                  <div className={styles.categoryRow}>
                    <span className={styles.badge}>{project.category}</span>
                    <span className={styles.pill}>
                      <i className={`fas fa-sparkles ${styles.pillIcon}`} aria-hidden="true" />
                      Enterprise SaaS Case Study
                    </span>
                  </div>

                  <h1 className={styles.heroTitle}>{project.title}</h1>
                  <p className={styles.heroDescription}>{project.description}</p>

                  <div className={styles.heroCTAs}>
                    {project.websiteUrl && (
                      <Link href={project.websiteUrl} className={styles.btnPrimary} target="_blank" rel="noreferrer">
                        زيارة المشروع
                        <i className={`fas fa-arrow-up-right-from-square ${styles.btnIcon}`} aria-hidden="true" />
                      </Link>
                    )}
                    {project.downloadUrl && (
                      <Link href={project.downloadUrl} className={styles.btnSecondary} target="_blank" rel="noreferrer">
                        تحميل المشروع
                        <i className={`fas fa-download ${styles.btnIcon}`} aria-hidden="true" />
                      </Link>
                    )}
                  </div>

                  <div className={styles.statPreview} aria-label="ملخص سطحي للمشروع">
                    <div className={styles.statPreviewItem}>
                      <span className={styles.statPreviewLabel}>المسار</span>
                      <span className={styles.statPreviewValue}>{portfolioTypeLabel(project.type || 'web')}</span>
                    </div>
                    <div className={styles.statPreviewItem}>
                      <span className={styles.statPreviewLabel}>الحالة</span>
                      <span className={styles.statPreviewValue}>{statusLabel}</span>
                    </div>
                  </div>
                </Reveal>
              </div>

              <div className={styles.heroRight}>
                <Reveal variant="right" className={styles.macWrap}>
                  <div className={styles.macGlass} aria-hidden="true" />
                  <div className={styles.macBezel} aria-hidden="true" />
                  <div className={styles.macScreen}>
                    <div className={styles.screenShine} aria-hidden="true" />
                    <Image
                      src={project.image}
                      alt={`صورة واجهة المشروع: ${project.title}`}
                      fill
                      priority
                      className={styles.macImage}
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                  </div>
                  <div className={styles.macFooter} aria-hidden="true" />
                </Reveal>
              </div>
            </div>
          </section>

          <section className={styles.section} aria-label="إحصائيات المشروع">
            <Reveal variant="up">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionBadge}>Project Statistics</span>
                <h2 className={styles.sectionTitle}>أرقام تُظهر أثر العمل</h2>
                <p className={styles.sectionSubtitle}>مؤشرات دقيقة جاهزة لعرض الأداء والموثوقية.</p>
              </div>

              <div className={styles.statsGrid}>
                {stats.map((stat) => (
                  <div className={styles.statCard} key={String(stat.label)}>

                    <div className={styles.statIcon} aria-hidden="true">
                      <i
                        className={
                          stat.icon === 'views'
                            ? 'fas fa-eye'
                            : stat.icon === 'downloads'
                              ? 'fas fa-download'
                              : stat.icon === 'year'
                                ? 'fas fa-calendar'
                                : stat.icon === 'lang'
                                  ? 'fas fa-language'
                                  : stat.icon === 'status'
                                    ? 'fas fa-circle-info'
                                    : 'fas fa-layer-group'
                        }
                      />
                    </div>

                    <div className={styles.statValue}>
                      <span>{stat.value}</span>
                      {/* <span>{formatMetric(typeof stat.value === 'number' ? stat.value : 0)}</span> */}
                    </div>
                    <div className={styles.statLabel}>{stat.label}</div>
                  </div>

                ))}
              </div>
            </Reveal>
          </section>

          <section className={styles.section} aria-label="نظرة عامة">
            <div className={styles.twoCol}>
              <Reveal variant="up" className={styles.overviewCard}>
                <span className={styles.sectionLabel}>Overview</span>
                <h2 className={styles.overviewTitle}>تصميم يوازن بين الفخامة والوظيفة</h2>
                <p className={styles.overviewText}>{project.description}</p>

                <div className={styles.bullets}>
                  <div className={styles.bulletRow}>
                    <i className={`fas fa-check ${styles.bulletIcon}`} aria-hidden="true" />
                    <span>Hierarchy واضح يوجّه المستخدم بسرعة</span>
                  </div>
                  <div className={styles.bulletRow}>
                    <i className={`fas fa-check ${styles.bulletIcon}`} aria-hidden="true" />
                    <span>Glass UI مع تباين مُحكم وراحة بصرية</span>
                  </div>
                  <div className={styles.bulletRow}>
                    <i className={`fas fa-check ${styles.bulletIcon}`} aria-hidden="true" />
                    <span>تجربة مُصممة للـ RTL بأعلى جودة</span>
                  </div>
                </div>
              </Reveal>

              <Reveal variant="up" className={styles.techCard}>
                <span className={styles.sectionLabel}>Technologies</span>
                <h2 className={styles.overviewTitle}>لوحة التقنية المستخدمة</h2>
                <p className={styles.techIntro}>بطاقات تقنية بصريًا—جاهزة للعرض كتصميم نظام.</p>

                <div className={styles.techGrid}>
                  {(project.technologies.length ? project.technologies : ['Custom']).map((tech) => (
                    <div className={styles.techItem} key={tech}>
                      <div className={styles.techLogo} aria-hidden="true">
                        <i className="fas fa-cubes" />
                      </div>
                      <div className={styles.techName}>{tech}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </section>

          <section className={styles.section} aria-label="المميزات">
            <Reveal variant="up">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionBadge}>Features</span>
                <h2 className={styles.sectionTitle}>مميزات تُصنع التجربة</h2>
                <p className={styles.sectionSubtitle}>مجموعة بطاقات فاخرة بدون أرقام—كل بطاقة تسرد قيمة واضحة.</p>
              </div>

              <div className={styles.featuresGrid}>
                {project.features.map((feature, idx) => (
                  <div className={styles.featureCard} key={`${feature}-${idx}`}>

                    <div className={styles.featureTop}>
                      <div className={styles.featureIcon} aria-hidden="true">
                        <i className={idx % 2 === 0 ? 'fas fa-bolt' : 'fas fa-shield-halved'} />
                      </div>
                      <h3 className={styles.featureTitle}>{feature.split(' ')[0] || 'ميزة'}</h3>
                    </div>
                    <p className={styles.featureDesc}>{feature}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </section>

          <section className={styles.section} aria-label="معرض المشروع">
            <Reveal variant="up">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionBadge}>Gallery</span>
                <h2 className={styles.sectionTitle}>معاينات مدروسة بتفاصيل حقيقية</h2>
                <p className={styles.sectionSubtitle}>Lightbox-ready + Hover Zoom + Masonry feel.</p>
              </div>

              <div className={styles.galleryLayout}>
                <div className={styles.galleryFeatured}>
                  <Image src={galleryItems[0].src} alt={galleryItems[0].alt} fill className={styles.galleryFeaturedImg} sizes="(max-width: 768px) 100vw, 900px" />
                  <div className={styles.galleryFeaturedOverlay} aria-hidden="true" />
                </div>

                <div className={styles.masonryGrid}>
                  {galleryItems.slice(1).map((item, idx) => (
                    <figure className={styles.masonryItem} key={`${item.src}-${idx}`}>
                      <div className={styles.masonryImgWrap}>
                        <Image src={item.src} alt={item.alt} fill className={styles.masonryImg} sizes="(max-width: 768px) 100vw, 420px" />
                      </div>
                      <figcaption className={styles.masonryCaption}>{item.alt}</figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            </Reveal>
          </section>

          <section className={styles.section} aria-label="معلومات المشروع">
            <Reveal variant="up">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionBadge}>Project Information</span>
                <h2 className={styles.sectionTitle}>تفاصيل تُعرض بلمعة مؤسسية</h2>
              </div>

              <div className={styles.infoGrid}>
                <div className={styles.infoCard}>
<div className={styles.infoIcon} aria-hidden="true">
                    <i className="fas fa-calendar" />
                  </div>
                  <div className={styles.infoValue}>{project.year || '2024'}</div>
                  <div className={styles.infoLabel}>Year</div>
                </div>
                <div className={styles.infoCard}>
<div className={styles.infoIcon} aria-hidden="true">
                    <i className="fas fa-language" />
                  </div>
                  <div className={styles.infoValue}>{project.language || 'عربي'}</div>
                  <div className={styles.infoLabel}>Language</div>
                </div>
                <div className={styles.infoCard}>
                  <div className={styles.infoIcon} aria-hidden="true"><i className="fas fa-tag" /></div>
                  <div className={styles.infoValue}>{project.type ? portfolioTypeLabel(project.type) : project.category}</div>
                  <div className={styles.infoLabel}>Category</div>
                </div>
                <div className={styles.infoCard}>
                  <div className={styles.infoIcon} aria-hidden="true"><i className="fas fa-circle" /></div>
                  <div className={styles.infoValue}>{statusLabel}</div>
                  <div className={styles.infoLabel}>Status</div>
                </div>
                <div className={styles.infoCard}>
                  <div className={styles.infoIcon} aria-hidden="true"><i className="fas fa-eye" /></div>
                  <div className={styles.infoValue}>{formatMetric(project.views ?? 0)}</div>
                  <div className={styles.infoLabel}>Views</div>
                </div>
                <div className={styles.infoCard}>
                  <div className={styles.infoIcon} aria-hidden="true"><i className="fas fa-download" /></div>
                  <div className={styles.infoValue}>{formatMetric(project.downloads ?? 0)}</div>
                  <div className={styles.infoLabel}>Downloads</div>
                </div>
              </div>
            </Reveal>
          </section>

          <section className={styles.section} aria-label="Project journey">
            <Reveal variant="up">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionBadge}>Timeline</span>
                <h2 className={styles.sectionTitle}>رحلة المشروع من الفكرة إلى الإطلاق</h2>
                <p className={styles.sectionSubtitle}>Horizontal timeline بلمسة Premium.</p>
              </div>

              <div className={styles.timeline}>
                {['Planning', 'Design', 'Development', 'Testing', 'Launch'].map((step, idx) => (
                  <div className={styles.timelineStep} key={step}>
                    <div className={styles.timelineDot} aria-hidden="true" />
                    <div className={styles.timelineCard}>
                      <div className={styles.timelineTitle}>
                        <i className={idx % 2 === 0 ? 'fas fa-compass-drafting' : 'fas fa-cogs'} aria-hidden="true" />
                        {step}
                      </div>
                      <div className={styles.timelineDesc}>
                        {idx === 0
                          ? 'تحليل المتطلبات وتحديد النجاح.'
                          : idx === 1
                            ? 'تصميم واجهة فاخرة ومرتكزة على المستخدم.'
                            : idx === 2
                              ? 'بناء قابل للتوسع مع هندسة نظيفة.'
                              : idx === 3
                                ? 'اختبارات دقيقة للجودة والأداء.'
                                : 'إطلاق جاهز مع تحسينات نهائية.'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </section>

          <section className={styles.section} aria-label="Workflow">
            <Reveal variant="up">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionBadge}>Workflow</span>
                <h2 className={styles.sectionTitle}>عملية تطوير حديثة ومُحكمة</h2>
              </div>

              <div className={styles.workflowGrid}>
                {['Research', 'UI', 'Development', 'Testing', 'Deployment'].map((phase, idx) => (
                  <div className={styles.processCard} key={phase}>
                    <div className={styles.processGlow} aria-hidden="true" />
                    <div className={styles.processIcon} aria-hidden="true">
                      <i className={idx % 2 === 0 ? 'fas fa-search' : 'fas fa-sliders'} />
                    </div>
                    <div className={styles.processTitle}>{phase}</div>
                    <div className={styles.processDesc}>
                      {idx === 0
                        ? 'اكتشاف الاحتياجات وتحديد نطاق العمل.'
                        : idx === 1
                          ? 'تجربة مستخدم بمستوى منتجات عالمية.'
                          : idx === 2
                            ? 'تنفيذ هندسي سريع وآمن.'
                            : idx === 3
                              ? 'تجارب تحمّل وتحسين توافق.'
                              : 'نشر مُحسن مع مراقبة الأداء.'}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </section>

          <section className={styles.section} aria-label="Results">
            <Reveal variant="up">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionBadge}>Results</span>
                <h2 className={styles.sectionTitle}>نتائج ملموسة عبر المؤشرات</h2>
              </div>

              <div className={styles.kpiGrid}>
                {[
                  { icon: 'fa-tachometer-alt', title: 'Performance', desc: 'سرعة وتحكم في الأحمال.' },
                  { icon: 'fa-magnifying-glass', title: 'SEO', desc: 'هيكلة صديقة لمحركات البحث.' },
                  { icon: 'fa-universal-access', title: 'Accessibility', desc: 'وضوح وعناية للتوافق.' },
                  { icon: 'fa-mobile-screen-button', title: 'Responsive', desc: 'تجربة متسقة على كل الأجهزة.' },
                  { icon: 'fa-diagram-project', title: 'Best Practices', desc: 'نظافة كود وتجربة مستقرة.' },
                ].map((kpi) => (
                  <div className={styles.kpiCard} key={kpi.title}>
                    <div className={styles.kpiIcon} aria-hidden="true">
                      <i className={`fas ${kpi.icon}`} />
                    </div>

                    <div className={styles.kpiTitle}>{kpi.title}</div>
                    <div className={styles.kpiDesc}>{kpi.desc}</div>
                    <div className={styles.kpiProgress} aria-hidden="true">
                      <div className={styles.kpiProgressFill} />
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </section>

          <section className={styles.section} aria-label="Testimonial">
            <Reveal variant="up">
              <div className={styles.testimonialCard}>
                <div className={styles.testimonialTop}>
                  <div className={styles.testimonialAvatar} aria-hidden="true">
                    <Image src="/about-person.png" alt="" fill className={styles.avatarImg} sizes="96px" />
                  </div>
                  <div>
                    <div className={styles.testimonialName}>Client Success</div>
                    <div className={styles.testimonialRole}>Enterprise Product Partner</div>
                  </div>

                  <div className={styles.stars} aria-label="5 نجوم">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <i key={idx} className="fas fa-star" aria-hidden="true" />
                    ))}
                  </div>
                </div>

                <blockquote className={styles.testimonialQuote}>
                  “نتائج واضحة، تصميم فخم، وانطباع مؤسسي… صفحة دراسة الحالة صارت جزءًا من هوية المنتج.”
                </blockquote>
              </div>
            </Reveal>
          </section>

          <section className={styles.cta}>
            <div className={styles.ctaDecor} aria-hidden="true">
              <div className={styles.ctaCircleA} />
              <div className={styles.ctaCircleB} />
              <div className={styles.ctaGrid} />
            </div>

            <div className={styles.ctaPanel}>
              <div className={styles.ctaLeft}>
                <span className={styles.ctaBadge}>Next Step</span>
                <h2 className={styles.ctaTitle}>هل تريد مشروعًا مماثلًا؟</h2>
                <p className={styles.ctaSubtitle}>دعنا نبني لك حلولًا رقمية تناسب احتياجاتك وتدعم نمو مشروعك.</p>

                <div className={styles.ctaButtons}>
                  <Link href="/contact" className={styles.ctaButtonPrimary}>
                    تواصل معنا
<i className={`fas fa-arrow-up-right-from-square ${styles.ctaButtonIcon}`} aria-hidden="true" />
                  </Link>
                  <span className={styles.ctaHint}>Premium delivery • RTL ready • Performance minded</span>
                </div>
              </div>

              <div className={styles.ctaRight}>
                <div className={styles.ctaGlass} aria-hidden="true" />
                <div className={styles.ctaMock}>
                  <Image src={project.image} alt="" fill className={styles.ctaMockImg} sizes="(max-width: 768px) 100vw, 480px" />
                </div>
              </div>
            </div>
          </section>

          <section className={styles.legacyCTA}>
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

