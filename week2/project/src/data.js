import { useState } from "react";

const API_Key = "7471b32bdb071a4265631474c52f1765";
export default function City() {
  const [weather, setWeather] = useState();

  return (
    <div>
      <SearchForm setWeather={setWeather} />

      {weather && (
        <div>
          <h1>
            {weather.name}, {weather.sys.country}
          </h1>

          <div className="props-status">
            <h2>{weather.weather[0].main}</h2>
            <p>{weather.weather[0].description}</p>
            <hr />
            <p>
              Min temp: {weather.main.temp_min}
              <br />
              Max temp: {weather.main.temp_max}
              <br />
              Location: {weather.coord.lat}, {weather.coord.lon}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function SearchForm({ setWeather }) {
  const [name, setName] = useState("");
  const getWeather = () => {
    return fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API_Key}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        setWeather(data);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getWeather();
  };

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <Search setName={setName} />
      <input type="submit" className="btn" value="Get Weather" />
    </form>
  );
}

function Search({ setName }) {
  return (
    <input
      type="text"
      placeholder="Search a city"
      className="search-bar"
      onChange={(e) => setName(e.target.value)}
    />
  );
}
