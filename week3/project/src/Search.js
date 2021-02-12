import { useState } from "react";
const API_Key = process.env.REACT_APP_API_KEY;

export default function SearchForm({ setWeather, weather }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
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
      {error && <p>{error}</p>}
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
