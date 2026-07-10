import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import FooterSection from '@/components/FooterSection'
import Breadcrumbs from '@/components/Breadcrumbs'
import PageHeader from '@/components/PageHeader'
import ContactSection from '@/components/ContactSection'

export const metadata: Metadata = {
  title: 'من نحن | دهب سوفت وير',
  description: 'تعرف على قصة دهب سوفت وير ورؤيتنا ورسالتنا وقيمنا الأساسية وكيف نُحوّل الأفكار إلى منتجات برمجية واقعية.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'من نحن | دهب سوفت وير',
    description: 'قصة ورؤية ورسالة دهب سوفت وير وكيف نُبني حلولًا برمجية تدعم نمو أعمالك.',
    url: '/about',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

function Section({
  id,
  title,
  icon,
  children,
}: {
  id?: string
  title: string
  icon?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} style={{ padding: 'clamp(1.5rem, 4vw, 3rem) 0' }}>
      <div className="container">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            background: 'linear-gradient(135deg, rgba(212,175,55,0.08), rgba(30,58,95,0.05))',
            border: '1px solid var(--border-gold)',
            borderRadius: 'var(--radius-lg)',
            padding: '10px 20px',
            alignSelf: 'flex-start',
          }}>
            {icon && <i className={icon} style={{ color: 'var(--gold)', fontSize: '1.1rem' }} />}
            <h2 style={{
              margin: 0,
              fontSize: 'clamp(1.35rem, 3vw, 2rem)',
              fontWeight: 900,
              color: 'var(--text-primary)',
              lineHeight: 1.2,
            }}>
              {title}
            </h2>
          </div>
          <div className="primary-card" style={{ padding: '20px 24px' }}>
            <div style={{ color: 'var(--text-secondary)', lineHeight: 1.85, fontSize: '0.95rem' }}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="primary-card" style={{ padding: '18px 20px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
      <div className="icon-circle">
        <i className={icon} style={{ fontSize: '1rem' }} />
      </div>
      <div>
        <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: 4 }}>{title}</div>
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.9rem' }}>{description}</div>
      </div>
    </div>
  )
}

function TimelineCard({ step, title, description }: { step: string; title: string; description: string }) {
  return (
    <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
      <div style={{
        flexShrink: 0,
        width: 40,
        height: 40,
        borderRadius: '50%',
        background: 'var(--gold-gradient)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 900,
        fontSize: '0.9rem',
        boxShadow: 'var(--shadow-gold)',
      }}>
        {step}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: 2 }}>{title}</div>
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.9rem' }}>{description}</div>
      </div>
    </div>
  )
}

export default function AboutPage() {
  return (
    <div>
      <Navbar />

      <div className="container" style={{ paddingTop: 20 }}>
        <Breadcrumbs
          items={[
            { label: 'الرئيسية', href: '/' },
            { label: 'من نحن' },
          ]}
        />
        <PageHeader
          title="من نحن"
          subtitle="شركة دهب سوفت وير—نبني حلولاً برمجية متكاملة تُترجم رؤيتك إلى نتائج ملموسة."
        />
      </div>

      {/* Company Story */}
      <Section title="قصة الشركة" id="story" icon="fas fa-book-open">
        <>
          بدأت دهب سوفت وير رحلتها من شغف بسيط بجعل التكنولوجيا في متناول الجميع؛
          انطلقت من فكرة أن البرمجة ليست مجرد كتابة أكواد، بل هي أداة لتحويل الأفكار الطموحة
          إلى منتجات رقمية حقيقية تُحدث فرقًا ملموسًا في سير العمل والأعمال. منذ البداية،
          وضعنا جودة التنفيذ ووضوح التواصل مع العملاء فيqcenter جميع مراحل العمل.
          نعمل كفريق واحد مع عملائنا، نستمع جيدًا، نحلل بعمق، ثم ننفذ باحترافية.
        </>
      </Section>

      {/* Vision */}
      <Section title="رؤيتنا" id="vision" icon="fas fa-eye">
        <>
          أن نصبح الشريك التقني الأول للشركات العربية الطموحة في رحلة التحول الرقمي.
          نسعى لبناء بيئة تقنية موثوقة تمكّن المؤسسات من النمو بشكل sustainable وآمن،
          من خلال حلول برمجية مرنة، تصميمات عصرية، وأداء عالي يتكيف مع التحديات المستقبلية.
        </>
      </Section>

      {/* Mission */}
      <Section title="رسالتنا" id="mission" icon="fas fa-bullseye">
        <>
          تقديم برمجيات ذات قيمة حقيقية عبر منهجية واضحة وممنهجة: نبدأ باكتشاف دقيق للاحتياجات،
          ثم تحليل معمق للمتطلبات، نمر بتصميم UI/UX يركز على المستخدم، تطور واختبار صارم،
          ثم نشر وضمان جودة—مع دعم مستمر بعد الإطلاق لضمان نجاح المشروع على المدى الطويل.
        </>
      </Section>

      {/* Core Values */}
      <Section title="قيمنا الأساسية" id="values" icon="fas fa-gem">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
          <FeatureCard
            icon="fas fa-award"
            title="الجودة أولاً"
            description="نلتزم بأعلى معايير الجودة في كل سطر كود، مع اختبارات دورية وتحسين مستمر لضمان منتج متين."
          />
          <FeatureCard
            icon="fas fa-balance-scale"
            title="الشفافية"
            description="نتعامل بوضوح كامل مع عملائنا—في النطاق، الوقت، التكاليف، ونتائج كل مرحلة."
          />
          <FeatureCard
            icon="fas fa-handshake"
            title="الالتزام بالعميل"
            description="علاقتنا بالعميل شراكة حقيقية؛ نتابع عن كثب ونحل المشكلات بسرعة واهتمام."
          />
          <FeatureCard
            icon="fas fa-shield-alt"
            title="الأمان"
            description="نحافظ على بياناتك ونتبع أفضل الممارسات العالمية في الحماية والأمان السيبراني."
          />
        </div>
      </Section>

      {/* Why Choose Us */}
      <Section title="لماذا تختار دهب سوفت وير؟" id="why-us" icon="fas fa-star">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
          <FeatureCard
            icon="fas fa-search"
            title="اهتمام بالتفاصيل"
            description="نهتم بأدق التفاصيل التي تجعل المنتج قابلًا للاستخدام والنجاح في السوق."
          />
          <FeatureCard
            icon="fas fa-chart-line"
            title="نتائج قابلة للقياس"
            description="نُحوّل المتطلبات والأهداف إلى حلول قابلة للقياس (KPIs) وتتبع واضح للتقدم."
          />
          <FeatureCard
            icon="fas fa-user-friends"
            title="تجربة مستخدم متميزة"
            description="نصمم تجارب مستخدم مبنية على بحث علمي واستشراف لسلوك المستخدم المستقبلي."
          />
          <FeatureCard
            icon="fas fa-clipboard-check"
            title="تسليم منظم"
            description="تسليم مرحلي مع توثيق واضح قبل وبعد الإطلاق، ودعم فني مستمر لضمان الاستمرارية."
          />
        </div>
      </Section>

      {/* Timeline */}
      <Section title="الخط الزمني" id="timeline" icon="fas fa-stream">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, position: 'relative', paddingRight: 20 }}>
          <div style={{
            position: 'absolute',
            right: 19,
            top: 20,
            bottom: 20,
            width: 2,
            background: 'linear-gradient(180deg, var(--gold), var(--border))',
          }} />
          {[
            { step: '1', title: 'اكتشاف الاحتياج', description: 'جلسة استكشافية لفهم الأهداف، الجمهور المستهدف، ومتطلبات المشروع الأساسية.' },
            { step: '2', title: 'التحليل والتخطيط', description: 'تحليل معمق للمتطلبات، إعداد خطة تنفيذ، وتحديد الجدول الزمني بوضوح.' },
            { step: '3', title: 'تصميم UI/UX', description: 'تصميم واجهات مستخدم عصرية وتجربة استخدام سلسة مع اختبارات usuabilty.' },
            { step: '4', title: 'التطوير والربط', description: 'تطوير المكونات والوظائف الأساسية، وربط الأنظمة والخدمات المطلوبة.' },
            { step: '5', title: 'الاختبار والنشر', description: 'اختبار شامل للأداء والأمان، ثم النشرigo الإطلاق ودعم ما بعد الإطلاق.' },
          ].map((item) => (
            <TimelineCard key={item.step} {...item} />
          ))}
        </div>
      </Section>

      {/* Team Members */}
      <Section title="فريق العمل" id="team" icon="fas fa-users">
        <>
          يضم فريقنا نخبة من المتخصصين في مجالات تطوير البرمجيات، تصميم UX/UI، إدارة المشاريع الرشيقة،
          واختبار الجودة—كل عضو بدوره واضح ومتكامل مع باقي الفريق لضمان تقديم منتج متكامل واحترافي.
          نعتقد أن التنوع في التخصصات هو سر نجاحنا في تنفيذ المشاريع المعقدة.
        </>
      </Section>

      {/* Certifications */}
      <Section title="الشهادات" id="certifications" icon="fas fa-certificate">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
          <FeatureCard
            icon="fas fa-lock"
            title="أفضل ممارسات الأمان"
            description="نطبق معايير أمنية صارمة والامتثال لقوانين حماية البيانات العالمية (GDPR) وأفضل الممارسات."
          />
          <FeatureCard
            icon="fas fa-tasks"
            title="إدارة المشاريع"
            description="نستخدم منهجيات إدارة رشيقة (Agile/Scrum) والتحقق المستمر من الجودة لضمان تسilitay." />
          <FeatureCard
            icon="fas fa-check-double"
            title="معايير الاختبار"
            description="نجري اختبارات آلية ويدوية شاملة لضمان موثوقية التطبيق واستقراره قبل كل إطلاق."
          />
        </div>
      </Section>

      {/* Awards */}
      <Section title="الجوائز" id="awards" icon="fas fa-trophy">
        <>
          نفخر بثقة العملاء التي تحولت إلى شراكات طويلة الأمد ومراجع إيجابية متكررة.
          نعمل دائمًا على رفع مستوى الخدمة، ونسعى لتقديم قيمة حقيقية في كل مشروع—سواء كانت هذه القيمة
          في شكل شهادات رسمية أو آراء عملاء أو نتائج ملموسة تساعد العملاء على تحقيق أهدافهم.
        </>
      </Section>

      {/* Company Culture */}
      <Section title="ثقافة العمل" id="culture" icon="fas fa-heart">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
          <FeatureCard
            icon="fas fa-bullseye"
            title="تركيز على النتائج"
            description="نركز على ما يهم العميل حقاً—النتائج الملموسة والتأثير الإيجابي على أعماله."
          />
          <FeatureCard
            icon="fas fa-comments"
            title="مراجعة دورية"
            description="نجلس مع الفريق والعميل بشكل دوري لمراجعة التقدم واتخاذ قرارات سريعة ومدروسة."
          />
          <FeatureCard
            icon="fas fa-file-alt"
            title="توثيق مستمر"
            description="نوثّق كل خطوة واختيار لضمان انتقال المعرفة بسلاسة ودعم المستمر للمنتج."
          />
          <FeatureCard
            icon="fas fa-graduation-cap"
            title="تعلّم متواصل"
            description="نحتضن كل مشروع جديد كفرصة للتعلم وتحسين مهارات الفريق وتطوير الأدوات."
          />
        </div>
      </Section>

      {/* Work Methodology */}
      <Section title="منهجية العمل" id="methodology" icon="fas fa-project-diagram">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
          {[
            { step: '01', icon: 'fas fa-search', title: 'Discovery', desc: 'جلسة استكشاف لمعرفة الأهداف والجمهور ومتطلبات المشروع.' },
            { step: '02', icon: 'fas fa-magnifying-glass-chart', title: 'Analysis', desc: 'تحليل معمق للمتطلبات وتحديد التحديات والفرص.' },
            { step: '03', icon: 'fas fa-list-check', title: 'Planning', desc: 'إعداد خطة تنفيذ وجدول زمني واضح مع معايير قبول.' },
            { step: '04', icon: 'fas fa-pen-ruler', title: 'UI/UX Design', desc: 'تصميم واجهات عصرية وتجربة استخدام مريحة.' },
            { step: '05', icon: 'fas fa-code', title: 'Development', desc: 'بناء المكونات والوظائف بأفضل الممارسات البرمجية.' },
            { step: '06', icon: 'fas fa-vial-circle-check', title: 'Testing', desc: 'اختبارات شاملة للأداء والأمان والتوافق.' },
            { step: '07', icon: 'fas fa-rocket', title: 'Deployment', desc: 'نشرProduction وضمان استقرار النظام.' },
            { step: '08', icon: 'fas fa-headset', title: 'Maintenance', desc: 'دعم مستمر وتحديثات دورية لضمان الأداء.' },
          ].map((item) => (
            <div key={item.step} className="primary-card" style={{
              padding: '22px 16px 18px',
              textAlign: 'center',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute',
                top: 10,
                left: 12,
                fontSize: '0.6rem',
                fontWeight: 800,
                color: 'var(--gold)',
                opacity: 0.6,
                letterSpacing: '0.5px',
              }}>
                {item.step}
              </div>
              <div style={{
                width: 46,
                height: 46,
                borderRadius: '50%',
                background: 'var(--gold-gradient)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-gold)',
                margin: '0 auto 12px',
              }}>
                <i className={item.icon} style={{ fontSize: '1rem' }} />
              </div>
              <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: 4 }}>{item.title}</div>
              <div style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.78rem' }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQs */}
      <Section title="الأسئلة الشائعة" id="faqs" icon="fas fa-question-circle">
        <div className="primary-card" style={{ padding: 0, overflow: 'hidden' }}>
          {[
            {
              q: 'كيف نبدأ؟',
              a: 'تبدأ كل شراكة بجلسة استماع واكتشاف لتحديد الأهداف بوضوح، ثم نقدم مقترحًا مشروعًا وقائمة مهام مفصلة.',
            },
            {
              q: 'هل يوجد توثيق؟',
              a: 'نعم، نقدم توثيقًا كاملاً للخطوات والاختيارات التقنية، مع تدريب مبدئي عند الحاجة لضمان انتقال سلس.',
            },
            {
              q: 'كيف تضمنون الجودة؟',
              a: 'نستخدم اختبارات متعددة المستويات، مراجعات داخلية منتظمة، وتدقيق نهائي قبل النشر لضمان أعلى معايير الجودة.',
            },
            {
              q: 'هل تدعمون بعد الإطلاق؟',
              a: 'بالتأكيد—الدعم والصيانة جزء أساسي من خدماتنا لضمان استمرارية الأداء والتطور المستمر.',
            },
          ].map((item, idx) => (
            <details key={item.q} style={{
              padding: '16px 22px',
              borderBottom: idx < 3 ? '1px solid var(--border-light)' : 'none',
              background: 'transparent',
              borderRadius: 0,
            }}>
              <summary style={{
                cursor: 'pointer',
                fontWeight: 800,
                fontSize: '1rem',
                color: 'var(--text-primary)',
                listStyle: 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <span>{item.q}</span>
                <i className="fas fa-chevron-down" style={{
                  color: 'var(--gold)',
                  transition: 'transform 0.3s',
                  fontSize: '0.8rem',
                }} />
              </summary>
              <p style={{
                margin: '12px 0 0 0',
                color: 'var(--text-secondary)',
                lineHeight: 1.8,
                fontSize: '0.9rem',
              }}>
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section style={{ padding: '36px 0' }}>
        <div
          style={{
            borderRadius: 18,
            border: '1px solid var(--border-gold)',
            background: 'linear-gradient(135deg, rgba(212,175,55,0.12), rgba(30,58,95,0.07))',
            padding: 18,
            boxShadow: 'var(--shadow-gold)',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 14 }}>
            <div>
              <div style={{ color: 'var(--gold)', fontWeight: 800, fontSize: '0.95rem' }}>✦ جاهزون لبناء شيء مميز</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 900, marginTop: 4 }}>احصل على خطة مشروع خلال وقت قصير</div>
              <div style={{ marginTop: 8, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                اكتب تفاصيلك وسنرد بخطوات واضحة—من المتطلبات حتى الإطلاق.
              </div>
            </div>
            <a href="/contact" className="btn btn-primary" style={{ textDecoration: 'none' }}>
              تواصل معنا
              <i className="fas fa-arrow-left" />
            </a>
          </div>
        </div>
      </section>

      {/* Contact CTA block */}
      <div className="container" style={{ paddingTop: 10, paddingBottom: 30 }}>
        <ContactSection />
      </div>

      <FooterSection />
    </div>
  )
}
