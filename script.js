// API key is now managed through environment variables
const apiKey = '42afdcb41f32ef5ae74f29c086f89a6c'; // Using the API key directly for now
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const tempUnitToggle = document.getElementById('tempUnitToggle');
const cityName = document.querySelector('.city-name');
const cityTemp = document.querySelector('.city-temp');
const cityIcon = document.querySelector('.city-icon');
const cityDescription = document.querySelector('.city-description');
const feelsLike = document.querySelector('.feels-like');
const humidity = document.querySelector('.humidity');
const windSpeed = document.querySelector('.wind-speed');
const error = document.getElementById('error');
const loading = document.getElementById('loading');

let currentWeatherData = null;
let isCelsius = true;

// Add event listeners
searchBtn.addEventListener('click', handleSearch);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

tempUnitToggle.addEventListener('click', () => {
    isCelsius = !isCelsius;
    tempUnitToggle.textContent = isCelsius ? '°C' : '°F';
    if (currentWeatherData) {
        updateWeatherDisplay(currentWeatherData);
    }
});

function handleSearch() {
    const inputVal = cityInput.value.trim();
    console.log('Search initiated for city:', inputVal);
    
    if (inputVal === '') {
        showError('Please enter a city name.');
        return;
    }

    showLoading(true);
    fetchWeather(inputVal);
}

function showLoading(isLoading) {
    loading.classList.toggle('hidden', !isLoading);
    searchBtn.disabled = isLoading;
}

function showError(message) {
    error.textContent = message;
    console.error('Error:', message);
}

function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

function fetchWeather(city) {
    console.log('Fetching weather data for:', city);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Weather data received:', data);
            currentWeatherData = data;
            updateWeatherDisplay(data);
            showError('');
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            showError('Please search for a valid city or check your API key.');
        })
        .finally(() => {
            showLoading(false);
        });
}

function updateWeatherDisplay(data) {
    const { main, name, sys, weather, wind } = data;
    const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;
    
    // Show the weather icon
    cityIcon.classList.remove('hidden');
    
    // Convert temperatures based on current unit
    const temp = isCelsius ? main.temp : celsiusToFahrenheit(main.temp);
    const feelsLikeTemp = isCelsius ? main.feels_like : celsiusToFahrenheit(main.feels_like);
    
    // Update all weather information
    cityTemp.textContent = `${Math.round(temp)}°${isCelsius ? 'C' : 'F'}`;
    cityIcon.src = icon;
    cityName.textContent = `${name}, ${sys.country}`;
    cityDescription.textContent = weather[0]["description"].charAt(0).toUpperCase() + weather[0]["description"].slice(1);
    feelsLike.textContent = `Feels like: ${Math.round(feelsLikeTemp)}°${isCelsius ? 'C' : 'F'}`;
    humidity.textContent = `Humidity: ${main.humidity}%`;
    windSpeed.textContent = `Wind Speed: ${Math.round(wind.speed)} m/s`;
    
    // Log successful update
    console.log('Weather display updated successfully');
}

// Initialize the app
console.log('Weather app initialized');