import axios from "axios"

const PersonForm = ({newName, setNewName, newNumber, setNewNumber, persons, setPersons}) => {
    const addName = (event) => {
        event.preventDefault()
        const names = persons.map(person => person.name)
        if (names.includes(newName)) {
          alert(newName + ' is in the list already')
          return
        }

        const personObject = {
          name: newName,
          number: newNumber
        }
        axios.post('http://localhost:3001/persons', personObject)
        .then(response => {
          console.log(response)
          setPersons([...persons, response.data])
          setNewNumber('')
          setNewName('')
        })

      }

    return (
        <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={(event) => setNewName(event.target.value)}/>
        </div>
        <div>
        phone number: <input value={newNumber} onChange={(event) => setNewNumber(event.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm