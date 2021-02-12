import "./App.css";
import { useState } from "react";
import Cities from "./GetCity";
import SearchForm from "./Search";

function App() {
  const [weather, setWeather] = useState([]);

  return (
    <div className="App">
      <h1 className="title">Weather</h1>
      <SearchForm weather={weather} setWeather={setWeather} />
      <Cities weather={weather} setWeather={setWeather} />
    </div>
  );
}

export default App;
