import { Head, useForm } from "@inertiajs/react"
import Toast from '../../components/Toast'
import { useToast } from '../../hooks/useToast'
import { useState } from 'react'

export default function SignUp() {
  const { toast } = useToast()
  const [errors, setErrors] = useState({})
  const { data, setData, post, processing } = useForm({
    user: {
      email: '',
      password: '',
      password_confirmation: '',
      terms: false
    }
  })

  const validateForm = () => {
    const newErrors = {}

    if (!data.user.email) {
      newErrors.email = 'E-mail is required'
    } else if (!/\S+@\S+\.\S+/.test(data.user.email)) {
      newErrors.email = 'E-mail is invalid'
    }

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

    if (!data.user.terms) {
      newErrors.terms = 'You must accept the terms and conditions'
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

    post('/users')
  }

  return (
    <>
      <Head title="Sign Up" />
      {toast && <Toast {...toast} />}
      <section className="w-full mt-20 max-w-lg bg-transparent">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full bg-neutral-50 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-neutral-950 dark:border-neutral-800">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-neutral-900 md:text-2xl dark:text-neutral-50">
                Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit} noValidate>
                <div className="h-[85px]">
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-neutral-900 dark:text-neutral-50">Your email</label>
                  <input
                    name="email"
                    id="email"
                    type="email"
                    placeholder="name@email.com"
                    onChange={(e) => handleChange('email', e.target.value)}
                    className={`bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg block w-full p-2.5 dark:bg-neutral-700 dark:text-neutral-50 dark:border-neutral-700 ${
                      errors.email ? 'border-utility-500 focus:ring-utility-500 focus:border-utility-500' : 'focus:ring-utility-500 focus:border-utility-500'
                    }`}
                    required
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-utility-600 dark:text-utility-500">{errors.email}</p>
                  )}
                </div>
                <div className="h-[85px]">
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-neutral-900 dark:text-neutral-50">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    onChange={(e) => handleChange('password', e.target.value)}
                    className={`bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg block w-full p-2.5 dark:bg-neutral-700 dark:text-neutral-50 dark:border-neutral-700 ${
                      errors.password ? 'border-utility-500 focus:ring-utility-500 focus:border-utility-500' : 'focus:ring-utility-500 focus:border-utility-500'
                    }`}
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-utility-600 dark:text-utility-500">{errors.password}</p>
                  )}
                </div>
                <div className="h-[85px]">
                  <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-neutral-900 dark:text-neutral-50">Confirm password</label>
                  <input
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="••••••••"
                    onChange={(e) => handleChange('password_confirmation', e.target.value)}
                    className={`bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg block w-full p-2.5 dark:bg-neutral-700 dark:text-neutral-50 dark:border-neutral-700 ${
                      errors.password_confirmation ? 'border-utility-500 focus:ring-utility-500 focus:border-utility-500' : 'focus:ring-utility-500 focus:border-utility-500'
                    }`}
                  />
                  {errors.password_confirmation && (
                    <p className="mt-1 text-sm text-utility-600 dark:text-utility-500">{errors.password_confirmation}</p>
                  )}
                </div>
                <div className="h-[40px]">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        aria-describedby="terms"
                        type="checkbox"
                        onChange={(e) => handleChange('terms', e.target.checked)}
                        className="w-4 h-4 border border-neutral-300 rounded-sm bg-neutral-50 accent-utility-500 focus:ring-1 focus:ring-neutral-50 dark:bg-neutral-700 dark:border-neutral-700 dark:focus:ring-neutral-950 dark:ring-offset-neutral-800 dark:focus:ring-offset-neutral-800"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="terms" className="font-light text-neutral-500 dark:text-neutral-300">I accept the <a data-modal-target="static-modal" data-modal-toggle="static-modal" type="button" className="font-medium text-utility-700 dark:text-utility-400">Terms and Conditions</a></label>
                    </div>
                  </div>
                  {errors.terms && (
                    <p className="text-sm text-utility-600 dark:text-utility-500">{errors.terms}</p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={processing}
                  className="w-full text-neutral-50 bg-utility-700 hover:bg-utility-800 focus:ring-2 focus:outline-none focus:ring-utility-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-utility-500 dark:hover:bg-utility-600 dark:focus:ring-utility-800">
                  {processing ? 'Signing up...' : 'Create an account'}
                  </button>
                <p className="text-sm font-light text-neutral-500 dark:text-neutral-400">
                  Already have an account? <a href="/sign_in" className="font-medium text-neutral-800 hover:underline dark:text-neutral-200">Login here</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <div id="static-modal" data-modal-backdrop="static" tabIndex="-1" aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative p-4 w-full max-w-3xl max-h-full">
          <div className="relative bg-neutral-50 rounded-lg shadow-sm dark:bg-neutral-800">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-neutral-700 border-neutral-200">
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">
                Terms and Conditions
              </h3>
              <button type="button" className="text-neutral-400 bg-transparent hover:bg-neutral-200 hover:text-neutral-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-neutral-600 dark:hover:text-neutral-50" data-modal-hide="static-modal">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5 space-y-4">
              <p className="text-base leading-relaxed text-neutral-900 dark:text-neutral-50">
                Welcome to our Terms and Conditions. These terms outline the rules and regulations for the use of our service. By accessing this service, we assume you accept these terms and conditions in full. Do not continue to use our service if you do not accept all of the terms and conditions stated on this page.
              </p>
              <p className="text-base leading-relaxed text-neutral-900 dark:text-neutral-50">
                Unless otherwise stated, we own the intellectual property rights for all material on our service. All intellectual property rights are reserved. You may view and/or print pages from our service for your own personal use subject to restrictions set in these terms and conditions.
              </p>
            </div>
            <div className="flex items-center p-4 md:p-5 border-t border-neutral-200 rounded-b dark:border-neutral-700">
              <button data-modal-hide="static-modal" type="button" onClick={() => document.getElementById('terms').checked = true} className="text-neutral-50 bg-utility-700 hover:bg-utility-800 focus:ring-2 focus:outline-none focus:ring-utility-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-utility-500 dark:hover:bg-utility-600 dark:focus:ring-utility-800 dark:focus:ring-2">I accept</button>
              <button data-modal-hide="static-modal" type="button" onClick={() => document.getElementById('terms').checked = false} className="py-2.5 px-5 ms-3 text-sm font-medium text-neutral-900 focus:outline-none bg-neutral-50 rounded-lg border border-neutral-200 hover:bg-neutral-50 hover:text-neutral-800 focus:z-10 focus:ring-2 focus:ring-neutral-100 dark:focus:ring-neutral-700 dark:bg-neutral-800 dark:text-neutral-50 dark:border-neutral-700 dark:hover:text-neutral-200 dark:hover:bg-neutral-800">Decline</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}