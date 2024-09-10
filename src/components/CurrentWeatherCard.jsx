import { useEffect, useState } from "react"
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
        rainfallTwentyFourHour: 0
    });
    const [loading, setLoading] = useState(null);

    useEffect(() => {
        const fetchCurrentWeather = async () => {
            setLoading(true);
            const response = await fetch(dbUrl);
            if (!response.ok) throw new Error("Issue fetching weather data!");
            const weatherData = await response.json();
            setCurrentWeather(weatherData[weatherData.length - 1]);
            setLoading(false);
        }

        fetchCurrentWeather();

        const weatherIntervalId = setInterval(() => {
            fetchCurrentWeather();
        }, 30000)

        return () => clearInterval(weatherIntervalId);
    }, [])

    return (
        <section className="weathercard">
            <div className="weathercard-header">
                <h2>Current Weather</h2>
            </div>
            <div className="weathercard-content">
                {
                    loading ?
                        <p>Loading data...</p> :
                        <article className="weathercard-content-info">
                            <p>Weather measured 12.9.2023</p>
                            <p>Temperature: {currentWeather.temperature}°,
                                Humidity: {currentWeather.humidity}%</p>
                            <p>Wind Direction: {currentWeather.windDirection}°</p>
                        </article>
                }
                <METARCard />
            </div>
        </section>
    )
}

export default CurrentWeatherCard