import Toast from '../../components/Toast'
import { useToast } from '../../hooks/useToast'
import { Link } from '@inertiajs/react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

// Custom styles for phone input dark mode
const customStyles = `
  .react-tel-input .form-control:focus {
    box-shadow: none !important;
  }

  .react-tel-input .selected-flag.open {
    background-color: transparent !important;
  }

  .dark .react-tel-input .country-list {
    background-color: rgb(64 64 64) !important;
  }

  .dark .react-tel-input .country-list .country.highlight {
    background-color: rgb(82 82 82) !important;
  }

  .dark .react-tel-input .country-list .country:hover {
    background-color: rgb(82 82 82) !important;
  }

  .react-tel-input .country-list {
    margin: 0 !important;
    top: calc(100% + 1px) !important;
  }

  .react-tel-input .country-list .search-box {
    margin: 0 !important;
    padding: 8px !important;
    background-color: inherit !important;
    width: 100% !important;
    border: none !important;
    border-bottom: 2px solid rgb(212 212 212) !important;
  }

  .dark .react-tel-input .country-list .search-box {
    border-bottom: 2px solid rgb(212 212 212) !important;
  }

  .react-tel-input .country-list .search {
    background-color: rgb(250 250 250) !important;
    border: none !important;
    border-radius: 0 !important;
    margin: 0 !important;
    padding: 6px 10px !important;
    color: rgb(23 23 23) !important;
  }

  .dark .react-tel-input .country-list .search {
    background-color: rgb(64 64 64) !important;
    color: rgb(250 250 250) !important;
  }

  .react-tel-input .country-list .search:focus {
    outline: none !important;
    box-shadow: none !important;
    border: none !important;
  }

  .react-tel-input .country-list .search::placeholder {
    color: rgb(115 115 115) !important;
  }

  .dark .react-tel-input .country-list .search::placeholder {
    color: rgb(229 229 229) !important;
  }

  .react-tel-input .selected-flag:hover,
  .react-tel-input .selected-flag:focus,
  .react-tel-input .selected-flag.open {
    background-color: transparent !important;
  }

  .dark .react-tel-input .selected-flag:hover,
  .dark .react-tel-input .selected-flag:focus,
  .dark .react-tel-input .selected-flag.open {
    background-color: transparent !important;
  }

  .react-tel-input .country-list .search-box .search-box:focus {
    outline: none !important;
    box-shadow: none !important;
    border: none !important;
  }

  .react-tel-input .country-list .no-entries-message {
    color: rgb(115 115 115) !important;
  }

  .dark .react-tel-input .country-list .no-entries-message {
    color: rgb(163 163 163) !important;
  }
`

export default function Form({ errors, data, processing, handleChange, handleSubmit, isEditingPassword, setIsEditingPassword, isEdit }) {
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
      <style>{customStyles}</style>
      { toast && <Toast {...toast} /> }
      <form onSubmit={handleSubmit} noValidate>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 sm:gap-6">
          <div className="h-[75px]">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-neutral-900 dark:text-neutral-50">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={data.user.name}
              onChange={(e) => handleChange('user.name', e.target.value)}
              className={`bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg block w-full p-2.5 dark:bg-neutral-700 dark:text-neutral-50 dark:border-neutral-700 ${getErrorClass('name')}`}
              placeholder="Type user name"
            />
            {errors.name && <p className="mt-2 text-xs text-red-600">{getErrorMessage('name')}</p>}
          </div>
          <div className="h-[75px]">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-neutral-900 dark:text-neutral-50">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={data.user.email}
              onChange={(e) => handleChange('user.email', e.target.value)}
              className={`bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg block w-full p-2.5 dark:bg-neutral-700 dark:text-neutral-50 dark:border-neutral-700 ${getErrorClass('email')}`}
              placeholder="user@example.com"
            />
            {errors.email && <p className="mt-2 text-xs text-red-600">{getErrorMessage('email')}</p>}
          </div>
          <div className="h-[75px]">
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-neutral-900 dark:text-neutral-50">Phone</label>
            <PhoneInput
              country={'br'}
              value={data.user.phone}
              onChange={(phone) => handleChange('user.phone', phone)}
              inputClass={`!w-full !h-[42px] !bg-neutral-50 !border !border-neutral-300 !text-neutral-900 !text-sm !rounded-lg !pl-12 !pr-2.5 dark:!bg-neutral-700 dark:!text-neutral-50 dark:!border-neutral-700 ${errors.phone ? '!border-red-500' : ''}`}
              containerClass="!w-full"
              buttonClass={`!h-[42px] !border !border-neutral-300 dark:!border-neutral-700 !rounded-l-lg !bg-neutral-50 dark:!bg-neutral-700 ${errors.phone ? '!border-red-500' : ''}`}
              dropdownClass="!bg-neutral-50 dark:!bg-neutral-700 !text-neutral-900 dark:!text-neutral-50"
              searchClass="!bg-neutral-50 dark:!bg-neutral-700 !text-neutral-900 dark:!text-neutral-50 !border-b-neutral-300 !outline-none !shadow-none"
              buttonStyle={{ backgroundColor: 'transparent' }}
              dropdownStyle={{ backgroundColor: 'var(--neutral-50)', color: 'var(--neutral-900)' }}
              searchStyle={{ backgroundColor: 'var(--neutral-50)', color: 'var(--neutral-900)', outline: 'none', boxShadow: 'none' }}
              enableSearch
              disableSearchIcon
              countryCodeEditable={false}
              searchPlaceholder="Search country..."
            />
            {errors.phone && <p className="mt-2 text-xs text-red-600">{getErrorMessage('phone')}</p>}
          </div>
        </div>

        {isEdit && (
          <div className="mt-8 ml-4 mb-4 flex justify-start">
            <button
              type="button"
              onClick={() => setIsEditingPassword(!isEditingPassword)}
              className="text-sm text-utility-600 hover:text-utility-700 dark:text-utility-500 dark:hover:text-utility-400"
            >
              {isEditingPassword ? 'Cancel password change' : 'Change password'}
            </button>
          </div>
        )}

        {(!isEdit || isEditingPassword) && (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 sm:gap-6 mt-8 border-t border-neutral-200 dark:border-neutral-700 pt-8">
            <div className="h-[75px]">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-neutral-900 dark:text-neutral-50">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={data.user.password}
                onChange={(e) => handleChange('user.password', e.target.value)}
                className={`bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg block w-full p-2.5 dark:bg-neutral-700 dark:text-neutral-50 dark:border-neutral-700 ${getErrorClass('password')}`}
                placeholder="••••••••"
              />
              {errors.password && <p className="mt-2 text-xs text-red-600">{getErrorMessage('password')}</p>}
            </div>
            <div className="h-[75px]">
              <label htmlFor="password_confirmation" className="block mb-2 text-sm font-medium text-neutral-900 dark:text-neutral-50">Confirm Password</label>
              <input
                type="password"
                name="password_confirmation"
                id="password_confirmation"
                value={data.user.password_confirmation}
                onChange={(e) => handleChange('user.password_confirmation', e.target.value)}
                className={`bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg block w-full p-2.5 dark:bg-neutral-700 dark:text-neutral-50 dark:border-neutral-700 ${getErrorClass('password_confirmation')}`}
                placeholder="••••••••"
              />
              {errors.password_confirmation && <p className="mt-2 text-xs text-red-600">{getErrorMessage('password_confirmation')}</p>}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={processing}
          className="inline-flex items-center px-8 py-2.5 mt-8 text-sm font-medium text-center text-neutral-50 bg-utility-700 rounded-lg focus:ring-neutral-200 dark:focus:ring-utility-500 hover:bg-utility-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {processing ? 'Saving...' : 'Save'}
        </button>
        <Link
          href="/admin/users"
          type="button"
          className="inline-flex items-center px-8 py-2.5 mt-8 text-sm font-medium text-center hover:underline text-utility-700 hover:color-utility-600 dark:text-neutral-200"
        >
          Back
        </Link>
      </form>
    </>
  )
}
