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
  const date = new Date(dateString)
  return date.toISOString().split('T')[0] // Format: YYYY-MM-DD
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