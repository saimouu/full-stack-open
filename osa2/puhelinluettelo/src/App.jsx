import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import numberService from './services/numbers'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
    const name = persons.find(person => person.id === id).name
    window.confirm(`delete ${name}?`)
    ? numberService
        .deleteNumber(id)
          .then(() => {
            setPersons(persons.filter(person => person.id !== id))
            setMessage(`deleted ${name}`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
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

    if (!names.includes(newName)) {
     numberService
        .create(person)
          .then(returnedPerson => {
          console.log(returnedPerson)
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setMessage(`Added ${person.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          })
          .catch(error => {
            console.log(error.response.data)
            setErrorMessage(String(error.response.data.error))
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
    } else {
      if (window.confirm(`${newName}? is already added to phonebook, replace the old number with a new one?`)) {
        updateNumber(persons.find(person => person.name === newName).id, person.number)
        setMessage(`number updated`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      } else {
        null
      }
    }
  }

  const updateNumber = (id, number) => {
    const person = persons.find(p => p.id === id)
    const changedPerson = { ...person, number: number}

    numberService
      .update(id, changedPerson)
        .then(returnedPerson => {
          console.log(returnedPerson)
          setPersons(persons.map(person => person.id !== id ? person : changedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setErrorMessage(`Infromation of ${person.name} has already been removed from the server`)
          setPersons(persons.filter(p => p.id !== id))
        })
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} />
      <ErrorNotification message={errorMessage} />
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