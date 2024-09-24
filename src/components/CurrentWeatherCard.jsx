import { useEffect, useState } from "react";
import { dbUrl } from "../constants/constants";
import METARCard from "./METARCard";

//windrose
import React from "react";
import { Chart, calculateWindRose } from "@eunchurn/react-windrose";



const rawData = {
    direction: [270, 256, 240, 290, 320], // Wind directions in degrees
    speed: [1.02, 0.85, 1.15, 0.78, 1.22] // wind speeds in m/s
};

const windRoseData = calculateWindRose(rawData);

const windData = {
    chartData: windRoseData,
    columns: ["angle", "0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "6-7", "7+"],
  };




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
            <div style={{ width: "100%", maxWidth: "400px", height: "400px", margin: "2px auto", display: "flex", justifyContent: "center", alignItems: "center", transform: "scale(0.6)" }}>
                <Chart
                    chartData={windData.chartData}
                    columns={windData.columns}
                    responsive
                    legendGap={20}
                />
            </div>
        </section>
    );
}

export default CurrentWeatherCard;
