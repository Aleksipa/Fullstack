import React from 'react'
import Country from './Country'
import CountryDetailed from './CountryDetailed'
import Weather from './Weather'

const Countries = ({ filteredCountries, handleClick, weatherData }) => {
    if (filteredCountries.length < 10 && filteredCountries.length > 1) {
        return (
            <div>
                {filteredCountries.map(country =>
                    <Country key={country.name.common} country={country} handleClick={handleClick}/>
                )}

            </div>
        )
    } else if (filteredCountries.length === 1) {
        return (
            <div>
                {filteredCountries.map(country =>
                    <CountryDetailed key={country.name.common} country={country} weatherData={weatherData}/>
                )}
                    <Weather weatherData={weatherData}/>
                    
            </div>
        )
    } else {
        return (
            <div>
                <p>Too many matches, specify another filter</p>
            </div>
        )
    }
}

export default Countries


