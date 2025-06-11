import { useAuthorization } from '../hooks/useAuthorization'

export default function RoleSelector({ value, onChange, availableRoles, disabled = false }) {
  const { canAssignRole } = useAuthorization()

  const roleOptions = [
    { value: 'operator', label: 'Operator', description: 'Can only view and edit own profile' },
    { value: 'admin', label: 'Admin', description: 'Can manage users and content' },
    { value: 'super_admin', label: 'Super Admin', description: 'Full system access' }
  ]

  const filteredOptions = roleOptions.filter((option) =>
    availableRoles.includes(option.value) && canAssignRole(option.value)
  )

  return (
    <div className="h-[75px]">
      <label htmlFor="role" className="block mb-2 text-sm font-medium text-neutral-900 dark:text-neutral-50">
        Role<span className="text-red-500">*</span>
      </label>
      <select
        id="role"
        name="role"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled || filteredOptions.length === 0}
        className={`bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg block w-full p-2.5 dark:bg-neutral-700 dark:text-neutral-50 dark:border-neutral-700 ${
          (disabled || filteredOptions.length === 0) ? 'opacity-50 cursor-not-allowed' : 'focus:ring-neutral-300 focus:border-neutral-300 dark:focus:ring-neutral-500 dark:focus:border-neutral-500'
        }`}
      >
        <option value="">Select Role</option>
        {filteredOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label} - {option.description}
          </option>
        ))}
      </select>
    </div>
  )
} 