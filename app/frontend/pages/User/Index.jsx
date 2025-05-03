import { Head, Link, router } from '@inertiajs/react'
import { useToast } from '../../hooks/useToast'
import Toast from "../../components/Toast"
import { useState, useEffect } from 'react'
import { initDropdowns } from 'flowbite'
import Table from '../../components/Table'
import Pagination from '../../components/Pagination'
import SearchBar from '../../components/SearchBar'
import FilterDropdown from '../../components/FilterDropdown'

export default function Index({ props: { users, pagination } }) {
  const { toast } = useToast()
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
      // Implement delete logic here
      console.log('Delete user:', user)
    }
  }

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { 
      key: 'created_at', 
      label: 'Created at',
      render: (user) => new Date(user.created_at).toLocaleDateString()
    },
    { 
      key: 'updated_at', 
      label: 'Updated at',
      render: (user) => new Date(user.updated_at).toLocaleDateString()
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
    { key: 'show', label: 'Show', href: (user) => `/admin/users/${user.id}` },
    { key: 'edit', label: 'Edit', href: (user) => `/admin/users/${user.id}/edit` },
    { key: 'delete', label: 'Delete' }
  ]

  const filterOptions = [
    { value: null, label: 'All users' },
    { value: 'true', label: 'Confirmed users' },
    { value: 'false', label: 'Unconfirmed users' }
  ]

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
                <Link href="/admin/users/new" type="button" className="flex items-center justify-center text-neutral-50 bg-utility-700 hover:bg-utility-600 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 dark:bg-utility-700 dark:hover:bg-utility-600">
                  <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                  </svg>
                  Add user
                </Link>
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
              data={users}
              actions={actions}
              onActionClick={handleActionClick}
            />

            <Pagination
              currentPage={pagination.current_page}
              totalPages={pagination.total_pages}
              totalItems={pagination.total}
              perPage={pagination.per_page}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </section>
    </>
  )
}
