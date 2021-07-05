import React from "react";

const CountryInfoBlock = ({ title, data }) => {
  if (data && data.length !== 0) {
    return (
      <div className="detail__info--item">
        <p className="info__title">{title}</p>
        {
          data.map((item, index) => {
            return (
              <p className="info__tag" key={index}>{item}</p>
            )
          })
        }
      </div>
    )
  } else {
    return (
      <></>
    )
  }
  
}

export default CountryInfoBlock;