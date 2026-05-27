'use client'

import { useState } from 'react'
import { submitContact } from '@/services/messages'
import styles from './ContactSection.module.css'

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setSuccess(false)
    setError('')
    try {
      await submitContact(form)
      setSuccess(true)
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setSuccess(false), 5000)
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : 'حدث خطأ أثناء الإرسال. حاول مرة أخرى خلال لحظات.'
      setError(msg)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className={styles.contactSection}>
      <div className={styles.contactShell}>
        <article className={`${styles.contactCard} ${styles.contactCardInfo}`}>
          <span className={styles.contactKicker}>تواصل معنا</span>
          <h2 className="section-title" style={{ textAlign: 'right' }}>
            لنصمم صفحة أو منصة تليق بعلامتك.
          </h2>
          <p className={styles.contactDescription}>
            أخبرنا بطبيعة المشروع، ما الذي تريد تحسينه، وما الذي يجب أن يشعر به العميل في أول زيارة.
            سنقترح عليك مسار تنفيذ واضح ومناسب لهوية عملك.
          </p>
          <div className={styles.contactPoints}>
            <div className={styles.contactPoint}>
              <small>الهاتف</small>
              <strong dir="ltr">+20 1064147224</strong>
            </div>
            <div className={styles.contactPoint}>
              <small>البريد</small>
              <strong>info@dahabtech.com</strong>
            </div>
            <div className={styles.contactPoint}>
              <small>واتساب</small>
              <strong dir="ltr">01064147224</strong>
            </div>
          </div>
        </article>

        <form onSubmit={submitForm} className={`${styles.contactCard} ${styles.contactForm}`}>
          <div className={styles.formGrid}>
            <label className={styles.formField}>
              <span>الاسم الكامل</span>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="اكتب اسمك الكامل"
                className="gold-input"
                required
              />
            </label>
            <label className={styles.formField}>
              <span>البريد الإلكتروني</span>
              <input
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                type="email"
                placeholder="name@example.com"
                className="gold-input"
                required
              />
            </label>
          </div>
          <label className={styles.formField}>
            <span>تفاصيل المشروع</span>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={6}
              placeholder="حدثنا عن المشروع، الأهداف، وأهم المزايا التي تريدها."
              className="gold-input"
              required
            />
          </label>
          <button type="submit" className={`btn-gold ${styles.submitBtn}`} disabled={submitting}>
            <i className={submitting ? 'fas fa-spinner fa-spin' : 'fas fa-paper-plane'} />
            {submitting ? 'جاري الإرسال...' : 'إرسال الطلب'}
          </button>
          {success && (
            <div className={`${styles.feedbackNote} ${styles.feedbackSuccess}`}>
              <i className="fas fa-check-circle" />
              تم استلام رسالتك بنجاح، وسنتواصل معك قريباً.
            </div>
          )}
          {error && (
            <div className={`${styles.feedbackNote} ${styles.feedbackError}`}>
              <i className="fas fa-triangle-exclamation" />
              {error}
            </div>
          )}
        </form>
      </div>
    </section>
  )
}
