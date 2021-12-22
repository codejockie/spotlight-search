import React, { useEffect, useRef } from "react"
import { DARK } from "../../constants"
import { useThemeMode } from "../../lib/hooks/use-theme-mode"

import "./ThemeToggle.scss"

const ThemeToggle = () => {
  const toggleRef = useRef()
  const [theme, toggleTheme] = useThemeMode()

  useEffect(() => {
    toggleRef.current.checked = theme === DARK ? true : false
  }, [theme])

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
