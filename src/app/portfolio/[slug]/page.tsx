// src/app/portfolio/[slug]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import Breadcrumbs from '@/components/Breadcrumbs';
import CTASection from '@/components/CTASection';
import { projects } from '@/data/portfolio';
import styles from './project.module.css';
import { fetchProjects } from '@/services/projects';

type ApiProject = {
  id: number
  title: string
  category: string
  desc: string | null
  fullDesc: string | null
  image: string | null
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

// Helper to find project by slug from static data
function getStaticProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

// Helper to find project by slug from backend when the slug is actually an id fallback
async function getApiProjectBySlug(slug: string): Promise<ApiProject | null> {
  const asNumber = Number(slug)
  if (!Number.isFinite(asNumber) || !Number.isInteger(asNumber)) return null
  try {
    const all = await fetchProjects()
    return (all as ApiProject[]).find((p) => p.id === asNumber) ?? null
  } catch {
    return null
  }
}


export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const staticProject = getStaticProject(params.slug)
  if (staticProject) {
    return {
      title: `${staticProject.title} | دهب سوفت وير`,
      description: staticProject.description,
      alternates: { canonical: `/portfolio/${staticProject.slug}` },
      openGraph: {
        title: `${staticProject.title} | دهب سوفت وير`,
        description: staticProject.description,
        url: `/portfolio/${staticProject.slug}`,
        type: 'website',
      },
      robots: { index: true, follow: true },
    }
  }

  const apiProject = await getApiProjectBySlug(params.slug)
  if (!apiProject) {
    return {
      title: 'مشروع غير موجود | دهب سوفت وير',
      description: 'الصفحة المطلوبة غير موجودة.',
    }
  }

  return {
    title: `${apiProject.title} | دهب سوفت وير`,
    description: apiProject.fullDesc || apiProject.desc || undefined,
    robots: { index: true, follow: true },
  }
}

export default async function ProjectPage({
  params,
}: {
  params: { slug: string }
}) {
  const staticProject = getStaticProject(params.slug)
  if (!staticProject) {
    // Fallback: allow legacy navigation where slug is actually the numeric id.
    const apiProject = await getApiProjectBySlug(params.slug)
    if (!apiProject) {
      notFound()
      return null
    }

    return (
      <div>
        <Navbar />
        <div className="container" style={{ paddingTop: 28 }}>
          <Breadcrumbs
            items={[
              { label: 'الرئيسية', href: '/' },
              { label: 'أعمالنا', href: '/portfolio' },
              { label: apiProject.title },
            ]}
          />
          <section className={styles.hero}>
            <h1 className={styles.title}>{apiProject.title}</h1>
            <p className={styles.category}>{apiProject.category}</p>
          </section>
          <section className={styles.overview}>
            <h2>نظرة عامة</h2>
            <p>{apiProject.fullDesc || apiProject.desc}</p>
          </section>
          <section className={styles.tech}>
            <h2>التقنيات المستخدمة</h2>
            <ul className={styles.techList}>
              {(apiProject.tags ?? []).map((tech: string) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </section>
          <section className={styles.gallery}>
            <h2>معاينات الشاشة</h2>
            <p>تُضاف الصور لاحقًا.</p>
          </section>
          <section className={styles.cta}>
            <CTASection
              title="هل تريد مشروعًا مماثلًا؟"
              subtitle="دعنا نبني لك حلولًا رقمية تناسب احتياجاتك."
              buttonText="تواصل معنا"
              href="/contact"
            />
          </section>
        </div>
        <FooterSection />
      </div>
    )
  }



  return (
    <div>
      <Navbar />
      <div className="container" style={{ paddingTop: 28 }}>
        <Breadcrumbs
          items={[
            { label: 'الرئيسية', href: '/' },
            { label: 'أعمالنا', href: '/portfolio' },
            { label: staticProject.title },
          ]}
        />
        <section className={styles.hero}>
          <h1 className={styles.title}>{staticProject.title}</h1>
          <p className={styles.category}>{staticProject.category}</p>
        </section>
        <section className={styles.overview}>
          <h2>نظرة عامة</h2>
          <p>{staticProject.description}</p>
        </section>
        <section className={styles.tech}>
          <h2>التقنيات المستخدمة</h2>
          <ul className={styles.techList}>
            {staticProject.technologies.map((tech: string) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </section>
        {/* Placeholder for screenshots / gallery */}
        <section className={styles.gallery}>
          <h2>معاينات الشاشة</h2>
          <p>تُضاف الصور لاحقًا.</p>
        </section>
        {/* CTA */}
        <section className={styles.cta}>
          <CTASection
            title="هل تريد مشروعًا مماثلًا؟"
            subtitle="دعنا نبني لك حلولًا رقمية تناسب احتياجاتك."
            buttonText="تواصل معنا"
            href="/contact"
          />
        </section>
      </div>
      <FooterSection />
    </div>
  )
}

