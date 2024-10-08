import AirportChart from "../charts/AirportChart"

const AirportCard = ({ currentWeather }) => {

    return (
        <article className="airportcard">
            <div className="airportcard-header">
                <h3>Airport</h3>
            </div>
            <div className="airportcard-content">
                <AirportChart currentWeather={currentWeather} />
            </div>
        </article>
    )
}

export default AirportCard