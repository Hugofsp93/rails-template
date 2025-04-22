import { Head, useForm, Link } from "@inertiajs/react"
import Toast from '../../components/Toast'
import { useToast } from '../../hooks/useToast'
import { useState } from "react"

export default function ResendConfirmation() {
  const { toast } = useToast()
  const [errors, setErrors] = useState({})
  const { data, setData, post, processing } = useForm({
    email: ''
  })

  const validateForm = () => {
    const newErrors = {}

    if (!data.user.email) {
      newErrors.email = 'E-mail is required'
    } else if (!/\S+@\S+\.\S+/.test(data.user.email)) {
      newErrors.email = 'E-mail is invalid'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (field, value) => {
    setData('user', {
      ...data.user,
      [field]: value
    })
    setErrors(prev => ({ ...prev, [field]: '', base: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    post('/users/confirmation')
  }

  return (
    <>
      {toast && <Toast {...toast} />}
      <Head title="Resend Confirmation" />
      <section className="w-full max-w-lg bg-zinc-50 dark:bg-zinc-950">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-zinc-950 dark:border-zinc-800 sm:p-8">
            <h1 className="mb-1 text-xl font-bold leading-tight tracking-tight text-zinc-900 md:text-2xl dark:text-white">
              Resend Confirmation Email
            </h1>
            <p className="font-light text-zinc-500 dark:text-zinc-400">
              Set your email to confirm your account. Or check your email sent on sign up to confirm your account. The link is valid for 24 hours.
            </p>
            <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleSubmit} noValidate>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white">Your email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={`bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg block w-full p-2.5 dark:bg-zinc-700 dark:text-white dark:border-zinc-700 ${errors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'focus:ring-red-500 focus:border-red-500'}`}
                  placeholder="name@email.com"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              <button
                type="submit"
                disabled={processing}
                className="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-2 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-800 disabled:opacity-75">
                {processing ? 'Sending...' : 'Send confirmation e-mail'}
              </button>
              <Link href="/sign_in" className="w-full flex justify-center text-sm text-center text-red-500">Return to login</Link>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}