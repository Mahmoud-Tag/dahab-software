'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  const isMobileApp = project.type === 'app'

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className={styles.modalOverlay} 
          onClick={onClose} 
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className={styles.modalWrapper} 
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className={styles.modalContainer}>
              <div className={styles.modalGlow} />
              <button type="button" className={styles.closeBtn} onClick={onClose}>
                <i className="fas fa-times" />
              </button>
              
              <div className={styles.modalContent}>
                <div className={styles.modalBodyScroll}>
                  
                  {/* Presentation Area with Mockups */}
                  <div className={styles.modalImgTop}>
                    {isMobileApp ? (
                      <motion.div 
                        className={styles.mobileMockupContainer}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <div className={styles.mobileMockup}>
                          <div className={styles.mobileNotch} />
                          <img 
                            src={project.image || '/portfolio-app.png'} 
                            alt={project.title} 
                            className={styles.mobileImg} 
                          />
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div 
                        className={styles.browserMockupContainer}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <div className={styles.browserMockup}>
                          <div className={styles.browserHeader}>
                            <div className={styles.browserDots}>
                              <span className={styles.dotRed}></span>
                              <span className={styles.dotYellow}></span>
                              <span className={styles.dotGreen}></span>
                            </div>
                            <div className={styles.browserUrl}>
                              {project.title.toLowerCase().replace(/\s+/g, '-')}.com
                            </div>
                          </div>
                          <img 
                            src={project.image || '/portfolio-website.png'} 
                            alt={project.title} 
                            className={styles.browserImg} 
                          />
                        </div>
                      </motion.div>
                    )}

                    <div className={styles.imgOverlayDetails}>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <span className={styles.modalCatBadge}>
                          <i className={project.catIcon || 'fas fa-folder'} />
                          {project.category}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-md border border-white/10 ${project.status === 'development' ? 'bg-rose-500/80 text-white' : 'bg-emerald-500/80 text-white'}`}>
                          {project.status === 'development' ? 'قيد التطوير' : 'متاح'}
                        </span>
                      </div>
                      <span className={styles.modalYear}>
                        {project.year && (
                          <>
                            {project.year}
                            <span className={styles.sep}>|</span>
                          </>
                        )}
                        <span className={styles.langBadgesContainer}>
                          {langs.slice(0, 3).map((lang) => (
                            <span key={lang} className={styles.langTag}>
                              <i className="fas fa-code" />
                              {lang}
                            </span>
                          ))}
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className={styles.modalInfoSection}>
                    <h3 className={styles.modalTitle}>{project.title}</h3>
                    <div className={styles.modalTags}>
                      {langs.map((lang) => (
                        <span key={lang} className={styles.tagBadge}>
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
                            <motion.li 
                              key={i} 
                              className={styles.featureItem}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 + (i * 0.05) }}
                            >
                              <i className="fas fa-check-circle" />
                              <span>{feat}</span>
                            </motion.li>
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
                        {project.websiteUrl && project.type === 'web' && (
                          <a
                            href={project.websiteUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-full bg-cyan-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-cyan-400"
                          >
                            <i className="fas fa-arrow-up-right-from-square mr-2" />
                            زيارة الموقع
                          </a>
                        )}
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
