import WeatherHistoryChart from "./WeatherHistoryChart"
import WindroseChart from "./WindroseChart"

const HistoryCard = ({ weatherData, loading, error }) => {
    return (
        <section className="weathercard">
            <div className="weathercard-header">
                <h2>Wind History</h2>
            </div>
            <WeatherHistoryChart />
            <div className="weathercard-content">
                {
                    loading ? (
                        <p>Loading data...</p>
                    ) : error ? (
                        <p style={{ color: 'red' }}>Error: {error}</p>
                    ) : (
                        <>
                            <WindroseChart weatherData={weatherData} />
                        </>
                    )
                }
            </div>
        </section>
    )
}

export default HistoryCard