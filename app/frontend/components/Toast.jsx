import { useEffect } from 'react'

// Adiciona os estilos de animação
const style = document.createElement('style')
style.textContent = `
  @keyframes enter {
    from {
      opacity: 0;
      transform: translateX(100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes leave {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(100%);
    }
  }

  .animate-enter {
    animation: enter 0.3s ease-out;
  }

  .animate-leave {
    animation: leave 0.3s ease-in;
  }
`
document.head.appendChild(style)

export default function Toast({ message, type = 'success', duration = 5000 }) {
  useEffect(() => {
    const toast = document.createElement('div')
    toast.className = `fixed top-20 right-4 z-10 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 animate-enter`
    toast.role = 'alert'
    
    const colors = {
      success: {
        icon: 'text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-200',
        iconPath: 'M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z'
      },
      error: {
        icon: 'text-red-500 bg-red-100 dark:bg-red-800 dark:text-red-200',
        iconPath: 'M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z'
      },
      info: {
        icon: 'text-blue-500 bg-blue-100 dark:bg-blue-800 dark:text-blue-200',
        iconPath: 'M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z'
      },
      warning: {
        icon: 'text-yellow-500 bg-yellow-100 dark:bg-yellow-800 dark:text-yellow-200',
        iconPath: 'M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z'
      }
    }

    const selectedColor = colors[type] || colors.success

    toast.innerHTML = `
      <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 ${selectedColor.icon} rounded-lg">
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="${selectedColor.iconPath}"/>
        </svg>
        <span class="sr-only">${type} icon</span>
      </div>
      <div class="ms-3 text-sm font-normal">${message}</div>
      <button type="button" class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">
        <span class="sr-only">Close</span>
        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
      </button>
    `
    
    document.body.appendChild(toast)
    
    // Adiciona evento de clique para fechar com animação
    const closeButton = toast.querySelector('button')
    closeButton.addEventListener('click', () => {
      toast.classList.add('animate-leave')
      setTimeout(() => toast.remove(), 300)
    })
    
    // Remove o toast após a duração especificada com animação
    setTimeout(() => {
      toast.classList.add('animate-leave')
      setTimeout(() => toast.remove(), 300)
    }, duration)

    return () => {
      toast.remove()
    }
  }, [message, type, duration])

  return null
} 