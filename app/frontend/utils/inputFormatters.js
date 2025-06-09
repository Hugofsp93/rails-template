/**
 * Formats a datetime string for datetime-local input (YYYY-MM-DDTHH:mm:ss)
 * @param {string|Date} dateString - Date to be formatted
 * @returns {string} Formatted datetime or empty string if invalid
 */
export const formatDateTimeForInput = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  // Format: YYYY-MM-DDTHH:mm:ss
  return date.toISOString().slice(0, 19)
}

/**
 * Formats a date string for date input (YYYY-MM-DD)
 * @param {string|Date} dateString - Date to be formatted
 * @returns {string} Formatted date or empty string if invalid
 */
export const formatDateForInput = (dateString) => {
  if (!dateString) return ''
  
  // If the date string is in YYYY-MM-DD format, limit year to 4 digits
  if (/^\d{4,}-\d{2}-\d{2}$/.test(dateString)) {
    const [year, month, day] = dateString.split('-')
    // Limit year to 4 digits
    const limitedYear = year.substring(0, 4)
    return `${limitedYear}-${month}-${day}`
  }
  
  // If the date string is in DD/MM/YYYY format, convert it and limit year to 4 digits
  if (/^\d{1,2}\/\d{1,2}\/\d{4,}$/.test(dateString)) {
    const [day, month, year] = dateString.split('/')
    // Limit year to 4 digits
    const limitedYear = year.substring(0, 4)
    return `${limitedYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
  }
  
  // For dates within JavaScript's valid range, use Date object
  try {
    const date = new Date(dateString)
    if (!isNaN(date.getTime())) {
      return date.toISOString().split('T')[0]
    }
  } catch (error) {
    console.warn('Error formatting date:', error)
  }
  
  return ''
}

/**
 * Formats a time string for time input (HH:mm:ss)
 * @param {string} timeString - Time to be formatted (can be ISO string or HH:mm:ss)
 * @returns {string} Formatted time or empty string if invalid
 */
export const formatTimeForInput = (timeString) => {
  if (!timeString) return ''
  // If it's an ISO string, extract the time part
  if (timeString.includes('T')) {
    return timeString.split('T')[1].split('.')[0]
  }
  // If it's already a time string, ensure it has seconds
  const parts = timeString.split(':')
  if (parts.length === 2) {
    return `${timeString}:00`
  }
  return timeString
}

/**
 * Formats a value for input based on its type
 * @param {any} value - Value to be formatted
 * @param {string} type - Type of the field (datetime, date, time)
 * @returns {string} Formatted value or empty string if invalid
 */
export const formatValueForInput = (value, type) => {
  switch (type) {
    case 'datetime':
      return formatDateTimeForInput(value)
    case 'date':
      return formatDateForInput(value)
    case 'time':
      return formatTimeForInput(value)
    default:
      return value || ''
  }
}

/**
 * Validates date, datetime-local, and time input values
 * @param {string} type - The input type (date, datetime-local, time)
 * @param {string} value - The input value
 * @returns {boolean} True if valid, false otherwise
 */
export function isValidDateInput(type, value) {
  if (!value) return true;
  
  if (type === 'date') {
    // Check if the date format is valid and year has at most 4 digits
    const dateRegex = /^(\d{4})-\d{2}-\d{2}$/;
    const match = value.match(dateRegex);
    if (!match) return false;
    
    const year = parseInt(match[1]);
    return year >= 1 && year <= 9999;
  }
  
  if (type === 'datetime-local') {
    // Check if the datetime format is valid and year has at most 4 digits
    const datetimeRegex = /^(\d{4})-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?$/;
    const match = value.match(datetimeRegex);
    if (!match) return false;
    
    const year = parseInt(match[1]);
    return year >= 1 && year <= 9999;
  }
  
  if (type === 'time') {
    return /^\d{2}:\d{2}(:\d{2})?$/.test(value);
  }
  
  return true;
}