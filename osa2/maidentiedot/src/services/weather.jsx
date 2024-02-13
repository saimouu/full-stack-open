import axios from 'axios'
const apiKey = import.meta.env.VITE_SOME_KEY
const baseUrl = 'https://api.openweathermap.org/data/3.0/onecall?'

const getWeather = ( country ) => {
    const lat = String(country.capitalInfo.latlng[0])
    const lon = String(country.capitalInfo.latlng[1])

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    const request = axios.get(url)
    return request.then(response => response.data)
}

const getIcon = ( weather ) => {
    const iconId = weather.weather.icon
    const request = axios.get(`https://openweathermap.org/img/wn/${iconId}@2x.png`)
    return request.then(response => response.data)
}

export default { getWeather, getIcon }
