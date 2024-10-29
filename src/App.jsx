import { useEffect, useState } from "react";
import { dbUrl } from "./constants/constants";
import "./App.css";
import "./css/cards.css"
import CurrentWeatherCard from "./components/main-cards/CurrentWeatherCard";
import HistoryCard from "./components/main-cards/HistoryCard";
import ForecastCard from "./components/main-cards/ForecastCard";

function App() {

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
    date: ""
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
        const response = await fetch(dbUrl + "/api/weathers");
        if (!response.ok) throw new Error("Issue fetching weather data!");
        const responseData = await response.json();
        setCurrentWeather(responseData[responseData.length - 1]);
        setWeatherData(responseData);
        setTimeout(() => setLoading(false), 3000);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }

    fetchWeatherData();

    const fetchIntervalId = setInterval(() => {
      fetchWeatherData();
    }, 30000);

    return () => clearInterval(fetchIntervalId);
  }, []);


  // Fetch 7-day forecast for Helsinki from Open-Meteo
  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=60.1695&longitude=24.9354&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode&timezone=Europe/Helsinki"
        );
        if (!response.ok) throw new Error("Could not fetch forecast data");

        const forecastData = await response.json();

        if (!forecastData.daily || forecastData.daily.time.length === 0) {
          console.error("No daily forecast data available");
          return;
        }

        const dailyForecast = forecastData.daily.time.map((date, index) => ({
          applicable_date: date,
          max_temp: forecastData.daily.temperature_2m_max[index],
          min_temp: forecastData.daily.temperature_2m_min[index],
          precipitation: forecastData.daily.precipitation_sum[index],
          weather_code: forecastData.daily.weathercode[index]
        }));

        setForecastData(dailyForecast);
      } catch (error) {
        setError("Forecast fetch error: " + error.message);
      }
    };

    fetchForecastData();
  }, []);


  return (
    <>
      <header>
        <h1>
          <img src="src/Hyvinkaan_lentokentan_saa_title.png" class="titleResponsive" alt="Title of weatherapp" />
        </h1>
      </header>
      <main>
        <CurrentWeatherCard currentWeather={currentWeather} loading={loading} error={error} />
        <HistoryCard weatherData={weatherData} loading={loading} error={error} />
        <ForecastCard forecastData={forecastData} loading={loading} error={error} />
      </main>
    </>
  )
}

export default App;
