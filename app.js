import React from "react";
import Weather from "./Weather";  // Ensure this import is correct (case-sensitive!)

function App() {
  return (
    <div className="App">
      <h1>Weather App</h1>
      <Weather />  {/* Use the Weather component */}
    </div>
  );
}

export default App;
