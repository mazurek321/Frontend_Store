import React from 'react'
import "./Header.css"

const Header = ({text, icons}) => {
  return (
    <div className="header flex">
              <h3>{text}</h3>
              {icons && <>
                <div className="icons flex">
                <div className="filter flex">
                  <span class="material-symbols-outlined">sort</span>
                  Sort
                </div>
                <div className="filter flex">
                  <span class="material-symbols-outlined">filter_alt</span>
                  Filter
                </div>
              </div>
              </>}
              
    </div>
  )
}

export default Header