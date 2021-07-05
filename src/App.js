import axios from "axios";
import React, { useEffect, useState } from "react";
import InfoTable from "./Components/InfoTable/InfoTable";
import Sidebar from "./Components/Sidebar/Sidebar";
import Suggestion from "./Components/Sidebar/Suggestion";
import SuggestionsList from "./Components/Sidebar/SuggestionsList";
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
      <Sidebar>
        <div className="sidebar__form">
          <input
            className="sidebar__form--input"
            type="text"
            onChange={e => onChangeHandler(e.currentTarget.value)}
            value={countryInput.name}
          />
          <SuggestionsList>
            {
              suggestions && suggestions.map((suggestion, index) => {
                return (
                  <Suggestion name={suggestion.name} key={index} onClick={() => onClickHandler(suggestion)} />
                )
              })
            }
          </SuggestionsList>
        </div>
        <button className="sidebar__button" onClick={() => setCurrentCountry(countryInput)}>Go</button>
      </Sidebar>
      <InfoTable country={currentCountry} />
    </div>
  );
}

export default App;

