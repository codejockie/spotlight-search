import React from "react"
import { LIGHT } from "../constants"

export const ThemeContext = React.createContext({
  theme: {
    primary: "#0277bd",
    text: "light",
    type: LIGHT,
  },
  setTheme: () => {},
})

export const ThemeConsumer = ThemeContext.Consumer