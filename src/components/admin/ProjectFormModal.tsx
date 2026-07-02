'use client'

import { useEffect, useState } from 'react'
import { getAdminToken, goToLogin } from '@/lib/api-client'
import { createProject, updateProject } from '@/services/projects'
import type { ProjectJson } from '@/types'

type Props = {
  project?: ProjectJson | null
  defaultType?: string
  onClose: () => void
  onSaved: () => void
}

export default function ProjectFormModal({
  project,
  defaultType = 'web',
  onClose,
  onSaved,
}: Props) {
  const [form, setForm] = useState({
    title: '',
    category: '',
    desc: '',
    fullDesc: '',
    year: '',
    type: defaultType,
    language: '',
    downloadUrl: '',
    websiteUrl: '',
    status: 'live',
    tags: [] as string[],
    features: [] as string[],
  })
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (project) {
      setForm({
        title: project.title || '',
        category: project.category || '',
        desc: project.desc || '',
        fullDesc: project.fullDesc || '',
        year: project.year || '',
        type: project.type || 'web',
        language: project.language || '',
        downloadUrl: project.downloadUrl || '',
        websiteUrl: project.websiteUrl || '',
        status: project.status || 'live',
        tags: project.tags || [],
        features: project.features || [],
      })
    } else {
      setForm((f) => ({ ...f, type: defaultType }))
    }
  }, [project, defaultType])

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
    formData.append('category', form.category)
    formData.append('desc', form.desc)
    formData.append('fullDesc', form.fullDesc)
    formData.append('year', form.year)
    formData.append('type', form.type)
    formData.append('language', form.language)
    formData.append('downloadUrl', form.downloadUrl)
    formData.append('websiteUrl', form.websiteUrl)
    formData.append('status', form.status)
    formData.append('tags', JSON.stringify(form.tags))
    formData.append('features', JSON.stringify(form.features))
    if (imageFile) formData.append('image', imageFile)
    if (project) formData.append('_method', 'PUT')

    try {
      if (project) {
        await updateProject(project.id, formData)
      } else {
        await createProject(formData)
      }
      onSaved()
      onClose()
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'حدث خطأ أثناء الحفظ'
      alert('حدث خطأ أثناء الحفظ: ' + message)
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
            {project ? 'تعديل مشروع' : 'إضافة مشروع جديد'}
          </h2>
          <button type="button" onClick={onClose} className="text-gray-400 transition hover:text-white">
            <i className="fas fa-times text-xl" />
          </button>
        </div>

        <form onSubmit={save} className="space-y-6 p-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-1">
              <label className="text-sm text-gray-400">اسم المشروع</label>
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="مثال: متجر الأزياء الفاخرة"
                className="w-full rounded-xl border border-gray-800 bg-black p-3 text-white outline-none transition focus:border-yellow-500"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm text-gray-400">التصنيف</label>
              <input
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                placeholder="مثال: تطبيقات موبايل"
                className="w-full rounded-xl border border-gray-800 bg-black p-3 text-white outline-none transition focus:border-yellow-500"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm text-gray-400">السنة</label>
              <input
                value={form.year}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
                placeholder="مثال: 2024"
                className="w-full rounded-xl border border-gray-800 bg-black p-3 text-white outline-none transition focus:border-yellow-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm text-gray-400">نوع المشروع</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full appearance-none rounded-xl border border-gray-800 bg-black p-3 text-white outline-none transition focus:border-yellow-500"
              >
                <option value="web">موقع ويب</option>
                <option value="app">تطبيق</option>
                <option value="system">نظام</option>
                <option value="ecommerce">متجر</option>
                <option value="ai">ذكاء اصطناعي</option>
                <option value="resource">مصدر / أداة (Resource)</option>
              </select>
            </div>
            <div className="space-y-1 md:col-span-2">
              <label className="text-sm text-gray-400">اللغات المستخدمة (افصل بينها بفاصلة , )</label>
              <input
                value={form.language}
                onChange={(e) => setForm({ ...form, language: e.target.value })}
                placeholder="مثال: PHP, Vue, React, MySQL"
                className="w-full rounded-xl border border-gray-800 bg-black p-3 text-white outline-none transition focus:border-yellow-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm text-gray-400">وصف مخصر</label>
            <textarea
              value={form.desc}
              onChange={(e) => setForm({ ...form, desc: e.target.value })}
              placeholder="وصف يظهر في بطاقة المشروع..."
              className="h-20 w-full rounded-xl border border-gray-800 bg-black p-3 text-white outline-none transition focus:border-yellow-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-gray-400">تفاصيل المشروع بالكامل</label>
            <textarea
              value={form.fullDesc}
              onChange={(e) => setForm({ ...form, fullDesc: e.target.value })}
              placeholder="شرح مفصل للمميزات والتقنيات..."
              className="h-32 w-full rounded-xl border border-gray-800 bg-black p-3 text-white outline-none transition focus:border-yellow-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-gray-400">رابط التحميل</label>
            <input
              value={form.downloadUrl}
              onChange={(e) => setForm({ ...form, downloadUrl: e.target.value })}
              placeholder="https://..."
              className="w-full rounded-xl border border-gray-800 bg-black p-3 text-white outline-none transition focus:border-yellow-500"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-1">
              <label className="text-sm text-gray-400">رابط الموقع</label>
              <input
                value={form.websiteUrl}
                onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })}
                placeholder="https://example.com"
                className="w-full rounded-xl border border-gray-800 bg-black p-3 text-white outline-none transition focus:border-yellow-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm text-gray-400">حالة المشروع</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full appearance-none rounded-xl border border-gray-800 bg-black p-3 text-white outline-none transition focus:border-yellow-500"
              >
                <option value="live">متاح</option>
                <option value="development">قيد التطوير</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-gray-400">صورة المشروع</label>
            <div className="flex items-center gap-4">
              {(previewImage || project?.image) && (
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-gray-800">
                  <img
                    src={previewImage || project?.image || ''}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <label className="flex-1 cursor-pointer">
                <span className="block w-full rounded-xl bg-gray-800 p-3 text-center text-sm transition hover:bg-gray-700">
                  <i className="fas fa-cloud-upload-alt mr-2" />
                  اختار صورة
                </span>
                <input type="file" onChange={handleFile} className="hidden" accept="image/*" />
              </label>
            </div>
          </div>

          <div className="flex gap-4 border-t border-gray-800 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-xl bg-yellow-500 p-4 font-bold text-black shadow-lg shadow-yellow-500/20 transition hover:bg-yellow-600 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2" />
                  جاري الحفظ...
                </>
              ) : (
                'حفظ التغييرات'
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-700 px-8 text-gray-300 transition hover:bg-white/5"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
