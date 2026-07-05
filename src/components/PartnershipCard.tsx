'use client'

import Link from 'next/link'
import type { PartnershipJson } from '@/types'

interface PartnershipCardProps {
  partnership: PartnershipJson
}

export default function PartnershipCard({ partnership }: PartnershipCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0b1120] via-[#0f172a] to-[#0a0f1a] shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:border-yellow-500/40 hover:shadow-[0_20px_60px_-12px_rgba(234,179,8,0.3),0_0_0_1px_rgba(234,179,8,0.15)]">
      
      {/* ── شريط علوي ذهبي ── */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-yellow-400/80 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* ── توهجات خلفية ── */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-yellow-500/10 blur-3xl transition-all duration-700 group-hover:bg-yellow-500/20 group-hover:-right-10" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-blue-500/5 blur-3xl transition-all duration-700 group-hover:bg-blue-500/10" />

      {/* ── حاوية الشعار / الصورة ── */}
      <div className="relative flex h-52 items-center justify-center overflow-hidden bg-[#080d1a] border-b border-white/5">
        {partnership.image ? (
          <img
            src={partnership.image}
            alt={partnership.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-110"
          />
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-yellow-500/20 bg-yellow-500/5 text-yellow-500/80 transition-all duration-300 group-hover:border-yellow-500/40 group-hover:bg-yellow-500/15 group-hover:scale-110 group-hover:shadow-[0_0_30px_-8px_rgba(234,179,8,0.3)]">
              <i className="fas fa-handshake text-3xl" />
            </div>
            <span className="text-[11px] font-medium tracking-[0.2em] text-white/20 uppercase">الشعار</span>
          </div>
        )}

        {/* ── بادج الحالة (نشط) ── */}
        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-[11px] font-bold text-white/80 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          {partnership.status || 'نشط'}
        </div>

        {/* ── أيقونة نجمة تزيينية ── */}
        <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/5 bg-black/30 backdrop-blur-sm transition-all duration-300 group-hover:border-yellow-500/30 group-hover:bg-yellow-500/10">
          <i className="fas fa-star text-[11px] text-white/30 transition-colors group-hover:text-yellow-400" />
        </div>
      </div>

      {/* ── المحتوى النصي ── */}
      <div className="p-5">
        {/* العنوان الرئيسي (اسم الشريك) */}
        <h3 className="text-xl font-extrabold text-white leading-tight transition-colors duration-300 group-hover:text-yellow-400">
          {partnership.title}
        </h3>

        {/* اسم الشركة / الوكيل */}
        {partnership.partnerName && (
          <p className="mt-1.5 flex items-center gap-2 text-sm font-medium text-white/40">
            <i className="fas fa-building text-[10px] text-white/20" />
            {partnership.partnerName}
          </p>
        )}

        {/* الوصف المختصر */}
        <p className="mt-3 text-sm leading-6 text-white/45 line-clamp-2 transition-colors duration-300 group-hover:text-white/60">
          {partnership.desc || 'وصف مختصر غير متوفر بعد.'}
        </p>

        {/* ── الأزرار ── */}
        <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-white/5 pt-4">
          {partnership.websiteUrl && (
            <a
              href={partnership.websiteUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/20 px-4 py-2.5 text-xs font-bold text-yellow-400 transition-all duration-300 hover:from-yellow-500/20 hover:to-amber-500/20 hover:border-yellow-500/40 hover:text-yellow-300 hover:shadow-[0_0_20px_-8px_rgba(234,179,8,0.25)] active:scale-95"
            >
              <i className="fas fa-external-link-alt text-[10px]" />
              زيارة الموقع
            </a>
          )}
          <Link
            href={`/partnerships/${partnership.id}`}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-bold text-white/50 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white/80 active:scale-95"
          >
            <i className="fas fa-arrow-right text-[10px]" />
            التفاصيل
          </Link>
        </div>
      </div>

      {/* ── زوايا ديكورية ── */}
      <div className="absolute -bottom-16 -right-16 h-32 w-32 rounded-full border border-white/5 transition-all duration-700 group-hover:border-yellow-500/20 group-hover:scale-150" />
      <div className="absolute -top-16 -left-16 h-32 w-32 rounded-full border border-white/5 transition-all duration-700 group-hover:border-yellow-500/20 group-hover:scale-150" />
    </article>
  )
}