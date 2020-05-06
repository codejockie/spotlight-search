import React, { useState } from "react"
import { DARK, LIGHT } from "../constants"
import { ThemeContext } from "../ThemeContext"

const ThemeProvider = (props) => {
  const theme = {
    dark: {
      primary: "#212121",
      text: "white",
      type: DARK,
    },
    light: {
      primary: "#0277bd",
      text: "black",
      type: LIGHT,
    },
  }

  const setTheme = (type) => {
    setState({ ...state, theme: type === DARK ? theme.light : theme.dark })
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
