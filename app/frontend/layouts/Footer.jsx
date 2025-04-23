export default function Footer() {
  return (
    <footer className="bg-neutral-50 shadow sm:flex sm:items-center sm:justify-between p-4 sm:p-6 xl:p-8 dark:bg-neutral-950 antialiased">
      <p className="mb-4 text-sm text-center text-neutral-500 dark:text-neutral-300 sm:mb-0">
        &copy; 2025 <a href="http://localhost:3000/" className="hover:underline" target="_blank">Rails Template</a>. All rights reserved.
      </p>
      <div className="flex justify-center items-center space-x-1">
        <a href="https://steamcommunity.com/profiles/76561198880856463" data-tooltip-target="tooltip-dribbble" className="inline-flex justify-center p-2 text-neutral-500 rounded-lg cursor-pointer dark:text-neutral-400 dark:hover:text-neutral-50 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-600" target="_blank" rel="noopener noreferrer">
          <svg className="w-4 h-4 fill-neutral-500 dark:fill-neutral-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32">
            <path fillRule="currentColor" d="M15.974 0c-8.401 0-15.292 6.479-15.943 14.714l8.573 3.547c0.729-0.495 1.604-0.786 2.552-0.786 0.083 0 0.167 0.005 0.25 0.005l3.813-5.521v-0.078c0-3.328 2.703-6.031 6.031-6.031s6.036 2.708 6.036 6.036c0 3.328-2.708 6.031-6.036 6.031h-0.135l-5.438 3.88c0 0.073 0.005 0.141 0.005 0.214 0 2.5-2.021 4.526-4.521 4.526-2.177 0-4.021-1.563-4.443-3.635l-6.135-2.542c1.901 6.719 8.063 11.641 15.391 11.641 8.833 0 15.995-7.161 15.995-16s-7.161-16-15.995-16zM10.052 24.281l-1.964-0.813c0.349 0.724 0.953 1.328 1.755 1.667 1.729 0.719 3.724-0.104 4.443-1.833 0.349-0.844 0.349-1.76 0.005-2.599-0.344-0.844-1-1.495-1.839-1.844-0.828-0.349-1.719-0.333-2.5-0.042l2.026 0.839c1.276 0.536 1.88 2 1.349 3.276s-2 1.88-3.276 1.349zM25.271 11.875c0-2.214-1.802-4.021-4.016-4.021-2.224 0-4.021 1.807-4.021 4.021 0 2.219 1.797 4.021 4.021 4.021 2.214 0 4.016-1.802 4.016-4.021zM18.245 11.87c0-1.672 1.349-3.021 3.016-3.021s3.026 1.349 3.026 3.021c0 1.667-1.359 3.021-3.026 3.021s-3.016-1.354-3.016-3.021z" clipRule="evenodd" />
          </svg>
          <span className="sr-only">Steam</span>
        </a>
        <div id="tooltip-dribbble" role="tooltip" className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-neutral-700 bg-neutral-50 dark:text-neutral-50 dark:bg-neutral-700 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip">
          Check out my Steam profile
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <a href="https://x.com/hgfllp" data-tooltip-target="tooltip-twitter" className="inline-flex justify-center p-2 text-neutral-500 rounded-lg cursor-pointer dark:text-neutral-400 dark:hover:text-neutral-50 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-600" target="_blank" rel="noopener noreferrer">
          <svg className="w-4 h-4 fill-neutral-500 dark:fill-neutral-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12.186 8.672 18.743.947h-2.927l-5.005 5.9-4.44-5.9H0l7.434 9.876-6.986 8.23h2.927l5.434-6.4 4.82 6.4H20L12.186 8.672Zm-2.267 2.671L8.544 9.515 3.2 2.42h2.2l4.312 5.719 1.375 1.828 5.731 7.613h-2.2l-4.699-6.237Z" />
          </svg>
          <span className="sr-only">Twitter</span>
        </a>
        <div id="tooltip-twitter" role="tooltip" className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-neutral-700 bg-neutral-50 dark:text-neutral-50 dark:bg-neutral-700 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip">
          Follow us on Twitter
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <a href="https://github.com/Hugofsp93" data-tooltip-target="tooltip-github" className="inline-flex justify-center p-2 text-neutral-500 rounded-lg cursor-pointer dark:text-neutral-400 dark:hover:text-neutral-50 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-600" target="_blank" rel="noopener noreferrer">
          <svg className="w-4 h-4 fill-neutral-500 dark:fill-neutral-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clipRule="evenodd" />
          </svg>
          <span className="sr-only">Github</span>
        </a>
        <div id="tooltip-github" role="tooltip" className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-neutral-700 bg-neutral-50 dark:text-neutral-50 dark:bg-neutral-700 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip">
          Star us on GitHub
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <a href="https://youtube.com/@tabuadeesmeralda" data-tooltip-target="tooltip-facebook" className="inline-flex justify-center p-2 text-neutral-500 rounded-lg cursor-pointer dark:text-neutral-400 dark:hover:text-neutral-50 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-600" target="_blank" rel="noopener noreferrer">
          <svg className="w-4 h-4 fill-neutral-500 dark:fill-neutral-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M21.7 8.037a4.26 4.26 0 0 0-.789-1.964 2.84 2.84 0 0 0-1.984-.839c-2.767-.2-6.926-.2-6.926-.2s-4.157 0-6.928.2a2.836 2.836 0 0 0-1.983.839 4.225 4.225 0 0 0-.79 1.965 30.146 30.146 0 0 0-.2 3.206v1.5a30.12 30.12 0 0 0 .2 3.206c.094.712.364 1.39.784 1.972.604.536 1.38.837 2.187.848 1.583.151 6.731.2 6.731.2s4.161 0 6.928-.2a2.844 2.844 0 0 0 1.985-.84 4.27 4.27 0 0 0 .787-1.965 30.12 30.12 0 0 0 .2-3.206v-1.516a30.672 30.672 0 0 0-.202-3.206Zm-11.692 6.554v-5.62l5.4 2.819-5.4 2.801Z" clipRule="evenodd" />
          </svg>
          <span className="sr-only">Youtube</span>
        </a>
        <div id="tooltip-facebook" role="tooltip" className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-neutral-700 bg-neutral-50 dark:text-neutral-50 dark:bg-neutral-700 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip">
          Subscribe to our channel
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
      </div>
    </footer>
  )
}