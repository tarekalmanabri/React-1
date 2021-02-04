import { useState } from "react";
import { Link } from "react-router-dom";

export const API_Key = process.env.REACT_APP_API_KEY;

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
        weather.map((item, key) => (
          <div className="city">
            <button onClick={() => removeCity(index)}>x</button>
            <Link to={`/${item.name}`} key={`city_${key}`}>
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
            </Link>
          </div>
        ))}
    </div>
  );
}

function SearchForm({ setWeather, weather }) {
  const [name, setName] = useState("");
  const [error, setError] = useState();
  const getWeather = () => {
    return fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API_Key}&units=metric`
    )
      .then((res) => {
        if (!res.ok) {
          setError(res.statusText);
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        setError(null);
        setWeather([...weather, data]);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getWeather();
    setName("");
  };

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <Search setName={setName} name={name} />
      <input
        type="submit"
        disabled={name === ""}
        className="btn"
        value="Get Weather"
      />
      {error && <p>{error}</p>}
    </form>
  );
}

function Search({ name, setName }) {
  return (
    <input
      type="text"
      placeholder="Search a city"
      className="search-bar"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  );
}
