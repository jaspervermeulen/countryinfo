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
  const [currentCountryPop, setCurrentCountryPop] = useState([]);

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

  const handleBtnClick = () => {
    setCurrentCountry(countryInput);

    axios.get('https://countriesnow.space/api/v0.1/countries/population')
      .then(function (response) {
        const result = response.data.data.filter(country => country.country === countryInput.name);
        if (result[0] !== undefined) {
          setCurrentCountryPop(result[0].populationCounts);
        } else {
          setCurrentCountryPop([]);
        }
      })
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
        <button className="sidebar__button" onClick={() => handleBtnClick()}>Go</button>
      </Sidebar>
      <InfoTable country={currentCountry} pop={currentCountryPop} />
    </div>
  );
}

export default App;

