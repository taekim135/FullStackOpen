import { useState,useEffect } from 'react'
import searchEngine from "./services/countries"
import CountryList from './components/CountryList'

function App() {
  const [countries, setCountries] = useState(null)
  const [query, setQuery] = useState("")


  const handleSearch = event => setQuery(event.target.value)


  // get country names when 1st rendering is done
  useEffect(()=>{
    searchEngine
    .getAll()
    .then((country) =>{
      setCountries(country)
    })
    .catch(error => {
      console.log("Error occured during getAll: ",error)
    })

  },[])


  // this prevents undefined error when fetching from empty array during 1st render (before useEffect)
  if (!countries){
    return <div>Loading...</div>
  }

  const filteredCountries = countries.filter(country => 
          country.name.common.toUpperCase().includes(query.toUpperCase())) 

  //console.log(countries)

  return (
    <>
      <p>Find Countries:<input type = "text" onChange={handleSearch}></input></p>
      <CountryList list = {filteredCountries} length = {filteredCountries.length}/>
    </>
  )
}

export default App
