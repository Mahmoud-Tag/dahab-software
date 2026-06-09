// src/app/portfolio/[slug]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import Breadcrumbs from '@/components/Breadcrumbs';
import CTASection from '@/components/CTASection';
import { projects } from '@/data/portfolio';
import styles from './project.module.css';

// Helper to find project by slug
function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = getProject(params.slug);
  if (!project) {
    return {
      title: 'مشروع غير موجود | دهب سوفت وير',
      description: 'الصفحة المطلوبة غير موجودة.',
    };
  }
  return {
    title: `${project.title} | دهب سوفت وير`,
    description: project.description,
    alternates: { canonical: `/portfolio/${project.slug}` },
    openGraph: {
      title: `${project.title} | دهب سوفت وير`,
      description: project.description,
      url: `/portfolio/${project.slug}`,
      type: 'website',
    },
    robots: { index: true, follow: true },
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) {
    notFound();
    return null;
  }

  return (
    <div>
      <Navbar />
      <div className="container" style={{ paddingTop: 28 }}>
        <Breadcrumbs
          items={[
            { label: 'الرئيسية', href: '/' },
            { label: 'أعمالنا', href: '/portfolio' },
            { label: project.title },
          ]}
        />
        <section className={styles.hero}>
          <h1 className={styles.title}>{project.title}</h1>
          <p className={styles.category}>{project.category}</p>
        </section>
        <section className={styles.overview}>
          <h2>نظرة عامة</h2>
          <p>{project.description}</p>
        </section>
        <section className={styles.tech}>
          <h2>التقنيات المستخدمة</h2>
          <ul className={styles.techList}>
            {project.technologies.map((tech) => (
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
  );
}
