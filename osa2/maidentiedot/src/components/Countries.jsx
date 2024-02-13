//<button onClick={handleClick(country.name.common)}>show</button>
import Country from "./Country"
import CountryWeather from "./CountryWeather"

const Countries = ({ countriesToShow, handleClick, weather }) => {
  if (countriesToShow.length < 10 && countriesToShow.length > 1) {
    return (
    countriesToShow.map(country => 
      <div key={country.name.common}>
        {country.name.common}
        <button onClick={() => handleClick(country.name.common)}>show</button>
      </div>)
    )
  } else if (countriesToShow.length === 1) {
    return (
      <div>
        <Country country={countriesToShow[0]} weather={weather} />
        <CountryWeather country={countriesToShow[0]} weather={weather} />
      </div>
    )
  } else {
    return (
      <div>Too many matches, specify another filter</div>
    )
  } 
} 

export default Countries