// src/app/technologies/page.tsx
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import Breadcrumbs from '@/components/Breadcrumbs';
import CTASection from '@/components/CTASection';
import { technologies } from '@/data/technologies';
import TechCard from '@/components/TechCard';
import styles from './technologies.module.css';

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: 'التقنيات | دهب سوفت وير',
    description: 'مجموعتنا من التقنيات الحديثة التي نعتمدها لتسليم حلول ذات جودة عالية.',
    alternates: { canonical: '/technologies' },
    openGraph: {
      title: 'التقنيات | دهب سوفت وير',
      description: 'مجموعتنا من التقنيات الحديثة التي نعتمدها لتسليم حلول ذات جودة عالية.',
      url: '/technologies',
      type: 'website',
    },
    robots: { index: true, follow: true },
  };
};

export default function TechnologiesPage() {
  return (
    <div>
      <Navbar />
      <div className="container" style={{ paddingTop: 28 }}>
        <Breadcrumbs
          items={[
            { label: 'الرئيسية', href: '/' },
            { label: 'التقنيات' },
          ]}
        />
        <section className={styles.intro}>
          <h1 className={styles.title}>تقنياتنا</h1>
          <p className={styles.description}>
            نحن نستخدم أحدث الأدوات والإطارات لتطوير منتجات رقمية قوية، سريعة، وآمنة.
          </p>
        </section>
        <section className={styles.grid}>
          {technologies.map((tech) => (
            <TechCard
              key={tech.name}
              name={tech.name}
              description={tech.description}
              iconUrl={tech.iconUrl}
            />
          ))}
        </section>
        <section className={styles.cta}>
          <CTASection
            title="هل تريد تجربة التقنيات المتقدمة؟"
            subtitle="تواصل معنا لبناء حلول مخصصة باستخدام أحدث التقنيات."
            buttonText="احجز استشارة"
            href="/contact"
          />
        </section>
      </div>
      <FooterSection />
    </div>
  );
}
