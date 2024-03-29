import $ from "jquery"
import React, { useCallback, useEffect, useState } from "react"
import db from "./data.json"
import { sleep } from "./helpers/sleep"
import { KEY } from "./helpers/keyboard"
import { AppProvider } from "./contexts/AppContext"
import ThemeProvider from "./providers/ThemeProvider"
import Spotlight from "./components/Spotlight/Spotlight"
import ThemeToggle from "./components/ThemeToggle/ThemeToggle"
import "./App.css"

function App() {
  const [inputValue, setInputValue] = useState("")
  const [appData, setAppData] = useState({
    searchInputInfo: undefined,
    searchResultsCount: 0,
    searchResults: [],
    searchTerm: "",
    selectedCategory: undefined,
    selectedItemIndex: undefined,
    selectedItem: undefined,
  })

  const getSelectedItemIndex = useCallback(() => {
    return appData.selectedItemIndex || 0
  }, [appData])

  const selectItemAtIndex = useCallback(
    (idx) => {
      let currentItemIndex = 0
      const searchResults = [...appData.searchResults]
      const getSearchInputInfo = (name) => {
        if (appData.searchResultsCount === 0) {
          return "No Results"
        }
        return name
      }

      searchResults.forEach((category) => {
        if (category.items.length > 0) {
          category.items.forEach((item) => {
            const isActive = currentItemIndex === (idx || 0)
            item.active = isActive
            currentItemIndex++

            if (isActive) {
              setAppData((prevAppData) => ({
                ...prevAppData,
                selectedItem: item,
                selectedCategory: category,
                searchInputInfo: getSearchInputInfo(item.name),
              }))
            }
          })
        }
      })
      setAppData((prevAppData) => ({
        ...prevAppData,
        searchResults,
        selectedItemIndex: idx,
      }))
    },
    [appData]
  )

  const selectNext = useCallback(() => {
    const idx = getSelectedItemIndex()
    if (idx + 1 < appData.searchResultsCount) {
      selectItemAtIndex(idx + 1)
    }
  }, [appData, getSelectedItemIndex, selectItemAtIndex])

  const selectPrevious = useCallback(() => {
    const idx = getSelectedItemIndex()
    if (idx - 1 >= 0) {
      selectItemAtIndex(idx - 1)
    }
  }, [getSelectedItemIndex, selectItemAtIndex])

  const handleKeyDown = useCallback(
    (event) => {
      switch (event.key) {
        case KEY.DOWN: // IE/Edge specific value
        case KEY.ARROW_DOWN:
          event.preventDefault()
          selectNext()
          break
        case KEY.UP: // IE/Edge specific value
        case KEY.ARROW_UP:
          event.preventDefault()
          selectPrevious()
          break
        case KEY.ESC: // IE/Edge specific value
        case KEY.ESCAPE:
          break
        case KEY.ENTER:
          break
        default:
          break
      }
    },
    [selectNext, selectPrevious]
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleKeyDown])

  function keepItemVisible() {
    const activeItem = $(".app").find(
      "li.search-result__results-list_list-item.active"
    )
    const resultsList = $(".app").find(".search-result__results-list")

    if (activeItem.length) {
      const activeItemTop = activeItem.position().top
      const activeItemBottom =
        activeItem.position().top + activeItem.outerHeight()
      const parentsHeight = resultsList.height()
      const currentScrollTop = resultsList.scrollTop()

      if (parentsHeight - activeItemBottom < 0) {
        resultsList.scrollTop(
          currentScrollTop + Math.abs(parentsHeight - activeItemBottom)
        )
      }

      if (activeItemTop < 0) {
        let padding = 0
        if (activeItem.parent().find("li").index(activeItem) === 0) {
          padding = $(
            ".search-result__results-list__header:first"
          ).outerHeight()
        }

        resultsList.scrollTop(currentScrollTop + activeItemTop - padding)
      }
    }
  }

  useEffect(() => {
    setTimeout(() => {
      if (appData.selectedItemIndex !== undefined) {
        keepItemVisible()
      }
    }, 100)
  }, [appData])

  function handleSearch(searchTerm) {
    setInputValue(searchTerm)

    if (!searchTerm) {
      setAppData({
        searchInputInfo: undefined,
        searchResultsCount: 0,
        searchResults: [],
        searchTerm: "",
        selectedCategory: undefined,
        selectedItem: undefined,
        selectedItemIndex: undefined,
      })
      return
    }

    const searchResults = Object.entries(db)
      .reduce((acc, [name, categoryValue]) => {
        const items = categoryValue.filter((c) =>
          c.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        return acc.concat({ name, items })
      }, [])
      // Sort
      .map((category) => {
        category.items.sort((a, b) => {
          const searchKey = searchTerm.toLowerCase()
          const aStartsWith = a.name.toLowerCase().startsWith(searchKey)
          const bStartsWith = b.name.toLowerCase().startsWith(searchKey)

          if (aStartsWith && !bStartsWith) {
            return -1
          }
          if (!aStartsWith && bStartsWith) {
            return 1
          }
          return 0
        })
        return category
      })

    const searchResultsCount = searchResults.reduce((resultsCount, currVal) => {
      return resultsCount + currVal.items.length
    }, 0)

    const selectedItem = searchResults.length && searchResults[0].items[0]
    const getSearchInputInfo = () => {
      if (searchResultsCount === 0) {
        return "No Results"
      }
      return searchResults[0].items[0].name
    }

    sleep(600).then(() => {
      setAppData((prevAppData) => ({
        ...prevAppData,
        searchInputInfo: getSearchInputInfo(),
        searchResults,
        searchResultsCount,
        searchTerm,
        selectedItem,
        selectedItemIndex: 0,
      }))
    })
  }

  return (
    <ThemeProvider>
      <ThemeToggle />
      <AppProvider value={appData}>
        <div className="app">
          <Spotlight
            value={inputValue}
            onChange={handleSearch}
            onKeyDown={handleKeyDown}
          />
        </div>
      </AppProvider>
    </ThemeProvider>
  )
}

export default App
