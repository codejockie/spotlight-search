import React, { forwardRef, useContext } from "react"
import classnames from "classnames"
import AppContext from "../AppContext"
import "./SearchResult.scss"

const SearchResult = forwardRef((props, ref) => {
  const app = useContext(AppContext)
  const classNames = (active, index) => classnames({
    "search-result__results-list_list-item": true,
    "active": app.selectedItemIndex === 0 ? app.selectedItemIndex === index : active
  })

  return (
    <div className="search-result">
      {/* Results List */}
      <div className="search-result__results-list" onKeyDown={props.onKeyDown}>
        <ul ref={ref}>
          {
            app.searchResults.map((searchResult) => (
              <li className="search-result__results-list__category" key={searchResult.name}>
                <div className="search-result__results-list__header">{searchResult.name}</div>
                <ul className="search-result__results-list__category__list">
                  {
                    searchResult.items.map((item, index) => (
                      <li className={classNames(item.active, index)} key={item.name}>
                        <img className="search-result__results-list_list-item__item-icon" src="" alt="" />
                        {item.name}
                      </li>
                    ))
                  }
                </ul>
              </li>
            ))
          }
          {/* <li className="search-result__results-list__category">
            <div className="search-result__results-list__header">Top Hit</div>
            <ul>
              <li className={classNames(0)}>
                <img className="search-result__results-list_list-item__item-icon" src="" alt="" />
                Docker
              </li>
            </ul>
          </li> */}
        </ul>
      </div>
      {/* Results Details */}
      <div className="search-result__results-detail">
      </div>
    </div>
  )
})

export default SearchResult