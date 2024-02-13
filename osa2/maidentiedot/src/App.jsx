import { useEffect, useState } from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import weatherService from "./services/weather"

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [weather, setWeather] = useState(null)

  const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleChange = (event) => {
    event.preventDefault()
    setSearch(event.target.value)
    handleWeather()
  }

  const handleWeather = () => {
    const temp = countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
    if (temp.length === 1) {
      weatherService
        .getWeather(temp[0])
          .then(
            response => {
              setWeather(response)
              console.log(response)
          })
    } 
  }

  const handleClick = (countryName) => setSearch(countryName)

  return (
  <div>
    <div>find countries<input value={search} onChange={handleChange}/></div>
    <Countries countriesToShow={countriesToShow} handleClick={handleClick} weather={weather}/>
  </div>
  )
}

export default App