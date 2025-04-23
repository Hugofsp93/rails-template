import { Head, useForm } from '@inertiajs/react'
import Toast from '../../components/Toast'
import { useToast } from '../../hooks/useToast'
import { useState } from 'react'

export default function SignIn() {
  const { toast } = useToast()
  const [errors, setErrors] = useState({})
  const { data, setData, post, processing } = useForm({
    user: {
      email: '',
      password: '',
      remember_me: false
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

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    post('/users/sign_in')
  }

  const handleChange = (field, value) => {
    setData('user', {
      ...data.user,
      [field]: value
    })
    // clean error when user change the field
    setErrors(prev => ({ ...prev, [field]: '', base: '' }))
  }

  return (
    <>
      {toast && <Toast {...toast} />}
      <Head title="Sign In" />
      <div className="w-full mt-20 max-w-md min-h-[400px] bg-neutral-50 border border-neutral-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-neutral-950 dark:border-neutral-800">
        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          <h5 className="text-xl font-medium text-neutral-900 dark:text-neutral-50">Sign in to our platform</h5>

          <div className="h-[85px]">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-neutral-900 dark:text-neutral-50">Your email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={data.user.email}
              className={`bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg block w-full p-2.5 dark:bg-neutral-700 dark:text-neutral-50 dark:border-neutral-700 ${
                errors.email ? 'border-utility-500 focus:ring-utility-500 focus:border-utility-500' : 'focus:ring-utility-500 focus:border-utility-500'
              }`}
              placeholder="name@company.com"
              onChange={(e) => handleChange('email', e.target.value)}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-utility-600 dark:text-utility-500">{errors.email}</p>
            )}
          </div>

          <div className="h-[85px]">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-neutral-900 dark:text-neutral-50">Your password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={data.user.password}
              className={`bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg block w-full p-2.5 dark:bg-neutral-700 dark:text-neutral-50 dark:border-neutral-700 ${
                errors.password ? 'border-utility-500 focus:ring-utility-500 focus:border-utility-500' : 'focus:ring-utility-500 focus:border-utility-500'
              }`}
              placeholder="••••••••"
              onChange={(e) => handleChange('password', e.target.value)}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-utility-600 dark:text-utility-500">{errors.password}</p>
            )}
          </div>

          <div className="flex items-start">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  checked={data.user.remember_me}
                  className="w-4 h-4 border border-neutral-300 rounded-sm bg-neutral-50 accent-utility-500 focus:ring-1 focus:ring-neutral-50 dark:bg-neutral-700 dark:border-neutral-700 dark:focus:ring-neutral-950 dark:ring-offset-neutral-800 dark:focus:ring-offset-neutral-800"
                  onChange={(e) => handleChange('remember_me', e.target.checked)}
                />
              </div>
              <label htmlFor="remember" className="ms-2 text-sm font-medium text-neutral-900 dark:text-neutral-300">Remember me</label>
            </div>
            <a href="/forgot_password" className="ms-auto text-sm font-medium text-neutral-700 hover:underline dark:text-neutral-200">Forgot your password?</a>
          </div>

          <button
            type="submit"
            disabled={processing}
            className="w-full text-neutral-50 bg-utility-700 hover:bg-utility-800 focus:ring-2 focus:outline-none focus:ring-utility-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-utility-500 dark:hover:bg-utility-600 dark:focus:ring-utility-500 disabled:opacity-75"
          >
            {processing ? 'Signing in...' : 'Login to your account'}
          </button>

          <div className="text-sm font-medium text-neutral-500 dark:text-neutral-200">
            Not registered? <a href="/sign_up" className="text-utility-700 hover:underline dark:text-utility-400">Create account</a>
          </div>
        </form>
      </div>
    </>
  )
}