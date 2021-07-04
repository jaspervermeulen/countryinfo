import axios from "axios";
import React, { useEffect, useState } from "react";
import CountryDetail from "./Components/CountryDetail";
import './Styles/main.scss';

function App() {
  const [allCountriesNames, setAllCountriesNames] = useState([]);
  const [countryInput, setCountryInput] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const [currentCountry, setCurrentCountry] = useState([]);

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(function (response) {
        response.data.forEach(item => {
          setAllCountriesNames(allCountriesNames => [...allCountriesNames, item]);
        })
      })
  }, [])

  const onClickHandler = country => {
    setCountryInput(country);
    setSuggestions([]);
  }

  const onChangeHandler = inputValue => {
    let matches = [];
    if (inputValue.length > 0) {
      matches = allCountriesNames.filter(country => {
        const regex = new RegExp(`${inputValue}`, "gi");
        return country.name.match(regex);
      })
    }
    setSuggestions(matches);
    setCountryInput(inputValue);
  }

  return (
    <div className="body">
      <div className="sidebar">
        <div className="sidebar__form">
          <input
            className="sidebar__form--input"
            type="text"
            onChange={e => onChangeHandler(e.currentTarget.value)}
            value={countryInput.name}
          />
          <div className="sidebar__form--suggestions">
            {
              suggestions && suggestions.map((suggestion, index) => {
                return (
                  <p className="sidebar__form--suggestions-item" key={index} onClick={() => onClickHandler(suggestion)}>{suggestion.name}</p>
                )
              })
            }
          </div>
        </div>
        <button className="sidebar__button" onClick={() => setCurrentCountry(countryInput)}>Go</button>
      </div>
      <div className="main">
        {
          currentCountry ? (
            <CountryDetail country={currentCountry} />
          ) : (
            <p>No Country Selected.</p>
          )
        }
        
      </div>
    </div>
  );
}

export default App;

