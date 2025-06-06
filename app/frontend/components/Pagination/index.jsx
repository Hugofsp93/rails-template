export default function Pagination({ 
  currentPage, 
  totalPages, 
  totalItems,
  perPage,
  onPageChange,
  className = ''
}) {
  const startItem = ((currentPage - 1) * perPage) + 1
  const endItem = Math.min(currentPage * perPage, totalItems)

  return (
    <nav className={`flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4 ${className}`} aria-label="Table navigation">
      <span className="text-sm font-normal text-neutral-500 dark:text-neutral-400">
        Showing
        <span className="px-2 font-semibold text-neutral-900 dark:text-neutral-50">
          {startItem}-{endItem}
        </span>
        of
        <span className="px-2 font-semibold text-neutral-900 dark:text-neutral-50">{totalItems}</span>
      </span>
      <ul className="inline-flex items-stretch -space-x-px">
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-neutral-500 bg-neutral-50 rounded-l-lg border border-neutral-300 hover:bg-neutral-100 hover:text-neutral-700 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="sr-only">Previous</span>
            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </li>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <li key={page}>
            <button
              onClick={() => onPageChange(page)}
              className={`flex items-center justify-center text-sm py-2 px-3 leading-tight ${
                page === currentPage
                  ? 'text-neutral-600 bg-neutral-200 border border-neutral-300 hover:bg-neutral-300 hover:text-neutral-700 dark:border-neutral-700 dark:bg-neutral-700 dark:text-neutral-50'
                  : 'text-neutral-500 bg-neutral-50 border border-neutral-300 hover:bg-neutral-100 hover:text-neutral-700 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-50'
              }`}
            >
              {page}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
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
  )
} 