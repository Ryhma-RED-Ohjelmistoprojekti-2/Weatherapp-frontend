import { createContext, useState, useEffect } from "react";
import { dbUrl } from "../constants/constants";

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {

  const [currentWeather, setCurrentWeather] = useState({
    id: 0,
    temperature: 0,
    humidity: 0,
    barometricPressure: 0,
    windDirection: 0,
    avgWindSpeed: 0,
    maxWindSpeed: 0,
    rainfallOneHour: 0,
    rainfallTwentyFourHour: 0,
    time: "",
    date: "",
  });
  const [weatherData, setWeatherData] = useState([]);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setError(null);
        setLoading(true);
        const response = await fetch(`${dbUrl}/api/weathers`);
        if (!response.ok) throw new Error("Issue fetching weather data!");
        const responseData = await response.json();
        setCurrentWeather(responseData[responseData.length - 1]);
        setWeatherData(responseData);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    const fetchForecastData = async () => {
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
      }
    };

    fetchWeatherData();
    fetchForecastData();

    const fetchIntervalId = setInterval(() => {
      fetchWeatherData();
    }, 30000);

    return () => clearInterval(fetchIntervalId);
  }, []);

  const providerValue = {
    currentWeather,
    weatherData,
    forecastData,
    loading,
    error
  }

  return (
    <WeatherContext.Provider value={providerValue}>
      {children}
    </WeatherContext.Provider>
  );
};
