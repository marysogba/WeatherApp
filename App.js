import { useEffect, useState } from "react";

import "./styles.css";

// below is a variable that holds the API key - grab this from https://home.openweathermap.org/api_keys
const API_KEY = "b252bfa0f7c9c3e8c8956c69c167ff3c";
let CITY_NAME = "London";

export default function App() {
  const [temperature, setTemperature] = useState(null);
  const [location, setLocation] = useState(null);

  // a function to get the weather
  const getWeather = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${API_KEY}`
    );
    const data = await response.json();
    console.log(data);
    setTemperature(data.main.temp);
    setLocation(data.name);
  };

  // this runs when the Application first loads
  // for more information, https://reactjs.org/docs/hooks-effect.html
  useEffect(() => {
    getWeather();
  }, []);

  return (
    <div className="App">
      <h1>{temperature}</h1>
      <h2>Start editing to see some magic happen!</h2>
      <h3>{location}</h3>

      <input className="search-input" type="text"></input>
      <button className="search-button" type="submit">
        Search
      </button>
    </div>
  );
}
