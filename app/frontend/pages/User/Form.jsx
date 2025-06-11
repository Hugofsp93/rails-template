import Toast from '../../components/Toast'
import { useToast } from '../../hooks/useToast'
import { useAuthorization } from '../../hooks/useAuthorization'
import { Link } from '@inertiajs/react'
import 'react-phone-input-2/lib/style.css'
import '../../styles/phoneInput.css'
import PhoneInputWrapper from '../../components/PhoneInputWrapper'
import RoleSelector from '../../components/RoleSelector'
import { useFormValidation } from '../../hooks/useFormValidation'
import { required, minLength } from '../../utils/validationRules'
import { email, password, phone } from '../../utils/userValidationRules'
import { every } from 'lodash'

export default function Form({ errors, data, processing, handleChange, handleSubmit, isEditingPassword, setIsEditingPassword, isEdit, availableRoles }) {
  const { toast } = useToast()
  const { canAssignRole } = useAuthorization()

  // Define validation rules based on User model validations
  const validationRules = {
    name: (value) => {
      const requiredResult = required(value, 'Name')
      if (requiredResult !== true) return requiredResult
      return minLength(value, 2, 'Name')
    },
    email: (value) => {
      const requiredResult = required(value, 'Email')
      if (requiredResult !== true) return requiredResult
      return email(value)
    },
    phone: (value) => phone(value, 'Phone'),
    role: (value) => {
      // Role validation only for admin creation
      if (!isEdit && availableRoles?.length > 0) {
        const requiredResult = required(value, 'Role')
        if (requiredResult !== true) return requiredResult
        if (!canAssignRole(value)) {
          return 'You cannot assign this role'
        }
      }
      return true
    },
    password: (value) => {
      // Password is required on create, optional on update
      if (!isEdit || isEditingPassword) {
        const requiredResult = required(value, 'Password')
        if (requiredResult !== true) return requiredResult
      }
      if (value) {
        return password(value)
      }
      return true
    },
    password_confirmation: (value) => {
      // Password confirmation is required when password is being set
      if (!isEdit || isEditingPassword) {
        const requiredResult = required(value, 'Password confirmation')
        if (requiredResult !== true) return requiredResult
        if (value !== data.user.password) {
          return 'Password confirmation does not match'
        }
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

  const getErrorMessage = (fieldName) => {
    if (!validationErrors[fieldName]) return null
    // Remove duplicate messages if they exist
    const message = validationErrors[fieldName]
    return Array.isArray(message) ? message[0] : message
  }

  // Enhanced handleChange with real-time validation
  const handleFieldChange = (field, value) => {
    handleChange(field, value)
    
    // Clear error when user edits the field
    const fieldName = field.split('.')[1]
    clearFieldError(fieldName)
  }

  // Handle field blur for validation
  const handleFieldBlur = (field, value) => {
    const fieldName = field.split('.')[1]
    validateField(fieldName, value)
  }

  const handleSubmitForm = (e) => {
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
      handleSubmit(e)
    }
  }

  return (
    <>
      { toast && <Toast {...toast} /> }
      <form onSubmit={handleSubmitForm} noValidate>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 sm:gap-6">
          <div className="h-[75px]">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-neutral-900 dark:text-neutral-50">Name<span className="text-red-500">*</span></label>
            <input
              type="text"
              name="name"
              id="name"
              value={data.user.name}
              onChange={(e) => handleFieldChange('user.name', e.target.value)}
              onBlur={(e) => handleFieldBlur('user.name', e.target.value)}
              className={`bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg block w-full p-2.5 dark:bg-neutral-700 dark:text-neutral-50 dark:border-neutral-700 ${getErrorClass('name')}`}
              placeholder="Type user name"
            />
            {validationErrors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-500">{getErrorMessage('name')}</p>}
          </div>
          <div className="h-[75px]">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-neutral-900 dark:text-neutral-50">Email<span className="text-red-500">*</span></label>
            <input
              type="email"
              name="email"
              id="email"
              value={data.user.email}
              onChange={(e) => handleFieldChange('user.email', e.target.value)}
              onBlur={(e) => handleFieldBlur('user.email', e.target.value)}
              className={`bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg block w-full p-2.5 dark:bg-neutral-700 dark:text-neutral-50 dark:border-neutral-700 ${getErrorClass('email')}`}
              placeholder="user@example.com"
            />
            {validationErrors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-500">{getErrorMessage('email')}</p>}
          </div>
          <div className="h-[75px]">
            <PhoneInputWrapper
              label="Phone"
              value={data.user.phone}
              onChange={(value) => handleFieldChange('user.phone', value)}
              onBlur={(value) => handleFieldBlur('user.phone', value)}
              error={validationErrors.phone}
              required
            />
            {/* {validationErrors.phone && <p className="mt-1 text-sm text-red-600 dark:text-red-500">{getErrorMessage('phone')}</p>} */}
          </div>
          
          {/* Role selector - only show for admin creation or if user can assign roles */}
          {(!isEdit || (isEdit && availableRoles?.length > 0)) && (
            <RoleSelector
              value={data.user.role}
              onChange={(value) => handleFieldChange('user.role', value)}
              availableRoles={availableRoles || []}
              disabled={!availableRoles || availableRoles.length === 0}
            />
          )}
        </div>

        {isEdit && (
          <div className="mt-8 ml-4 mb-4 flex justify-start">
            <button
              type="button"
              onClick={() => setIsEditingPassword(!isEditingPassword)}
              className="text-sm text-utility-600 hover:text-utility-700 dark:text-utility-500 dark:hover:text-utility-400"
            >
              {isEditingPassword ? 'Cancel password change' : 'Change password'}
            </button>
          </div>
        )}

        {(!isEdit || isEditingPassword) && (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 sm:gap-6 mt-8 border-t border-neutral-200 dark:border-neutral-700 pt-8">
            <div className="h-[75px]">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-neutral-900 dark:text-neutral-50">Password<span className="text-red-500">*</span></label>
              <input
                type="password"
                name="password"
                id="password"
                value={data.user.password}
                onChange={(e) => handleFieldChange('user.password', e.target.value)}
                onBlur={(e) => handleFieldBlur('user.password', e.target.value)}
                className={`bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg block w-full p-2.5 dark:bg-neutral-700 dark:text-neutral-50 dark:border-neutral-700 ${getErrorClass('password')}`}
                placeholder="••••••••"
              />
              {validationErrors.password && <p className="mt-1 text-sm text-red-600 dark:text-red-500">{getErrorMessage('password')}</p>}
            </div>
            <div className="h-[75px]">
              <label htmlFor="password_confirmation" className="block mb-2 text-sm font-medium text-neutral-900 dark:text-neutral-50">Confirm Password<span className="text-red-500">*</span></label>
              <input
                type="password"
                name="password_confirmation"
                id="password_confirmation"
                value={data.user.password_confirmation}
                onChange={(e) => handleFieldChange('user.password_confirmation', e.target.value)}
                onBlur={(e) => handleFieldBlur('user.password_confirmation', e.target.value)}
                className={`bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg block w-full p-2.5 dark:bg-neutral-700 dark:text-neutral-50 dark:border-neutral-700 ${getErrorClass('password_confirmation')}`}
                placeholder="••••••••"
              />
              {validationErrors.password_confirmation && <p className="mt-1 text-sm text-red-600 dark:text-red-500">{getErrorMessage('password_confirmation')}</p>}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={processing}
          className="inline-flex items-center px-8 py-2.5 mt-8 text-sm font-medium text-center text-neutral-50 bg-utility-700 rounded-lg focus:ring-neutral-200 dark:focus:ring-utility-500 hover:bg-utility-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {processing ? 'Saving...' : 'Save'}
        </button>
        <Link
          href="/admin/users"
          type="button"
          className="inline-flex items-center px-8 py-2.5 mt-8 text-sm font-medium text-center hover:underline text-utility-700 hover:color-utility-600 dark:text-neutral-200"
        >
          Back
        </Link>
      </form>
    </>
  )
}
