import { Head, useForm } from "@inertiajs/react"
import Toast from '../../components/Toast'
import { useToast } from '../../hooks/useToast'
import { useFormValidation } from '../../hooks/useFormValidation'
import { required } from '../../utils/validationRules'
import { email, password, passwordConfirmation } from '../../utils/userValidationRules'
import { every } from 'lodash'

export default function SignUp() {
  const { toast } = useToast()
  const { data, setData, post, processing, errors } = useForm({
    user: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      terms: false
    }
  })

  // Define validation rules using user-specific validations
  const validationRules = {
    name: (value) => required(value),
    email: (value) => email(value),
    password: (value) => password(value),
    password_confirmation: (value) => passwordConfirmation(value, data.user.password),
    terms: (value) => {
      if (!value) {
        return 'You must accept the terms and conditions'
      }
      return true
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
    
    // Validate all fields using lodash every
    const allFieldsValid = every(validationRules, (rule, field) => {
      const value = data.user[field]
      const result = rule(value)
      
      // If validation fails, trigger the validation to show error
      if (result !== true) {
        validateField(field, value)
      }
      
      return result === true
    })
    
    // Only submit if all validations pass
    if (allFieldsValid) {
      post('/users')
    }
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
                <div className="h-[75px]">
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-neutral-900 dark:text-neutral-50">Your name<span className="text-red-500">*</span></label>
                  <input
                    name="name"
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={data.user.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    onBlur={(e) => handleFieldBlur('name', e.target.value)}
                    className={`bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg block w-full p-2.5 dark:bg-neutral-700 dark:text-neutral-50 dark:border-neutral-700 ${getErrorClass('name')}`}
                    required
                  />
                  {validationErrors.name && (
                    <p className="mt-1 text-xs text-red-600 dark:text-red-500">{validationErrors.name}</p>
                  )}
                </div>
                <div className="h-[75px]">
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-neutral-900 dark:text-neutral-50">Your email<span className="text-red-500">*</span></label>
                  <input
                    name="email"
                    id="email"
                    type="email"
                    placeholder="name@company.com"
                    value={data.user.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    onBlur={(e) => handleFieldBlur('email', e.target.value)}
                    className={`bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg block w-full p-2.5 dark:bg-neutral-700 dark:text-neutral-50 dark:border-neutral-700 ${getErrorClass('email')}`}
                    required
                  />
                  {validationErrors.email && (
                    <p className="mt-1 text-xs text-red-600 dark:text-red-500">{validationErrors.email}</p>
                  )}
                </div>
                <div className="h-[75px]">
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-neutral-900 dark:text-neutral-50">Your password<span className="text-red-500">*</span></label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    value={data.user.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    onBlur={(e) => handleFieldBlur('password', e.target.value)}
                    className={`bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg block w-full p-2.5 dark:bg-neutral-700 dark:text-neutral-50 dark:border-neutral-700 ${getErrorClass('password')}`}
                  />
                  {validationErrors.password && (
                    <p className="mt-1 text-xs text-red-600 dark:text-red-500">{validationErrors.password}</p>
                  )}
                </div>
                <div className="h-[75px]">
                  <label htmlFor="password_confirmation" className="block mb-2 text-sm font-medium text-neutral-900 dark:text-neutral-50">Confirm password<span className="text-red-500">*</span></label>
                  <input
                    type="password"
                    name="password_confirmation"
                    id="password_confirmation"
                    placeholder="••••••••"
                    value={data.user.password_confirmation}
                    onChange={(e) => handleChange('password_confirmation', e.target.value)}
                    onBlur={(e) => handleFieldBlur('password_confirmation', e.target.value)}
                    className={`bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg block w-full p-2.5 dark:bg-neutral-700 dark:text-neutral-50 dark:border-neutral-700 ${getErrorClass('password_confirmation')}`}
                  />
                  {validationErrors.password_confirmation && (
                    <p className="mt-1 text-xs text-red-600 dark:text-red-500">{validationErrors.password_confirmation}</p>
                  )}
                </div>
                <div className="h-[40px] mt-10">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        aria-describedby="terms"
                        type="checkbox"
                        checked={data.user.terms}
                        onChange={(e) => handleChange('terms', e.target.checked)}
                        onBlur={(e) => handleFieldBlur('terms', e.target.checked)}
                        className="w-4 h-4 bg-neutral-100 border-neutral-300 rounded text-utility-700 focus:ring-utility-700 dark:focus:ring-neutral-950 dark:focus:bg-neutral-800 dark:focus:border-neutral-800 dark:bg-neutral-800 dark:text-utility-600 dark:border-neutral-800"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="terms" className="font-light text-neutral-500 dark:text-neutral-300">I agree to the <a href="#" data-modal-target="static-modal" data-modal-toggle="static-modal" className="font-medium text-utility-700 dark:text-utility-400">Terms and Conditions</a><span className="text-red-500">*</span></label>
                    </div>
                  </div>
                  {validationErrors.terms && (
                    <p className="mt-1 text-xs text-red-600 dark:text-red-500">{validationErrors.terms}</p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={processing}
                  className="w-full text-neutral-50 bg-utility-700 hover:bg-utility-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 mb-2 text-center dark:bg-utility-600 dark:hover:bg-utility-500 dark:focus:ring-utility-800">
                  {processing ? 'Creating account...' : 'Create account'}
                  </button>
                <p className="text-sm text-center font-light text-neutral-500 dark:text-neutral-400">
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
              <button data-modal-hide="static-modal" type="button" onClick={() => handleChange('terms', true)} className="text-neutral-50 bg-utility-700 hover:bg-utility-800 focus:ring-2 focus:outline-none focus:ring-utility-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-utility-600 dark:hover:bg-utility-500 dark:focus:ring-utility-800 dark:focus:ring-2">I accept</button>
              <button data-modal-hide="static-modal" type="button" onClick={() => handleChange('terms', false)} className="py-2.5 px-5 ms-3 text-sm font-medium text-neutral-900 focus:outline-none bg-neutral-50 rounded-lg border border-neutral-200 hover:bg-neutral-50 hover:text-neutral-800 focus:z-10 focus:ring-2 focus:ring-neutral-100 dark:focus:ring-neutral-700 dark:bg-neutral-800 dark:text-neutral-50 dark:border-neutral-700 dark:hover:text-neutral-200 dark:hover:bg-neutral-800">Decline</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}