const key = 'put your API Key here' //API key

// convert City Name into location coordinates
const getCity = async (city) => {

  const base = 'http://api.openweathermap.org/geo/1.0/direct?'
  const query = `q=${city}&limit=5&appid=${key}`

  const response = await fetch(base + query)
  const data = await response.json()
  return data[0]
}

// get weather Conditon
const getWeather = async (lat, lon) => {
  const base = 'https://api.openweathermap.org/data/2.5/weather?'
  const query = `lat=${lat}&lon=${lon}&appid=${key}`

  const response = await fetch(base + query)
  const data = await response.json()
  return data
}