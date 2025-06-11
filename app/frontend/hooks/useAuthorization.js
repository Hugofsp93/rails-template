import { usePage } from '@inertiajs/react'

/**
 * Custom hook for authorization management
 * @returns {Object} - Authorization utilities and current user info
 */
export const useAuthorization = () => {
  const { currentUser } = usePage().props

  const isSuperAdmin = () => currentUser?.super_admin || false
  const isAdmin = () => currentUser?.admin || false
  const isOperator = () => currentUser?.operator || false

  const canManageUsers = () => isSuperAdmin() || isAdmin()
  const canCreateUsers = () => isSuperAdmin() || isAdmin()
  const canEditUser = (targetUser) => {
    if (isSuperAdmin()) return true
    if (isAdmin() && !targetUser.roles?.includes('super_admin')) return true
    if (isOperator() && targetUser.id === currentUser?.id) return true
    return false
  }
  const canDeleteUser = (targetUser) => {
    if (isSuperAdmin()) return true
    if (isAdmin() && !targetUser.roles?.includes('super_admin') && !targetUser.roles?.includes('admin')) return true
    return false
  }
  const canSeeUser = (targetUser) => {
    if (isSuperAdmin()) return true
    if (isAdmin() && !targetUser.roles?.includes('super_admin')) return true
    if (isOperator() && targetUser.id === currentUser?.id) return true
    return false
  }

  const canAssignRole = (roleName) => {
    if (roleName === 'super_admin') return isSuperAdmin()
    if (roleName === 'admin' || roleName === 'operator') return isSuperAdmin() || isAdmin()
    return false
  }

  const getAvailableRoles = () => {
    const roles = []
    if (isSuperAdmin()) {
      roles.push('admin')
      roles.push('operator')
    } else if (isAdmin()) {
      roles.push('operator')
    }
    return roles
  }

  return {
    currentUser,
    isSuperAdmin,
    isAdmin,
    isOperator,
    canManageUsers,
    canCreateUsers,
    canEditUser,
    canDeleteUser,
    canSeeUser,
    canAssignRole,
    getAvailableRoles
  }
} 