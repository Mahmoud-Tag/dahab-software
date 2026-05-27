'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getAdminToken, goToLogin } from '@/lib/api-client'
import { logout as authLogout } from '@/services/auth'
import { fetchMessages, deleteMessage } from '@/services/messages'
import { fetchProjects, deleteProject } from '@/services/projects'
import type { MessageJson, ProjectJson } from '@/types'
import { formatDate, formatNumber } from '@/utils/format'
import ProjectFormModal from './ProjectFormModal'

type TabKey = 'projects' | 'resources' | 'messages'

export default function AdminDashboard() {
  const router = useRouter()
  const [projects, setProjects] = useState<ProjectJson[]>([])
  const [messages, setMessages] = useState<MessageJson[]>([])
  const [showModal, setShowModal] = useState(false)
  const [selectedProject, setSelectedProject] = useState<ProjectJson | null>(null)
  const [activeTab, setActiveTab] = useState<TabKey>('projects')
  const [searchQuery, setSearchQuery] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [lastUpdated, setLastUpdated] = useState('')
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)
  const [deletingKey, setDeletingKey] = useState('')

  const normalize = (value: unknown) => String(value ?? '').toLowerCase()
  const initial = (name: string) =>
    String(name ?? '؟').trim().charAt(0).toUpperCase() || '؟'
  const itemSummary = (item: ProjectJson) =>
    item?.desc || item?.fullDesc || 'لا يوجد وصف متاح لهذا العنصر حتى الآن.'

  const stats = useMemo(
    () => ({
      projects: projects.filter((item) => item.type !== 'resource').length,
      resources: projects.filter((item) => item.type === 'resource').length,
      messages: messages.length,
      downloads: projects.reduce((total, item) => total + Number(item.downloads || 0), 0),
      total: projects.length + messages.length,
    }),
    [projects, messages],
  )

  const tabs = useMemo(
    () => [
      {
        key: 'projects' as const,
        label: 'المشاريع',
        desc: 'الأعمال والخدمات المنشورة.',
        icon: 'fas fa-rocket',
        count: stats.projects,
        active: 'border-cyan-300/25 bg-cyan-400/10',
        pill: 'border-cyan-300/20 bg-cyan-400/10 text-cyan-100',
        badgeClass: 'border-cyan-300/20 bg-cyan-400/10 text-cyan-100',
        iconClass: 'bg-cyan-400/12 text-cyan-100 ring-cyan-300/20',
      },
      {
        key: 'resources' as const,
        label: 'المصادر',
        desc: 'الأدوات والملفات وروابط التحميل.',
        icon: 'fas fa-box-open',
        count: stats.resources,
        active: 'border-amber-300/25 bg-amber-400/10',
        pill: 'border-amber-300/20 bg-amber-400/10 text-amber-100',
        badgeClass: 'border-amber-300/20 bg-amber-400/10 text-amber-100',
        iconClass: 'bg-amber-400/12 text-amber-100 ring-amber-300/20',
      },
      {
        key: 'messages' as const,
        label: 'الرسائل',
        desc: 'الوارد من العملاء والمتابعين.',
        icon: 'fas fa-inbox',
        count: stats.messages,
        active: 'border-emerald-300/25 bg-emerald-400/10',
        pill: 'border-emerald-300/20 bg-emerald-400/10 text-emerald-100',
        badgeClass: 'border-emerald-300/20 bg-emerald-400/10 text-emerald-100',
        iconClass: 'bg-emerald-400/12 text-emerald-100 ring-emerald-300/20',
      },
    ],
    [stats],
  )

  const activeTabMeta = tabs.find((tab) => tab.key === activeTab) || tabs[0]

  const filteredItems = useMemo(() => {
    let list = projects
    if (activeTab === 'projects') list = list.filter((item) => item.type !== 'resource')
    if (activeTab === 'resources') list = list.filter((item) => item.type === 'resource')
    const query = normalize(searchQuery)
    return !query
      ? list
      : list.filter((item) =>
          [item.title, item.category, item.desc, item.fullDesc, item.type].some((field) =>
            normalize(field).includes(query),
          ),
        )
  }, [activeTab, projects, searchQuery])

  const filteredMessages = useMemo(() => {
    const query = normalize(searchQuery)
    return !query
      ? messages
      : messages.filter((message) =>
          [message.name, message.email, message.message].some((field) =>
            normalize(field).includes(query),
          ),
        )
  }, [messages, searchQuery])

  const canCreate = activeTab !== 'messages'
  const primaryActionLabel =
    activeTab === 'resources' ? 'إضافة مصدر جديد' : 'إضافة مشروع جديد'
  const searchPlaceholder =
    activeTab === 'messages'
      ? 'ابحث بالاسم أو البريد أو محتوى الرسالة...'
      : 'ابحث بالعنوان أو التصنيف أو الوصف...'
  const resultsLabel = `${formatNumber(activeTab === 'messages' ? filteredMessages.length : filteredItems.length)} ${
    activeTab === 'messages' ? 'رسالة' : activeTab === 'resources' ? 'مورد' : 'مشروع'
  } في العرض الحالي`
  const lastUpdatedLabel = lastUpdated ? formatDate(lastUpdated) : 'لم يتم التحديث بعد'

  const summaryCards = [
    {
      key: 'projects',
      label: 'المشاريع',
      value: stats.projects,
      hint: 'عناصر قابلة للتحرير والنشر.',
      icon: 'fas fa-layer-group',
      shell: 'border-cyan-300/15 bg-cyan-400/8',
      iconClass: 'bg-cyan-400/12 text-cyan-100 ring-cyan-300/20',
    },
    {
      key: 'resources',
      label: 'المصادر',
      value: stats.resources,
      hint: 'ملفات وأدوات وروابط جاهزة.',
      icon: 'fas fa-toolbox',
      shell: 'border-amber-300/15 bg-amber-400/8',
      iconClass: 'bg-amber-400/12 text-amber-100 ring-amber-300/20',
    },
    {
      key: 'downloads',
      label: 'التحميلات',
      value: stats.downloads,
      hint: 'قياس بسيط للأداء الحالي.',
      icon: 'fas fa-download',
      shell: 'border-emerald-300/15 bg-emerald-400/8',
      iconClass: 'bg-emerald-400/12 text-emerald-100 ring-emerald-300/20',
    },
    {
      key: 'messages',
      label: 'الرسائل',
      value: stats.messages,
      hint: 'الوارد الحالي من نموذج التواصل.',
      icon: 'fas fa-envelope-open-text',
      shell: 'border-fuchsia-300/15 bg-fuchsia-400/8',
      iconClass: 'bg-fuchsia-400/12 text-fuchsia-100 ring-fuchsia-300/20',
    },
  ]

  const loadData = useCallback(async (silent = false) => {
    const token = getAdminToken()
    if (!token) {
      goToLogin()
      return
    }
    if (silent) setRefreshing(true)
    else setLoading(true)
    setErrorMessage('')

    try {
      const [projectsResult, messagesResult] = await Promise.allSettled([
        fetchProjects(),
        fetchMessages(),
      ])
      if (projectsResult.status === 'fulfilled') setProjects(projectsResult.value)
      else setErrorMessage('تعذر تحميل المشاريع حالياً.')
      if (messagesResult.status === 'fulfilled') setMessages(messagesResult.value)
      else
        setErrorMessage((prev) =>
          prev ? `${prev} وتعذر تحميل الرسائل أيضاً.` : 'تعذر تحميل الرسائل حالياً.',
        )
      setLastUpdated(new Date().toISOString())
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : 'حدث خطأ غير متوقع أثناء تحديث لوحة التحكم.'
      setErrorMessage(msg)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [])

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (!getAdminToken()) {
      router.push('/admin/login')
      return
    }
    loadData()
  }, [router, loadData])

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setSearchQuery('')
  }, [activeTab])

  const handleDeleteProject = async (id: number) => {
    if (!confirm('هل تريد حذف هذا العنصر نهائياً؟')) return
    setDeletingKey(`project-${id}`)
    try {
      await deleteProject(id)
      await loadData(true)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'تعذر حذف العنصر'
      setErrorMessage(msg)
    } finally {
      setDeletingKey('')
    }
  }

  const handleDeleteMessage = async (id: number) => {
    if (!confirm('هل تريد حذف هذه الرسالة؟')) return
    setDeletingKey(`message-${id}`)
    try {
      await deleteMessage(id)
      await loadData(true)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'تعذر حذف الرسالة'
      setErrorMessage(msg)
    } finally {
      setDeletingKey('')
    }
  }

  const copyEmail = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email)
    } catch {
      setErrorMessage('تعذر نسخ البريد الإلكتروني من هذا المتصفح.')
    }
  }

  const handleLogout = async () => {
    setLoggingOut(true)
    try {
      await authLogout()
    } finally {
      goToLogin()
      setLoggingOut(false)
    }
  }

  const splitLangs = (language: string | null | undefined) =>
    (language || '')
      .split(',')
      .map((l) => l.trim())
      .filter(Boolean)

  return (
    <div className="min-h-screen bg-[#050816] font-['Cairo'] text-slate-100">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-14rem] h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="absolute right-[-6rem] top-1/3 h-64 w-64 rounded-full bg-amber-400/8 blur-3xl" />
        <div className="absolute bottom-[-7rem] left-[-4rem] h-72 w-72 rounded-full bg-amber-400/6 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-[1500px]">
        <aside className="hidden w-80 shrink-0 border-l border-white/10 bg-slate-950/80 px-6 py-8 backdrop-blur-xl lg:flex lg:flex-col">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-5 shadow-[0_24px_80px_rgba(2,6,23,0.42)]">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400/15 text-2xl text-amber-200 ring-1 ring-amber-300/20">
                <i className="fas fa-gem" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-amber-200/70">Dahab Admin</p>
                <h1 className="mt-1 text-2xl font-black text-white">لوحة التحكم</h1>
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              واجهة أوضح لإدارة المشاريع والموارد ورسائل العملاء من مكان واحد.
            </p>
          </div>

          <nav className="mt-8 space-y-3">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                className={`w-full rounded-[24px] border px-4 py-4 text-right transition ${
                  activeTab === tab.key
                    ? tab.active
                    : 'border-white/10 bg-white/[0.03] hover:border-white/15 hover:bg-white/[0.06]'
                }`}
                onClick={() => setActiveTab(tab.key)}
              >
                <div className="flex items-start gap-4">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ring-1 ${tab.iconClass}`}>
                    <i className={tab.icon} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <p className="truncate text-base font-bold text-white">{tab.label}</p>
                      <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${tab.badgeClass}`}>
                        {formatNumber(tab.count)}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-slate-400">{tab.desc}</p>
                  </div>
                </div>
              </button>
            ))}
          </nav>

          <div className="mt-8 rounded-[26px] border border-white/10 bg-white/[0.04] p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-amber-200/70">ملخص سريع</p>
            <div className="mt-4 space-y-3 text-sm text-slate-400">
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-500">آخر تحديث</span>
                <span className="font-semibold text-white">{lastUpdatedLabel}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-500">إجمالي العناصر</span>
                <span className="font-semibold text-white">{formatNumber(stats.total)}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-500">إجمالي التحميلات</span>
                <span className="font-semibold text-white">{formatNumber(stats.downloads)}</span>
              </div>
            </div>
            <button
              type="button"
              className="mt-5 flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm font-semibold text-white transition hover:border-white/15 hover:bg-white/[0.08] disabled:opacity-60"
              disabled={refreshing}
              onClick={() => loadData(true)}
            >
              <i className={`fas ${refreshing ? 'fa-spinner fa-spin' : 'fa-rotate-right'}`} />
              تحديث البيانات
            </button>
          </div>

          <button
            type="button"
            className="mt-auto flex items-center justify-center gap-3 rounded-[22px] border border-rose-400/20 bg-rose-500/10 px-4 py-4 font-semibold text-rose-100 transition hover:border-rose-300/30 hover:bg-rose-500/15 disabled:opacity-60"
            disabled={loggingOut}
            onClick={handleLogout}
          >
            <i className={`fas ${loggingOut ? 'fa-spinner fa-spin' : 'fa-right-from-bracket'}`} />
            {loggingOut ? 'جاري تسجيل الخروج...' : 'تسجيل الخروج'}
          </button>
        </aside>

        <main className="flex-1 px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
          {/* Mobile header + workspace - truncated for brevity but includes same structure as Vue */}
          <div className="mb-4 flex items-center justify-between lg:hidden">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-amber-200/70">Dahab Admin</p>
              <h1 className="mt-1 text-2xl font-black text-white">لوحة التحكم</h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-slate-100"
                disabled={refreshing}
                onClick={() => loadData(true)}
              >
                <i className={`fas ${refreshing ? 'fa-spinner fa-spin' : 'fa-rotate-right'}`} />
              </button>
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-2xl border border-rose-400/20 bg-rose-500/10 text-rose-100"
                disabled={loggingOut}
                onClick={handleLogout}
              >
                <i className={`fas ${loggingOut ? 'fa-spinner fa-spin' : 'fa-right-from-bracket'}`} />
              </button>
            </div>
          </div>

          {errorMessage && (
            <div className="mb-6 flex items-start justify-between gap-4 rounded-[22px] border border-rose-400/25 bg-rose-500/10 px-4 py-4 text-sm text-rose-50">
              <div className="flex items-start gap-3">
                <i className="fas fa-triangle-exclamation mt-1" />
                <p className="leading-7">{errorMessage}</p>
              </div>
              <button type="button" onClick={() => setErrorMessage('')}>
                <i className="fas fa-xmark" />
              </button>
            </div>
          )}

          <section className="overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/70 p-6 shadow-[0_32px_100px_rgba(2,6,23,0.42)] backdrop-blur-xl sm:p-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.34em] text-amber-400">Command Center</p>
                <h2 className="mt-4 text-3xl font-black text-white">{activeTabMeta.label}</h2>
                <p className="mt-2 text-sm text-slate-400">{activeTabMeta.desc}</p>
              </div>
              {canCreate && (
                <button
                  type="button"
                  className="inline-flex items-center gap-3 rounded-2xl bg-amber-400 px-5 py-3 font-black text-slate-950"
                  onClick={() => {
                    setSelectedProject(null)
                    setShowModal(true)
                  }}
                >
                  <i className="fas fa-plus" />
                  {primaryActionLabel}
                </button>
              )}
            </div>
          </section>

          <section className="mt-6 grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
            {summaryCards.map((card) => (
              <article
                key={card.key}
                className={`rounded-[26px] border p-5 shadow-[0_22px_70px_rgba(2,6,23,0.28)] ${card.shell}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-400">{card.label}</p>
                    <p className="mt-3 text-3xl font-black text-white">{formatNumber(card.value)}</p>
                    <p className="mt-2 text-sm text-slate-400">{card.hint}</p>
                  </div>
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ring-1 ${card.iconClass}`}>
                    <i className={card.icon} />
                  </div>
                </div>
              </article>
            ))}
          </section>

          <section className="mt-6 rounded-[32px] border border-white/10 bg-slate-950/80 backdrop-blur-xl">
            <div className="border-b border-white/10 p-6">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-amber-200/70">Workspace</p>
                  <h3 className="mt-2 text-2xl font-black text-white">{activeTabMeta.label}</h3>
                  <p className="mt-2 text-sm text-slate-400">{resultsLabel}</p>
                </div>
                <div className="relative min-w-[min(100%,21rem)] flex-1">
                  <i className="fas fa-magnifying-glass pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    type="search"
                    placeholder={searchPlaceholder}
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.04] py-3 pr-4 pl-11 text-sm text-white outline-none placeholder:text-slate-500 focus:border-amber-300/40"
                  />
                </div>
              </div>
            </div>

            {loading ? (
              <div className="grid gap-4 p-6 md:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-64 animate-pulse rounded-[24px] border border-white/10 bg-white/[0.04]" />
                ))}
              </div>
            ) : activeTab === 'messages' ? (
              <div className="p-6">
                {filteredMessages.length === 0 ? (
                  <div className="rounded-[26px] border border-dashed border-white/10 px-6 py-14 text-center text-slate-500">
                    لا توجد رسائل مطابقة
                  </div>
                ) : (
                  <div className="grid gap-4 lg:grid-cols-2">
                    {filteredMessages.map((message) => (
                      <article
                        key={message.id}
                        className="flex h-full flex-col rounded-[26px] border border-white/10 bg-white/[0.03] p-5"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-400/15 text-base font-black text-amber-200">
                              {initial(message.name)}
                            </div>
                            <div>
                              <h4 className="text-lg font-bold text-white">{message.name}</h4>
                              <p className="text-sm text-slate-400">{message.email}</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            className="text-rose-100"
                            disabled={deletingKey === `message-${message.id}`}
                            onClick={() => handleDeleteMessage(message.id)}
                          >
                            <i className={`fas ${deletingKey === `message-${message.id}` ? 'fa-spinner fa-spin' : 'fa-trash'}`} />
                          </button>
                        </div>
                        <p className="mt-5 flex-1 text-sm leading-8 text-slate-400">{message.message}</p>
                        <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-slate-500">
                          <span>{formatDate(message.created_at)}</span>
                          <button type="button" className="text-amber-200" onClick={() => copyEmail(message.email)}>
                            نسخ البريد
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="p-6">
                {filteredItems.length === 0 ? (
                  <div className="rounded-[26px] border border-dashed border-white/10 px-6 py-14 text-center text-slate-500">
                    لا توجد عناصر مطابقة
                  </div>
                ) : (
                  <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
                    {filteredItems.map((item) => (
                      <article
                        key={item.id}
                        className="flex h-full flex-col overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.03]"
                      >
                        <div className="relative h-48 overflow-hidden border-b border-white/10">
                          {item.image ? (
                            <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                          ) : (
                            <div className="flex h-full items-center justify-center">
                              <i className={`fas ${item.type === 'resource' ? 'fa-box-open' : 'fa-diagram-project'} text-amber-200`} />
                            </div>
                          )}
                        </div>
                        <div className="flex flex-1 flex-col p-5">
                          <h4 className="text-xl font-black text-white">{item.title}</h4>
                          <p className="mt-2 text-sm text-slate-400">{item.year || 'بدون سنة'}</p>
                          <p className="mt-2 w-fit rounded-full bg-amber-200/30 px-2 py-1 text-md text-white">
                            {formatNumber(item.downloads || 0)} تحميل
                          </p>
                          <p className="mt-4 flex-1 text-sm leading-8 text-slate-400">{itemSummary(item)}</p>
                          <div className="mt-5 flex flex-wrap gap-2">
                            {splitLangs(item.language).map((lang) => (
                              <span
                                key={lang}
                                className="rounded-full border border-amber-400/15 bg-amber-400/5 px-3 py-1 text-xs text-amber-200/90"
                              >
                                {lang}
                              </span>
                            ))}
                          </div>
                          <div className="mt-5 flex items-center justify-end gap-2 border-t border-white/10 pt-4">
                            <button
                              type="button"
                              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]"
                              onClick={() => {
                                setSelectedProject(item)
                                setShowModal(true)
                              }}
                            >
                              <i className="fas fa-pen-to-square" />
                            </button>
                            <button
                              type="button"
                              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-rose-400/15 bg-rose-500/10 text-rose-100"
                              disabled={deletingKey === `project-${item.id}`}
                              onClick={() => handleDeleteProject(item.id)}
                            >
                              <i className={`fas ${deletingKey === `project-${item.id}` ? 'fa-spinner fa-spin' : 'fa-trash'}`} />
                            </button>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            )}
          </section>
        </main>
      </div>

      {showModal && (
        <ProjectFormModal
          project={selectedProject}
          defaultType={activeTab === 'resources' ? 'resource' : 'web'}
          onClose={() => {
            setShowModal(false)
            setSelectedProject(null)
          }}
          onSaved={() => loadData(true)}
        />
      )}
    </div>
  )
}
