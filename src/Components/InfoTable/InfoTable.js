import React from "react";
import CountryDetail from "./CountryDetail";

const InfoTable = ({country, pop}) => {
  return (
    <div className="main">
      {
        country ? (
          <CountryDetail country={country} pop={pop} />
        ) : (
          <p>No Country Selected.</p>
        )
      }
    </div>
  )
}

export default InfoTable;