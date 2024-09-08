import { useEffect, useState } from "react"

const CurrentWeatherCard = () => {
    const [temperature, setTemperature] = useState(20);

    useEffect(() => {
       const tempIntervalId = setInterval(() => {
            setTemperature(currTemp => currTemp + 1);
        }, 1000)

        return () => clearInterval(tempIntervalId);
    }, [])

    return (
        <div className="weather-card">
            <p>Current temperature is: {temperature}</p>
        </div>
    )
}

export default CurrentWeatherCard