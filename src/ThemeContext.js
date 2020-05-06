import React from "react"
import { LIGHT } from "./constants"

export const ThemeContext = React.createContext({
  theme: {
    primary: "#00bfa5",
    text: "#black",
    type: LIGHT,
  },
  setTheme: () => {},
})

export const ThemeConsumer = ThemeContext.Consumer