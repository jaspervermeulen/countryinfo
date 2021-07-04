import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
  const [allCountriesNames, setAllCountriesNames] = useState([]);
  const [countryInput, setCountryInput] = useState();
  const [suggestions, setSuggestions] = useState([]);

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
    <>
      <div>
        <input
          type="text"
          onChange={e => onChangeHandler(e.currentTarget.value)}
          value={countryInput}
        />
        {
          suggestions && suggestions.map((suggestion, index) => {
            return (
              <p key={index} onClick={() => onClickHandler(suggestion.name)}>{suggestion.name}</p>
            )
          })
        }
      </div>
      <button>Submit</button>
    </>
  );
}

export default App;
