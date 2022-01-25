import React from 'react'
import '../index.css'

const CountryDetailed = ({ country }) => (
    <div>
        <h2>{country.name.common}</h2>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h3>Languages</h3>
        {Object.values(country.languages).map(language => (
            <li key={language}>{language}</li>
        ))}
        <div className='flag'>
            <img src={country.flags.png} alt="Flag" height={100} width={100} />
        </div>
    </div>
)

export default CountryDetailed