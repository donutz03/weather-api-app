import React, { useState } from 'react';



function CurrentLocation() {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState(null);

  //HANDLE LOCATION CLICK
  function handleLocationClick() {
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
    setLocation({ latitude, longitude });
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

    //get the user location
    // var userLocation=document.getElementById("userLocation").value;
    // Make API call to WeatherApi
    fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=827818a91fed4ae89c50bc464e049a56`)
      .then(response => response.json())
      .then(data => {
        setData(data);
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
 {/* <input type="text" id="userLocation"></input> */}

{!location ? <button onClick={handleLocationClick}>Get Location</button> : null}

{location && !data ? <p>Loading...</p> : null}
{data ? (
  <div>
    <p>Let me guess, your city is: <span className="rainbow-text-loop">{data.features[0].properties.city}</span></p>
   
  </div>
) : null}
     </div>
  )
}

export default CurrentLocation