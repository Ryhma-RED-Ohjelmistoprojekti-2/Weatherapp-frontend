import ForecastTable from "../charts/ForecastTable"
import { useForecast } from "../../hooks/useForecast"

const ForecastCard = () => {

    const { loadingForecast, forecastError } = useForecast();

    return (
        <section className="weathercard">
            <div className="weathercard-header">
                <h2>Forecast</h2>
            </div>
            <div className="weathercard-content">
                {
                    loadingForecast ? (
                        <p>Loading forecast...</p>
                    ) : forecastError ? (
                        <p style={{ color: 'red' }}>Error: {forecastError}</p>
                    ) : (
                        <ForecastTable />
                    )
                }
            </div>
        </section>
    )
}

export default ForecastCard