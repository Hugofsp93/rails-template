import { createInertiaApp } from '@inertiajs/react'
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import App from '../layouts/App.jsx'
import Guest from '../layouts/Guest.jsx'
import 'flowbite'

createInertiaApp({
  resolve: (name) => {
    const pages = import.meta.glob('../pages/**/*.jsx', {
      eager: true,
    })
    
    const page = pages[`../pages/${name}.jsx`]

    if (!page) {
      throw new Error(`Page not found: ${name}`)
    }
    
    const Component = page.default

    Component.layout = ({ children, ...props }) => {
      const { props: { currentUser } } = props
      const Layout = currentUser ? App : Guest
      return createElement(Layout, props, createElement(Component, props))
    }

    return page
  },

  setup({ el, App, props }) {
    if (el) {
      createRoot(el).render(createElement(App, props))
    } else {
      console.error(
        'Missing root element.\n\n' +
          'If you see this error, it probably means you load Inertia.js on non-Inertia pages.\n' +
          'Consider moving <%= vite_javascript_tag "inertia" %> to the Inertia-specific layout instead.',
      )
    }
  },
})
