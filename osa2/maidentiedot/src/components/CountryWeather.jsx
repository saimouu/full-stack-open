
const CountryWeather = ({ country, weather }) => {
  if (weather === null) {
    return (<div></div>)
  } else {
    console.log(weather.weather[0].icon)
    return (
      <div>
        <h2>Weather in {country.capital}</h2>
        <p>temperature {weather.main.temp} Celsius</p>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
        <p>wind {weather.wind.speed} m/s</p>
      </div>
    )
  }
}

export default CountryWeather