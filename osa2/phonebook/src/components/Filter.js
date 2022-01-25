import React from 'react'

const Filter = ({ filter, onChange }) => (
    <label>filter shown with
        <input
            value={filter}
            onChange={onChange}
        />
    </label>
)

export default Filter