import React from "react";

const CountryInfoBlock = ({ title, data }) => {
  if (data && data.length !== 0) {
    return (
      <div className="block">
        <p className="block__title">{title}</p>
        <div className="block__list">
          {
            data.map((item, index) => {
              return (
                <p className="block__list--item" key={index}>{item}</p>
              )
            })
          }
        </div>
      </div>
    )
  } else {
    return (
      <></>
    )
  }
  
}

export default CountryInfoBlock;