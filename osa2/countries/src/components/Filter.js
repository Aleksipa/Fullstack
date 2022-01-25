import React from 'react'

const Filter = ({ filter, onChange }) => (
    <label>find countries
    <input 
    value={filter} 
    onChange={onChange}
    />
    </label>
)

export default Filter