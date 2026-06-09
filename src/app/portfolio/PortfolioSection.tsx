'use client'

import { useEffect, useMemo, useState } from 'react'
import { fetchProjects } from '@/services/projects'
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

const colorMap: Record<string, string> = {
  web: 'blue',
  app: 'purple',
  system: 'navy',
  ecommerce: 'teal',
  ai: 'dark',
  resource: 'gold',
}

export default function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState('all')
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
      activeFilter === 'all'
        ? projects
        : projects.filter((p) => p.type === activeFilter),
    [activeFilter, projects],
  )

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
    <section className={styles.portfolio} id="portfolio">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            أعمالنا <span className={styles.accentText}>نفخر بها</span>
          </h2>
          <p className={styles.sectionSub}>
            استعرض أحدث أعمالنا ومشاريعنا الناجحة التي ساعدت عملاءنا على تحقيق أهدافهم
          </p>
        </div>
        
        {/* Filters */}
        <div className={styles.portfolioFilters}>
          {[
            { key: 'all', label: 'الكل' },
            { key: 'web', label: 'ويب' },
            { key: 'app', label: 'تطبيقات' },
            { key: 'system', label: 'نظام ERP' },
          ].map((f) => (
            <button
              key={f.key}
              type="button"
              className={`${styles.filterBtn} ${activeFilter === f.key ? styles.filterActive : ''}`}
              onClick={() => setActiveFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
        
        {/* Loading State */}
        {loading && (
          <div className={styles.loadingGrid}>
            {[1, 2, 3].map((item) => (
              <div key={item} className={styles.loadingCard} />
            ))}
          </div>
        )}
        
        {/* Empty State */}
        {!loading && filteredProjects.length === 0 && (
          <div className={styles.emptyState}>
            <i className="fas fa-folder-open"></i>
            <h3>لا توجد عناصر مطابقة حالياً</h3>
            <p>يمكنك تغيير الفلتر أو العودة لاحقاً بعد إضافة المشاريع من لوحة التحكم.</p>
          </div>
        )}
        
        {/* Projects Grid */}
        {!loading && filteredProjects.length > 0 && (
          <div className={styles.portfolioGrid}>
            {filteredProjects.map((item) => (
              <div
                key={item.id}
                className={styles.portfolioCard}
                onClick={() => openProject(item)}
              >
                <div className={styles.portfolioThumb}>
                  <div className={`${styles.portfolioThumbBg} ${styles[colorMap[item.type ?? ''] || 'blue']}`}>
                    <div className={styles.portfolioThumbInner}>
                      <span style={{ fontSize: '2.5rem' }}>{item.catIcon || '📊'}</span>
                      <strong>{item.title}</strong>
                      <span className={styles.projectTypeTag}>
                        {portfolioTypeLabel(item.type)}
                      </span>
                    </div>
                  </div>
                  <div className={styles.portfolioThumbOverlay}>
                    <span className={styles.portfolioOverlayLink}>
                      عرض التفاصيل
                      <i className="fas fa-arrow-right"></i>
                    </span>
                  </div>
                </div>
                 <div className={styles.portfolioInfo}>
                   <span className={styles.portfolioTag}>{item.category}</span>
                   <h3 className={styles.portfolioTitle}>{item.title}</h3>
                   <p className={styles.portfolioSub}>{item.desc}</p>
                   {item.image && (
                     <img
                       src={item.image}
                       alt={item.title}
                       className={styles.projectImage}
                     />
                   )}
                   <div className={styles.projectMeta}>
                     <span className={styles.statsItem}>
                       <i className="fas fa-eye"></i>
                       <span>{item.views || 0}</span>
                     </span>
                     <span className={styles.statsItem}>
                       <i className="fas fa-download"></i>
                       <span>{item.downloads || 0}</span>
                     </span>
                     <span className={styles.statsItem}>
                       <i className="fas fa-clock"></i>
                       <span>{item.year || ''}</span>
                     </span>
                   </div>
                 </div>
              </div>
            ))}
          </div>
        )}
        
        {/* View All Button */}
        {!loading && filteredProjects.length > 0 && (
          <div className={styles.viewAllContainer}>
            <a href="#contact" className={styles.btnSecondary}>
              عرض جميع الأعمال
              <i className="fas fa-arrow-right"></i>
            </a>
          </div>
        )}
      </div>

      {selectedProject && (
        <ProjectModal
          isOpen={isModalOpen}
          project={selectedProject}
          onClose={closeModal}
          onDownload={handleDownloadUpdate}
        />
      )}
    </section>
  )
}


