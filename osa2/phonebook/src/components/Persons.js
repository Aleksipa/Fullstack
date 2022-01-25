import React from 'react'
import Person from './Person'

const Persons = ({ filteredPersons, persons, filter, deletePerson }) => {
    return (
        <div>
            {filter === ""
                ? persons.map(person =>
                    <Person key={person.name} person={person} deletePerson={deletePerson} />
                )
                : filteredPersons.map(person =>
                    <Person key={person.name} person={person} deletePerson={deletePerson} />
                )}
        </div>
    )
}

export default Persons