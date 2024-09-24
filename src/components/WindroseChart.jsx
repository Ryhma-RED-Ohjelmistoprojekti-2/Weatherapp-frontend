import { Chart, calculateWindRose } from "@eunchurn/react-windrose";

const rawData = {
    direction: [270, 256, 240, 290, 320], // Wind directions in degrees
    speed: [1.02, 0.85, 1.15, 0.78, 1.22] // wind speeds in m/s
};

const windRoseData = calculateWindRose(rawData);

const windData = {
    chartData: windRoseData,
    columns: ["angle", "0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "6-7", "7+"],
};

const WindroseChart = ({ weatherData }) => {
    return (
        <div style={{transform: "scale(0.85)"}}>
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