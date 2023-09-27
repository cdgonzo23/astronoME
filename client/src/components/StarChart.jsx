import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import Auth from "../utils/auth";
const applicationSecret =
    "7209f89a36417463671a7ac04ef16a2514562d46beb019ee74ea14e78d8500efc24d93ad0bfdca8fdcb2ace3000fae02878732eaaf40ec7d40d87fe50d2b2918c0709c3bc885a0a7612677059d477e0f5210b30fd3ff2576375e100817a8f1b9bfd1352f7133ce4d0c637cddc61c82e2";
const applicationId = "40e37f7c-2341-4925-b657-9e9396ea3c2a";
let cityName = "";
const apiKey = "79026700d6d1fb2b065b0cdee07661c3";
const authString = btoa(`${applicationId}:${applicationSecret}`);
function StarChart() {
    // Sets variables for state use
    const [latitude, setLatitude] = useState("")
    const [longitude, setLongitude] = useState("")
    const [starChart, setStarChart] = useState("")
    const [moonPhase, setMoonPhase] = useState("")
    // Instantly call the function. Obtains cityName
    getLocation();
    function getLocation() {
        try {
            const token = localStorage.getItem("id_token")
            const decodedToken = jwt_decode(token)
            const userID = decodedToken.data._id; /* In case we need to use */
            const userLocation = decodedToken.data.location;
            cityName = userLocation
        } catch (err) {
            console.log(err)
        }
    }
    //   Obtains latitude and longitude values
    let geoWeatherURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=" + apiKey;
    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(geoWeatherURL);
            result.json().then((locationData) => {
                // console.log("locationData", locationData);
                setLatitude(locationData[0].lat)
                setLongitude(locationData[0].lon)

            }, [latitude, longitude]);
        };
        fetchData();
    })
    // Chesney do this
    async function getBodies() {
        const response = await fetch('https://api.astronomyapi.com/api/v2/bodies', {
            method: 'GET',
            headers: {
                Authorization: `Basic ${authString}`,
            },
        });
        const data = await response.json();
        console.log(data.data.bodies);
    }
    getBodies();

    //   getStarChart body test object
    const bodyTest = {
        "style": "navy",
        "observer": {
            "latitude": latitude,
            "longitude": longitude,
            "date": "2019-12-20"
        },
        "view": {
            "type": "area",
            "parameters": {
                "position": {
                    "equatorial": {
                        "rightAscension": 14.83,
                        "declination": -15.23
                    }
                },
                "zoom": 5 //optional
            }
        },
    };
    // Obtains the StarChart with setStarChart state
    async function getStarChart() {
        const response = await fetch('https://api.astronomyapi.com/api/v2/studio/star-chart', {
            method: 'POST',
            headers: {
                Authorization: `Basic ${authString}`,
            },
            body: JSON.stringify(bodyTest),
        });
        const data = await response.json();
        console.log(data.data.imageUrl);
        setStarChart(data.data.imageUrl)
    }

    getStarChart();

    //   getMoonPhase test body object
    const moonPhaseTest = {
        "format": "png",
        "style": {
            "moonStyle": "default",
            "backgroundStyle": "stars",
            "backgroundColor": "red",
            "headingColor": "white",
            "textColor": "red"
        },
        "observer": {
            "latitude": 6.56774,
            "longitude": 79.88956,
            "date": "2020-11-01"
        },
        "view": {
            "type": "portrait-simple",
            "orientation": "south-up"
        }
    };
    // Obtains the MoonPhase with getMoonPhase state
    async function getMoonPhase() {
        const response = await fetch('https://api.astronomyapi.com/api/v2/studio/moon-phase', {
            method: 'POST',
            headers: {
                Authorization: `Basic ${authString}`,
            },
            body: JSON.stringify(moonPhaseTest),
        });
        const data = await response.json();
        console.log(data.data.imageUrl);
        setMoonPhase(data.data.imageUrl);
    }

    getMoonPhase();
    return (
        <>
            <h4 className="text-2xl tracking-wide">Local Star Charts</h4>
            <hr className="my-4" />
            <div className="list-none leading-7">
                <li>info about stars</li>
                <img src={starChart} alt="starChart" />
                <img src={moonPhase} alt="moonPhase" />
            </div>
        </>
    );
}

export default StarChart;
