import React, { useState } from 'react';

function Forecast() {
  const [location, setLocation] = useState(null);
  const [forecastData, setForecastData] = useState(null);

  // same as handleLocationClick, but the successForecast function is different. error function is the same
  function handleForecastClick() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successForecast, error);
      console.log(navigator.geolocation.getCurrentPosition)
    } else {
      console.log("Geolocation not supported");
    }
  }

  function successForecast(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(latitude, " ", longitude);
    setLocation({ latitude, longitude });
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

    //get the user location
    var userLocation=document.getElementById("userForecast").value;
    if (userLocation === '') userLocation='Bucharest'
    // Make API call to WeatherApi forecast
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=8630ff89e58549dba2d82630230707&q=${userLocation}&days=1&aqi=no&alerts=no`)
      .then(response => response.json())
      .then(data => {
        setForecastData(data);
        console.log(data);
      })
      .catch(error => console.log(error));
  }

  function error() {
    console.log("Unable to retrieve your location");
  }

  return (
    <div><input type="text" id="userForecast"></input>
    {!location ? <button className="button-2" onClick={handleForecastClick}>Get Forecast</button> : null}
    {location && !forecastData ? <p>Loading forecast data...</p> : null}
    {forecastData ? (
      <div>
        
          <p>Forecast for {forecastData.location.name}: {forecastData.forecast.forecastday[0].hour.map((hour, index) => <p> At { hour.time } temperature(celsius) is {hour.temp_c}
          </p>)}</p>
         
      </div>
    ) : null} </div>
  )

}

export default Forecast