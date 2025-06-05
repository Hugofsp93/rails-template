import { Link } from '@inertiajs/react'

export default function Table({ 
  columns,
  data,
  actions,
  onActionClick,
  className = ''
}) {
  return (
    <div className="relative overflow-x-auto min-h-[300px]">
      <table className={`w-full text-sm text-left text-neutral-500 dark:text-neutral-400 ${className}`}>
        <thead className="text-xs text-neutral-700 uppercase bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-400">
          <tr>
            {columns.map((column) => (
              <th 
                key={column.key} 
                scope="col" 
                className="px-4 py-3"
              >
                {column.label}
              </th>
            ))}
            {actions && (
              <th scope="col" className="sticky bg-neutral-200 dark:bg-neutral-700 right-0 px-4 py-3">
                <span className="sr-only">Actions</span>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id || index} className="border-b dark:border-neutral-700">
              {columns.map((column) => (
                <td 
                  key={`${item.id}-${column.key}`} 
                  className="px-4 py-3"
                >
                  {column.render ? column.render(item) : item[column.key]}
                </td>
              ))}
              {actions && (
                <td className="right-0 px-4 py-5 flex items-center justify-end">
                  <button 
                    id={`${item.id}-button`} 
                    data-dropdown-toggle={`${item.id}`} 
                    className="inline-flex items-center p-0.5 text-sm font-medium text-center text-neutral-500 hover:text-neutral-800 rounded-lg focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-100" 
                    type="button"
                  >
                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                  </button>
                  <div 
                    id={`${item.id}`} 
                    className="hidden z-10 w-44 bg-neutral-50 rounded divide-y divide-neutral-100 shadow dark:bg-neutral-700 dark:divide-neutral-600"
                  >
                    <ul 
                      className="py-1 text-sm text-neutral-700 dark:text-neutral-200" 
                      aria-labelledby={`${item.id}-button`}
                    >
                      {actions.map((action) => (
                        <li key={action.key}>
                          {action.href ? (
                            <Link 
                              href={action.href(item)} 
                              className="block py-2 px-4 hover:bg-neutral-100 dark:hover:bg-neutral-600 dark:hover:text-neutral-50"
                            >
                              {action.label}
                            </Link>
                          ) : (
                            <button
                              onClick={() => onActionClick(action.key, item)}
                              className="w-full text-left block py-2 px-4 hover:bg-neutral-100 dark:hover:bg-neutral-600 dark:hover:text-neutral-50"
                            >
                              {action.label}
                            </button>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
} 