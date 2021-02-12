export default function Cities({ weather, setWeather }) {
  const removeCity = (itemIndex) => {
    setWeather(
      weather.filter((item, index) => {
        return index !== itemIndex;
      })
    );
  };

  return (
    <div>
      {weather.map((item, index) => (
        <div className="city" key={"city" + index}>
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
