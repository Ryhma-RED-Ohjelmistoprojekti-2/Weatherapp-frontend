import ForecastTable from "../charts/ForecastTable"

const ForecastCard = () => {

    return (
        <section className="weathercard">
            <div className="weathercard-header">
                <h2>Forecast</h2>
            </div>
            <div className="weathercard-content">
                <ForecastTable />
            </div>
        </section>
    )
}

export default ForecastCard