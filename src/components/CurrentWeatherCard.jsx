import { useEffect, useState } from "react";
import { dbUrl } from "../constants/constants";
import METARCard from "./METARCard";

const CurrentWeatherCard = () => {
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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCurrentWeather = async () => {
            try {
                const response = await fetch(dbUrl + "/api/weathers");
                if (!response.ok) throw new Error("Issue fetching weather data!");
                const weatherData = await response.json();
                setCurrentWeather(weatherData[weatherData.length - 1]);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        }

        fetchCurrentWeather();

        const weatherIntervalId = setInterval(() => {
            fetchCurrentWeather();
        }, 30000);

        return () => clearInterval(weatherIntervalId);
    }, []);

    return (
        <section className="weathercard">
            <div className="weathercard-header">
                <h2>Current Weather</h2>
            </div>
            <div className="weathercard-content">
                {
                    loading ? (
                        <p>Loading data...</p>
                    ) : error ? (
                        <p style={{ color: 'red' }}>Error: {error}</p>
                    ) : (
                        <article className="weathercard-content-info">
                            <p>Weather measured {currentWeather.time.slice(0, 2)}.{currentWeather.time.slice(2, 4)} {currentWeather.date.slice(6, currentWeather.date.length)}.{currentWeather.date.slice(5, 6)}</p>
                            <p>Temperature: {currentWeather.temperature}°,
                                Humidity: {currentWeather.humidity}%</p>
                            <p>Wind Direction: {currentWeather.windDirection}°</p>
                        </article>
                    )
                }
                <METARCard />
            </div>
        </section>
    );
}

export default CurrentWeatherCard;
