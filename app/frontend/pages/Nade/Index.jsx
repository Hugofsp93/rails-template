import { Head, Link, router } from '@inertiajs/react'
import { useToast } from '../../hooks/useToast'
import Toast from "../../components/Toast"
import { useState, useEffect } from 'react'
import { initDropdowns } from 'flowbite'
import Table from '../../components/Table'
import Pagination from '../../components/Pagination'
import SearchBar from '../../components/SearchBar'
import FilterDropdown from '../../components/FilterDropdown'

export default function Index({ props: { nades, pagination } }) {
  const { toast } = useToast()
  const [statusFilter, setStatusFilter] = useState(null)
  const [searchValue, setSearchValue] = useState('')
  const basePath = '/nades'

  // Initialize Flowbite dropdowns
  useEffect(() => {
    initDropdowns()
  }, [nades]) // Re-initialize when data changes

  const handleSearch = (value) => {
    setSearchValue(value)
    router.get(basePath, { 
      search: value, 
      status: statusFilter 
    }, { preserveState: true })
  }

  const handleFilterChange = (value) => {
    setStatusFilter(value)
    router.get(basePath, { 
      search: searchValue, 
      status: value 
    }, { preserveState: true })
  }

  const handlePageChange = (page) => {
    router.get(basePath, { 
      page, 
      search: searchValue,
      status: statusFilter 
    }, { preserveState: true })
  }

  const handleActionClick = (action, nade) => {
    if (action === 'delete') {
      if (confirm('Are you sure you want to delete this nade?')) {
        router.delete(`${basePath}/${nade.id}`)
      }
    }
  }

  const columns = [
    { 
      key: 'title', 
      label: 'Title'
    },
    { 
      key: 'active', 
      label: 'Active'
      ,render: (nade) => (
        <span className={`px-2 py-1 rounded-full text-xs ${nade.active ? 'bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'}`}>
          {nade.active ? 'Active' : 'Inactive'}
        </span>
      )
    },
    { 
      key: 'description', 
      label: 'Description'
    },
    { 
      key: 'map_name', 
      label: 'Map Name'
    },
    { 
      key: 'team_function', 
      label: 'Team Function'
    },
  ]

  const actions = [
    { key: 'show', label: 'Show', href: (nade) => `${basePath}/${nade.id}` },
    { key: 'edit', label: 'Edit', href: (nade) => `${basePath}/${nade.id}/edit` },
    { key: 'delete', label: 'Delete' }
  ]

  const filterOptions = [
    { value: null, label: 'All nades' },
    { value: 'true', label: 'Active' },
    { value: 'false', label: 'Inactive' }
  ]

  return (
    <>
      <Head title="Nades" />
      {toast && <Toast {...toast} />}

      <section className="w-full p-3 sm:p-5">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <div className="bg-neutral-50 dark:bg-neutral-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full md:w-1/2">
                <SearchBar 
                  onSearch={handleSearch}
                  placeholder="Search nades"
                />
              </div>
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <Link 
                  href={`${basePath}/new`}
                  type="button" 
                  className="flex items-center justify-center text-neutral-50 bg-utility-700 hover:bg-utility-600 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 dark:bg-utility-700 dark:hover:bg-utility-600"
                >
                  <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                  </svg>
                  Add Nade
                </Link>
                <FilterDropdown
                  id="statusFilter"
                  options={filterOptions}
                  selectedValue={statusFilter}
                  onChange={handleFilterChange}
                />
              </div>
            </div>

            <Table 
              columns={columns}
              data={nades}
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