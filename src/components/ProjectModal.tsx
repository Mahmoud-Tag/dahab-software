'use client'

import { useEffect } from 'react'
import { incrementDownload } from '@/services/projects'
import type { ProjectJson } from '@/types'
import styles from './ProjectModal.module.css'

type Props = {
  isOpen: boolean
  project: ProjectJson | null
  onClose: () => void
  onDownload?: (project: ProjectJson) => void
}

function splitLangs(language: string | null | undefined) {
  return (language || '')
    .split(',')
    .map((l) => l.trim())
    .filter(Boolean)
}

export default function ProjectModal({
  isOpen,
  project,
  onClose,
  onDownload,
}: Props) {
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [isOpen, onClose])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleDownload = async () => {
    if (!project?.id) return
    try {
      const updated = await incrementDownload(project.id)
      onDownload?.(updated)
    } catch (error) {
      console.error('Error incrementing downloads:', error)
    }
  }

  if (!isOpen || !project) return null

  const langs = splitLangs(project.language)

  return (
    <div className={styles.modalOverlay} onClick={onClose} role="presentation">
      <div className={styles.modalWrapper} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalContainer}>
          <div className={styles.modalGlow} />
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            <i className="fas fa-times" />
          </button>
          <div className={styles.modalContent}>
            <div className={styles.modalBodyScroll}>
              <div className={styles.modalImgTop}>
                <img
                  src={project.image || '/portfolio-website.png'}
                  alt={project.title}
                  className={styles.projectFullImg}
                />
                <div className={styles.imgOverlayDetails}>
                  <span className={styles.modalCatBadge}>
                    <i className={project.catIcon || 'fas fa-folder'} />
                    {project.category}
                  </span>
                  <span className={styles.modalYear}>
                    <span className={styles.langBadgesContainer}>
                      {langs.map((lang) => (
                        <span key={lang} className={styles.langTag}>
                          <i className="fas fa-code" />
                          {lang}
                        </span>
                      ))}
                    </span>
                    <span className={styles.sep}>|</span>
                    {project.year}
                  </span>
                </div>
              </div>

              <div className={styles.modalInfoSection}>
                <h3 className={styles.modalTitle}>{project.title}</h3>
                <div className={styles.modalTags}>
                  {langs.map((lang) => (
                    <span key={lang} className={styles.tagBadge}>
                      <i className="fas fa-code" style={{ marginLeft: '0.25rem' }} />
                      {lang}
                    </span>
                  ))}
                </div>
                <div className={styles.modalDescription}>
                  <h4 className={styles.infoLabel}>عن المشروع</h4>
                  <p className={styles.descText}>{project.fullDesc || project.desc}</p>
                </div>
                {project.features?.length > 0 && (
                  <div className={styles.modalFeatures}>
                    <h4 className={styles.infoLabel}>الميزات المدمجة</h4>
                    <ul className={styles.featuresList}>
                      {project.features.map((feat, i) => (
                        <li key={i} className={styles.featureItem}>
                          <i className="fas fa-check-circle text-gold" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className={styles.modalFooterBox}>
                  {project.downloads !== undefined && (
                    <div className={styles.statsGroup}>
                      <div className={styles.statItem}>
                        <i className="fas fa-download" />
                        <div className={styles.statInfo}>
                          <span className={styles.statValue}>{project.downloads}</span>
                          <span className={styles.statLabel}>تحميل</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className={styles.actionGroup}>
                    {project.downloadUrl && (
                      <a
                        href={project.downloadUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.btnDownload}
                        onClick={handleDownload}
                      >
                        <i className="fas fa-cloud-download-alt" />
                        {project.type === 'resource' ? 'تحميل المصدر' : 'تحميل المشروع'}
                      </a>
                    )}
                    <a href="#contact" className={styles.btnContact} onClick={onClose}>
                      اطلب مشروع مشابه
                      <i className="fas fa-arrow-left" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
