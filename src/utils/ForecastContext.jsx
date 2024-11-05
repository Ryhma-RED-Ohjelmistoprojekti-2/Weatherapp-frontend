import { createContext, useEffect } from "react";
import React from "react";

export const ForecastContext = createContext();

export const ForecastProvider = ({ children }) => {
  const [forecastData, setForecastData] = React.useState([]);
  const [loading, setLoading] = React.useState(null);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    const fetchForecastData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=60.192059&lon=24.945831"
        );
        if (!response.ok) throw new Error("Could not fetch forecast data");

        const data = await response.json();

        let formattedData = [];

        for (let i = 0; i < 28; i += 2) {
          formattedData.push(data.properties.timeseries[i]);
        }

        setForecastData(formattedData);
      } catch (error) {
        setError("Forecast fetch error: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchForecastData();
  }, []);

  const providerValue = {
    forecastData,
    loading,
    error,
  };

  return (
    <ForecastContext.Provider value={providerValue}>
      {children}
    </ForecastContext.Provider>
  );
};
