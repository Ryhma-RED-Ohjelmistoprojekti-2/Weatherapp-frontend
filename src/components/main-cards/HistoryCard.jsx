import WeatherHistoryChart from "../charts/WeatherHistoryChart"
import WindroseChart from "../charts/WindroseChart"
import { useWeather } from "../../hooks/useWeather";

const HistoryCard = () => {

    const { loadingWeather, weatherError } = useWeather();

    return (
        <section className="weathercard">
            <div className="weathercard-header">
                <h2>Wind History</h2>
            </div>
            <div className="weathercard-content">
                {
                    loadingWeather ? (
                        <p>Loading data...</p>
                    ) : weatherError ? (
                        <p style={{ color: 'black' }}>Error: {weatherError}</p>
                    ) : (
                        <>
                            <WeatherHistoryChart />
                            <WindroseChart />
                        </>
                    )
                }
            </div>
        </section>
    )
}

export default HistoryCard