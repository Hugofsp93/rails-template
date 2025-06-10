import { Head } from "@inertiajs/react"

export default function Home() {
  return (
    <>
      <Head title="Home" />
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold dark:text-neutral-50 text-neutral-900">Welcome to the Home Page</h1>
      </div>
    </>
  )
}
