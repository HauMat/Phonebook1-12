import { useState, useEffect } from 'react'
import Persons from './components/Persons.jsx'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import crud from './services/crud.jsx'

const App = () => { 
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    crud
      .getPersons()
      .then(Response => {
        setPersons(Response.data)
      })
  })

  const addPerson = (e) => {
    e.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(person => person.name === newName && person.number !== newNumber)){
      if(window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)){
        const existingPerson = persons.find(person => person.name === newName)
        const updatedPerson = {
          name: existingPerson.name,
          number: newNumber
        }
        crud
          .update(existingPerson.id, updatedPerson)
          .then(Response => {setPersons(persons.map(p => p.id !== existingPerson.id ? p : response.data))})
      }else{
        console.log("No data was changed.")
      }
      
    }else if (persons.some(person => person.name === newName)){
      window.alert(`${newName} is already added to the phonebook`)
    }else{
      crud
        .create(personObject)
        .then(Response => {
          setPersons(persons.concat(Response.data))
        })
    }
  }
  
  const deletePerson = (id, user) => {
    if (window.confirm(`Delete ${user}?`)){
      crud
        .remove(id)
    }else{
      console.log("Delete canceled")
    }
    
    
  }

  const toShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  const nameHandler = (e) => {
    setNewName(e.target.value)
  }
  const numberHandler = (e) => {
    setNewNumber(e.target.value)
  }

  const filterHandler = (e) => {
    setNewFilter(e.target.value) 
    setShowAll(false)
  }


  return (
    <div>
      <h2>Phonebook</h2>
        <Filter filter={newFilter} Handler={filterHandler} />

      <h2>add a new</h2>
        <PersonForm nameHandler={nameHandler} numberHandler={numberHandler} submit={addPerson} />

      <h2>Numbers</h2>
          <Persons persons={toShow} deleting={deletePerson}/>
    </div>
  )
}

export default App