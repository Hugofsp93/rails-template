import { Head, useForm, Link } from "@inertiajs/react"
import Toast from '../../components/Toast'
import { useToast } from '../../hooks/useToast'
import { useFormValidation } from '../../hooks/useFormValidation'
import { required } from '../../utils/validationRules'
import { email } from '../../utils/userValidationRules'

export default function ForgotPassword() {
  const { toast } = useToast()
  const { data, setData, post, processing, errors } = useForm({
    user: {
      email: '',
    }
  })

  // Define validation rules
  const validationRules = {
    email: (value) => {
      const requiredResult = required(value, 'Email')
      if (requiredResult !== true) return requiredResult
      return email(value)
    }
  }

  // Initialize validation hook
  const { errors: validationErrors, validateField, clearFieldError } = useFormValidation(validationRules, errors)

  const getErrorClass = (fieldName) => {
    return validationErrors[fieldName] 
      ? 'border-red-500 focus:ring-red-500 focus:border-red-500 dark:border-red-500' 
      : 'focus:ring-neutral-300 focus:border-neutral-300 dark:focus:ring-neutral-500 dark:focus:border-neutral-500'
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

  const handleSubmit = (e) => {
    e.preventDefault()
    post('/users/password')
  }

  return (
    <>
      <Head title="Forgot Password" />
      {toast && <Toast {...toast} />}
      <section className="w-full mt-20 max-w-lg bg-transparent">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full p-6 bg-neutral-50 rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-neutral-950 dark:border-neutral-800 sm:p-8">
            <h1 className="mb-1 text-xl font-bold leading-tight tracking-tight text-neutral-900 md:text-2xl dark:text-neutral-50">
              Forgot your password?
            </h1>
            <p className="font-light text-neutral-500 dark:text-neutral-400">Don't fret! Just type in your email and we will send you a code to reset your password!</p>
            <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleSubmit} noValidate>
              <div className="h-[90px]">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-neutral-900 dark:text-neutral-50">Your email<span className="text-red-500">*</span></label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={data.user.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  onBlur={(e) => handleFieldBlur('email', e.target.value)}
                  className={`bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg block w-full p-2.5 dark:bg-neutral-700 dark:text-neutral-50 dark:border-neutral-700 ${getErrorClass('email')}`}
                  placeholder="name@company.com"
                />
                {validationErrors.email && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-500">{validationErrors.email}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={processing}
                className="w-full text-neutral-50 bg-utility-700 hover:bg-utility-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 mb-2 text-center dark:bg-utility-600 dark:hover:bg-utility-500 dark:focus:ring-utility-800">
                {processing ? 'Sending...' : 'Reset password'}
              </button>
              <Link href="/sign_in" className="w-full flex justify-center text-sm text-center text-neutral-500 dark:text-neutral-200">Return to login</Link>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}