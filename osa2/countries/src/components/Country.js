import React from 'react'

const Country = ({ country, handleClick }) => (
    <div>
        {country.name.common}
        <button onClick={() => handleClick(country.name.common)}>
            show
        </button>
    </div>
)

export default Country
