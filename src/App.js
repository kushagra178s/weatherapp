import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import "./App.css";
import React, { useState, useEffect } from "react";
function App() {
  const API_KEY = "9efea3107d6960ce539317f7ec43bcd9";
  const [cityName, setCityName] = useState("");
  const [weatherData, setweatherData] = useState({});
  const [images, setImages] = useState();
  const defaultWeatherImage =
    "https://images.ctfassets.net/hrltx12pl8hq/6TIZLa1AKeBel0yVO7ReIn/1fc0e2fd9fcc6d66b3cc733aa2547e11/weather-images.jpg?fit=fill&w=600&h=400";
  const sunnyDayBgImage = `url("https://e1.pxfuel.com/desktop-wallpaper/668/166/desktop-wallpaper-beautiful-sunny-day-best-beautiful-sunny-day-day.jpg")`;
  const fetchImagesByCity = async () => {
    setImages();
    const accessKey = "HFIv-SQ0BbAQyAwEo736XFkSbImsz3wS078AH9tyruo";
    const apiUrl = `https://api.unsplash.com/search/photos?query=${cityName}&client_id=${accessKey}`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setImages(data);
      console.log(data);
      // Process the fetched image data as needed
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getdata = (e) => {
    e.preventDefault();
    const fetchData = async () =>
      await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => setweatherData(data), console.log(weatherData))
        .catch((error) => {
          console.error("Error:", error);
        });
    fetchData();
    fetchImagesByCity(cityName);
  };

  return (
    <div>
      <div>
        <div className="form-data">
          <p style={{ fontSize: "35px", fontWeight: "500" }}>
            Get Weather Data By Entering City Name
          </p>
          <form onSubmit={getdata}>
            <label htmlFor="city-name">City Name : </label>
            <input
              type="text"
              id="city-name"
              value={cityName}
              onChange={(event) => setCityName(event.target.value)}
              required
            />
            <br />
            <br />
            <button className="big-button" type="submit">
              click
            </button>
          </form>
        </div>
        <div className="data-showcase">
          <div className="cityphoto">
            <img
              src={
                !images ? defaultWeatherImage : images?.results[0]?.urls?.small
              }
              width="425px"
              alt="image"
            />
            <p>{images?.results[0]?.alt_description}</p>
          </div>
          <div className="ciytdata">
            <p>
              <p style={{ fontSize: "25px" }}>
                <u>WeatherData</u>
              </p>
              Name :{" "}
              {!weatherData.name
                ? "Enter A Correct City Name"
                : weatherData.name}
            </p>
            <p>Temperature : {weatherData?.main?.temp} °C</p>
            <p>Country : {weatherData?.sys?.country}</p>
            <p>
              [Minimum / Maximum : {weatherData?.main?.temp_min} /{" "}
              {weatherData?.main?.temp_max} °C]
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
