import React, { useContext, useEffect, useRef } from "react"
import { DARK, LIGHT } from "../constants"
import { ThemeContext } from "../ThemeContext"

import "./ThemeToggle.scss"

const ThemeToggle = () => {
  const toggleRef = useRef()
  const themeContext = useContext(ThemeContext)

  useEffect(() => {
    const theme = localStorage.getItem("theme")

    if (theme === DARK) {
      document.documentElement.setAttribute("data-theme", theme)
      toggleRef.current.checked = true
    }
  }, [])

  const toggleTheme = ({ target: { checked } }) => {
    localStorage.setItem("theme", checked ? DARK : LIGHT)
    document.documentElement.setAttribute("data-theme", checked ? DARK : LIGHT)
    themeContext.setTheme(themeContext.theme.type)
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
