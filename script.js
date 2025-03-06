const apiKey = '42afdcb41f32ef5ae74f29c086f89a6c'; // Your OpenWeatherMap API key
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const cityName = document.querySelector('.city-name');
const cityTemp = document.querySelector('.city-temp');
const cityIcon = document.querySelector('.city-icon');
const cityDescription = document.querySelector('.city-description');
const error = document.getElementById('error');

searchBtn.addEventListener('click', () => {
    const inputVal = cityInput.value.trim();
    if (inputVal === '') {
        error.textContent = 'Please enter a city name.';
        return;
    }

    fetchWeather(inputVal);
});

function fetchWeather(city) {
    console.log('API Key:', apiKey); // Log the API key for debugging
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    console.log('Request URL:', url); // Log the request URL for debugging

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Weather Data:', data); // Log the weather data for debugging
            const { main, name, sys, weather } = data;
            const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}.png`;
            cityTemp.textContent = `Temperature: ${main.temp}°C`;
            cityIcon.src = icon;
            cityName.textContent = name;
            cityDescription.textContent = `Description: ${weather[0]["description"]}`;
            error.textContent = '';
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            error.textContent = 'Please search for a valid city or check your API key.';
        })};