import { useState } from "react";
const API_Key = process.env.REACT_APP_API_KEY;

export default function City({ index, name }) {
  const [weather, setWeather] = useState([]);
  const removeCity = (index) => {
    const newCity = [...weather];
    newCity.splice(index, 1);
    setWeather(newCity);
  };

  return (
    <div>
      <SearchForm setWeather={setWeather} weather={weather} />

      {weather &&
        weather.map((item) => (
          <div className="city">
            <button onClick={() => removeCity(index)}>x</button>
            <h1>
              {item.name}, {item.sys.country}
            </h1>

            <div className="weather-status">
              <h2>{item.weather[0].main}</h2>
              <p>{item.weather[0].description}</p>
              <hr />
              <p>
                Min temp: {item.main.temp_min}
                <br />
                Max temp: {item.main.temp_max}
                <br />
                Location: {item.coord.lat}, {item.coord.lon}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
}

function SearchForm({ setWeather, weather }) {
  const [name, setName] = useState("");
  const getWeather = () => {
    return fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API_Key}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        setWeather([...weather, data]);
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
      <input
        type="submit"
        disabled={name === ""}
        className="btn"
        value="Get Weather"
      />
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
