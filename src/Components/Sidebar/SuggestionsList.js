import React from "react";

const SuggestionsList = ({children}) => {
  return (
    <div className="sidebar__form--suggestions">
      {children}
    </div>
  )
}

export default SuggestionsList;