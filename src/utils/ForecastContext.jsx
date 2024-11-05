import React from "react";
import { createContext } from "react";

export const ForecastContext = createContext();

export const ForecastProvider = ({ children }) => {
  const [forecastData, setForecastData] = React.useState([]);
  const [loading, setLoading] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchForecastData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=60.192059&lon=24.945831"
        );
        if (!response.ok) throw new Error("Could not fetch forecast data");

        const forecastData = await response.json();

        if (!forecastData.daily || forecastData.daily.time.length === 0) {
          console.error("No daily forecast data available");
          return;
        }

        /*         const dailyForecast = forecastData.daily.time.map((date, index) => ({
                applicable_date: date,
                max_temp: forecastData.daily.temperature_2m_max[index],
                min_temp: forecastData.daily.temperature_2m_min[index],
                precipitation: forecastData.daily.precipitation_sum[index],
                weather_code: forecastData.daily.weathercode[index]
              })); */

        setForecastData(forecastData);
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
