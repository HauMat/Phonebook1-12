import { useState, useEffect } from 'react'
import Persons from './components/Persons.jsx'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import crud from './services/crud.jsx'
import Notification from './components/Notification.jsx'

const App = () => { 
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [message, setMessage] = useState(null)
  const [color, setColor] = useState('green')
  const timeout = 3000 

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
          .then(response => {setPersons(persons.map(p => p.id !== existingPerson.id ? p : response.data))})
          .catch(error => {
            setColor('red')
            setMessage(`Information of ${newName} has already been removed from server`)
          })
        setMessage(`Updated ${newName}`)
        setTimeout(() => {
        setColor('green')
        setMessage(null)
        }, timeout)
      }else{
        setMessage("No changes were made");    
        setTimeout(() => {
         setMessage(null)
        }, timeout)
      }

      
    }else if (persons.some(person => person.name === newName)){
       setMessage(`${newName} is already added to the phonebook`)
        setTimeout(() => {
        setMessage(null)
        }, timeout)
      
    }else{
      crud
        .create(personObject)
        .then(Response => {
          setPersons(persons.concat(Response.data))
        })
        setMessage(`Added ${newName}`)
        setTimeout(() => {
        setMessage(null)
        }, timeout)
    }
  }
  
  const deletePerson = (id, user) => {
    if (window.confirm(`Delete ${user}?`)){
      crud
        .remove(id)
        .then(() => {setMessage(`Deleted ${user}`)})
        .catch(error => {
          setColor('red')
          setMessage(`Information of ${user} has already been removed from server`)})
        setTimeout(() => {
        setMessage(null)
        setColor('green')
        }, timeout)
        
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
      <Notification message={message} color={color} />
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