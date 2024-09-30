import { useState, useEffect } from "react"
import { dbUrl } from "../constants/constants";

const AirportCard = () => {

    const [airportData, setAirportData] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAirportData = async () => {
            try {
                setLoading(true);
                const response = await fetch(dbUrl + "/api/airport");
                if (!response.ok) throw new Error("Issue fetching airport data!");
                const airportData = await response.text();
                const handledData = airportData.split(",");
                setAirportData(handledData);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        }

        fetchAirportData();
    }, [])

    return (
        <article className="airportcard">
            <div className="airportcard-header">
                <h3>Airport Data</h3>
            </div>
            <div className="airportcard-content">
                {
                    loading ? (
                        <p>Loading airport data...</p>
                    ) : error ? (
                        <p style={{ color: 'red' }}>Error: {error}</p>
                    ) : (
                        <>
                            <p>{airportData[0]}</p>
                            <p>{airportData[1]}</p>
                        </>
                    )
                }
            </div>
        </article>
    )
}

export default AirportCard