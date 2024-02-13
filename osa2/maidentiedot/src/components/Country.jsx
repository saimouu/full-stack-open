
const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital}<br/>
      area {country.area }</p>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map(lan => {
          return (
            <li key={lan}>{lan}</li>
          )
        })}
      </ul>
      <img src={country.flags.png} alt={country.name.common} width="200"/>
    </div>
  )
}

export default Country
