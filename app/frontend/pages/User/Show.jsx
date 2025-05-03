import { Head, Link } from '@inertiajs/react'

export default function Show({ props: { user } }) {

  return (
    <>
      <Head title={`Edit User ${user.id}`} />

      <section className="w-full md:mt-10">
        <div className="bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xl py-8 px-8 mx-auto max-w-4xl">
          <h2 className="text-xl font-semibold leading-none text-neutral-900 md:text-2xl dark:text-neutral-50">Details</h2>
          <br />
          <hr className="border-neutral-300 dark:border-neutral-700" />
          <dl className="flex justify-start border-b border-neutral-300 dark:border-neutral-700">
            <div className="w-1/2">
              <label className="mb-2 font-semibold leading-none text-neutral-900 dark:text-neutral-50">Name</label>
              <div className="font-light text-neutral-500 sm:mb-5 dark:text-neutral-400">{user.name}</div>
            </div>
            <div className="w-1/2">
              <label className="mb-2 font-semibold leading-none text-neutral-900 dark:text-neutral-50">Email</label>
              <div className="font-light text-neutral-500 sm:mb-5 dark:text-neutral-400">{user.email}</div>
            </div>
          </dl>
          <dl className="flex justify-start border-b border-neutral-300 dark:border-neutral-700">
            <div className="w-1/2">
              <label className="mb-2 font-semibold leading-none text-neutral-900 dark:text-neutral-50">Phone</label>
              <div className="font-light text-neutral-500 sm:mb-5 dark:text-neutral-400">{user.phone}</div>
            </div>
          </dl>
          <dl className="flex justify-start border-b border-neutral-300 dark:border-neutral-700">
            <div className="w-1/2">
              <label className="mb-2 font-semibold leading-none text-neutral-900 dark:text-neutral-50">Created at</label>
              <div className="font-light text-neutral-500 sm:mb-5 dark:text-neutral-400">{user.created_at}</div>
            </div>
            <div className="w-1/2">
              <label className="mb-2 font-semibold leading-none text-neutral-900 dark:text-neutral-50">Updated at</label>
              <div className="font-light text-neutral-500 sm:mb-5 dark:text-neutral-400">{user.updated_at}</div>
            </div>
          </dl>
          <div className="flex items-center">
            <Link
              href={`/admin/users/${user.id}/edit`}
              type="button"
              className="inline-flex items-center px-8 py-2.5 mt-8 text-sm font-medium text-center text-neutral-50 bg-utility-700 rounded-lg focus:ring-neutral-200 dark:focus:ring-utility-500 hover:bg-utility-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg aria-hidden="true" className="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>
              Edit
            </Link>
            <Link
              href="/admin/users"
              type="button"
              className="inline-flex items-center px-8 py-2.5 mt-8 text-sm font-medium text-center hover:underline text-utility-700 hover:color-utility-600 dark:text-neutral-200"
            >
              Back
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
