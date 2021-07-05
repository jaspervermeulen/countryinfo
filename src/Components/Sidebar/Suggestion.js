import React from "react";

const Suggestion = ({name, ...rootDOMAttributes}) => {
  return (
    <p {...rootDOMAttributes} className="sidebar__form--suggestions-item">{name}</p>
  )
}

export default Suggestion;