import { Head } from "@inertiajs/react"

export default function Home({ currentUser }) {
  return (
    <>
      <Head title="Home" />
      <div>
        <h1>Home</h1>
        <p>Current user: {currentUser.email}</p>
      </div>
    </>
  )
}
