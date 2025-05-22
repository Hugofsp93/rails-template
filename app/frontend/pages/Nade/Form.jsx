import Toast from '../../components/Toast'
import { useToast } from '../../hooks/useToast'
import { Link } from '@inertiajs/react'

export default function Form({ errors, data, processing, handleChange, handleSubmit }) {
  const { toast } = useToast()

  const getErrorClass = (fieldName) => {
    return errors[fieldName] 
      ? 'border-red-500 focus:ring-red-500 focus:border-red-500 dark:border-red-500' 
      : 'focus:ring-neutral-300 focus:border-neutral-300 dark:focus:ring-neutral-500 dark:focus:border-neutral-500'
  }

  const getErrorMessage = (fieldName) => {
    if (!errors[fieldName]) return null
    // Remove duplicate messages if they exist
    const message = errors[fieldName]
    return Array.isArray(message) ? message[0] : message
  }

  return (
    <>
      { toast && <Toast {...toast} /> }
      <form onSubmit={handleSubmit} noValidate>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 sm:gap-6">
          <div className="h-[75px]">
            <label htmlFor="title" className="block mb-2 text-sm font-medium text-neutral-900 dark:text-neutral-50">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={data.nade.title}
              onChange={e => handleChange('nade.title', e.target.value)}
              className={`bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg block w-full p-2.5 dark:bg-neutral-700 dark:text-neutral-50 dark:border-neutral-700 ${getErrorClass('title')}`}
              placeholder="Type nade title"
            />
            {errors.title && <p className="mt-1 text-sm text-red-600 dark:text-red-500">{getErrorMessage('title')}</p>}
          </div>
          <div className="h-[75px]">
            <label htmlFor="active" className="block mb-2 text-sm font-medium text-neutral-900 dark:text-neutral-50">Active</label>
            <div className="flex items-center">
              <input
                id="active"
                name="active"
                type="checkbox"
                checked={data.nade.active}
                className={`w-4 h-4 bg-neutral-100 border-neutral-300 rounded text-utility-700 focus:ring-utility-700 dark:focus:ring-neutral-950 dark:focus:bg-neutral-800 dark:focus:border-neutral-800 dark:bg-neutral-800 dark:text-utility-600 dark:border-neutral-800 ${getErrorClass('active')}`}
                onChange={e => handleChange('nade.active', e.target.checked)}
              />
              <label htmlFor="active" className="ml-2 text-sm font-medium text-neutral-900 dark:text-neutral-300">
                Active
              </label>
            </div>
            {errors.active && <p className="mt-1 text-sm text-red-600 dark:text-red-500">{getErrorMessage('active')}</p>}
          </div>
          <div className="h-[75px]">
            <label htmlFor="map_name" className="block mb-2 text-sm font-medium text-neutral-900 dark:text-neutral-50">Map Name</label>
            <input
              type="text"
              name="map_name"
              id="map_name"
              value={data.nade.map_name}
              onChange={e => handleChange('nade.map_name', e.target.value)}
              className={`bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg block w-full p-2.5 dark:bg-neutral-700 dark:text-neutral-50 dark:border-neutral-700 ${getErrorClass('map_name')}`}
              placeholder="Type nade map_name"
            />
            {errors.map_name && <p className="mt-1 text-sm text-red-600 dark:text-red-500">{getErrorMessage('map_name')}</p>}
          </div>
          <div className="h-[75px]">
            <label htmlFor="team_function" className="block mb-2 text-sm font-medium text-neutral-900 dark:text-neutral-50">Team Function</label>
            <input
              type="text"
              name="team_function"
              id="team_function"
              value={data.nade.team_function}
              onChange={e => handleChange('nade.team_function', e.target.value)}
              className={`bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg block w-full p-2.5 dark:bg-neutral-700 dark:text-neutral-50 dark:border-neutral-700 ${getErrorClass('team_function')}`}
              placeholder="Type nade team_function"
            />
            {errors.team_function && <p className="mt-1 text-sm text-red-600 dark:text-red-500">{getErrorMessage('team_function')}</p>}
          </div>
        </div>
        <div className="w-full mt-6">
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-neutral-900 dark:text-neutral-50">Description</label>
          <textarea
            id="description"
            name="description"
            value={data.nade.description}
            onChange={e => handleChange('nade.description', e.target.value)}
            className={`bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg block w-full p-2.5 dark:bg-neutral-700 dark:text-neutral-50 dark:border-neutral-700 ${getErrorClass('description')}`}
            placeholder="Type nade description"
            rows="4"
          />
          {errors.description && <p className="mt-1 text-sm text-red-600 dark:text-red-500">{getErrorMessage('description')}</p>}
        </div>

        <button
          type="submit"
          disabled={processing}
          className="inline-flex items-center px-8 py-2.5 mt-8 text-sm font-medium text-center text-neutral-50 bg-utility-700 rounded-lg focus:ring-neutral-200 dark:focus:ring-utility-500 hover:bg-utility-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {processing ? 'Saving...' : 'Save'}
        </button>
        <Link
          href={"/nades"}
          type="button"
          className="inline-flex items-center px-8 py-2.5 mt-8 text-sm font-medium text-center hover:underline text-utility-700 hover:color-utility-600 dark:text-neutral-200"
        >
          Back
        </Link>
      </form>
    </>
  )
}