import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getPartnership } from '@/api/partnerships/service'
import type { Metadata } from 'next'
import ShareButton from './ShareButton'

// ─── تحسين SEO ──────────────────────────────────────────────
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id, 10)
  if (isNaN(id)) return { title: 'شريك غير موجود' }

  const partnership = await getPartnership(id).catch(() => null)
  if (!partnership) {
    return { title: 'شريك غير موجود' }
  }

  return {
    title: `${partnership.title} - شراكة داهب سوفت وير`,
    description: partnership.desc || partnership.fullDesc?.slice(0, 160) || 'تفاصيل الشراكة',
    openGraph: {
      title: partnership.title,
      description: partnership.desc || '',
      images: partnership.image ? [partnership.image] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: partnership.title,
      description: partnership.desc || '',
      images: partnership.image ? [partnership.image] : [],
    },
  }
}

// ─── توليد المسارات الثابتة (اختياري لتحسين الأداء) ────────
export async function generateStaticParams() {
  // يمكنك جلب جميع المعرفات من قاعدة البيانات إذا كان العدد صغيراً
  // وإلا فاستخدم revalidate مع ISR
  return []
}

// ─── الصفحة الرئيسية ────────────────────────────────────────
export default async function PartnershipPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id, 10)
  if (isNaN(id)) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12">
        <p className="text-center text-slate-500">معرّف غير صالح.</p>
      </div>
    )
  }

  const partnership = await getPartnership(id)
  if (!partnership) notFound()

  // ─── تحويل التاريخ إلى صيغة مقروءة ──────────────────────
  const formatDate = (date: Date | string) => {
    if (!date) return ''
    const d = typeof date === 'string' ? new Date(date) : date
    return new Intl.DateTimeFormat('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(d)
  }

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 md:px-8 text-slate-900">
      <div className="mx-auto max-w-6xl">
        {/* زر العودة */}
        <Link
          href="/partnerships"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-8 group"
        >
          <i className="fas fa-arrow-right text-sm group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">العودة إلى قائمة الشركاء</span>
        </Link>

        {/* البطاقة الرئيسية */}
        <article className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/50">
          {/* شريط ذهبي علوي */}
          <div className="h-1 w-full bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-80" />

          {/* توهجات خلفية */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" />

          {/* ── منطقة الصورة ── */}
          <div className="relative h-72 md:h-96 overflow-hidden bg-slate-100">
            {partnership.image ? (
              <Image
                src={partnership.image}
                alt={partnership.title}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="h-24 w-24 rounded-2xl border border-slate-200 bg-white shadow-sm flex items-center justify-center text-slate-400">
                    <i className="fas fa-handshake text-4xl" />
                  </div>
                  <span className="text-slate-400 text-sm tracking-widest uppercase font-medium">شعار الشريك</span>
                </div>
              </div>
            )}

            {/* تدرج سفلي لتحسين قراءة النص */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />

            {/* حالة الشريك */}
            <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full border border-white/20 bg-white/95 px-4 py-2 text-sm font-bold text-slate-800 shadow-sm backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              {partnership.status || 'نشط'}
            </div>

            {/* العنوان واسم الشريك فوق الصورة */}
            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg">
                {partnership.title}
              </h1>
              {partnership.partnerName && (
                <p className="mt-2 flex items-center gap-2 text-white/90 text-lg drop-shadow-md font-medium">
                  <i className="fas fa-building text-white/70" />
                  {partnership.partnerName}
                </p>
              )}
            </div>
          </div>

          {/* ── المحتوى النصي ── */}
          <div className="p-6 md:p-8 lg:p-10 space-y-6">
            {/* معلومات سريعة */}
            <div className="flex flex-wrap gap-4 text-sm text-slate-600 font-medium">
              {partnership.created_at && (
                <span className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5">
                  <i className="fas fa-calendar-plus text-amber-500" />
                  أُضيفت: {formatDate(partnership.created_at)}
                </span>
              )}
              {partnership.updated_at && partnership.updated_at !== partnership.created_at && (
                <span className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5">
                  <i className="fas fa-edit text-amber-500" />
                  آخر تحديث: {formatDate(partnership.updated_at)}
                </span>
              )}
            </div>

            {/* الوصف المختصر */}
            {partnership.desc && (
              <div className="border-t border-slate-100 pt-6">
                <h2 className="text-xl font-bold text-slate-800 mb-3">نبذة مختصرة</h2>
                <p className="text-slate-600 text-base md:text-lg leading-relaxed">{partnership.desc}</p>
              </div>
            )}

            {/* الوصف الكامل (يدعم HTML) */}
            {partnership.fullDesc && (
              <div className="border-t border-slate-100 pt-6">
                <h2 className="text-xl font-bold text-slate-800 mb-4">تفاصيل الشراكة</h2>
                <div
                  className="text-slate-600 leading-relaxed text-base md:text-lg prose prose-slate max-w-none"
                  dangerouslySetInnerHTML={{ __html: partnership.fullDesc }}
                />
              </div>
            )}

            {/* رابط الموقع */}
            {partnership.websiteUrl && (
              <div className="border-t border-slate-100 pt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-50 text-amber-500">
                  <i className="fas fa-globe" />
                </div>
                <a
                  href={partnership.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-600 font-medium hover:text-amber-700 hover:underline transition"
                >
                  {partnership.websiteUrl}
                </a>
              </div>
            )}

            {/* ── أزرار الإجراءات ── */}
            <div className="border-t border-slate-100 pt-6 flex flex-wrap gap-4">
              {partnership.websiteUrl && (
                <a
                  href={partnership.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold transition-all hover:from-amber-600 hover:to-amber-700 shadow-md hover:shadow-lg active:scale-95"
                >
                  <i className="fas fa-external-link-alt" />
                  زيارة الموقع الرسمي
                </a>
              )}
              <Link
                href="/partnerships"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold transition-all hover:bg-slate-50 hover:text-slate-900 shadow-sm hover:shadow active:scale-95"
              >
                <i className="fas fa-arrow-right" />
                العودة إلى القائمة
              </Link>
              <ShareButton title={partnership.title} desc={partnership.desc} />
            </div>
          </div>

          {/* زوايا ديكورية */}
          <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full border border-slate-100" />
          <div className="absolute -top-20 -left-20 h-40 w-40 rounded-full border border-slate-100" />
        </article>
      </div>
    </main>
  )
}