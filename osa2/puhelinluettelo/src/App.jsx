import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import numberService from './services/numbers'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    numberService
      .getAll()
        .then(initialNumbers => {
        setPersons(initialNumbers)
      })
  }, [])

  
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleNameGhange = (event) => setNewName(event.target.value)

  const handleFilterChange = (event) => setNewFilter(event.target.value)

  const handleDeleteClick = (id) => {
    const name = persons.find(person => person.id = id).name
    window.confirm(`delete ${name}?`)
    ? numberService
        .deleteNumber(id)
          .then(() => {
            setPersons(persons.filter(person => person.id !== id))
          })
    : null
  }

  const addPerson = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber
    }
    const names = persons.map(person => person.name)

    !names.includes(newName) 
    ? numberService
        .create(person)
          .then(returnedPerson => {
          console.log(returnedPerson)
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          })
    : alert(`${newName} is already added to phonebook`)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameGhange={handleNameGhange} 
        newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={newFilter} handleClick={handleDeleteClick}/>
    </div>
  )

}

export default App