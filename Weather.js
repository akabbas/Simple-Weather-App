import React, { useState } from "react";

const apiKey = "42afdcb41f32ef5ae74f29c086f89a6c"; // Replace with your own API key

function Weather() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);  // Step 1: Add loading state

  const fetchWeather = async () => {
    if (city.trim() === "") {
      setError("Please enter a city name.");
      return;
    }

    setLoading(true);  // Step 2: Set loading to true when fetch starts
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("City not found.");

      const data = await response.json();
      setWeatherData(data);
      setError(""); // Clear any previous errors
    } catch (err) {
      setError("Could not fetch weather data.");
      setWeatherData(null);
    } finally {
      setLoading(false); // Step 3: Set loading to false when fetch is complete
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather} disabled={!city.trim()}>
        Search
      </button>

      {/* Step 4: Conditionally render the loading state */}
      {loading && <p>Loading...</p>} 

      {error && <p className="error">{error}</p>}

      {weatherData && (
        <div className="weather-container">
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>{weatherData.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
            alt="Weather icon"
          />
        </div>
      )}
    </div>
  );
}

export default Weather;
