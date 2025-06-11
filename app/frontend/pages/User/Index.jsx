import { Head, Link, router, usePage } from '@inertiajs/react'
import { useToast } from '../../hooks/useToast'
import { useAuthorization } from '../../hooks/useAuthorization'
import Toast from "../../components/Toast"
import RoleBadge from "../../components/RoleBadge"
import { useState, useEffect } from 'react'
import { initDropdowns } from 'flowbite'
import Table from '../../components/Table'
import Pagination from '../../components/Pagination'
import SearchBar from '../../components/SearchBar'
import FilterDropdown from '../../components/FilterDropdown'
import { formatDate } from '../../utils/formatters'

export default function Index() {
  const { toast } = useToast()
  const { users, pagination } = usePage().props
  const { canManageUsers, canCreateUsers, canEditUser, canDeleteUser, canSeeUser } = useAuthorization()
  const [confirmedFilter, setConfirmedFilter] = useState(null)
  const [searchValue, setSearchValue] = useState('')

  // Initialize Flowbite dropdowns
  useEffect(() => {
    initDropdowns()
  }, [users]) // Re-initialize when users data changes

  const handleSearch = (value) => {
    setSearchValue(value)
    router.get('/admin/users', { 
      search: value, 
      confirmed: confirmedFilter 
    }, { preserveState: true })
  }

  const handleFilterChange = (value) => {
    setConfirmedFilter(value)
    router.get('/admin/users', { 
      search: searchValue, 
      confirmed: value 
    }, { preserveState: true })
  }

  const handlePageChange = (page) => {
    router.get('/admin/users', { 
      page, 
      search: searchValue,
      confirmed: confirmedFilter 
    }, { preserveState: true })
  }

  const handleActionClick = (action, user) => {
    if (action === 'delete') {
      if (confirm(`Are you sure you want to delete ${user.name}?`)) {
        router.delete(`/admin/users/${user.id}`)
      }
    }
  }

  // Filter users based on authorization
  const filteredUsers = users.filter(user => canSeeUser(user))

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { 
      key: 'role_name', 
      label: 'Role',
      render: (user) => <RoleBadge role={user.role_name} />
    },
    { 
      key: 'created_at', 
      label: 'Created at',
      render: (user) => formatDate(user.created_at)
    },
    { 
      key: 'updated_at', 
      label: 'Updated at',
      render: (user) => formatDate(user.updated_at)
    },
    { key: 'phone', label: 'Phone' },
    { 
      key: 'confirmed_at', 
      label: 'Status',
      render: (user) => (
        <span className={`px-2 py-1 rounded-full text-xs ${user.confirmed_at ? 'bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'}`}>
          {user.confirmed_at ? 'Confirmed' : 'Unconfirmed'}
        </span>
      )
    }
  ]

  const actions = [
    { 
      key: 'show', 
      label: 'Show', 
      href: (user) => `/admin/users/${user.id}`,
      visible: (user) => canSeeUser(user)
    },
    { 
      key: 'edit', 
      label: 'Edit', 
      href: (user) => `/admin/users/${user.id}/edit`,
      visible: (user) => canEditUser(user)
    },
    { 
      key: 'delete', 
      label: 'Delete',
      visible: (user) => canDeleteUser(user)
    }
  ]

  const filterOptions = [
    { value: null, label: 'All users' },
    { value: 'true', label: 'Confirmed users' },
    { value: 'false', label: 'Unconfirmed users' }
  ]

  // Don't render the page if user can't manage users
  if (!canManageUsers()) {
    return (
      <>
        <Head title="Access Denied" />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              You don't have permission to view this page.
            </p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Head title="Users" />
      {toast && <Toast {...toast} />}

      <section className="w-full p-3 sm:p-5">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <div className="bg-neutral-50 dark:bg-neutral-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full md:w-1/2">
                <SearchBar 
                  onSearch={handleSearch}
                  placeholder="Search by name or email"
                />
              </div>
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                {canCreateUsers() && (
                  <Link href="/admin/users/new" type="button" className="flex items-center justify-center text-neutral-50 bg-utility-700 hover:bg-utility-600 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 dark:bg-utility-700 dark:hover:bg-utility-600">
                    <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                    </svg>
                    Add user
                  </Link>
                )}
                <FilterDropdown
                  id="statusFilter"
                  options={filterOptions}
                  selectedValue={confirmedFilter}
                  onChange={handleFilterChange}
                />
              </div>
            </div>

            <Table 
              columns={columns}
              data={filteredUsers}
              actions={actions}
              onActionClick={handleActionClick}
            />

            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              totalItems={pagination.totalItems}
              perPage={pagination.perPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </section>
    </>
  )
}
