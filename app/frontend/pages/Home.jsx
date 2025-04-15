import { Head, usePage } from "@inertiajs/react"

export default function Home() {
  const { props: { currentUser } } = usePage()

  return (
    <>
      <Head title="Home" />
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-white font-bold">Bem-vindo ao Rails + React Inertia Template</h1>
        <p className="text-white">Current user: {currentUser?.email}</p>
      </div>
    </>
  )
}
