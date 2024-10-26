import ForecastTable from "../charts/ForecastTable"

const ForecastCard = ({ forecastData }) => {

    return (
        <section className="weathercard">
            <div className="weathercard-header">
                <h2>Forecast</h2>
            </div>
            <div className="weathercard-content">
                <ForecastTable forecastData={forecastData}/>
            </div>
        </section>
    )
}

export default ForecastCard