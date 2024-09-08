import CurrentWeatherCard from "./CurrentWeatherCard"
import HistoryCard from "./HistoryCard"
import ForecastCard from "./ForecastCard"

const WeatherLayout = () => {
    return (
        <>
            <header>
                <h1>Weather App</h1>
            </header>
            <main className="weather-page">
                <CurrentWeatherCard />
                <HistoryCard />
                <ForecastCard />
            </main>
        </>
    )
}

export default WeatherLayout