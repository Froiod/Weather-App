const cityForm = document.querySelector('form')
const card = document.querySelector('.card')
const details = document.querySelector('.details')

const updateUI = (data) => {
  console.log(data)
  const cityDetails = data.cityDetails
  const weather = data.weather

  // update details
  details.innerHTML = `
    <h5 class="text-xl font-semibold">${cityDetails.name}</h5>
    <div class="capitalize text-lg">${weather.weather[0].description}</div>
    <div class="pb-4 text-xl">
      <span>${(weather.main.temp - 273.15).toFixed(2)}</span>
      <span>&deg; C</span>
    </div>
  `
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