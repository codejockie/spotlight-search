import classnames from "classnames"
import React, { useContext } from "react"
import AppContext from "../../Contexts/AppContext"
import "./SearchResult.scss"

const SearchResult = (props) => {
  const appContext = useContext(AppContext)
  const publicPath = process.env.PUBLIC_URL
  const classNames = (active, index) =>
    classnames({
      "search-result__results-list_list-item": true,
      active:
        appContext.selectedItemIndex === 0
          ? appContext.selectedItemIndex === index
          : active,
    })

  return (
    <div className="search-result">
      {/* Results List */}
      <div className="search-result__results-list" onKeyDown={props.onKeyDown}>
        <ul>
          {appContext.searchResults &&
            appContext.searchResults.map((searchResult) => (
              <li
                className="search-result__results-list__category"
                key={searchResult.name}
              >
                {searchResult.items.length > 0 && (
                  <>
                    <div className="search-result__results-list__header">
                      {searchResult.name}
                    </div>
                    <ul>
                      {searchResult.items.map((item, index) => (
                        <li
                          className={classNames(item.active, index)}
                          key={item.name}
                        >
                          <img
                            alt=""
                            className="search-result__results-list_list-item__item-icon"
                            src={`${publicPath}/icons/${item.icon}`}
                          />
                          {item.name}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </li>
            ))}
        </ul>
      </div>

      {/* Results Details */}
      <div className="search-result__results-detail">
        {appContext.selectedItem && (
          <>
            <div className="search-result__results-detail__container">
              <img
                alt=""
                className="search-result__results-detail__icon"
                src={`${publicPath}/icons/${appContext.selectedItem.icon}`}
              />
              <div className="search-result__results-detail__name">
                {appContext.selectedItem.name}
              </div>
            </div>
            <div className="search-result__results-detail__item-details"></div>
          </>
        )}
      </div>
    </div>
  )
}

export default SearchResult
