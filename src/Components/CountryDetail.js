import React from "react";

const CountryDetail = ({ country }) => {
  if (country.name === undefined) {
    return (
      <div className="error__wrapper">
        <p className="error__text">No Results</p>
      </div>
    )
  } else {
    return (
      <>
        <div className="detail">
          <div className="detail-w">
            <img className="detail__img" src={country.flag} />
            <div className="detail__wrapper">
              <p className="detail__wrapper--title">{country.name}</p>
              <div className="detail__wrapper--info">
                <p className="detail__wrapper--info--item">{country.capital}</p>
                <p className="detail__wrapper--info--item">{country.region}</p>
              </div>
            </div>
          </div>
          <div className="detail__info">
            <div className="detail__info--item">
              <p className="info__title">Alternative Spellings</p>
              {
                country.altSpellings.map((spelling, index) => {
                  return (
                    <p className="info__tag" key={index}>{spelling}</p>
                  )
                })
              }
            </div>
            {
              country.borders.length === 0 ? (
                <></>
              ) : (
                <div className="detail__info--item">
                  <p className="info__title">Borders</p>
                  {
                    country.borders.map((border, index) => {
                      return (
                        <p className="info__tag" key={index}>{border}</p>
                      )
                    })
                  }
                </div>
              )
            }
            <div className="detail__info--item">
              <p className="info__title">Current population</p>
              <p className="info__tag">{country.population.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default CountryDetail;