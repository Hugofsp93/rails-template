import { useState, useCallback, useEffect } from 'react'
import { omit, isEmpty } from 'lodash'

/**
 * Custom hook for form validation that syncs with Inertia errors
 * @param {Object} validationRules - Object with field names as keys and validation functions as values
 * @param {Object} inertiaErrors - Errors from Inertia.js (props.errors)
 * @returns {Object} - { errors, validateField, clearFieldError }
 */
export const useFormValidation = (validationRules = {}, inertiaErrors = {}) => {
  const [frontendErrors, setFrontendErrors] = useState({})

  // Sync with Inertia errors when they arrive
  useEffect(() => {
    if (!isEmpty(inertiaErrors)) {
      setFrontendErrors(inertiaErrors)
    }
  }, [inertiaErrors])

  /**
   * Validate a single field
   * @param {string} fieldName - Name of the field to validate
   * @param {any} value - Value of the field
   * @returns {boolean} - True if valid, false if invalid
   */
  const validateField = useCallback((fieldName, value) => {
    const rule = validationRules[fieldName]
    if (!rule) return true

    const result = rule(value)
    if (result === true) {
      // Field is valid, clear error
      setFrontendErrors(prev => omit(prev, [fieldName]))
      return true
    } else {
      // Field is invalid, set error
      setFrontendErrors(prev => ({
        ...prev,
        [fieldName]: result
      }))
      return false
    }
  }, [validationRules])

  /**
   * Clear error for a specific field
   * @param {string} fieldName - Name of the field to clear error
   */
  const clearFieldError = useCallback((fieldName) => {
    setFrontendErrors(prev => omit(prev, [fieldName]))
  }, [])

  /**
   * Clear all errors
   */
  const clearAllErrors = useCallback(() => {
    setFrontendErrors({})
  }, [])

  return {
    errors: frontendErrors,
    validateField,
    clearFieldError,
    clearAllErrors
  }
} 