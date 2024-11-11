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
  const [loadingWeather, setLoadingWeather] = useState(null);
  const [weatherError, setWeatherError] = useState(null);

  const testWeatherHistoryData = [
    {
      id: 1,
      temperature: 15,
      humidity: 70,
      barometricPressure: 1015,
      windDirection: 180,
      avgWindSpeed: 5,
      maxWindSpeed: 12,
      rainfallOneHour: 0,
      rainfallTwentyFourHour: 2,
      time: "1200",
      date: "20241110",
    },
    {
      id: 2,
      temperature: 16,
      humidity: 65,
      barometricPressure: 1012,
      windDirection: 190,
      avgWindSpeed: 4,
      maxWindSpeed: 10,
      rainfallOneHour: 0,
      rainfallTwentyFourHour: 3,
      time: "1300",
      date: "20241110",
    },
    {
      id: 3,
      temperature: 20,
      humidity: 60,
      barometricPressure: 1010,
      windDirection: 200,
      avgWindSpeed: 6,
      maxWindSpeed: 15,
      rainfallOneHour: 1,
      rainfallTwentyFourHour: 5,
      time: "1400",
      date: "20241110",
    },
  ];

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setWeatherError(null);
        setLoadingWeather(true);
        const response = await fetch(`${dbUrl}/api/weathers`);
        if (!response.ok) throw new Error("Issue fetching weather data!");
        const responseData = await response.json();
        setCurrentWeather(responseData[responseData.length - 1]);
        setWeatherData(responseData);
      } catch (error) {
        setWeatherError(error.message);
        console.log("Setting test data:", testWeatherHistoryData);
        setCurrentWeather(testWeatherHistoryData[testWeatherHistoryData.length - 1]);
        setWeatherData(testWeatherHistoryData);
      } finally {
        setLoadingWeather(false);
      }
    };

    fetchWeatherData();

    const fetchIntervalId = setInterval(() => {
      fetchWeatherData();
    }, 30000);

    return () => clearInterval(fetchIntervalId);
  }, []);

  const weatherProviderValue = {
    currentWeather,
    weatherData,
    loadingWeather,
    weatherError,
  };

  return (
    <WeatherContext.Provider value={weatherProviderValue}>
      {children}
    </WeatherContext.Provider>
  );
};
