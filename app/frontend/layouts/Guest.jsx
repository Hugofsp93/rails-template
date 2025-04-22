import { Head, Link } from '@inertiajs/react'
import Footer from './Footer'
import ThemeToggle from './ThemeToggle'
import RubyLogo from '../../assets/images/ruby.png'

export default function Guest({ children }) {
  return (
    <>
      <Head title="Guest" />
      {/* more navbar examples: https://flowbite.com/docs/components/navbar/ */}
      <nav className="bg-white dark:bg-neutral-950 sticky w-full z-20 top-0 start-0 border-b border-neutral-200 dark:border-neutral-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={RubyLogo} className="h-8" alt="Rails Template" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-neutral-900 dark:text-white">Rails Template</span>
          </a>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <ThemeToggle />
            <Link href="/sign_in" method="get" as="button" className="text-white bg-utility-700 hover:bg-utility-800 focus:ring-2 focus:outline-none focus:ring-utility-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-utility-500 dark:hover:bg-utility-600 dark:focus:ring-utility-800">
              Login
            </Link>
            <button data-collapse-toggle="navbar-cta" type="button" data-turbo="false" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-neutral-500 rounded-lg md:hidden hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-200 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:ring-neutral-600" aria-controls="navbar-cta" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
              </svg>
            </button>
          </div>
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-neutral-100 rounded-lg bg-neutral-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-neutral-950 md:dark:bg-neutral-950 dark:border-neutral-800">
              <li>
                <a href="/" className="block py-2 px-3 text-neutral-900 rounded-sm hover:bg-transparent hover:text-utility-700 md:p-0 dark:text-white dark:hover:text-utility-400" aria-current="page">Home</a>
              </li>
              <li>
                <a href="#" className="block py-2 px-3 text-neutral-900 rounded-sm hover:bg-transparent hover:text-utility-700 md:p-0 dark:text-white dark:hover:text-utility-400">About</a>
              </li>
              <li>
                <a href="#" className="block py-2 px-3 text-neutral-900 rounded-sm hover:bg-transparent hover:text-utility-700 md:p-0 dark:text-white dark:hover:text-utility-400">Services</a>
              </li>
              <li>
                <a href="#" className="block py-2 px-3 text-neutral-900 rounded-sm hover:bg-transparent hover:text-utility-700 md:p-0 dark:text-white dark:hover:text-utility-400">Pricing</a>
              </li>
              <li>
                <a href="/contact" className="block py-2 px-3 text-neutral-900 rounded-sm hover:bg-transparent hover:text-utility-700 md:p-0 dark:text-white dark:hover:text-utility-400">Contact</a>
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