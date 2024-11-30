import { Chart, calculateWindRose } from "@eunchurn/react-windrose";
import { useWeather } from "../../hooks/useWeather";

const WindroseChart = () => {

    const { weatherData } = useWeather();

    const rawData = {
        direction: weatherData.slice(-10).reverse().map(data => data.windDirection),
        // Wind directions in degrees

        speed: weatherData.slice(-10).reverse().map(data => data.avgWindSpeed)
        // wind speeds in m/s
    };

    const windRoseData = calculateWindRose(rawData);

    const windData = {
        chartData: windRoseData,
        columns: ["angle", "0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "6-7", "7+"],
    };

    return (
        <div style={{ transform: window.innerWidth <= 1500 ? "scale(0.75)" : "scale(0.85)" }}>
            <Chart
                chartData={windData.chartData}
                columns={windData.columns}
                height={450}
                width={450}
            />
        </div>
    )
}

export default WindroseChart