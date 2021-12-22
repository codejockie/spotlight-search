import { useCallback, useEffect, useState } from "react"
import { DARK, LIGHT } from "../../constants"

export const useThemeMode = () => {
  const [theme, setTheme] = useState(LIGHT)
  const [componentMounted, setComponentMounted] = useState(false)

  const setMode = useCallback((mode) => {
    setTheme(mode)
    window.localStorage.setItem("theme", mode)
    document.documentElement.setAttribute("data-theme", mode)
  }, [])

  const toggleTheme = () => {
    if (theme === LIGHT) {
      setMode(DARK)
    } else {
      setMode(LIGHT)
    }
  }

  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme")
    const systemDarkTheme =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    if (systemDarkTheme && !localTheme) {
      setMode(DARK)
    } else if (localTheme) {
      setMode(localTheme)
    } else {
      setMode(LIGHT)
    }
    setComponentMounted(true)
  }, [setMode, theme])

  return [theme, toggleTheme, componentMounted]
}
