/**
 * Formats a date to Brazilian standard (DD/MM/YYYY HH:mm:ss)
 * @param {string|Date} dateString - Date to be formatted
 * @returns {string} Formatted date or '-' if invalid
 */
export const formatDate = (dateString) => {
  if (!dateString) return '-'
  
  try {
    // Parse the date string to get individual components
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return '-'

    // Extract date components
    const day = String(date.getUTCDate()).padStart(2, '0')
    const month = String(date.getUTCMonth() + 1).padStart(2, '0')
    const year = date.getUTCFullYear()
    const hours = String(date.getUTCHours()).padStart(2, '0')
    const minutes = String(date.getUTCMinutes()).padStart(2, '0')
    const seconds = String(date.getUTCSeconds()).padStart(2, '0')
    
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
  } catch (error) {
    console.error('Error formatting date:', error)
    return '-'
  }
}

/**
 * Formats a date to Brazilian standard with date only (DD/MM/YYYY)
 * @param {string|Date} dateString - Date to be formatted
 * @returns {string} Formatted date or '-' if invalid
 */
export const formatDateOnly = (dateString) => {
  if (!dateString) return '-'
  
  try {
    // Parse the date string to get individual components
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return '-'

    // Extract date components
    const day = String(date.getUTCDate()).padStart(2, '0')
    const month = String(date.getUTCMonth() + 1).padStart(2, '0')
    const year = date.getUTCFullYear()
    
    return `${day}/${month}/${year}`
  } catch (error) {
    console.error('Error formatting date:', error)
    return '-'
  }
}

/**
 * Formats a time to Brazilian standard (HH:mm:ss)
 * @param {string} timeString - Time to be formatted (can be ISO string or HH:mm:ss)
 * @returns {string} Formatted time or '-' if invalid
 */
export const formatTime = (timeString) => {
  if (!timeString) return '-'
  
  try {
    // If it's an ISO date, extract only the time part
    if (timeString.includes('T')) {
      const date = new Date(timeString)
      if (isNaN(date.getTime())) return '-'

      const hours = String(date.getUTCHours()).padStart(2, '0')
      const minutes = String(date.getUTCMinutes()).padStart(2, '0')
      const seconds = String(date.getUTCSeconds()).padStart(2, '0')
      
      return `${hours}:${minutes}:${seconds}`
    }
    
    // If it's already a time string, format normally
    const timeParts = timeString.split(':')
    if (timeParts.length < 2) return '-'
    
    const hours = timeParts[0].padStart(2, '0')
    const minutes = timeParts[1].padStart(2, '0')
    const seconds = timeParts[2] ? timeParts[2].padStart(2, '0') : '00'
    
    return `${hours}:${minutes}:${seconds}`
  } catch (error) {
    console.error('Error formatting time:', error)
    return '-'
  }
}

/**
 * Formats a number to Brazilian standard
 * @param {number} value - Number to be formatted
 * @param {string} type - Number type (integer, bigint, float, decimal)
 * @returns {string} Formatted number or '-' if invalid
 */
export const formatNumber = (value, type) => {
  if (value === null || value === undefined) return '-'
  
  switch(type) {
    case 'integer':
    case 'bigint':
      return value.toLocaleString('pt-BR')
    case 'float':
    case 'decimal':
      return Number(value).toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 6
      })
    default:
      return value
  }
} 