/**
 * User-specific validation rules
 * Combines generic validation functions for user-related fields
 */

import { required } from './validationRules'

/**
 * User terms acceptance validation
 * @param {boolean} value - Terms acceptance value to validate
 * @returns {string|true} - Error message or true if valid
 */
export const userTerms = (value) => {
  if (!value) {
    return 'You must accept the terms and conditions'
  }
  return true
}

/**
 * Email validation
 * @param {string} value - Email value to validate
 * @returns {string|true} - Error message or true if valid
 */
export const email = (value) => {
  const requiredResult = required(value, 'Email')
  if (requiredResult !== true) return requiredResult
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(value)) {
    return 'Please enter a valid email address'
  }
  return true
}

/**
 * Password validation (minimum 6 characters)
 * @param {string} value - Password value to validate
 * @returns {string|true} - Error message or true if valid
 */
export const password = (value) => {
  if (!value) return true // Skip if empty (use required for mandatory passwords)
  
  if (value.length < 6) {
    return 'Password must be at least 6 characters'
  }
  return true
}

/**
 * Password confirmation validation
 * @param {string} value - Password confirmation value to validate
 * @param {string} passwordValue - Original password value to compare
 * @returns {string|true} - Error message or true if valid
 */
export const passwordConfirmation = (value, passwordValue) => {
  const requiredResult = required(value, 'Password confirmation')
  if (requiredResult !== true) return requiredResult
  
  if (value !== passwordValue) {
    return 'Password confirmation does not match'
  }
  return true
}


/**
 * Phone validation
 * @param {string} value - Phone value to validate
 * @returns {string|true} - Error message or true if valid
 */
export const phone = (value) => {
  // Remove non-digit characters
  const cleaned = value.replace(/\D/g, '')
  console.log('Phone number has brazilian digits:', cleaned.length)
  
  // Check if phone number has brazilian digits
  if (cleaned.length !== 13) {
    return 'Please enter a valid phone number'
  }
  
  return true
} 