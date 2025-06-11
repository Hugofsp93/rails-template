export default function RoleBadge({ role, className = '' }) {
  const getRoleConfig = (roleName) => {
    switch (roleName) {
      case 'super_admin':
        return {
          label: 'Super Admin',
          bgColor: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
          borderColor: 'border-red-200 dark:border-red-700'
        }
      case 'admin':
        return {
          label: 'Admin',
          bgColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
          borderColor: 'border-blue-200 dark:border-blue-700'
        }
      case 'operator':
        return {
          label: 'Operator',
          bgColor: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
          borderColor: 'border-green-200 dark:border-green-700'
        }
      default:
        return {
          label: 'Unknown',
          bgColor: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
          borderColor: 'border-gray-200 dark:border-gray-700'
        }
    }
  }

  const config = getRoleConfig(role)

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.bgColor} ${config.borderColor} ${className}`}>
      {config.label}
    </span>
  )
} 