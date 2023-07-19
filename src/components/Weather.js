import React, { useState } from 'react';

function Weather() {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);

  //HANDLE LOCATION CLICK
  function handleLocationClick() {
    // setIsWeatherButtonClicked(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
      console.log(navigator.geolocation.getCurrentPosition)
    } else {
      console.log("Geolocation not supported");
    }
  }

 // success function
  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(latitude, " ", longitude);
    setLocation({ latitude, longitude });
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

    //get the user location
    var userLocation=document.getElementById("userLocation").value;
    // Make API call to WeatherApi
    if (userLocation === '') userLocation='Bucharest'
    fetch(`http://api.weatherapi.com/v1/current.json?key=8630ff89e58549dba2d82630230707&q=${userLocation}&aqi=no`)
      .then(response => response.json())
      .then(data => {
        setWeather(data);
        console.log(data);
      })
      .catch(error => console.log(error));
  }

  // error function
  function error() {
    console.log("Unable to retrieve your location");
  }

  return (
    <div>
 <input type="text" id="userLocation"></input>

{!location ? <button className="button-1" onClick={handleLocationClick}>Get Weather</button> : null}

{location && !weather ? <p>Loading weather data...</p> : null}
{weather ? (
  <div>
    <p>Location: {weather.location.name}</p>
    <p>Temperature: {weather.current.temp_c} °C</p>
    <p>Humidity: {weather.current.humidity}</p>
    <p>Wind speed: {weather.current.wind_kph} kph (kilometers per hour)</p>
    <p>Precipitation: {weather.current.precip_mm} mm (millimetres)</p>
    {/* <p>Weather: {weather.weather[0].description}</p> */}
  </div>
) : null}
     </div>
  )
}

export default Weather;