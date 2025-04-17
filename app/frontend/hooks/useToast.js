import { useState, useEffect } from 'react'
import { usePage } from '@inertiajs/react'

export function useToast() {
  const [toast, setToast] = useState(null)
  const { flash } = usePage().props

  const showToast = (message, type = 'success', duration = 5000) => {
    setToast({ message, type, duration })
  }

  const handleFlash = () => {
    const flashTypes = {
      success: 'success',
      error: 'error',
      alert: 'warning',
      notice: 'info'
    }

    // Procura por qualquer mensagem de flash e mostra
    Object.entries(flashTypes).forEach(([key, type]) => {
      if (flash?.[key]) {
        showToast(flash[key], type)
      }
    })
  }

  useEffect(() => {
    handleFlash()
  }, [flash])

  return { toast, showToast }
} 