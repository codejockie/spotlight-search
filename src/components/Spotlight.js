import React, { useContext, useEffect, useRef, useState } from "react"
import cx from "classnames"
import AppContext from "../AppContext"
import "./Spotlight.scss"

const Spotlight = (props) => {
  const inputRef = useRef()
  const app = useContext(AppContext)
  const [searchBarClass, setSearchBarClass] = useState(
    cx({ spotlight__searchbar: true })
  )
  const [classNames, setClassNames] = useState(
    cx({ spotlight__searchbar__search: true, empty: props.value.length === 0 })
  )

  useEffect(() => {
    const { value } = inputRef.current
    setClassNames(
      cx({
        spotlight__searchbar__search: true,
        empty: value.length === 0,
      })
    )

    setSearchBarClass(
      cx({
        spotlight__searchbar: true,
        "spotlight__searchbar-input":
          app.searchTerm.length !== 0 && app.searchResultsCount !== 0,
      })
    )

    if (value) {
      const width = value.length === 1 ? 1.37 : 1
      inputRef.current.style.width = `${value.length * width}rem`
    }
  }, [app])

  const handleSearch = ({ target: { value } }) => {
    props.onChange(value)
  }

  const handleClick = () => {
    inputRef.current.focus()
  }

  return (
    <div className="spotlight" onClick={handleClick}>
      <div className={searchBarClass}>
        {/* Search Icon */}
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 283.753 284.51"
          enableBackground="new 0 0 283.753 284.51"
          xmlSpace="preserve"
          className="spotlight__searchbar__icon"
        >
          <path
            d="M281.394,264.378l0.135-0.135L176.24,158.954c30.127-38.643,27.45-94.566-8.09-130.104
          c-38.467-38.467-100.833-38.467-139.3,0c-38.467,38.467-38.466,100.833,0,139.299c35.279,35.279,90.644,38.179,129.254,8.748
          l103.859,103.859c0.01,0.01,0.021,0.021,0.03,0.03l1.495,1.495l0.134-0.134c2.083,1.481,4.624,2.36,7.375,2.36
          c7.045,0,12.756-5.711,12.756-12.756C283.753,269.002,282.875,266.462,281.394,264.378z M47.388,149.612
          c-28.228-28.229-28.229-73.996,0-102.225c28.228-28.229,73.996-28.228,102.225,0.001c28.229,28.229,28.229,73.995,0,102.224
          C121.385,177.841,75.617,177.841,47.388,149.612z"
          />
        </svg>
        {/* Search Input */}
        <input
          autoFocus
          className={classNames}
          placeholder="Spotlight Search"
          ref={inputRef}
          onChange={handleSearch}
        />
        {/* Bar */}
        {app.searchTerm && (
          <div className="spotlight__searchbar__input-after">
            &mdash; {app.searchInputInfo && app.searchInputInfo}
          </div>
        )}
        {/* Result Icon */}
        <span className="spotlight__searchbar__result_icon"></span>
      </div>
    </div>
  )
}

export default Spotlight
