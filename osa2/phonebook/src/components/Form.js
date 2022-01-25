import React from 'react'

const Form = ({ onSubmit, newName, newNumber, handleNameChange, handleNumberChange }) => (
    <form onSubmit={onSubmit}>
        <div>
            <label>name
                <input
                    type="text"
                    value={newName}
                    onChange={handleNameChange}
                />
            </label>
        </div>
        <div>
            <label>number
                <input
                    type="text"
                    value={newNumber}
                    onChange={handleNumberChange}
                />
            </label>
        </div>
        <button type="submit">add</button>
    </form>

)

export default Form



