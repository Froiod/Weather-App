const cityForm = document.querySelector('form')
const card = document.querySelector('.card')
const details = document.querySelector('.details')
const time = document.querySelector('img.time')
const iconSrc = document.querySelector('.icon img')


const updateUI = (data) => {
  console.log(data)
  const cityDetails = data.cityDetails
  const weather = data.weather

  // update details
  details.innerHTML = `
    <h5 class="text-xl font-semibold bg-white p-2 inline-block mt-4 rounded-lg">${cityDetails.name}</h5>
    <div class="capitalize text-lg">${weather.weather[0].description}</div>
    <div class="pb-4 text-3xl">
      <span>${(weather.main.temp - 273.15).toFixed(2)}</span>
      <span>&deg; C</span>
    </div>
  `
  // update the night/day
  const icon = weather.weather[0].icon //get icon d/n(day/night)
  let timeSrc = null
  const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`

  if (icon[2] === 'd') {
    timeSrc = './img/day.svg'
  } else {
    timeSrc = './img/night.svg'
  }

  time.setAttribute('src', timeSrc)
  iconSrc.setAttribute('src', iconURL)

}

const cityUpdate = async (city) => {
  const cityDetails = await getCity(city)
  const weather = await getWeather(cityDetails.lat, cityDetails.lon)

  return {
    cityDetails: cityDetails,
    weather: weather
  }
}

// submit event
cityForm.addEventListener('submit', e => {
  e.preventDefault()

  const city = cityForm.city.value.trim()
  cityForm.reset();

  cityUpdate(city)
  .then(data => updateUI(data))
  .catch(err => console.log(err))
})