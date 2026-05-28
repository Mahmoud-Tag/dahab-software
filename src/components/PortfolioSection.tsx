'use client'

import { useEffect, useMemo, useState } from 'react'
import { fetchProjects, incrementDownload } from '@/services/projects'
import type { ProjectJson } from '@/types'
import { portfolioTypeLabel } from '@/utils/format'
import { normalizeJsonArray } from '@/utils/serializers'
import ProjectModal from './ProjectModal'
import styles from './PortfolioSection.module.css'

const fallbackImages: Record<string, string> = {
  web: '/portfolio-website.png',
  app: '/portfolio-app.png',
  system: '/portfolio-system.png',
  ecommerce: '/portfolio-ecommerce.png',
  ai: '/portfolio-system.png',
  resource: '/portfolio-system.png',
}

const tabs = [
  { key: 'all', label: 'الكل', icon: 'fas fa-grid-2' },
  { key: 'web', label: 'المواقع', icon: 'fas fa-globe' },
  { key: 'app', label: 'التطبيقات', icon: 'fas fa-mobile-screen-button' },
  { key: 'system', label: 'الأنظمة', icon: 'fas fa-chart-line' },
  { key: 'ecommerce', label: 'المتاجر', icon: 'fas fa-bag-shopping' },
  { key: 'resource', label: 'المصادر', icon: 'fas fa-box-open' },
]

function splitLangs(language: string | null | undefined) {
  return (language || '')
    .split(',')
    .map((l) => l.trim())
    .filter(Boolean)
}

export default function PortfolioSection() {
  const [activeTab, setActiveTab] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<ProjectJson | null>(null)
  const [projects, setProjects] = useState<ProjectJson[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
      .then((data) => {
        setProjects(
          data.map((project) => ({
            ...project,
            image:
              project.image ||
              fallbackImages[project.type || ''] ||
              '/portfolio-website.png',
            tags: normalizeJsonArray(project.tags),
            features: normalizeJsonArray(project.features),
          })),
        )
      })
      .catch((err: unknown) => {
        const msg =
          err instanceof Error ? err.message : 'Failed to load projects'
        console.error(msg)
      })
      .finally(() => setLoading(false))
  }, [])

  const filteredProjects = useMemo(
    () =>
      activeTab === 'all'
        ? projects
        : projects.filter((p) => p.type === activeTab),
    [activeTab, projects],
  )

  const featuredProject = filteredProjects[0] || null
  const secondaryProjects = filteredProjects.slice(1, 7)

  const openProject = (project: ProjectJson) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedProject(null), 250)
  }

  const handleDownloadUpdate = (updated: ProjectJson) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === updated.id ? { ...p, downloads: updated.downloads } : p)),
    )
    setSelectedProject(updated)
  }

  return (
    <section id="portfolio" className={styles.portfolioSection}>
      <div className={styles.portfolioShell}>
        <div className={styles.portfolioHeading}>
          <div>
            <span className={styles.portfolioKicker}>أعمال مختارة</span>
            <h2 className="section-title" style={{ textAlign: 'right' }}>
              نماذج تُظهر كيف يبدو المنتج عندما تُصمم كل طبقة بعناية.
            </h2>
          </div>
          <p className={styles.portfolioDescription}>
            نعرض هنا مجموعة من المشاريع والموارد بتجارب أكثر وضوحاً، مع ترتيب بصري يساعد الزائر
            على فهم قيمة المشروع قبل الدخول في تفاصيله.
          </p>
        </div>

        <div className={styles.filterTabs}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={`${styles.filterBtn} ${activeTab === tab.key ? styles.active : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              <i className={tab.icon} />
              {tab.label}
            </button>
          ))}
        </div>

        {loading && (
          <div className={styles.loadingGrid}>
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className={styles.loadingCard} />
            ))}
          </div>
        )}

        {!loading && filteredProjects.length === 0 && (
          <div className={styles.emptyState}>
            <i className="fas fa-folder-open" />
            <h3>لا توجد عناصر مطابقة حالياً</h3>
            <p>يمكنك تغيير الفلتر أو العودة لاحقاً بعد إضافة المشاريع من لوحة التحكم.</p>
          </div>
        )}

        {!loading && filteredProjects.length > 0 && (
          <>
            {featuredProject && (
              <article className={styles.featuredProject}>
                <div className={styles.featuredProjectMedia}>
                  <img src={featuredProject.image!} alt={featuredProject.title} />
                </div>
                <div className={styles.featuredProjectCopy}>
                  <div className={styles.featuredProjectChips}>
                    <span>{featuredProject.category}</span>
                    <span>{featuredProject.year || '2026'}</span>
                    <span>{portfolioTypeLabel(featuredProject.type)}</span>
                  </div>
                  <h3>{featuredProject.title}</h3>
                  <p>{featuredProject.fullDesc || featuredProject.desc}</p>
                  <div className={styles.featuredProjectTags}>
                    {splitLangs(featuredProject.language).map((lang) => (
                      <span key={lang} className={styles.langBadgeSm}>
                        {lang}
                      </span>
                    ))}
                  </div>
                  <div className={styles.featuredProjectActions}>
                    <button type="button" className="btn-gold" onClick={() => openProject(featuredProject)}>
                      <i className="fas fa-eye" />
                      تفاصيل المشروع
                    </button>
                    {featuredProject.downloadUrl && (
                      <a
                        href={featuredProject.downloadUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.btnCardDownload}
                        onClick={(e) => {
                          e.stopPropagation()
                          incrementDownload(featuredProject.id).catch(() => {})
                        }}
                      >
                        <i className="fas fa-download" />
                        تحميل المشروع
                      </a>
                    )}
                    <a href="#contact" className="btn-outline-gold">
                      أريد مشروعاً مشابهاً
                    </a>
                  </div>
                </div>
              </article>
            )}

            <div className={styles.projectGrid}>
              {secondaryProjects.map((project) => (
                <article
                  key={project.id}
                  className={styles.projectCard}
                  onClick={() => openProject(project)}
                  onKeyDown={(e) => e.key === 'Enter' && openProject(project)}
                  role="button"
                  tabIndex={0}
                >
                  <div className={styles.projectCardMedia}>
                    <img src={project.image!} alt={project.title} />
                  </div>
                  <div className={styles.projectCardCopy}>
                    <div className={styles.projectCardMeta}>
                      <span>{project.category}</span>
                      <span>{portfolioTypeLabel(project.type)}</span>
                    </div>
                    <h3>{project.title}</h3>
                    <p>{project.desc}</p>
                    <div className={styles.projectCardTags}>
                      {splitLangs(project.language).map((lang) => (
                        <span key={lang} className={styles.langBadgeSm}>
                          {lang}
                        </span>
                      ))}
                    </div>
                    {project.downloadUrl && (
                      <div className={styles.projectCardActions}>
                        <a
                          href={project.downloadUrl}
                          target="_blank"
                          rel="noreferrer"
                          className={styles.btnCardDownload}
                          onClick={(e) => {
                            e.stopPropagation()
                            incrementDownload(project.id).catch(() => {})
                          }}
                        >
                          <i className="fas fa-download" />
                          {project.type === 'resource' ? 'تحميل المصدر' : 'تحميل المشروع'}
                        </a>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </>
        )}

        <div className={styles.portfolioCta}>
          <p>إذا كانت لديك فكرة مشابهة، يمكننا تحويلها إلى تجربة رقمية متكاملة خاصة بعلامتك.</p>
          <a href="#contact" className="btn-gold">
            ابدأ مشروعك الآن
          </a>
        </div>

        <ProjectModal
          isOpen={isModalOpen}
          project={selectedProject}
          onClose={closeModal}
          onDownload={handleDownloadUpdate}
        />
      </div>
    </section>
  )
}
