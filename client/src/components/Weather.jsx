import { useState, useEffect } from 'react';
// import { useQuery } from '@apollo/client';
// import { QUERY_USER } from '../utils/queries'

const apiKey = "79026700d6d1fb2b065b0cdee07661c3";
const cityName = "Atlanta";
function Weather() {

  // const [cityName, setCityName ] = useState("")
  const [lat, setLat] = useState(null)
  const [lon, setLon] = useState(null)
  const [temperature, setTemp] = useState("")
  const [windSpeed, setWind] = useState("")
  const [humidity, setHumidity] = useState("")
  const [weatherDescription, setWeatherDesc] = useState("")
  const [weatherIcon, setWeatherIcon] = useState("")

    let geoWeatherURL ="http://api.openweathermap.org/geo/1.0/direct?q="+ cityName +"&limit=1&appid=" + apiKey;
    useEffect(() => {
      const fetchData = async () => {
        const result = await fetch(geoWeatherURL);
        result.json().then((locationData) => {
          console.log("locationData", locationData);
          setLat(locationData[0].lat)
          setLon(locationData[0].lon)
          
        }, [lat, lon]);
      };
      fetchData();
    })
    let weatherURL ="https://api.openweathermap.org/data/2.5/weather?lat="+ lat +"&lon="+ lon +"&appid=" + apiKey+ '&units=imperial';
    useEffect(() => {
      const fetchData = async () => {
        const result = await fetch(weatherURL);
        result.json().then((weatherData) => {
          console.log("weatherData: ", weatherData);
          setTemp(weatherData.main.temp + "°F")
          setWind(weatherData.wind.speed + "mph")
          setHumidity(weatherData.main.humidity + "%")
          setWeatherDesc(weatherData.weather[0].main)
          setWeatherIcon(`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`);
          console.log("temperature: ", temperature);
          console.log("windSpeed: ", windSpeed);
          console.log("windSpeed: ", humidity);
          console.log("weatherDescription: ", weatherDescription);
          console.log("weatherIcon: ", weatherIcon);
        });
      };
      fetchData();
    }, [temperature, humidity, weatherDescription, weatherIcon, weatherURL, windSpeed]);

    
  return (
    <div>
      <div>Current Weather Forecast</div>
      <img src={weatherIcon} alt="icon" />
      <div>{weatherDescription}</div>
      <div>{temperature}</div>
      <div>{humidity}</div>
      <div>{windSpeed}</div>
    </div>
  )
}

export default Weather;
