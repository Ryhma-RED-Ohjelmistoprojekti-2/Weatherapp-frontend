import AirportCard from "../sub-cards/AirportCard";
import METARCard from "../sub-cards/METARCard";

const CurrentWeatherCard = ({ currentWeather, loading, error }) => {

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
                <AirportCard currentWeather={currentWeather} />
                <METARCard />
            </div>
        </section>
    );
}

export default CurrentWeatherCard;
