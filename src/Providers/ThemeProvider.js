import React, { useState } from "react"
import { DARK, LIGHT } from "../constants"
import { ThemeContext } from "../Contexts/ThemeContext"

const ThemeProvider = (props) => {
  const theme = {
    dark: {
      primary: "#212121",
      text: "dark",
      type: DARK,
    },
    light: {
      primary: "#0277bd",
      text: "light",
      type: LIGHT,
    },
  }

  const setTheme = (type) => {
    setState((prevState) => ({
      ...prevState,
      theme: type === DARK ? theme.dark : theme.light,
    }))
  }

  const initialState = {
    setTheme,
    theme: theme.light,
  }

  const [state, setState] = useState(initialState)

  return (
    <ThemeContext.Provider value={state}>
      {props.children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
