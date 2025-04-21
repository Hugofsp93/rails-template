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
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Change Password
            </h2>
            <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleSubmit} noValidate>
              <div className="h-[85px]">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder={email}
                  disabled
                  required
                />
              </div>
              <div className="h-[85px]">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                <input 
                  type="password" 
                  name="password" 
                  id="password" 
                  onChange={(e) => handleChange('password', e.target.value)} 
                  placeholder="••••••••" 
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:text-white dark:border-gray-600 ${
                    errors.password ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'focus:ring-blue-500 focus:border-blue-500'
                  }`}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-500">{errors.password}</p>
                )}
              </div>
              <div className="h-[85px]">
                <label htmlFor="password_confirmation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                <input 
                  type="password" 
                  name="password_confirmation"
                  id="password_confirmation" 
                  onChange={(e) => handleChange('password_confirmation', e.target.value)} 
                  placeholder="••••••••" 
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:text-white dark:border-gray-600 ${
                    errors.password_confirmation ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'focus:ring-blue-500 focus:border-blue-500'
                  }`}
                />
                {errors.password_confirmation && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-500">{errors.password_confirmation}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={processing}
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-75">
                {processing ? 'Resetting...' : 'Reset password'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}