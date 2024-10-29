import AirportCard from "../sub-cards/AirportCard";
import METARCard from "../sub-cards/METARCard";
import { useWeather } from "../../hooks/UseWeather";
import METARProvider from "../../utils/METARContext";

const CurrentWeatherCard = () => {

    const { currentWeather, loading, error } = useWeather();

    const measurementTimeString = `${currentWeather.time.slice(0, 2)}.${currentWeather.time.slice(2, 4)}`;
    const measurementDateString = `${currentWeather.date.slice(6, currentWeather.date.length)}.${currentWeather.date.slice(5, 6)}`;

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
                        <p style={{ color: 'black' }}>Error: {error}</p>
                    ) : (
                        <article className="weathercard-content-info">
                            <p>Weather measured {measurementTimeString} {measurementDateString}</p>
                            <p>
                                Temperature: {currentWeather.temperature}°,
                                Humidity: {currentWeather.humidity}%
                            </p>
                            <p>Wind Direction: {currentWeather.windDirection}°</p>
                        </article>
                    )
                }
                <AirportCard />
                <METARProvider>
                    <METARCard />
                </METARProvider>
            </div>
        </section>
    );
}

export default CurrentWeatherCard;
