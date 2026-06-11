'use client'

import { useEffect, useRef, useState } from 'react'
import type { TeamMemberJson } from '@/types'
import { createTeamMember, updateTeamMember } from '@/services/team'
import { toast } from 'sonner'

type ApiError = Error & {
  data?: {
    errors?: Record<string, string[]>
  }
}

type Props = {
  member: TeamMemberJson | null
  onClose: () => void
  onSaved: () => void
}

const inputClass =
  'w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-white outline-none focus:border-amber-400 placeholder:text-slate-600 text-sm transition-colors'

const labelClass = 'mb-2 block text-sm font-semibold text-slate-300'

function Field({
  label,
  icon,
  name,
  type = 'text',
  placeholder,
  defaultValue,
  required,
}: {
  label: string
  icon: string
  name: string
  type?: string
  placeholder?: string
  defaultValue?: string
  required?: boolean
}) {
  return (
    <div>
      <label className={labelClass}>
        <i className={`${icon} mr-2 text-amber-400/70`} />
        {label}
        {required && <span className="mr-1 text-rose-400">*</span>}
      </label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        required={required}
        placeholder={placeholder}
        className={inputClass}
      />
    </div>
  )
}

export default function TeamMemberFormModal({ member, onClose, onSaved }: Props) {
  const [loading, setLoading] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(member?.image || null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const objectUrlRef = useRef<string | null>(null)

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current)
    }
  }, [])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current)

    if (file) {
      const objectUrl = URL.createObjectURL(file)
      objectUrlRef.current = objectUrl
      setPreviewImage(objectUrl)
      return
    }

    objectUrlRef.current = null
    setPreviewImage(member?.image || null)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    try {
      if (member) {
        await updateTeamMember(member.id, formData)
        toast.success('تم تحديث بيانات العضو بنجاح')
      } else {
        await createTeamMember(formData)
        toast.success('تمت إضافة العضو بنجاح')
      }
      onSaved()
      onClose()
    } catch (err: unknown) {
      toast.error(getErrorMessage(err))
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl overflow-hidden rounded-[32px] border border-white/10 bg-slate-900 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-500/15 text-indigo-300">
              <i className={`fas ${member ? 'fa-user-pen' : 'fa-user-plus'}`} />
            </div>
            <h2 className="text-xl font-black text-white">
              {member ? 'تعديل بيانات العضو' : 'إضافة عضو جديد'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-400 transition hover:bg-white/5 hover:text-white"
          >
            <i className="fas fa-xmark" />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[calc(100vh-12rem)] overflow-y-auto p-6">
          <form id="team-form" onSubmit={handleSubmit} className="space-y-5">
            {/* Avatar */}
            <div className="flex items-center gap-5 rounded-2xl border border-white/8 bg-white/3 p-4">
              <div
                className="relative h-20 w-20 shrink-0 cursor-pointer overflow-hidden rounded-full border-2 border-dashed border-white/20 bg-white/5 transition-colors hover:border-amber-400/50"
                onClick={() => fileInputRef.current?.click()}
              >
                {previewImage ? (
                  <img src={previewImage} alt="Preview" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-slate-500">
                    <i className="fas fa-camera text-xl" />
                  </div>
                )}
                <input
                  type="file"
                  name="imageFile"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-white">الصورة الشخصية</p>
                <p className="mt-1 text-xs text-slate-500">انقر على الدائرة لاختيار صورة، أو أدخل رابطها أدناه</p>
                <input
                  type="text"
                  name="image"
                  defaultValue={member?.image || ''}
                  placeholder="https://example.com/photo.jpg"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white outline-none placeholder:text-slate-600 focus:border-amber-400"
                />
              </div>
            </div>

            {/* Basic Info */}
            <div className="rounded-2xl border border-white/8 bg-white/3 p-4 space-y-4">
              <p className="text-xs font-bold uppercase tracking-widest text-amber-400/70">المعلومات الأساسية</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="الاسم" icon="fa-user" name="name" placeholder="مثال: محمد أحمد" defaultValue={member?.name} required />
                <Field label="المسمى الوظيفي" icon="fa-briefcase" name="role" placeholder="مثال: مطور Full Stack" defaultValue={member?.role} required />
              </div>
              <Field label="التخصص" icon="fa-tags" name="specialty" placeholder="مثال: AI, Web, Mobile" defaultValue={member?.specialty || ''} />
            </div>

            {/* Contact Info */}
            <div className="rounded-2xl border border-white/8 bg-white/3 p-4 space-y-4">
              <p className="text-xs font-bold uppercase tracking-widest text-indigo-400/70">معلومات الاتصال</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="البريد الإلكتروني" icon="fa-envelope" name="email" type="email" placeholder="name@example.com" defaultValue={member?.email || ''} />
                <Field label="رقم الهاتف" icon="fa-phone" name="phone" type="tel" placeholder="+20 1xx xxxx xxxx" defaultValue={member?.phone || ''} />
              </div>
            </div>

            {/* Social Links */}
            <div className="rounded-2xl border border-white/8 bg-white/3 p-4 space-y-4">
              <p className="text-xs font-bold uppercase tracking-widest text-cyan-400/70">روابط التواصل الاجتماعي</p>
              <Field label="LinkedIn" icon="fa-brands fa-linkedin" name="linkedin" placeholder="https://linkedin.com/in/username" defaultValue={member?.linkedin || ''} />
              <Field label="GitHub" icon="fa-brands fa-github" name="github" placeholder="https://github.com/username" defaultValue={member?.github || ''} />
              <Field label="X / Twitter" icon="fa-brands fa-x-twitter" name="twitter" placeholder="https://x.com/username" defaultValue={member?.twitter || ''} />
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-white/10 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-xl border border-white/10 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-white/5 disabled:opacity-50"
          >
            إلغاء
          </button>
          <button
            type="submit"
            form="team-form"
            disabled={loading}
            className="rounded-xl bg-amber-400 px-8 py-2.5 text-sm font-bold text-slate-900 transition hover:bg-amber-300 disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <i className="fas fa-spinner fa-spin" />
                جاري الحفظ...
              </span>
            ) : member ? (
              'تحديث البيانات'
            ) : (
              'إضافة العضو'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

function getErrorMessage(err: unknown) {
  const apiError = err as ApiError
  const errors = apiError.data?.errors
  const firstFieldError = errors ? Object.values(errors).flat()[0] : null

  if (firstFieldError) return firstFieldError
  if (err instanceof Error) return err.message
  return 'حدث خطأ أثناء حفظ البيانات'
}
