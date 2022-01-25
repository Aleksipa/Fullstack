import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {


  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [weatherData, setWeatherData] = useState([]);

  // Get country data from API
  useEffect(() => {
    if (filter !== '') {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        const countries = response.data
        setCountries(countries)
      })
  }}, [filter])

  // Get weather data from API
  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY
    if (filteredCountries.length === 1) {
      const capitalName = filteredCountries.map(country => country.capital)

      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${capitalName}&appid=${api_key}&units=metric`)
        .then(response => {
          const weatherData = response.data
          setWeatherData(weatherData)
        })
    }
  }, [filteredCountries])

const handleFilter = (event) => {
  setFilter(event.target.value)
  const filtered = countries.filter(country => country.name.common.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()))
  setFilteredCountries(filtered)
}

const handleClick = countryName => {
  setFilteredCountries(countries.filter(country => country.name.common.toLocaleLowerCase().includes(countryName.toLocaleLowerCase())))
};


return (
  <div className="Countries">
    <Filter filter={filter} onChange={handleFilter} />
    <Countries filteredCountries={filteredCountries} handleClick={handleClick} weatherData={weatherData}/>
  </div>
)
}

export default App;


