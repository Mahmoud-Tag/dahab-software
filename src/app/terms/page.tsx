import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import FooterSection from '@/components/FooterSection'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'الشروط والأحكام | دهب سوفت وير',
  description:
    'الشروط والأحكام التي تحكم استخدام خدمات وموقع دهب سوفت وير. يرجى قراءة هذه الشروط بعناية قبل التعاقد أو استخدام خدماتنا.',
  alternates: { canonical: '/terms' },
  robots: { index: true, follow: true },
}

export default function TermsPage() {
  return (
    <div className="page-root">
      <Navbar />

      <main id="main-content" style={{ paddingTop: 96 }}>
        <div className="page-container" style={{ paddingTop: 32, paddingBottom: 80, maxWidth: 840 }}>
          <Breadcrumbs
            items={[
              { label: 'الرئيسية', href: '/' },
              { label: 'الشروط والأحكام' },
            ]}
          />

          <article
            style={{
              background: '#fff',
              padding: 'clamp(32px, 5vw, 64px)',
              borderRadius: 24,
              border: '1px solid var(--border)',
              marginTop: 40,
            }}
          >
            <div className="section-label-pill" style={{ marginBottom: 20 }}>
              <i className="fas fa-file-contract" aria-hidden="true" />
              الالتزامات القانونية
            </div>
            
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, marginBottom: 16 }}>
              الشروط والأحكام
            </h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 48, fontSize: '1.05rem' }}>
              آخر تحديث: 10 يوليو 2026
            </p>

            <div className="prose" style={{ lineHeight: 1.8, color: 'var(--text-primary)', fontSize: '1.05rem' }}>
              <p style={{ marginBottom: 24 }}>
                مرحباً بك في <strong>دهب سوفت وير</strong>. تنظم هذه الشروط والأحكام استخدامك لموقعنا الإلكتروني والخدمات البرمجية التي نقدمها. بمجرد تصفحك للموقع أو طلبك لإحدى خدماتنا، فإنك توافق على الالتزام الكامل بهذه الشروط.
              </p>

              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: 40, marginBottom: 16, color: 'var(--navy-deep)' }}>
                1. نطاق الخدمات
              </h2>
              <p style={{ marginBottom: 24 }}>
                نقدم خدمات تصميم وتطوير مواقع الويب، تطبيقات الجوال، أنظمة تخطيط موارد المؤسسات (ERP)، وحلول الذكاء الاصطناعي. يتم تحديد نطاق كل مشروع، والجدول الزمني، والتكلفة في عرض سعر وعقد منفصل يُوقع بين دهب سوفت وير والعميل.
              </p>

              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: 40, marginBottom: 16, color: 'var(--navy-deep)' }}>
                2. الالتزامات والتسليم
              </h2>
              <ul style={{ marginBottom: 24, paddingRight: 24, listStyleType: 'disc' }}>
                <li style={{ marginBottom: 8 }}>نلتزم بتسليم المشاريع وفقاً للمواصفات المتفق عليها في العقد المبرم.</li>
                <li style={{ marginBottom: 8 }}>يجب على العميل توفير جميع المواد اللازمة (نصوص، صور، بيانات) في الوقت المحدد لضمان عدم تأخير الجدول الزمني للمشروع.</li>
                <li style={{ marginBottom: 8 }}>أي متطلبات إضافية خارج نطاق العقد الأصلي سيتم تقييمها وإضافتها بتكلفة إضافية.</li>
              </ul>

              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: 40, marginBottom: 16, color: 'var(--navy-deep)' }}>
                3. حقوق الملكية الفكرية
              </h2>
              <p style={{ marginBottom: 24 }}>
                تنتقل حقوق الملكية الفكرية للكود المصدري (Source Code) والمخرجات النهائية للعميل فور سداد كافة المستحقات المالية المتفق عليها، ما لم ينص العقد على غير ذلك. تحتفظ دهب سوفت وير بحق عرض المشاريع المنفذة في معرض أعمالها (Portfolio) لأغراض تسويقية.
              </p>

              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: 40, marginBottom: 16, color: 'var(--navy-deep)' }}>
                4. سياسة الدفع
              </h2>
              <p style={{ marginBottom: 24 }}>
                يتم تقسيم الدفعات المالية للمشاريع عادةً إلى دفعات (مقدمة، عند التسليم التجريبي، وعند التسليم النهائي) ويتم توضيح ذلك تفصيلياً في العقد. يحق لدهب سوفت وير تعليق العمل في حال التأخر عن سداد الدفعات المستحقة.
              </p>

              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: 40, marginBottom: 16, color: 'var(--navy-deep)' }}>
                5. الضمان والدعم الفني
              </h2>
              <p style={{ marginBottom: 24 }}>
                نقدم فترة ضمان ودعم فني مجاني لمعالجة أي أخطاء برمجية (Bugs) لمدة يتفق عليها في العقد بدءاً من تاريخ التسليم. لا يشمل هذا الضمان إضافة ميزات جديدة أو إصلاح الأعطال الناتجة عن سوء استخدام العميل أو تعديلات طرف ثالث.
              </p>

              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: 40, marginBottom: 16, color: 'var(--navy-deep)' }}>
                6. إخلاء المسؤولية
              </h2>
              <p style={{ marginBottom: 24 }}>
                نحن نسعى لتقديم خدمات بأعلى معايير الجودة والأمان، ولكننا لا نتحمل مسؤولية أي أضرار غير مباشرة أو خسائر في الأرباح قد تنشأ عن استخدام أنظمتنا، إلا في حدود ما ينص عليه القانون المصري.
              </p>

              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: 40, marginBottom: 16, color: 'var(--navy-deep)' }}>
                7. التعديلات
              </h2>
              <p style={{ marginBottom: 24 }}>
                يُرجى مراجعة هذه الشروط والأحكام بشكل دوري. نحتفظ بالحق في تعديلها في أي وقت دون إشعار مسبق. استمرار استخدامك لخدماتنا بعد التعديلات يُعد موافقة عليها.
              </p>
            </div>
          </article>
        </div>
      </main>

      <FooterSection />
    </div>
  )
}
