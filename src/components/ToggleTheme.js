import React, { useContext, useEffect, useRef } from "react"
import { DARK, LIGHT } from "../constants"
import { ThemeContext } from "../ThemeContext"

import "./ToggleTheme.scss"

const ToggleTheme = () => {
  const toggleRef = useRef()
  const themeContext = useContext(ThemeContext)

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme")

    if (currentTheme && currentTheme === DARK) {
      document.documentElement.setAttribute("data-theme", currentTheme)
      toggleRef.current.checked = true
    }
  }, [])

  const toggleTheme = (event) => {
    if (event.target.checked) {
      localStorage.setItem("theme", DARK)
      document.documentElement.setAttribute("data-theme", DARK)
    } else {
      localStorage.setItem("theme", LIGHT)
      document.documentElement.setAttribute("data-theme", LIGHT)
    }
    themeContext.setTheme(themeContext.theme.type)
  }

  return (
    <span className="toggle">
      <label className="switch">
        <input type="checkbox" onChange={toggleTheme} ref={toggleRef} />
        <span className="slider round"></span>
      </label>
    </span>
  )
}

export default ToggleTheme
