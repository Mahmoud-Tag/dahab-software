'use client'

import { useEffect, useState } from 'react'
import { getAdminToken, goToLogin } from '@/lib/api-client'
import { createPartnership, updatePartnership } from '@/services/partnerships'
import type { PartnershipJson } from '@/types'

type Props = {
  partnership: PartnershipJson | null
  onClose: () => void
  onSaved: () => void
}

const statusOptions = [
  { value: 'active', label: 'نشط' },
  { value: 'inactive', label: 'غير نشط' },
]

export default function PartnershipFormModal({ partnership, onClose, onSaved }: Props) {
  const [form, setForm] = useState({
    title: '',
    partnerName: '',
    desc: '',
    fullDesc: '',
    websiteUrl: '',
    status: 'active',
  })
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (partnership) {
      setForm({
        title: partnership.title || '',
        partnerName: partnership.partnerName || '',
        desc: partnership.desc || '',
        fullDesc: partnership.fullDesc || '',
        websiteUrl: partnership.websiteUrl || '',
        status: partnership.status || 'active',
      })
      setPreviewImage(partnership.image)
    } else {
      setForm((prev) => ({ ...prev, status: 'active' }))
      setPreviewImage(null)
      setImageFile(null)
    }
  }, [partnership])

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      setPreviewImage(URL.createObjectURL(file))
    }
  }

  const save = async (e: React.FormEvent) => {
    e.preventDefault()
    const token = getAdminToken()
    if (!token) {
      goToLogin()
      return
    }

    setLoading(true)
    const formData = new FormData()
    formData.append('title', form.title)
    formData.append('partnerName', form.partnerName)
    formData.append('desc', form.desc)
    formData.append('fullDesc', form.fullDesc)
    formData.append('websiteUrl', form.websiteUrl)
    formData.append('status', form.status)
    if (imageFile) formData.append('imageFile', imageFile)
    if (partnership) formData.append('_method', 'PUT')

    try {
      if (partnership) {
        await updatePartnership(partnership.id, formData)
      } else {
        await createPartnership(formData)
      }
      onSaved()
      onClose()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'حدث خطأ أثناء الحفظ'
      alert(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-md"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="my-auto w-full max-w-2xl overflow-hidden rounded-3xl border border-gray-800 bg-gray-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-800 p-6">
          <h2 className="text-2xl font-bold text-yellow-500">
            {partnership ? 'تعديل الشراكة' : 'إضافة شراكة جديدة'}
          </h2>
          <button type="button" onClick={onClose} className="text-gray-400 transition hover:text-white">
            <i className="fas fa-times text-xl" />
          </button>
        </div>

        <form onSubmit={save} className="space-y-6 p-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-1">
              <label className="text-sm text-gray-400">عنوان الشراكة</label>
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="مثال: شراكة الوكيل الرسمي"
                className="w-full rounded-xl border border-gray-800 bg-black p-3 text-white outline-none transition focus:border-yellow-500"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm text-gray-400">اسم الشريك</label>
              <input
                value={form.partnerName}
                onChange={(e) => setForm({ ...form, partnerName: e.target.value })}
                placeholder="مثال: 3M للكمبيوتر"
                className="w-full rounded-xl border border-gray-800 bg-black p-3 text-white outline-none transition focus:border-yellow-500"
                required
              />
            </div>
            <div className="space-y-1 md:col-span-2">
              <label className="text-sm text-gray-400">رابط الموقع</label>
              <input
                value={form.websiteUrl}
                onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })}
                placeholder="https://example.com"
                className="w-full rounded-xl border border-gray-800 bg-black p-3 text-white outline-none transition focus:border-yellow-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm text-gray-400">وصف مختصر</label>
            <textarea
              value={form.desc}
              onChange={(e) => setForm({ ...form, desc: e.target.value })}
              placeholder="وصف يظهر في بطاقة الشراكة..."
              className="h-20 w-full rounded-xl border border-gray-800 bg-black p-3 text-white outline-none transition focus:border-yellow-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-gray-400">تفاصيل الشراكة</label>
            <textarea
              value={form.fullDesc}
              onChange={(e) => setForm({ ...form, fullDesc: e.target.value })}
              placeholder="تفاصيل العقد، صلاحيات الدعم، وأي ملاحظات إضافية..."
              className="h-32 w-full rounded-xl border border-gray-800 bg-black p-3 text-white outline-none transition focus:border-yellow-500"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-1">
              <label className="text-sm text-gray-400">صورة الشراكة</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFile}
                className="w-full rounded-xl border border-gray-800 bg-black p-3 text-white outline-none transition focus:border-yellow-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm text-gray-400">الحالة</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full appearance-none rounded-xl border border-gray-800 bg-black p-3 text-white outline-none transition focus:border-yellow-500"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {previewImage && (
            <div className="rounded-3xl border border-gray-800 p-4">
              <p className="text-sm text-gray-400">معاينة الصورة</p>
              <img src={previewImage} alt="معاينة" className="mt-3 h-48 w-full rounded-3xl object-cover" />
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-xl border border-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/5 disabled:opacity-50"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-amber-400 px-8 py-3 text-sm font-bold text-slate-900 transition hover:bg-amber-300 disabled:opacity-50"
            >
              {loading ? 'جاري الحفظ...' : partnership ? 'تحديث الشراكة' : 'إضافة الشراكة'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
