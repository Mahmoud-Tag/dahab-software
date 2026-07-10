'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { submitContact } from '@/services/messages'
import styles from './ContactSection.module.css'

const contactInfo = [
  { icon: 'fas fa-phone', label: 'هاتف', value: '+20 106 414 7224', dir: 'ltr' as const },
  { icon: 'fas fa-envelope', label: 'البريد الإلكتروني', value: 'info@dahabsoftware.com', dir: 'ltr' as const },
  { icon: 'fab fa-whatsapp', label: 'واتساب', value: '01064147224', dir: 'ltr' as const },
]

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setSuccess(false)
    setError('')
    try {
      await submitContact({
        name: form.name,
        email: form.email,
        message: `${form.service ? `الخدمة: ${form.service}\n` : ''}${form.phone ? `الهاتف: ${form.phone}\n` : ''}${form.message}`,
      })
      setSuccess(true)
      setForm({ name: '', email: '', phone: '', service: '', message: '' })
      setTimeout(() => setSuccess(false), 6000)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'حدث خطأ. حاول مرة أخرى.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.contactInner}>
        {/* Left — Info */}
        <motion.div
          className={styles.contactInfo}
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.infoTitle}>دعنا نبني شيئاً رائعاً معاً</div>
          <p className={styles.infoSub}>
            لديك مشروع في ذهنك؟ أو تريد فقط أن تتعرف علينا أكثر؟ نحن هنا — لا تتردد في التواصل.
          </p>

          <div className={styles.infoItems}>
            {contactInfo.map((item) => (
              <div key={item.label} className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <i className={item.icon} />
                </div>
                <div>
                  <div className={styles.infoLabel}>{item.label}</div>
                  <div className={styles.infoValue} dir={item.dir}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/201064147224"
            target="_blank"
            rel="noreferrer"
            className={styles.whatsappBtn}
          >
            <i className="fab fa-whatsapp" />
            ابدأ محادثة واتساب
          </a>

          {/* Trust indicators */}
          <div className={styles.trustRow}>
            <div className={styles.trustItem}>
              <i className="fas fa-clock" />
              رد خلال 24 ساعة
            </div>
            <div className={styles.trustItem}>
              <i className="fas fa-shield-alt" />
              سرية تامة
            </div>
            <div className={styles.trustItem}>
              <i className="fas fa-star" />
              استشارة مجانية
            </div>
          </div>
        </motion.div>

        {/* Right — Form */}
        <motion.form
          onSubmit={submitForm}
          className={styles.contactForm}
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className={styles.formTitle}>أرسل لنا رسالة</div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="name-input" className={styles.formLabel}>الاسم الكامل</label>
              <input
                id="name-input"
                type="text"
                className={styles.formInput}
                placeholder="أحمد محمد"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                aria-required="true"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email-input" className={styles.formLabel}>البريد الإلكتروني</label>
              <input
                id="email-input"
                type="email"
                className={styles.formInput}
                placeholder="ahmed@company.com"
                dir="ltr"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                aria-required="true"
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="phone-input" className={styles.formLabel}>رقم الهاتف</label>
              <input
                id="phone-input"
                type="tel"
                className={styles.formInput}
                placeholder="+20 106 ..."
                dir="ltr"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="service-select" className={styles.formLabel}>نوع الخدمة</label>
              <select
                id="service-select"
                className={styles.formSelect}
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
              >
                <option value="">اختر الخدمة</option>
                <option>تطوير موقع ويب (Website)</option>
                <option>تطبيق جوال (Mobile App)</option>
                <option>نظام متكامل (ERP / CRM)</option>
                <option>متجر إلكتروني (E-commerce)</option>
                <option>ذكاء اصطناعي وتحليل بيانات</option>
                <option>أمن سيبراني واختبار اختراق</option>
                <option>استشارة تقنية / غير ذلك</option>
              </select>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message-input" className={styles.formLabel}>تفاصيل مشروعك</label>
            <textarea
              id="message-input"
              className={styles.formTextarea}
              placeholder="اشرح لنا فكرتك ومتطلباتك..."
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
              aria-required="true"
            />
          </div>

          <button type="submit" className={styles.submitBtn} disabled={submitting}>
            {submitting ? (
              <>
                <i className="fas fa-circle-notch fa-spin" />
                جاري الإرسال...
              </>
            ) : (
              <>
                إرسال الرسالة
                <i className="fas fa-paper-plane" />
              </>
            )}
          </button>

          {success && (
            <div className={`${styles.feedback} ${styles.feedbackSuccess}`}>
              <i className="fas fa-check-circle" />
              تم استلام رسالتك! سنتواصل معك خلال 24 ساعة.
            </div>
          )}
          {error && (
            <div className={`${styles.feedback} ${styles.feedbackError}`}>
              <i className="fas fa-exclamation-circle" />
              {error}
            </div>
          )}
        </motion.form>
      </div>
    </section>
  )
}
