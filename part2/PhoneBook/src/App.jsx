import { useState } from 'react'
import Contacts from './components/Contacts'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import book from './services/persons'
import { useEffect } from 'react'
import Notification from './components/Notification'
// npm run dev

const App = () => {
  const [persons, setPersons] = useState([])
  // form input
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filter, setFilter] = useState('')
  const [filterOn, setFilterOn] = useState(false)
  const [notify, setNotify] = useState("")


  const handleNameChange = event => setNewName(event.target.value)
  
  const handleNumChange = (event) => setNewNum(event.target.value)
  

  const handleFilterChange = (event) =>{
    if (event.target.value == ''){
      setFilterOn(false)
    }else{
      setFilterOn(true)
      setFilter(event.target.value)
    }
  }

  const duplicateFound = () => persons.find((person) => person.name == newName) ? true : false

  // make it case insensitive - all cap comparison
  const filtered = filterOn ? persons.filter((person) => 
          person.name.toUpperCase().includes(filter.toUpperCase())) : persons

  
  const addContact = (event) =>{
    event.preventDefault()

      if (newName === "" || newNum === ""){
        alert("Some fields are empty!")
        return
      }

      if (!duplicateFound()){
        const newPerson = {
          name: newName,
          number: newNum
        }

        //upload the data to json server
        book
        .create(newPerson)
        .then(newContacts =>{
          setPersons(persons.concat(newContacts))
          setNewName("")
          setNewNum("")
          setNotify(`${newName} has been added to phonebook`)
          //reset the notification to blank after 4sec which will give a disappearing effect
          setTimeout(()=>{
            setNotify("")
          }, 3500)
        })

      }else{
        // ask if need to be updated. If not, notify them that the user exists
        if(window.confirm(`"${newName}" is already added to the phonebook. Replace the old number with the new one?`)){

          const oldPersonID = persons.find(person => person.name === newName).id
          book
            .update(oldPersonID, newNum)
            .then(response =>{
              setPersons(persons.map(person => person.id === oldPersonID ? response: person))
              setNewName("")
              setNewNum("")
              setNotify(`${newName}'s number has been updated`)
              //reset the notification to blank after 4sec which will give a disappearing effect
              setTimeout(()=>{
                setNotify("")
              }, 3500)
            })
        }else{
          alert(`${newName} already exists!`)
        }
        
      }
  }

  const deleteContact = (id) =>{
    //console.log("id received: ", id)
    const contactToBeDeleted = persons.find(person => person.id === id)

    if(window.confirm(`Are you sure you want to delete "${contactToBeDeleted.name}"?`)){
      book.remove(id)
      .then(()=>{
        setPersons(persons.filter(person => person.id !== id))
        setNotify(`${contactToBeDeleted.name} has been deleted`)
        setTimeout(()=>{
          setNotify("")
        },3500)
      })
      .catch(() =>{
        setNotify(`${contactToBeDeleted.name} has already been removed from the server`)
        setTimeout(()=>{
          setNotify("")
        },3500)
      })
      
      
    }
  }

  // [] tells to run the use effect once
  // list = data received from server
  // then method -> call back function inside
  // use effect runs after rendering components (page painted)
  // async
  useEffect(() =>{
    book
    .getAll()
    .then(list =>{
      setPersons(list)
    })
  },[]) 

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message = {notify}/>
      <Filter onChange={handleFilterChange}/>
      <h2>Add New</h2>
      <PersonForm 
        onSubmit = {addContact}
        inputName = {newName}
        inputNum = {newNum}
        nameChange={handleNameChange}
        numChange={handleNumChange}
      />
      <h2>Numbers</h2>  
      {/* () not needed when passing down f(x). Else it will run immediately */}
      <Contacts list = {filtered} clickCall = {deleteContact}/>
    </div>
  )
}

export default App