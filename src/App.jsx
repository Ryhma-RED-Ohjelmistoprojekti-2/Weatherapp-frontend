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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(dbUrl + "/api/weathers");
        if (!response.ok) throw new Error("Issue fetching weather data!");
        const responseData = await response.json();
        setCurrentWeather(responseData[responseData.length - 1]);
        setWeatherData(responseData);
        setLoading(false);
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

  return (
    <>
      <header>
        <h1>Weather App</h1>
      </header>
      <main>
        <CurrentWeatherCard currentWeather={currentWeather} loading={loading} error={error} />
        <HistoryCard weatherData={weatherData} loading={loading} error={error} />
        <ForecastCard />
      </main>
    </>
  )
}

export default App;
