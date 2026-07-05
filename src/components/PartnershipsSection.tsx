'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { fetchPartnerships } from '@/services/partnerships'
import type { PartnershipJson } from '@/types'
import PartnershipCard from './PartnershipCard'

interface PartnershipsSectionProps {
  title?: string
  description?: string
  limit?: number
  viewAllHref?: string
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0 },
}

export default function PartnershipsSection({
  title = 'شراكاتنا الاستراتيجية',
  description = 'نفخر بشراكاتنا مع أفضل الشركات والمؤسسات، لضمان تقديم حلول متكاملة وموثوقة لعملائنا.',
  limit,
  viewAllHref = '/partnerships',
}: PartnershipsSectionProps) {
  const [items, setItems] = useState<PartnershipJson[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    fetchPartnerships()
      .then((data) => {
        if (!active) return
        setItems(data)
      })
      .catch((err: unknown) => {
        console.error(err)
        setError('تعذر تحميل الشراكات حالياً.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  const visibleItems = useMemo(
    () => (limit ? items.slice(0, limit) : items),
    [items, limit],
  )

  return (
    <motion.section
      className="section-partnerships relative overflow-hidden bg-slate-80 py-24 text-slate-900"
      id="partnerships"
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
    >
      <div className="absolute -right-16 top-14 h-72 w-72 rounded-full bg-gradient-to-br from-amber-200/30 via-transparent to-transparent blur-3xl" aria-hidden="true" />
      <div className="absolute -left-16 bottom-8 h-72 w-72 rounded-full bg-sky-200/25 blur-3xl" aria-hidden="true" />
      <div className="page-container relative z-10">
        <motion.div
          className="section-partnerships-card bg-white/95 border border-slate-200/70 shadow-[0_24px_80px_rgba(15,23,42,0.08)] rounded-[32px] p-8 backdrop-blur-sm"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          <div className="section-label-pill bg-slate-100 border-slate-200 text-slate-800 shadow-sm">
            <i className="fas fa-handshake" />
            شراكاتنا
          </div>
          <div className="section-header-row">
            <div>
              <h2 className="section-heading">
                {title}{' '}
                <span className="heading-gradient">الثقة والاحترافية</span>
              </h2>
              <p className="section-para" style={{ maxWidth: 620 }}>
                {description}
              </p>
            </div>
            {viewAllHref && limit && (
              <Link
                href={viewAllHref}
                className="btn-outline-pill border-slate-200 bg-slate-100 text-slate-700 hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900"
              >
                عرض جميع الشراكات
                <i className="fas fa-arrow-left" />
              </Link>
            )}
          </div>
        </motion.div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {loading ? (
            Array.from({ length: limit || 3 }).map((_, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="h-80 rounded-[28px] border border-slate-200/80 bg-slate-100 animate-pulse"
              />
            ))
          ) : error ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-[28px] border border-rose-200/70 bg-rose-50 p-10 text-center text-sm text-rose-700 shadow-sm"
            >
              <div className="mb-3 text-3xl">⚠️</div>
              {error}
            </motion.div>
          ) : visibleItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-[28px] border border-slate-200/80 bg-slate-50 p-12 text-center text-slate-500 shadow-sm"
            >
              <div className="mb-3 text-3xl">🤝</div>
              لا توجد شراكات مسجلة حالياً.
            </motion.div>
          ) : (
            visibleItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
              >
                <PartnershipCard partnership={item} />
              </motion.div>
            ))
          )}
        </div>
      </div>
    </motion.section>
  )
}