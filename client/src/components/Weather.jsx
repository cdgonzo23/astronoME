import { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
// import { useQuery } from '@apollo/client';
// import { QUERY_USER } from '../utils/queries'
import Auth from '../utils/auth';
const apiKey = "79026700d6d1fb2b065b0cdee07661c3";
let cityName = "Atlanta";
function Weather() {
  getLocation();
  // const [cityName, setCityName ] = useState("")
  const [lat, setLat] = useState(null)
  const [lon, setLon] = useState(null)
  // const [userLocation, setUserLocation] = useState("")
  const [temperature, setTemp] = useState("")
  const [windSpeed, setWind] = useState("")
  const [humidity, setHumidity] = useState("")
  const [weatherDescription, setWeatherDesc] = useState("")
  const [weatherIcon, setWeatherIcon] = useState("")

  function getLocation () {
    try {
      const token = localStorage.getItem("id_token")
      // console.log(token)
      const decodedToken = jwt_decode(token)
      const userID = decodedToken.data._id; /* In case we need to use */
      const userLocation = decodedToken.data.location;
      // console.log("location: ", userLocation)
      // console.log("userLocation: ", userLocation)
      // console.log("ID: ", decodedToken)
      // setUserLocation(location)
      cityName = userLocation
    } catch (err) {
      console.log(err)
    }
  }
  

  let geoWeatherURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=" + apiKey;
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(geoWeatherURL);
      result.json().then((locationData) => {
        // console.log("locationData", locationData);
        setLat(locationData[0].lat)
        setLon(locationData[0].lon)

      }, [lat, lon]);
    };
    fetchData();
  })

  let weatherURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + '&units=imperial';
  useEffect(() => {
    const fetchDatas = async () => {
      const result = await fetch(weatherURL);
      result.json().then((weatherData) => {
        // console.log("weatherData: ", weatherData);
        setTemp(weatherData.main.temp + "°F")
        setWind(weatherData.wind.speed + "mph")
        setHumidity(weatherData.main.humidity + "%")
        setWeatherDesc(weatherData.weather[0].main)
      });
    };
    fetchDatas();
  }, [temperature, humidity, weatherDescription, weatherIcon, weatherURL, windSpeed]);


  return (
    <>
    {/* Add a condition to this. If weatherDescription === Clear, then display --- Conditions are good great for stargazing! */}
      <h4 className="text-2xl tracking-wide ">Current Conditions</h4>
      <hr className="my-4" />
      <div className="list-none leading-7">
        {Auth.loggedIn() ?
        (
          <>
          <li>Good night for stargazing!</li>
          <li>Temp: {temperature}</li>
          <li>Humidity: {humidity}</li>
          <li>Wind: {windSpeed}</li>
          <li>{weatherDescription}</li>
          </>
        ): (
          <li>Login to view your local weather conditions for stargazing!</li>
        )}
      </div>
    </>
  )
}

export default Weather;
