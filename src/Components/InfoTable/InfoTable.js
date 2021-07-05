import React from "react";
import CountryDetail from "./CountryDetail";

const InfoTable = ({country}) => {
  return (
    <div className="main">
      {
        country ? (
          <CountryDetail country={country} />
        ) : (
          <p>No Country Selected.</p>
        )
      }
    </div>
  )
}

export default InfoTable;