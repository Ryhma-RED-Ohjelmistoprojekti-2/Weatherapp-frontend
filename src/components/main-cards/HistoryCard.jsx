import WeatherHistoryChart from "../charts/WeatherHistoryChart"
import WindroseChart from "../charts/WindroseChart"

const HistoryCard = ({ weatherData, loading, error }) => {
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
                            <WeatherHistoryChart weatherData={weatherData} />
                            <WindroseChart weatherData={weatherData} />
                        </>
                    )
                }
            </div>
        </section>
    )
}

export default HistoryCard