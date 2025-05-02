import { Head, Link, router } from '@inertiajs/react'
import { useToast } from '../../hooks/useToast'
import Toast from "../../components/Toast"
import { useState, useEffect } from 'react'
import { debounce } from 'lodash'
import { initDropdowns } from 'flowbite'
// import User from './User'

export default function Index({ props: { users, pagination } }) {
  const { toast } = useToast()
  const [search, setSearch] = useState('')
  const [confirmedFilter, setConfirmedFilter] = useState(null)

  // Initialize Flowbite dropdowns
  useEffect(() => {
    initDropdowns()
  }, [users]) // Re-initialize when users data changes

  const debouncedSearch = debounce((value) => {
    router.get('/admin/users', { search: value, confirmed: confirmedFilter }, { preserveState: true })
  }, 300)

  useEffect(() => {
    debouncedSearch(search)
    return () => debouncedSearch.cancel()
  }, [search])

  const handleFilterChange = (value) => {
    setConfirmedFilter(value)
    router.get('/admin/users', { search, confirmed: value }, { preserveState: true })
  }

  const handlePageChange = (page) => {
    router.get('/admin/users', { page, search, confirmed: confirmedFilter }, { preserveState: true })
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
                <form className="flex items-center" onSubmit={(e) => e.preventDefault()}>
                  <label htmlFor="simple-search" className="sr-only">Search</label>
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg aria-hidden="true" className="w-5 h-5 text-neutral-500 dark:text-neutral-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input 
                      type="text" 
                      id="simple-search" 
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-neutral-500 focus:border-neutral-500 block w-full pl-10 p-2 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-neutral-50 dark:focus:ring-neutral-500 dark:focus:border-neutral-500" 
                      placeholder="Search by name or email" 
                    />
                  </div>
                </form>
              </div>
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <Link href="/admin/users/new" type="button" className="flex items-center justify-center text-neutral-50 bg-utility-700 hover:bg-utility-600 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 dark:bg-utility-700 dark:hover:bg-utility-600">
                  <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                  </svg>
                  Add user
                </Link>
                <div className="flex items-center space-x-3 w-full md:w-auto">
                  <button id="filterDropdownButton" data-dropdown-toggle="filterDropdown" className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-neutral-900 focus:outline-none bg-neutral-50 rounded-lg border border-neutral-200 hover:bg-neutral-100 hover:text-neutral-700 focus:z-10 focus:ring-1 focus:ring-neutral-200 dark:focus:ring-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-600 dark:hover:text-neutral-50 dark:hover:bg-neutral-700" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-4 w-4 mr-2 text-neutral-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                    </svg>
                    Filter
                    <svg className="-mr-1 ml-1.5 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path clipRule="evenodd" fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </button>
                  <div id="filterDropdown" className="z-10 hidden w-48 p-3 bg-neutral-50 rounded-lg shadow dark:bg-neutral-700">
                    <h6 className="mb-3 text-sm font-medium text-neutral-900 dark:text-neutral-50">Filter by status</h6>
                    <ul className="space-y-2 text-sm" aria-labelledby="filterDropdownButton">
                      <li className="flex items-center">
                        <input 
                          id="all" 
                          type="radio" 
                          name="status" 
                          checked={confirmedFilter === null}
                          onChange={() => handleFilterChange(null)}
                          className="w-4 h-4 bg-neutral-100 border-neutral-300 rounded text-utility-700 focus:ring-utility-700 dark:focus:ring-neutral-950 dark:focus:bg-neutral-800 dark:focus:border-neutral-800 dark:bg-neutral-800 dark:text-utility-600 dark:border-neutral-800" 
                        />
                        <label htmlFor="all" className="ml-2 text-sm font-medium text-neutral-900 dark:text-neutral-100">All users</label>
                      </li>
                      <li className="flex items-center">
                        <input 
                          id="confirmed" 
                          type="radio" 
                          name="status" 
                          checked={confirmedFilter === "true"}
                          onChange={() => handleFilterChange("true")}
                          className="w-4 h-4 bg-neutral-100 border-neutral-300 rounded text-utility-700 focus:ring-utility-700 dark:focus:ring-neutral-950 dark:focus:bg-neutral-800 dark:focus:border-neutral-800 dark:bg-neutral-800 dark:text-utility-600 dark:border-neutral-800" 
                        />
                        <label htmlFor="confirmed" className="ml-2 text-sm font-medium text-neutral-900 dark:text-neutral-100">Confirmed users</label>
                      </li>
                      <li className="flex items-center">
                        <input 
                          id="unconfirmed" 
                          type="radio" 
                          name="status" 
                          checked={confirmedFilter === "false"}
                          onChange={() => handleFilterChange("false")}
                          className="w-4 h-4 bg-neutral-100 border-neutral-300 rounded text-utility-700 focus:ring-utility-700 dark:focus:ring-neutral-950 dark:focus:bg-neutral-800 dark:focus:border-neutral-800 dark:bg-neutral-800 dark:text-utility-600 dark:border-neutral-800" 
                        />
                        <label htmlFor="unconfirmed" className="ml-2 text-sm font-medium text-neutral-900 dark:text-neutral-100">Unconfirmed users</label>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full mt-4 text-sm text-left text-neutral-500 dark:text-neutral-400">
                <thead className="text-xs text-neutral-700 uppercase bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-400">
                  <tr>
                    <th scope="col" className="px-4 py-3">Name</th>
                    <th scope="col" className="px-4 py-3">Email</th>
                    <th scope="col" className="px-4 py-3">Created at</th>
                    <th scope="col" className="px-4 py-3">Updated at</th>
                    <th scope="col" className="px-4 py-3">Phone</th>
                    <th scope="col" className="px-4 py-3">Status</th>
                    <th scope="col" className="px-4 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b dark:border-neutral-700">
                      <th scope="row" className="px-4 py-3 font-medium text-neutral-900 whitespace-nowrap dark:text-neutral-50">{user.name}</th>
                      <td className="px-4 py-3">{user.email}</td>
                      <td className="px-4 py-3">{new Date(user.created_at).toLocaleDateString()}</td>
                      <td className="px-4 py-3">{new Date(user.updated_at).toLocaleDateString()}</td>
                      <td className="px-4 py-3">{user.phone}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${user.confirmed_at ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'}`}>
                          {user.confirmed_at ? 'Confirmed' : 'Unconfirmed'}
                        </span>
                      </td>
                      <td className="px-4 py-3 flex items-center justify-end">
                        <button id={`${user.id}-button`} data-dropdown-toggle={`${user.id}`} className="inline-flex items-center p-0.5 text-sm font-medium text-center text-neutral-500 hover:text-neutral-800 rounded-lg focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-100" type="button">
                          <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                          </svg>
                        </button>
                        <div id={`${user.id}`} className="hidden z-10 w-44 bg-neutral-50 rounded divide-y divide-neutral-100 shadow dark:bg-neutral-700 dark:divide-neutral-600">
                          <ul className="py-1 text-sm text-neutral-700 dark:text-neutral-200" aria-labelledby={`${user.id}-button`}>
                            <li>
                              <Link href={`/admin/users/${user.id}`} className="block py-2 px-4 hover:bg-neutral-100 dark:hover:bg-neutral-600 dark:hover:text-neutral-50">Show</Link>
                            </li>
                            <li>
                              <Link href={`/admin/users/${user.id}/edit`} className="block py-2 px-4 hover:bg-neutral-100 dark:hover:bg-neutral-600 dark:hover:text-neutral-50">Edit</Link>
                            </li>
                            <hr className="text-neutral-600 dark:text-neutral-400" />
                            <li>
                              <Link href={`/admin/users/${user.id}`} className="block py-2 px-4 hover:bg-neutral-100 dark:hover:bg-neutral-600 dark:hover:text-neutral-50">Delete</Link>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
              <span className="text-sm font-normal text-neutral-500 dark:text-neutral-400">
                Showing
                <span className="px-2 font-semibold text-neutral-900 dark:text-neutral-50">
                  {((pagination.current_page - 1) * pagination.per_page) + 1}-{Math.min(pagination.current_page * pagination.per_page, pagination.total)}
                </span>
                of
                <span className="px-2 font-semibold text-neutral-900 dark:text-neutral-50">{pagination.total}</span>
              </span>
              <ul className="inline-flex items-stretch -space-x-px">
                <li>
                  <button
                    onClick={() => handlePageChange(pagination.current_page - 1)}
                    disabled={pagination.current_page === 1}
                    className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-neutral-500 bg-neutral-50 rounded-l-lg border border-neutral-300 hover:bg-neutral-100 hover:text-neutral-700 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Previous</span>
                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </li>
                {Array.from({ length: pagination.total_pages }, (_, i) => i + 1).map((page) => (
                  <li key={page}>
                    <button
                      onClick={() => handlePageChange(page)}
                      className={`flex items-center justify-center text-sm py-2 px-3 leading-tight ${
                        page === pagination.current_page
                          ? 'text-neutral-600 bg-neutral-50 border border-neutral-300 hover:bg-neutral-100 hover:text-neutral-700 dark:border-neutral-700 dark:bg-neutral-700 dark:text-neutral-50'
                          : 'text-neutral-500 bg-neutral-50 border border-neutral-300 hover:bg-neutral-100 hover:text-neutral-700 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-50'
                      }`}
                    >
                      {page}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => handlePageChange(pagination.current_page + 1)}
                    disabled={pagination.current_page === pagination.total_pages}
                    className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-neutral-500 bg-neutral-50 rounded-r-lg border border-neutral-300 hover:bg-neutral-100 hover:text-neutral-700 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Next</span>
                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
    </>
  )
}
