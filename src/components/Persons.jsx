const Persons = ({persons, filter}) => {
    const filteredList = (filter === '') ? persons : persons.filter(person => person.name.includes(filter))

    return (
        <div>
            <h2>Numbers</h2>
            <ul>
                {filteredList.map(person=> <li key={person.id}> Name: {person.name} ||| Phone Number: {person.number} </li>)}
            </ul>
        </div>
    )
}

export default Persons