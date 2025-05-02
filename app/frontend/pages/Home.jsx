import { Head, usePage } from "@inertiajs/react"
import { useToast } from "../hooks/useToast"
import Toast from "../components/Toast"
export default function Home() {
  const { toast } = useToast()
  const { props: { currentUser } } = usePage()

  return (
    <>
      {toast && <Toast {...toast} />}
      <Head title="Home" />


      <div className="w-full max-w-screen-xl mx-auto bg-neutral-50 border border-neutral-200 rounded-lg shadow-sm dark:bg-neutral-800 dark:border-neutral-700">
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">Select tab</label>
          <select id="tabs" className="bg-neutral-50 border-0 border-b border-neutral-200 text-neutral-900 text-sm rounded-t-lg focus:ring-utility-500 focus:border-utility-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-neutral-50 dark:focus:ring-utility-500 dark:focus:border-utility-500">
            <option>Statistics</option>
            <option>Services</option>
            <option>FAQ</option>
          </select>
        </div>
        <ul className="hidden text-sm font-medium text-center text-neutral-500 divide-x divide-neutral-200 rounded-lg sm:flex dark:divide-neutral-600 dark:text-neutral-400 rtl:divide-x-reverse" id="fullWidthTab" data-tabs-toggle="#fullWidthTabContent" data-active-classes="text-utility-600 dark:text-utility-500 border-utility-600 dark:border-utility-500" role="tablist">
          <li className="w-full">
            <button id="stats-tab" data-tabs-target="#stats" type="button" role="tab" aria-controls="stats" aria-selected="true" className="inline-block w-full p-4 rounded-ss-lg bg-neutral-50 hover:bg-neutral-100 focus:outline-none dark:bg-neutral-700 dark:hover:bg-neutral-600">Statistics</button>
          </li>
          <li className="w-full">
            <button id="about-tab" data-tabs-target="#about" type="button" role="tab" aria-controls="about" aria-selected="false" className="inline-block w-full p-4 bg-neutral-50 hover:bg-neutral-100 focus:outline-none dark:bg-neutral-700 dark:hover:bg-neutral-600">Services</button>
          </li>
          <li className="w-full">
            <button id="faq-tab" data-tabs-target="#faq" type="button" role="tab" aria-controls="faq" aria-selected="false" className="inline-block w-full p-4 rounded-se-lg bg-neutral-50 hover:bg-neutral-100 focus:outline-none dark:bg-neutral-700 dark:hover:bg-neutral-600">FAQ</button>
          </li>
        </ul>
        <div id="fullWidthTabContent" className="border-t border-neutral-200 dark:border-neutral-600">
          <div className="hidden p-4 bg-neutral-50 rounded-lg md:p-8 dark:bg-neutral-800" id="stats" role="tabpanel" aria-labelledby="stats-tab">
            <dl className="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-neutral-900 sm:grid-cols-3 xl:grid-cols-6 dark:text-neutral-50 sm:p-8">
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-3xl font-extrabold text-neutral-600 dark:text-neutral-200">73M+</dt>
                <dd className="text-neutral-500 dark:text-neutral-400">Developers</dd>
              </div>
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-3xl font-extrabold text-neutral-600 dark:text-neutral-200">100M+</dt>
                <dd className="text-neutral-500 dark:text-neutral-400">Public repositories</dd>
              </div>
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-3xl font-extrabold text-neutral-600 dark:text-neutral-200">1000s</dt>
                <dd className="text-neutral-500 dark:text-neutral-400">Open source projects</dd>
              </div>
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-3xl font-extrabold text-neutral-600 dark:text-neutral-200">1B+</dt>
                <dd className="text-neutral-500 dark:text-neutral-400">Contributors</dd>
              </div>
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-3xl font-extrabold text-neutral-600 dark:text-neutral-200">90+</dt>
                <dd className="text-neutral-500 dark:text-neutral-400">Top Forbes companies</dd>
              </div>
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-3xl font-extrabold text-neutral-600 dark:text-neutral-200">4M+</dt>
                <dd className="text-neutral-500 dark:text-neutral-400">Organizations</dd>
              </div>
            </dl>
          </div>
          <div className="hidden p-4 bg-neutral-50 rounded-lg md:p-8 dark:bg-neutral-800" id="about" role="tabpanel" aria-labelledby="about-tab">
            <h2 className="mb-5 text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50">We invest in the world's potential</h2>
            <ul role="list" className="space-y-4 text-neutral-500 dark:text-neutral-400">
              <li className="flex space-x-2 rtl:space-x-reverse items-center">
                <svg className="shrink-0 w-3.5 h-3.5 text-utility-600 dark:text-utility-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span className="leading-tight">Dynamic reports and dashboards</span>
              </li>
              <li className="flex space-x-2 rtl:space-x-reverse items-center">
                <svg className="shrink-0 w-3.5 h-3.5 text-utility-600 dark:text-utility-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span className="leading-tight">Templates for everyone</span>
              </li>
              <li className="flex space-x-2 rtl:space-x-reverse items-center">
                <svg className="shrink-0 w-3.5 h-3.5 text-utility-600 dark:text-utility-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span className="leading-tight">Development workflow</span>
              </li>
              <li className="flex space-x-2 rtl:space-x-reverse items-center">
                <svg className="shrink-0 w-3.5 h-3.5 text-utility-600 dark:text-utility-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span className="leading-tight">Limitless business automation</span>
              </li>
            </ul>
          </div>
          <div className="hidden p-4 bg-neutral-50 rounded-lg dark:bg-neutral-800" id="faq" role="tabpanel" aria-labelledby="faq-tab">
            <div id="accordion-flush" data-accordion="collapse" data-active-classes="bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50" data-inactive-classes="text-neutral-500 dark:text-neutral-400">
              <h2 id="accordion-flush-heading-1">
                <button type="button" className="flex items-center justify-between w-full py-5 font-medium text-left rtl:text-right text-neutral-500 border-b border-neutral-200 dark:border-neutral-700 dark:text-neutral-400" data-accordion-target="#accordion-flush-body-1" aria-expanded="true" aria-controls="accordion-flush-body-1">
                  <span>What is Flowbite?</span>
                  <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                  </svg>
                </button>
              </h2>
              <div id="accordion-flush-body-1" className="hidden" aria-labelledby="accordion-flush-heading-1">
                <div className="py-5 border-b border-neutral-200 dark:border-neutral-700">
                  <p className="mb-2 text-neutral-500 dark:text-neutral-400">Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and more.</p>
                  <p className="text-neutral-500 dark:text-neutral-400">Check out this guide to learn how to <a href="/docs/getting-started/introduction/" className="text-utility-600 dark:text-utility-500 hover:underline">get started</a> and start developing websites even faster with components on top of Tailwind CSS.</p>
                </div>
              </div>
              <h2 id="accordion-flush-heading-2">
                <button type="button" className="flex items-center justify-between w-full py-5 font-medium text-left rtl:text-right text-neutral-500 border-b border-neutral-200 dark:border-neutral-700 dark:text-neutral-400" data-accordion-target="#accordion-flush-body-2" aria-expanded="false" aria-controls="accordion-flush-body-2">
                  <span>Is there a Figma file available?</span>
                  <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                  </svg>
                </button>
              </h2>
              <div id="accordion-flush-body-2" className="hidden" aria-labelledby="accordion-flush-heading-2">
                <div className="py-5 border-b border-neutral-200 dark:border-neutral-700">
                  <p className="mb-2 text-neutral-500 dark:text-neutral-400">Flowbite is first conceptualized and designed using the Figma software so everything you see in the library has a design equivalent in our Figma file.</p>
                  <p className="text-neutral-500 dark:text-neutral-400">Check out the <a href="https://flowbite.com/figma/" className="text-utility-600 dark:text-utility-500 hover:underline">Figma design system</a> based on the utility classes from Tailwind CSS and components from Flowbite.</p>
                </div>
              </div>
              <h2 id="accordion-flush-heading-3">
                <button type="button" className="flex items-center justify-between w-full py-5 font-medium text-left rtl:text-right text-neutral-500 border-b border-neutral-200 dark:border-neutral-700 dark:text-neutral-400" data-accordion-target="#accordion-flush-body-3" aria-expanded="false" aria-controls="accordion-flush-body-3">
                  <span>What are the differences between Flowbite and Tailwind UI?</span>
                  <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                  </svg>
                </button>
              </h2>
              <div id="accordion-flush-body-3" className="hidden" aria-labelledby="accordion-flush-heading-3">
                <div className="py-5 border-b border-neutral-200 dark:border-neutral-700">
                  <p className="mb-2 text-neutral-500 dark:text-neutral-400">The main difference is that the core components from Flowbite are open source under the MIT license, whereas Tailwind UI is a paid product. Another difference is that Flowbite relies on smaller and standalone components, whereas Tailwind UI offers sections of pages.</p>
                  <p className="mb-2 text-neutral-500 dark:text-neutral-400">However, we actually recommend using both Flowbite, Flowbite Pro, and even Tailwind UI as there is no technical reason stopping you from using the best of two worlds.</p>
                  <p className="mb-2 text-neutral-500 dark:text-neutral-400">Learn more about these technologies:</p>
                  <ul className="ps-5 text-neutral-500 list-disc dark:text-neutral-400">
                    <li><a href="https://flowbite.com/pro/" className="text-utility-600 dark:text-utility-500 hover:underline">Flowbite Pro</a></li>
                    <li><a href="https://tailwindui.com/" rel="nofollow" className="text-utility-600 dark:text-utility-500 hover:underline">Tailwind UI</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
