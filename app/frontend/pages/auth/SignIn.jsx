import { Head, useForm } from '@inertiajs/react'
import Toast from '../../components/Toast'
import { useToast } from '../../hooks/useToast'
import { useFormValidation } from '../../hooks/useFormValidation'
import { email, password } from '../../utils/userValidationRules'

export default function SignIn() {
  const { toast } = useToast()
  const { data, setData, post, processing, errors } = useForm({
    user: {
      email: '',
      password: '',
      remember_me: false
    }
  })

  // Define validation rules using user-specific validations
  const validationRules = {
    email: (value) => email(value),
    password: (value) => password(value)
  }

  // Initialize validation hook
  const { errors: validationErrors, validateField, clearFieldError } = useFormValidation(validationRules, errors)

  const getErrorClass = (fieldName) => {
    return validationErrors[fieldName] 
      ? 'border-red-500 focus:ring-red-500 focus:border-red-500 dark:border-red-500' 
      : 'focus:ring-neutral-300 focus:border-neutral-300 dark:focus:ring-neutral-500 dark:focus:border-neutral-500'
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    post('/users/sign_in')
  }

  const handleChange = (field, value) => {
    setData('user', {
      ...data.user,
      [field]: value
    })
    // Clear error when user edits the field
    clearFieldError(field)
  }

  const handleFieldBlur = (field, value) => {
    validateField(field, value)
  }

  return (
    <>
      {toast && <Toast {...toast} />}
      <Head title="Sign In" />
      <div className="w-full mt-20 max-w-md min-h-[400px] bg-neutral-50 border border-neutral-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-neutral-950 dark:border-neutral-800">
        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          <h5 className="text-xl font-medium text-neutral-900 dark:text-neutral-50">Sign in to our platform</h5>

          <div className="h-[75px]">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-neutral-900 dark:text-neutral-50">Your email<span className="text-red-500">*</span></label>
            <input
              type="email"
              name="email"
              id="email"
              value={data.user.email}
              className={`bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg block w-full p-2.5 dark:bg-neutral-700 dark:text-neutral-50 dark:border-neutral-700 ${getErrorClass('email')}`}
              placeholder="name@company.com"
              onChange={(e) => handleChange('email', e.target.value)}
              onBlur={(e) => handleFieldBlur('email', e.target.value)}
            />
            {validationErrors.email && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-500">{validationErrors.email}</p>
            )}
          </div>

          <div className="h-[75px] mb-10">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-neutral-900 dark:text-neutral-50">Password<span className="text-red-500">*</span></label>
            <input
              type="password"
              name="password"
              id="password"
              value={data.user.password}
              className={`bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg block w-full p-2.5 dark:bg-neutral-700 dark:text-neutral-50 dark:border-neutral-700 ${getErrorClass('password')}`}
              placeholder="••••••••"
              onChange={(e) => handleChange('password', e.target.value)}
              onBlur={(e) => handleFieldBlur('password', e.target.value)}
            />
            {validationErrors.password && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-500">{validationErrors.password}</p>
            )}
          </div>

          <div className="flex items-start">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  checked={data.user.remember_me}
                  className="w-4 h-4 bg-neutral-100 border-neutral-300 rounded text-utility-700 focus:ring-utility-700 dark:focus:ring-neutral-950 dark:focus:bg-neutral-800 dark:focus:border-neutral-800 dark:bg-neutral-800 dark:text-utility-600 dark:border-neutral-800"
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
            className="w-full text-neutral-50 bg-utility-700 hover:bg-utility-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-5 mb-3 dark:bg-utility-600 dark:hover:bg-utility-500 dark:focus:ring-utility-500 disabled:opacity-75"
          >
            {processing ? 'Signing in...' : 'Login to your account'}
          </button>

          <div className="text-sm text-center font-medium text-neutral-500 dark:text-neutral-200">
            Not registered? <a href="/sign_up" className="text-utility-700 hover:underline dark:text-utility-400">Create account</a>
          </div>
        </form>
      </div>
    </>
  )
}