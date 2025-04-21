import { useEffect, useState } from "react"

export default function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("color-theme") || 
        (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    }
    return "light"
  })

  useEffect(() => {
    const root = window.document.documentElement
    if (theme === "dark") {
      root.classList.add("dark")
      localStorage.setItem("color-theme", "dark")
    } else {
      root.classList.remove("dark")
      localStorage.setItem("color-theme", "light")
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light")
  }

  return { theme, toggleTheme }
} 