import WeatherHistoryChart from "../charts/WeatherHistoryChart"
import WindroseChart from "../charts/WindroseChart"
import { useWeather } from "../../hooks/UseWeather";

const HistoryCard = () => {

    const { loading, error } = useWeather();

    return (
        <section className="weathercard">
            <div className="weathercard-header">
                <h2>Wind History</h2>
            </div>
            <div className="weathercard-content">
                {
                    loading ? (
                        <p>Loading data...</p>
                    ) : error ? (
                        <p style={{ color: 'black' }}>Error: {error}</p>
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