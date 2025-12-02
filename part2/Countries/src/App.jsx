import { useState,useEffect } from 'react'
import searchEngine from "./services/countries"
import CountryList from './components/CountryList'



function App() {
  const [countries, setCountries] = useState(null)
  const [query, setQuery] = useState("")
  const [showDetail, setShowDetail] = useState(false)
  const [country, setCountry] = useState([])

  const handleSearch = event => {
    if (!showDetail){
      setQuery(event.target.value)
    }else{
      setShowDetail(false)
    }
  }

  const detail = (name) => {
    setShowDetail(true)

    searchEngine
    .lookup(name)
    .then(oneCountry =>{
      setCountry(oneCountry)
    })
    .catch(error => console.log(error))
  }


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

  },[showDetail])


  // this prevents undefined error when fetching from empty array during 1st render (before useEffect)
  if (!countries){
    return <div>Loading...</div>
  }

  const filteredCountries = showDetail ? countries.filter(target => target.cca3 === country.cca3) : countries.filter(country => 
          country.name.common.toUpperCase().includes(query.toUpperCase())) 

  return (
    <>
      <p>Find Countries:<input type = "text" onChange={handleSearch}></input></p>
      <CountryList list = {filteredCountries} length = {filteredCountries.length} onClick = {detail}/>
    </>
  )
}

export default App
