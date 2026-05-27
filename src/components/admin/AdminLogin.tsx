'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '@/services/auth'
import styles from './AdminLogin.module.css'

export default function AdminLogin() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')
    try {
      await login(form.email, form.password)
      router.push('/admin/dashboard')
    } catch {
      setErrorMsg('بيانات الدخول غير صحيحة. يرجى المحاولة مرة أخرى.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <div className={styles.brandSection}>
            <div className={styles.logoCircle}>
              <i className="fas fa-user-shield" />
            </div>
            <h2 className={styles.title}>بوابة المشرف</h2>
            <p className={styles.subtitle}>سجل الدخول لإدارة لوحة تحكم دهب</p>
          </div>

          {errorMsg && (
            <div className={styles.errorAlert} onClick={() => setErrorMsg('')}>
              <i className="fas fa-exclamation-triangle" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className={styles.loginForm}>
            <div className={styles.inputGroup}>
              <label>البريد الإلكتروني</label>
              <div className={styles.inputWrapper}>
                <i className="fas fa-envelope" />
                <input
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  type="email"
                  placeholder="admin@example.com"
                  required
                />
              </div>
            </div>
            <div className={styles.inputGroup}>
              <label>كلمة المرور</label>
              <div className={styles.inputWrapper}>
                <i className="fas fa-lock" />
                <input
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  type="password"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
            <button type="submit" className={styles.btnPrimary} disabled={loading}>
              {loading ? <span className={styles.loader} /> : 'تسجيل الدخول'}
              {!loading && <i className="fas fa-sign-in-alt" />}
            </button>
          </form>

          <div className={styles.cardFooter}>
            <p>جميع الحقوق محفوظة &copy; {new Date().getFullYear()} دهب سوفتوير</p>
          </div>
        </div>
      </div>
    </div>
  )
}
