import React from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

export default function PhoneInputWrapper({
  value,
  onChange,
  error,
  label,
  required = false
}) {
  return (
    <div className="h-[75px]">
      <label className="block mb-2 text-sm font-medium text-neutral-900 dark:text-neutral-50">
        {label}
        {required && <span className="text-red-500 dark:text-red-400">*</span>}
      </label>
      <PhoneInput
        country="br"
        value={value}
        onChange={onChange}
        inputClass={`!w-full !h-[42px] !bg-neutral-50 !border !border-neutral-300 !text-neutral-900 !text-sm !rounded-lg !pl-12 !pr-2.5 dark:!bg-neutral-700 dark:!text-neutral-50 dark:!border-neutral-700 ${error ? '!border-red-500' : ''}`}
        containerClass="!w-full"
        buttonClass={`!h-[42px] !border !border-neutral-300 dark:!border-neutral-700 !rounded-l-lg !bg-neutral-50 dark:!bg-neutral-700 ${error ? '!border-red-500' : ''}`}
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
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  )
} 