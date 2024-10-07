import AirportChart from "../charts/AirportChart"

const AirportCard = () => {

    return (
        <article className="airportcard">
            <div className="airportcard-header">
                <h3>Airport</h3>
            </div>
            <div className="airportcard-content">
                <AirportChart />
            </div>
        </article>
    )
}

export default AirportCard