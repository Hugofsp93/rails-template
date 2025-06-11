import { useState } from 'react'
import { Head, useForm, usePage } from '@inertiajs/react'
import { useToast } from '../../hooks/useToast'
import Toast from "../../components/Toast"
import Form from './Form'

export default function Edit() {
  const { toast } = useToast()
  const { user, availableRoles } = usePage().props
  const [isEditingPassword, setIsEditingPassword] = useState(false)
  const { data, setData, put, processing, errors } = useForm({
    user: {
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      password: '',
      password_confirmation: '',
      role: user.role_name
    }
  })

  const handleChange = (field, value) => {
    setData(prev => ({
      ...prev,
      user: {
        ...prev.user,
        [field.split('.')[1]]: value
      }
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // If not editing password, remove password fields from the request
    const formData = { ...data }
    if (!isEditingPassword) {
      delete formData.user.password
      delete formData.user.password_confirmation
    }

    put(`/admin/users/${user.id}`, formData, {
      preserveScroll: true
    })
  }

  return (
    <>
      <Head title="Editing user" />
      {toast && <Toast {...toast} />}
      <section className="w-full">
        <div className="bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xl py-8 px-8 mx-auto max-w-4xl">
          <h2 className="mb-4 text-xl font-bold text-neutral-900 dark:text-neutral-50">Edit user</h2>
          <Form
            errors={errors}
            data={data}
            processing={processing}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            isEditingPassword={isEditingPassword}
            setIsEditingPassword={setIsEditingPassword}
            isEdit={true}
            availableRoles={availableRoles}
          />
        </div>
      </section>
    </>
  )
}
