import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import FooterSection from '@/components/FooterSection'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'سياسة الخصوصية | دهب سوفت وير',
  description:
    'تعرف على سياسة الخصوصية الخاصة بدهب سوفت وير وكيف نقوم بجمع واستخدام وحماية بياناتك الشخصية بما يتوافق مع معايير الأمان وقوانين حماية البيانات.',
  alternates: { canonical: '/privacy' },
  robots: { index: true, follow: true },
}

export default function PrivacyPage() {
  return (
    <div className="page-root">
      <Navbar />

      <main id="main-content" style={{ paddingTop: 96 }}>
        <div className="page-container" style={{ paddingTop: 32, paddingBottom: 80, maxWidth: 840 }}>
          <Breadcrumbs
            items={[
              { label: 'الرئيسية', href: '/' },
              { label: 'سياسة الخصوصية' },
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
              <i className="fas fa-shield-alt" aria-hidden="true" />
              الأمان والخصوصية
            </div>
            
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, marginBottom: 16 }}>
              سياسة الخصوصية
            </h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 48, fontSize: '1.05rem' }}>
              آخر تحديث: 10 يوليو 2026
            </p>

            <div className="prose" style={{ lineHeight: 1.8, color: 'var(--text-primary)', fontSize: '1.05rem' }}>
              <p style={{ marginBottom: 24 }}>
                نحن في <strong>دهب سوفت وير (Dahab Software)</strong> نلتزم بحماية خصوصيتك واحترام بياناتك الشخصية. توضح سياسة الخصوصية هذه كيفية جمع واستخدام ومشاركة وحماية معلوماتك عند زيارة موقعنا الإلكتروني أو استخدام خدماتنا البرمجية.
              </p>

              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: 40, marginBottom: 16, color: 'var(--navy-deep)' }}>
                1. المعلومات التي نجمعها
              </h2>
              <p style={{ marginBottom: 12 }}>نقوم بجمع الأنواع التالية من المعلومات:</p>
              <ul style={{ marginBottom: 24, paddingRight: 24, listStyleType: 'disc' }}>
                <li style={{ marginBottom: 8 }}><strong>المعلومات الشخصية:</strong> مثل الاسم، عنوان البريد الإلكتروني، ورقم الهاتف المحمول التي تقدمها عند ملء نماذج التواصل.</li>
                <li style={{ marginBottom: 8 }}><strong>معلومات المشروع:</strong> التفاصيل التقنية ومتطلبات الأعمال التي تشاركها معنا لغرض التسعير أو تنفيذ المشاريع.</li>
                <li style={{ marginBottom: 8 }}><strong>معلومات التقنية:</strong> مثل عنوان IP، نوع المتصفح، نظام التشغيل، وبيانات الاستخدام عبر أدوات التحليل (مثل Google Analytics).</li>
              </ul>

              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: 40, marginBottom: 16, color: 'var(--navy-deep)' }}>
                2. كيف نستخدم معلوماتك؟
              </h2>
              <ul style={{ marginBottom: 24, paddingRight: 24, listStyleType: 'disc' }}>
                <li style={{ marginBottom: 8 }}>الرد على استفساراتك وتقديم استشارات تقنية مخصصة.</li>
                <li style={{ marginBottom: 8 }}>إعداد عروض الأسعار والعقود الخاصة بالمشاريع.</li>
                <li style={{ marginBottom: 8 }}>تحسين جودة خدماتنا وتجربة المستخدم على موقعنا.</li>
                <li style={{ marginBottom: 8 }}>إرسال التحديثات الهامة المتعلقة بخدماتنا (يمكنك إلغاء الاشتراك في أي وقت).</li>
              </ul>

              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: 40, marginBottom: 16, color: 'var(--navy-deep)' }}>
                3. حماية ومشاركة البيانات
              </h2>
              <p style={{ marginBottom: 24 }}>
                نحن لا نقوم ببيع أو تأجير أو مشاركة بياناتك الشخصية مع أطراف ثالثة لأغراض تسويقية. يتم حفظ بياناتك على خوادم آمنة تستخدم أحدث بروتوكولات التشفير (SSL/TLS). لا نشارك بياناتك إلا في الحالات التالية:
              </p>
              <ul style={{ marginBottom: 24, paddingRight: 24, listStyleType: 'disc' }}>
                <li style={{ marginBottom: 8 }}>مع مزودي الخدمات التقنية الموثوقين (مثل خدمات الاستضافة السحابية) والذين يلتزمون بشروط سرية صارمة.</li>
                <li style={{ marginBottom: 8 }}>عندما يكون ذلك مطلوباً بموجب القانون أو استجابة لطلب قانوني رسمي.</li>
              </ul>

              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: 40, marginBottom: 16, color: 'var(--navy-deep)' }}>
                4. ملفات تعريف الارتباط (Cookies)
              </h2>
              <p style={{ marginBottom: 24 }}>
                يستخدم موقعنا ملفات تعريف الارتباط لتحسين تجربة التصفح وفهم كيفية تفاعل الزوار مع الموقع. يمكنك التحكم في إعدادات ملفات تعريف الارتباط من خلال متصفحك.
              </p>

              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: 40, marginBottom: 16, color: 'var(--navy-deep)' }}>
                5. حقوقك
              </h2>
              <p style={{ marginBottom: 12 }}>بموجب قوانين حماية البيانات المعمول بها، يحق لك:</p>
              <ul style={{ marginBottom: 24, paddingRight: 24, listStyleType: 'disc' }}>
                <li style={{ marginBottom: 8 }}>طلب الوصول إلى بياناتك الشخصية التي نحتفظ بها.</li>
                <li style={{ marginBottom: 8 }}>طلب تصحيح أو تحديث البيانات غير الدقيقة.</li>
                <li style={{ marginBottom: 8 }}>طلب حذف بياناتك بالكامل من أنظمتنا (حق النسيان).</li>
              </ul>

              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: 40, marginBottom: 16, color: 'var(--navy-deep)' }}>
                6. تواصل معنا
              </h2>
              <p style={{ marginBottom: 24 }}>
                إذا كانت لديك أي أسئلة أو استفسارات حول سياسة الخصوصية، يرجى التواصل معنا عبر:
                <br /><br />
                <strong>البريد الإلكتروني:</strong> <a href="mailto:info@dahabsoftware.com" style={{ color: 'var(--primary)', fontWeight: 600 }}>info@dahabsoftware.com</a><br />
                <strong>الهاتف / واتساب:</strong> <a href="tel:+201064147224" dir="ltr" style={{ color: 'var(--primary)', fontWeight: 600 }}>+20 106 414 7224</a>
              </p>
            </div>
          </article>
        </div>
      </main>

      <FooterSection />
    </div>
  )
}
