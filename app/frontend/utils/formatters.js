/**
 * Formats a date to Brazilian standard (DD/MM/YYYY HH:mm:ss)
 * @param {string|Date} dateString - Date to be formatted
 * @returns {string} Formatted date or '-' if invalid
 */
export const formatDate = (dateString) => {
  if (!dateString) return '-'
  
  // Creates date and adjusts to Brazilian timezone
  const date = new Date(dateString)
  const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000)
  
  return utcDate.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  })
}

/**
 * Formats a date to Brazilian standard with date only (DD/MM/YYYY)
 * @param {string|Date} dateString - Date to be formatted
 * @returns {string} Formatted date or '-' if invalid
 */
export const formatDateOnly = (dateString) => {
  if (!dateString) return '-'
  
  // Creates date and adjusts to Brazilian timezone
  const date = new Date(dateString)
  const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000)
  
  return utcDate.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'America/Sao_Paulo'
  })
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
      const timePart = timeString.split('T')[1].split('.')[0]
      return timePart
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