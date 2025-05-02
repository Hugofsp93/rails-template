import { Head, useForm } from "@inertiajs/react"
import Toast from '../../components/Toast'
import { useToast } from '../../hooks/useToast'
import { useState } from 'react'

export default function ResetPassword() {
  const { toast } = useToast()
  const [errors, setErrors] = useState({})
  const params = new URLSearchParams(window.location.search)
  const token = params.get('reset_password_token')
  const email = params.get('email')

  const { data, setData, put, processing } = useForm({
    user: {
      reset_password_token: token,
      email: email,
      password: '',
      password_confirmation: ''
    }
  })

  const validateForm = () => {
    const newErrors = {}

    if (!data.user.password) {
      newErrors.password = 'Password is required'
    } else if (data.user.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (!data.user.password_confirmation) {
      newErrors.password_confirmation = 'Password confirmation is required'
    } else if (data.user.password_confirmation !== data.user.password) {
      newErrors.password_confirmation = 'Password confirmation does not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (field, value) => {
    setData('user', {
      ...data.user,
      [field]: value
    })

    // clean error when user change the field
    setErrors(prev => ({ ...prev, [field]: '', base: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    put('/users/password')
  }

  return (
    <>
      <Head title="Reset Password" />
      {toast && <Toast {...toast} />}
      <section className="w-full mt-20 max-w-lg bg-transparent">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full p-6 bg-neutral-50 rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-neutral-950 dark:border-neutral-800 sm:p-8">
            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-neutral-900 md:text-2xl dark:text-neutral-50">
              Change Password
            </h2>
            <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleSubmit} noValidate>
              <div className="h-[75px]">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-neutral-900 dark:text-neutral-50">Your email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className={`bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg block w-full p-2.5 dark:bg-neutral-700 dark:text-neutral-50 dark:border-neutral-700 ${
                    errors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500 dark:border-red-500' : 'focus:ring-neutral-300 focus:border-neutral-300 dark:focus:ring-neutral-500 dark:focus:border-neutral-500'
                  }`}
                  placeholder={email}
                  disabled
                  required
                />
              </div>
              <div className="h-[75px]">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-neutral-900 dark:text-neutral-50">New Password</label>
                <input 
                  type="password" 
                  name="password" 
                  id="password" 
                  onChange={(e) => handleChange('password', e.target.value)} 
                  placeholder="••••••••" 
                  className={`bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg block w-full p-2.5 dark:bg-neutral-700 dark:text-neutral-50 dark:border-neutral-700 ${
                    errors.password ? 'border-red-500 focus:ring-red-500 focus:border-red-500 dark:border-red-500' : 'focus:ring-neutral-300 focus:border-neutral-300 dark:focus:ring-neutral-500 dark:focus:border-neutral-500'
                  }`}
                />
                {errors.password && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-500">{errors.password}</p>
                )}
              </div>
              <div className="h-[75px]">
                <label htmlFor="password_confirmation" className="block mb-2 text-sm font-medium text-neutral-900 dark:text-neutral-50">Confirm password</label>
                <input 
                  type="password" 
                  name="password_confirmation"
                  id="password_confirmation" 
                  onChange={(e) => handleChange('password_confirmation', e.target.value)} 
                  placeholder="••••••••" 
                  className={`bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg block w-full p-2.5 dark:bg-neutral-700 dark:text-neutral-50 dark:border-neutral-700 ${
                    errors.password_confirmation ? 'border-red-500 focus:ring-red-500 focus:border-red-500 dark:border-red-500' : 'focus:ring-neutral-300 focus:border-neutral-300 dark:focus:ring-neutral-500 dark:focus:border-neutral-500'
                  }`}
                />
                {errors.password_confirmation && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-500">{errors.password_confirmation}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={processing}
                className="w-full text-neutral-50 bg-utility-700 hover:bg-utility-800 focus:ring-2 focus:outline-none focus:ring-utility-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-2 text-center dark:bg-utility-600 dark:hover:bg-utility-500 dark:focus:ring-utility-800 disabled:opacity-75">
                {processing ? 'Resetting...' : 'Reset password'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}