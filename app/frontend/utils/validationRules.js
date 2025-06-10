/**
 * Common validation rules for forms
 */

/**
 * Required field validation
 * @param {any} value - Value to validate
 * @param {string} fieldName - Name of the field (for error message)
 * @returns {string|true} - Error message or true if valid
 */
export const required = (value, fieldName = 'This field') => {
  if (value === null || value === undefined || value === '') {
    return `${fieldName} is required`
  }
  return true
}

/**
 * Minimum length validation
 * @param {string} value - Value to validate
 * @param {number} minLength - Minimum required length
 * @param {string} fieldName - Name of the field (for error message)
 * @returns {string|true} - Error message or true if valid
 */
export const minLength = (value, minLength, fieldName = 'This field') => {
  if (!value) return true // Skip if empty
  
  if (value.length < minLength) {
    return `${fieldName} must be at least ${minLength} characters`
  }
  return true
}

/**
 * Maximum length validation
 * @param {string} value - Value to validate
 * @param {number} maxLength - Maximum allowed length
 * @param {string} fieldName - Name of the field (for error message)
 * @returns {string|true} - Error message or true if valid
 */
export const maxLength = (value, maxLength, fieldName = 'This field') => {
  if (!value) return true // Skip if empty
  
  if (value.length > maxLength) {
    return `${fieldName} must be no more than ${maxLength} characters`
  }
  return true
}

/**
 * Number validation
 * @param {any} value - Value to validate
 * @param {string} fieldName - Name of the field (for error message)
 * @returns {string|true} - Error message or true if valid
 */
export const number = (value, fieldName = 'This field') => {
  if (!value) return true // Skip if empty
  
  if (isNaN(Number(value))) {
    return `${fieldName} must be a valid number`
  }
  return true
}

/**
 * Minimum value validation
 * @param {number} value - Value to validate
 * @param {number} min - Minimum allowed value
 * @param {string} fieldName - Name of the field (for error message)
 * @returns {string|true} - Error message or true if valid
 */
export const minValue = (value, min, fieldName = 'This field') => {
  if (!value) return true // Skip if empty
  
  const numValue = Number(value)
  if (numValue < min) {
    return `${fieldName} must be at least ${min}`
  }
  return true
}

/**
 * Maximum value validation
 * @param {number} value - Value to validate
 * @param {number} max - Maximum allowed value
 * @param {string} fieldName - Name of the field (for error message)
 * @returns {string|true} - Error message or true if valid
 */
export const maxValue = (value, max, fieldName = 'This field') => {
  if (!value) return true // Skip if empty
  
  const numValue = Number(value)
  if (numValue > max) {
    return `${fieldName} must be no more than ${max}`
  }
  return true
}

/**
 * Date validation using inputFormatters logic
 * @param {string} value - Date value to validate
 * @param {string} fieldName - Name of the field (for error message)
 * @returns {string|true} - Error message or true if valid
 */
export const date = (value, fieldName = 'This field') => {
  if (!value) return true // Skip if empty
  
  // Use the same logic as inputFormatters for consistency
  const dateRegex = /^(\d{4})-\d{2}-\d{2}$/
  const match = value.match(dateRegex)
  if (!match) {
    return `${fieldName} must be a valid date (YYYY-MM-DD)`
  }
  
  const year = parseInt(match[1])
  if (year < 1700 || year > 2300) {
    return `${fieldName} must have a valid year (1700-2300)`
  }
  
  const dateObj = new Date(value)
  if (isNaN(dateObj.getTime())) {
    return `${fieldName} must be a valid date`
  }
  
  return true
}

/**
 * DateTime validation using inputFormatters logic
 * @param {string} value - DateTime value to validate
 * @param {string} fieldName - Name of the field (for error message)
 * @returns {string|true} - Error message or true if valid
 */
export const datetime = (value, fieldName = 'This field') => {
  if (!value) return true // Skip if empty
  
  // Use the same logic as inputFormatters for consistency
  const datetimeRegex = /^(\d{4})-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?$/
  const match = value.match(datetimeRegex)
  if (!match) {
    return `${fieldName} must be a valid date and time (DD-MM-AAAA HH:mm:ss)`
  }
  
  const year = parseInt(match[1])
  if (year < 1700 || year > 2300) {
    return `${fieldName} must have a valid year (1700-2300)`
  }
  
  const dateObj = new Date(value)
  if (isNaN(dateObj.getTime())) {
    return `${fieldName} must be a valid date and time`
  }
  
  return true
}

/**
 * Time validation using inputFormatters logic
 * @param {string} value - Time value to validate
 * @param {string} fieldName - Name of the field (for error message)
 * @returns {string|true} - Error message or true if valid
 */
export const time = (value, fieldName = 'This field') => {
  if (!value) return true // Skip if empty
  
  if (!/^\d{2}:\d{2}(:\d{2})?$/.test(value)) {
    return `${fieldName} must be a valid time (HH:mm:ss)`
  }
  
  return true
} 