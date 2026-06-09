'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { fetchProjects } from '@/services/projects'
import type { ProjectJson } from '@/types'
import { portfolioTypeLabel } from '@/utils/format'
import { normalizeJsonArray } from '@/utils/serializers'
import ProjectModal from './ProjectModal'

const fallbackImages: Record<string, string> = {
  web: '/portfolio-website.png',
  app: '/portfolio-app.png',
  system: '/portfolio-system.png',
  ecommerce: '/portfolio-ecommerce.png',
  ai: '/portfolio-system.png',
  resource: '/portfolio-system.png',
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
}

interface PortfolioSectionProps {
  hideHeader?: boolean
}

export default function PortfolioSection({ hideHeader = false }: PortfolioSectionProps) {
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
            image: project.image || fallbackImages[project.type || ''] || '/portfolio-website.png',
            tags: normalizeJsonArray(project.tags),
            features: normalizeJsonArray(project.features),
          }))
        )
      })
      .catch((err: unknown) => {
        console.error(err instanceof Error ? err.message : 'Failed to load projects')
      })
      .finally(() => setLoading(false))
  }, [])

  const filteredProjects = useMemo(
    () => activeFilter === 'all' ? projects : projects.filter((p) => p.type === activeFilter),
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
    setProjects((prev) => prev.map((p) => (p.id === updated.id ? { ...p, downloads: updated.downloads } : p)))
    setSelectedProject(updated)
  }

  return (
    <>
      {!hideHeader && (
        <div className="section-header-row" style={{ marginBottom: 48 }}>
          <div>
            <div className="section-label-pill">
              <i className="fas fa-folder-open" />
              أعمالنا
            </div>
            <h2 className="section-heading">
              مشاريع تصنع <span className="heading-gradient">الفرق</span>
            </h2>
            <p className="section-para" style={{ maxWidth: 560 }}>
              استعرض أحدث أعمالنا ومشاريعنا الناجحة التي ساعدت عملاءنا على تحقيق أهدافهم.
            </p>
          </div>
        </div>
      )}

      {/* Filters */}
      <motion.div 
        className="portfolio-filters"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {[
          { key: 'all', label: 'الكل' },
          { key: 'web', label: 'ويب' },
          { key: 'app', label: 'تطبيقات' },
          { key: 'system', label: 'نظام ERP' },
        ].map((f) => (
          <button
            key={f.key}
            type="button"
            className={`filter-btn ${activeFilter === f.key ? 'active' : ''}`}
            onClick={() => setActiveFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </motion.div>

      {/* Loading */}
      {loading && (
        <div className="portfolio-grid">
          {[1, 2, 3].map((item) => (
            <div key={item} className="premium-card skeleton" style={{ height: 380 }} />
          ))}
        </div>
      )}

      {/* Empty */}
      {!loading && filteredProjects.length === 0 && (
        <div className="empty-state">
          <i className="fas fa-folder-open" />
          <h3>لا توجد مشاريع مطابقة</h3>
          <p>يمكنك تغيير الفلتر لاستعراض المزيد من المشاريع.</p>
        </div>
      )}

      {/* Grid */}
      {!loading && filteredProjects.length > 0 && (
        <motion.div 
          className="portfolio-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {filteredProjects.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="premium-card portfolio-card"
              onClick={() => openProject(item)}
            >
              <div className="portfolio-thumb">
                <img src={item.image!} alt={item.title} className="project-image" />
                <div className="portfolio-thumb-overlay">
                  <span>عرض التفاصيل <i className="fas fa-arrow-left" /></span>
                </div>
              </div>
              <div className="portfolio-info">
                <span className="portfolio-tag">{item.category || portfolioTypeLabel(item.type)}</span>
                <h3 className="portfolio-title">{item.title}</h3>
                <p className="portfolio-desc">{item.desc}</p>
                
                <div className="tech-badges">
                  {item.tags?.slice(0, 3).map((tag, i) => (
                    <span key={i} className="tech-badge">{tag}</span>
                  ))}
                </div>

                <div className="card-footer">
                  <div className="project-meta">
                    <span className="stats-item">
                      <i className="fas fa-eye" /> {item.views || '99+'}
                    </span>
                  </div>
                  <span className="view-btn">
                    التفاصيل
                    <i className="fas fa-arrow-left" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {selectedProject && (
        <ProjectModal
          isOpen={isModalOpen}
          project={selectedProject}
          onClose={closeModal}
          onDownload={handleDownloadUpdate}
        />
      )}
    </>
  )
}
