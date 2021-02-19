import React, { useState, useEffect } from "react";
import "./App.css";

/*
Background changes when using celsius if above 16 degrees 
Browser icon has been changed

Would have liked to:
-7 day forecast in a table
-Background change accounts for change in metric used, rather than: if(x > 16){change to warm}
-Changing metric re-renders current location with selected metric
-Transition between backgrounds
-Use an array for 7 day forecast, include upcoming day by name
-Cleaner code across the board
*/

function WeatherApp() {
  const apiKey = "b252bfa0f7c9c3e8c8956c69c167ff3c";
  const apiBase = "https://api.openweathermap.org/data/2.5/weather?";
  const weeklyApiBase = "https://api.openweathermap.org/data/2.5/onecall?";

  const [temperature, setTemperature] = useState(null);
  const [inputLocation, setInputLocation] = useState(null);
  const [newLocationValue, setNewLocationValue] = useState(null);
  const [feelsLike, setFeelsLike] = useState(null);
  const [WeatherMain, setWeatherMain] = useState("");
  const [locationLat, setLocationLat] = useState(null);
  const [locationLon, setLocationLon] = useState(null);
  const [chosenTempUnit, setChosenTempUnit] = useState(null);
  const [tempTextOutput, setTempTextOutput] = useState(null);
  const [icon, setIcon] = useState(null);

  /* Temperature Units cannot be changed without searching for a different city first.
  If the city is spelled incorrectly and the temperature units are changed then after 
  submitting only the letter changes (240 K would become 240°C)*/
  // Wasn't able to use an array.
  //week icons
  const [weekIcon1, setWeekIcon1] = useState(null);
  const [weekIcon2, setWeekIcon2] = useState(null);
  const [weekIcon3, setWeekIcon3] = useState(null);
  const [weekIcon4, setWeekIcon4] = useState(null);
  const [weekIcon5, setWeekIcon5] = useState(null);
  const [weekIcon6, setWeekIcon6] = useState(null);
  // week weather
  const [weatherWeekDay1, setWeatherWeekDay1] = useState(null);
  const [weatherWeekDay2, setWeatherWeekDay2] = useState(null);
  const [weatherWeekDay3, setWeatherWeekDay3] = useState(null);
  const [weatherWeekDay4, setWeatherWeekDay4] = useState(null);
  const [weatherWeekDay5, setWeatherWeekDay5] = useState(null);
  const [weatherWeekDay6, setWeatherWeekDay6] = useState(null);
  // week temp
  const [weekTempDay1, setWeekDayTemp1] = useState(null);
  const [weekTempDay2, setWeekDayTemp2] = useState(null);
  const [weekTempDay3, setWeekDayTemp3] = useState(null);
  const [weekTempDay4, setWeekDayTemp4] = useState(null);
  const [weekTempDay5, setWeekDayTemp5] = useState(null);
  const [weekTempDay6, setWeekDayTemp6] = useState(null);

  const celsius = "°C";
  const fahrenheit = "°F";
  const kelvin = "K";

  let tempText = tempTextOutput;
  let tempUnit = chosenTempUnit;

  const getWeather = async (location) => {
    try {
      const response = await fetch(
        `${apiBase}q=${location}&appid=${apiKey}&units=${tempUnit}`
      );
      const data = await response.json();

      setTemperature(data.main.temp);
      setFeelsLike(data.main.feels_like);
      setWeatherMain(data.weather[0].description);
      setIcon(data.weather[0].icon);

      setLocationLat(data.coord.lat);
      setLocationLon(data.coord.lon);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (inputLocation) {
      getWeather(inputLocation);
      updateDisplayedTempUnit(true);
    }
  }, [inputLocation]);

  useEffect(() => {
    {
      getWeatherWeekly(locationLat, locationLon);
    }
  }, [locationLon]);

  const updateDisplayedTempUnit = async (updateDisplayedTempUnitNow) => {
    if (updateDisplayedTempUnitNow == true) {
      if (chosenTempUnit == "metric") {
        setTempTextOutput(celsius);
      } else if (chosenTempUnit == "imperial") {
        setTempTextOutput(fahrenheit);
      } else {
        setTempTextOutput(kelvin); // When showing degrees in Kelvin there doesn't seem to be any "°" before the "K".
      }
      updateDisplayedTempUnitNow = false;
    } else {
      updateDisplayedTempUnitNow = false;
    }
  };

  const getWeatherWeekly = async (lat, lon) => {
    try {
      const weeklyResponse = await fetch(
        `${weeklyApiBase}lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=${tempUnit}&appid=${apiKey}`
      );
      const weekData = await weeklyResponse.json();
      setWeatherWeekDay1(weekData.daily[1].weather[0].description);
      setWeatherWeekDay2(weekData.daily[2].weather[0].description);
      setWeatherWeekDay3(weekData.daily[3].weather[0].description);
      setWeatherWeekDay4(weekData.daily[4].weather[0].description);
      setWeatherWeekDay5(weekData.daily[5].weather[0].description);
      setWeatherWeekDay6(weekData.daily[6].weather[0].description);
      setWeekIcon1(weekData.daily[1].weather[0].icon);
      setWeekIcon2(weekData.daily[2].weather[0].icon);
      setWeekIcon3(weekData.daily[3].weather[0].icon);
      setWeekIcon4(weekData.daily[4].weather[0].icon);
      setWeekIcon5(weekData.daily[5].weather[0].icon);
      setWeekIcon6(weekData.daily[6].weather[0].icon);
      setWeekDayTemp1(weekData.daily[1].temp.day);
      setWeekDayTemp2(weekData.daily[2].temp.day);
      setWeekDayTemp3(weekData.daily[3].temp.day);
      setWeekDayTemp4(weekData.daily[4].temp.day);
      setWeekDayTemp5(weekData.daily[5].temp.day);
      setWeekDayTemp6(weekData.daily[6].temp.day);
    } catch (error) {
      console.error(error);
    }
  };

  const inputLocationChange = (enterKeyPress) => {
    setNewLocationValue(enterKeyPress.target.value);
  };

  const buttonLocationChange = (enterKeyPress) => {
    enterKeyPress.preventDefault();
    setInputLocation(enterKeyPress.target.value);
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month}, ${year}`;
  };

  function NullInputLocation() {
    if (inputLocation == null) {
      return <h2 className="select-location">Please select a location</h2>;
    } else {
      return (
        <h1 className="data">
          {inputLocation.charAt(0).toUpperCase() + inputLocation.slice(1)}
          {": "}
          {Math.round(temperature)}
          {tempText}
          <div>
            <img
              className="current-icon"
              src={`http://openweathermap.org/img/w/${icon}.png`}
            />{" "}
          </div>
          <p className="weather-main">
            {WeatherMain.charAt(0).toUpperCase() + WeatherMain.slice(1)}
          </p>
          <p className="feels-like">
            Feels like {Math.round(feelsLike)}
            {tempText}
          </p>

          <p className="day-2">
            Day 2: {Math.round(weekTempDay1)}
            {tempText}
            <div className="day-2-data">
              <img src={`http://openweathermap.org/img/w/${weekIcon1}.png`} />{" "}
              <p> {weatherWeekDay1} </p>
            </div>
          </p>

          <p className="day-3">
            Day 3: {Math.round(weekTempDay2)}
            {tempText}
            <div className="day-3-data">
              <img src={`http://openweathermap.org/img/w/${weekIcon2}.png`} />{" "}
              <p> {weatherWeekDay2} </p>
            </div>
          </p>

          <p className="day-4">
            Day 4: {Math.round(weekTempDay3)}
            {tempText}
            <div className="day-4-data">
              <img src={`http://openweathermap.org/img/w/${weekIcon3}.png`} />{" "}
              <p>{weatherWeekDay3} </p>
            </div>
          </p>

          <p className="day-5">
            Day 5: {Math.round(weekTempDay4)}
            {tempText}
            <div className="day-5-data">
              <img src={`http://openweathermap.org/img/w/${weekIcon4}.png`} />{" "}
              <p>{weatherWeekDay4} </p>
            </div>
          </p>

          <p className="day-6">
            Day 6: {Math.round(weekTempDay5)}
            {tempText}
            <div className="day-6-data">
              <img src={`http://openweathermap.org/img/w/${weekIcon5}.png`} />{" "}
              <p>{weatherWeekDay5}</p>
            </div>
          </p>

          <p className="day-7">
            Day 7: {Math.round(weekTempDay6)}
            {tempText}
            <div className="day-7-data">
              <img src={`http://openweathermap.org/img/w/${weekIcon6}.png`} />{" "}
              <p>{weatherWeekDay6}</p>
            </div>
          </p>
        </h1>
      );
      /* I used "inputLocation.charAt(0).toUpperCase() + inputLocation.slice(1)" to 
        capitalise the first letter of the location that the user enters. I also used 
        the "Math.round()"" method to get rid of the numbers after the decimal point*/
    }
  }
  /* It took me some time but I managed to make it ask for a location when rendering for the first time.
  Since I tried to make the location input from the user start with an upper case letter ("london" changes to "London") 
  before the user got the chance to give an input I got an error that a null can't have an upper case letter 
  so I made it so that it only changes the first letter to upper case after the user inputs the location and 
  before the user inputs the location he is asked to select a one. I also figured that this is the best way if
  we want to add more conditions in the future */

  const setChosenTempUnitChange = (click) => {
    setChosenTempUnit(click.target.value);
  };

  return (
    <div
      className={
        typeof temperature != "undefined"
          ? temperature > 16
            ? "app"
            : "app-cold"
          : "app"
      }
    >
      <main>
        <header className="app-header">
          <h1>{dateBuilder(new Date())} </h1>
          <NullInputLocation />{" "}
          {/*outputs one of the two options on line 44 or line 46*/}
        </header>

        <form>
          <div className="search-box">
            <div className="search-title">Find your city: </div>
            <input
              className="search-input"
              placeholder=" Search"
              onChange={inputLocationChange}
            />
            <button
              className="search-button"
              value={newLocationValue}
              onClick={buttonLocationChange}
              type="submit"
            >
              Submit{" "}
              {/*This is the search bar, it works when you press "submit" or when you press enter on the keyboard*/}
            </button>
          </div>
        </form>
        <div className="metrics">
          <button
            value="metric"
            onClick={setChosenTempUnitChange}
            type="submit"
          >
            Celsius
          </button>
          <button
            value="imperial"
            onClick={setChosenTempUnitChange}
            type="submit"
          >
            Fahrenheit
          </button>
          <button
            value="standard"
            onClick={setChosenTempUnitChange}
            type="submit"
          >
            Kelvin
          </button>
        </div>
      </main>
    </div>
  );
}

export default WeatherApp;
