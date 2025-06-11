import { Head } from '@inertiajs/react'

export default function AccessDenied({ 
  title = "Access Denied", 
  message = "You don't have permission to access this page.",
  showHead = true 
}) {
  const content = (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">{title}</h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          {message}
        </p>
      </div>
    </div>
  )

  if (showHead) {
    return (
      <>
        <Head title={title} />
        {content}
      </>
    )
  }

  return content
} 