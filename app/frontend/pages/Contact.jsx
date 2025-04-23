// import { useForm } from '@inertiajs/react'

export default function Contact() {
  // const { data, setData, post } = useForm({
  //   email: '',
  //   subject: '',
  //   message: '',
  // })

  // const handleChange = (field, value) => {
  //   setData(field, value)
  // }

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   post('/contact')
  // }

  return (
    <section>
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-neutral-900 dark:text-neutral-50">Contact Us</h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-neutral-500 dark:text-neutral-400 sm:text-xl">Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.</p>
        <form action="#" className="space-y-8">
          <div>
            <label for="email" className="block mb-2 text-sm font-medium text-neutral-900 dark:text-neutral-300">Your email</label>
            <input type="email" id="email" className="shadow-sm bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-neutral-500 focus:border-neutral-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-700 dark:placeholder-neutral-400 dark:text-neutral-50 dark:focus:ring-neutral-500 dark:focus:border-utility-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required />
          </div>
          <div>
            <label for="subject" className="block mb-2 text-sm font-medium text-neutral-900 dark:text-neutral-300">Subject</label>
            <input type="text" id="subject" className="block p-3 w-full text-sm text-neutral-900 bg-neutral-50 rounded-lg border border-neutral-300 shadow-sm focus:ring-neutral-500 focus:border-neutral-500 dark:bg-neutral-700 dark:border-neutral-700 dark:placeholder-neutral-400 dark:text-neutral-50 dark:focus:ring-neutral-500 dark:focus:border-utility-500 dark:shadow-sm-light" placeholder="Let us know how we can help you" required />
          </div>
          <div className="sm:col-span-2">
            <label for="message" className="block mb-2 text-sm font-medium text-neutral-900 dark:text-neutral-400">Your message</label>
            <textarea id="message" rows="6" className="block p-2.5 w-full text-sm text-neutral-900 bg-neutral-50 rounded-lg shadow-sm border border-neutral-300 focus:ring-neutral-500 focus:border-neutral-500 dark:bg-neutral-700 dark:border-neutral-700 dark:placeholder-neutral-400 dark:text-neutral-50 dark:focus:ring-neutral-500 dark:focus:border-utility-500" placeholder="Leave a comment..."></textarea>
          </div>
          <button type="submit" className="text-neutral-50 bg-utility-700 hover:bg-utility-800 focus:ring-2 focus:outline-none focus:ring-utility-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-utility-500 dark:hover:bg-utility-600 dark:focus:ring-utility-800">Send message</button>
        </form>
      </div>
    </section>
  )
}