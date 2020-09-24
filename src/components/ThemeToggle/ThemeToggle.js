import React, { useContext, useEffect, useRef } from "react"
import { DARK, LIGHT } from "../../constants"
import { ThemeContext } from "../../Contexts/ThemeContext"

import "./ThemeToggle.scss"

const ThemeToggle = () => {
  const toggleRef = useRef()
  const themeContext = useContext(ThemeContext)

  useEffect(() => {
    const theme = localStorage.getItem("theme")

    if (theme === DARK) {
      toggleRef.current.checked = true
      document.documentElement.setAttribute("data-theme", theme)
    }
  }, [])

  const toggleTheme = ({ target: { checked } }) => {
    const theme = checked ? DARK : LIGHT
    themeContext.setTheme(theme)
    localStorage.setItem("theme", theme)
    document.documentElement.setAttribute("data-theme", theme)
  }

  return (
    <div className="toggle">
      <label className="switch">
        <input
          type="checkbox"
          id="theme-toggle"
          onChange={toggleTheme}
          ref={toggleRef}
        />
        <span className="slider round"></span>
      </label>
      <label className="visuallyhidden" htmlFor="theme-toggle">Theme Toggle</label>
    </div>
  )
}

export default ThemeToggle
