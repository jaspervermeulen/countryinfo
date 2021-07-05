import React from 'react';
import CountryInfoBlock from './CountryInfoBlock';
import Chart from 'react-apexcharts';

const CountryDetail = ({ country, pop }) => {
  const categories = [];
  const data = [];

  pop.forEach((item) => {
    if (item.year > 2000) {
      categories.push(item.year);
      data.push(item.value);
    }
  });

  const series = [
    {
      name: 'Desktops',
      data: data,
    },
  ];

  const options = {
    chart: {
      height: 350,
      type: 'line',
      toolbar: {
        show: false,
      },
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: categories,
    },
    yaxis: {
      show: false,
    },
  };

  if (country.name === undefined) {
    return (
      <div className="error__wrapper">
        <p className="error__text">No Results</p>
      </div>
    );
  } else {
    return (
      <>
        <div className="detail">
          <div className="detail-w">
            <img
              className="detail__img"
              src={country.flag}
              alt={country.name}
            />
            <div className="detail__wrapper">
              <p className="detail__wrapper--title">{country.name}</p>
              <div className="detail__wrapper--info">
                <p className="detail__wrapper--info--item">{country.capital}</p>
                <p className="detail__wrapper--info--item">{country.region}</p>
              </div>
            </div>
          </div>
          <div className="detail__info">
            <CountryInfoBlock
              title="Alternative Spellings"
              data={country.altSpellings}
            />
            <CountryInfoBlock title="Borders" data={country.borders} />
            <div className="detail__info--item">
              <p className="info__title">Current population</p>
              <p className="info__tag">{country.population.toLocaleString()}</p>
            </div>
          </div>
          <div className="detail__pop">
            <p className="detail__pop--title">Population Graph</p>
            <Chart className="detail__pop--graph" options={options} series={series} type="line" height={500} />
          </div>
        </div>
      </>
    );
  }
};

export default CountryDetail;
