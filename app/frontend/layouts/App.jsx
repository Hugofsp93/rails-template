import { Head, usePage, Link } from '@inertiajs/react'
import { useEffect } from 'react'
import { initFlowbite } from 'flowbite'
import Footer from './Footer'
import ThemeToggle from './ThemeToggle'
import RubyLogo from '../components/icons/RubyLogo'
import AvatarLogo from '../components/icons/AvatarLogo'

export default function App({ children }) {
  const { props: { currentUser } } = usePage()

  useEffect(() => {
    console.log('Logged in:', currentUser)
    initFlowbite({
      tabs: {
        defaultTabId: 'stats-tab',
        activeClasses: 'text-utility-600 dark:text-utility-500 border-utility-600 dark:border-utility-500',
        inactiveClasses: 'text-neutral-500 dark:text-neutral-400'
      }
    })
  }, [])

  return (
    <>
      <Head title="App" />
      {/* more navbar examples: https://flowbite.com/docs/components/navbar/ */}
      <nav className="bg-neutral-50 dark:bg-neutral-950 sticky w-full z-20 top-0 start-0 border-b-3 border-utility-600 dark:border-utility-500">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <RubyLogo className="h-10" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-neutral-900 dark:text-neutral-50 font-mono">Rails Template</span>
          </a>
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <ThemeToggle />
            <button type="button" className="flex text-sm bg-neutral-50 dark:bg-neutral-950 rounded-full md:me-0 focus:ring-2 focus:ring-neutral-300 dark:focus:ring-neutral-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
              <span className="sr-only">Open user menu</span>
              <AvatarLogo className="h-10" />
            </button>
            <div className="z-50 hidden my-4 text-base list-none bg-neutral-50 divide-y divide-neutral-100 rounded-lg shadow-sm dark:bg-neutral-700 dark:divide-neutral-600" id="user-dropdown">
              <div className="px-4 py-3">
                <span className="block text-sm text-neutral-900 dark:text-neutral-50">{currentUser.name}</span>
                <span className="block text-sm  text-neutral-500 truncate dark:text-neutral-400">{currentUser.email}</span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <a href="#" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-600 dark:text-neutral-200 dark:hover:text-neutral-50">Dashboard</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-600 dark:text-neutral-200 dark:hover:text-neutral-50">Settings</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-600 dark:text-neutral-200 dark:hover:text-neutral-50">Earnings</a>
                </li>
                <li>
                  <Link
                    href="/users/sign_out"
                    method="delete"
                    as="button"
                    className="block w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-600 dark:text-neutral-200 dark:hover:text-neutral-50"
                  >
                    Sign Out
                  </Link>
                </li>
              </ul>
            </div>
            <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-neutral-500 rounded-lg md:hidden hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-200 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:ring-neutral-600" aria-controls="navbar-user" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-neutral-100 rounded-lg bg-neutral-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-neutral-950 dark:border-neutral-800">
              <li>
                <a href="/" className="block py-2 px-3 text-neutral-900 rounded-sm hover:bg-transparent hover:text-utility-700 md:p-0 dark:text-neutral-50 dark:hover:text-utility-400">Home</a>
              </li>
              <li>
                <a href="/users" className="block py-2 px-3 text-neutral-900 rounded-sm hover:bg-transparent hover:text-utility-700 md:p-0 dark:text-neutral-50 dark:hover:text-utility-400">Users</a>
              </li>
              <li>
                <a href="#" className="block py-2 px-3 text-neutral-900 rounded-sm hover:bg-transparent hover:text-utility-700 md:p-0 dark:text-neutral-50 dark:hover:text-utility-400">Services</a>
              </li>
              <li>
                <a href="#" className="block py-2 px-3 text-neutral-900 rounded-sm hover:bg-transparent hover:text-utility-700 md:p-0 dark:text-neutral-50 dark:hover:text-utility-400">Pricing</a>
              </li>
              <li>
                <a href="/contact" className="block py-2 px-3 text-neutral-900 rounded-sm hover:bg-transparent hover:text-utility-700 md:p-0 dark:text-neutral-50 dark:hover:text-utility-400">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="flex flex-col min-h-[calc(100vh-4rem)] bg-utility-50 dark:bg-neutral-900">
        <main className="flex-1 flex flex-col items-center p-10">
          {children}
        </main>
      </div>

      <Footer />
    </>
  )
}