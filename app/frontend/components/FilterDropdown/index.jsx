import { useEffect } from 'react'
import { initDropdowns } from 'flowbite'

export default function FilterDropdown({
  id,
  options,
  selectedValue,
  onChange,
  className = ""
}) {
  useEffect(() => {
    initDropdowns()
  }, [selectedValue])

  return (
    <div className={`relative ${className}`}>
      <button 
        id={`${id}Button`} 
        data-dropdown-toggle={id} 
        className="flex items-center justify-center py-2 px-4 text-sm font-medium text-neutral-900 focus:outline-none bg-neutral-50 rounded-lg border border-neutral-200 hover:bg-neutral-100 hover:text-neutral-700 focus:z-10 focus:ring-1 focus:ring-neutral-200 dark:focus:ring-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-600 dark:hover:text-neutral-50 dark:hover:bg-neutral-700" 
        type="button"
      >
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-4 w-4 mr-2 text-neutral-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
        </svg>
        Filter
        <svg className="-mr-1 ml-1.5 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path clipRule="evenodd" fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </button>
      <div
        id={id}
        className="absolute left-0 mt-2 z-10 hidden w-48 p-3 bg-neutral-50 rounded-lg shadow dark:bg-neutral-700"
        style={{ minWidth: 'max-content' }}
      >
        <ul className="space-y-2 text-sm" aria-labelledby={`${id}Button`}>
          {options.map((option) => (
            <li key={option.value} className="flex items-center">
              <input 
                id={`${id}-${option.value}`}
                type="radio"
                name={id}
                checked={selectedValue === option.value}
                onChange={() => onChange(option.value)}
                className="w-4 h-4 bg-neutral-100 border-neutral-300 rounded text-utility-700 focus:ring-utility-700 dark:focus:ring-neutral-950 dark:focus:bg-neutral-800 dark:focus:border-neutral-800 dark:bg-neutral-800 dark:text-utility-600 dark:border-neutral-800"
              />
              <label 
                htmlFor={`${id}-${option.value}`}
                className="ml-2 text-sm font-medium text-neutral-900 dark:text-neutral-100"
              >
                {option.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
} 