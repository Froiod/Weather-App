const body = document.querySelector('body')
const cityForm = document.querySelector('form')
const card = document.querySelector('.card')
const details = document.querySelector('.details')
const iconSrc = document.querySelector('.icon')


const updateUI = (data) => {
  console.log(data)
  const cityDetails = data.cityDetails
  const weather = data.weather

  // update details
  details.innerHTML = `
    <h5 class="text-3xl font-semibold mt-4 rounded-lg">${cityDetails.name}</h5>
    <div class="capitalize text-xl">${weather.weather[0].description}</div>
    <div class="pb-4 text-3xl">
      <span>${(weather.main.temp - 273.15).toFixed(2)}</span>
      <span>&deg; C</span>
    </div>
  `
  // update the night/day
  const icon = weather.weather[0].icon //get icon d/n(day/night)
  const iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`

  if (icon[2] === 'd') {
    card.classList.remove('night')
    card.classList.add('day')
    details.classList.remove('white')
    details.classList.add('black')
    body.setAttribute('class', 'body-day')
  } else if(icon[2] === 'n') {
    card.classList.remove('day')
    card.classList.add('night')
    details.classList.remove('black')
    details.classList.add('white')
    body.setAttribute('class', 'body-night')
  }

  iconSrc.setAttribute('src', iconURL)

  // show card
  if (card.classList.contains('hidden')) {
    card.classList.remove('hidden')
  }

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

  // store city in local storage
  localStorage.setItem('city', city)

  hideMobileKeyboardOnReturn()
})

if (localStorage.getItem('city')) {
  cityUpdate(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(err))
}

// hide keyboard in mobile after search is click
const hideMobileKeyboardOnReturn = (element) => {
  element.addEventListener('keyup', (keyboardEvent) => {
      const key = keyboardEvent.code || keyboardEvent.keyCode;
      if (key === 'Enter' || key === 13) {
          element.blur();
      }
  });
};