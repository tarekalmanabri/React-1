import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_Key } from "./GetCity";
import { useState } from "react";

import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function CityPage() {
  const [chartData, setChartData] = useState();
  const [error, setError] = useState();

  const { cityId } = useParams();

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityId}&appid=${API_Key}&units=metric`
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
        setupChart(data);
      })
      .catch((err) => console.log(err));
  }, [cityId]);

  function setupChart(forecast) {
    setChartData(
      forecast.list.map((item) => {
        return {
          name: item.dt_txt,
          temp: item.main.temp,
        };
      })
    );
  }

  return (
    <div>
      <div>
        <h2>5 Days Forecast</h2>
      </div>
      <h1>{cityId}</h1>
      {chartData && (
        <AreaChart
          width={600}
          height={300}
          data={chartData}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <Area type="monotone" dataKey="temp" stroke="lightskyblue" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </AreaChart>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}

export default CityPage;
