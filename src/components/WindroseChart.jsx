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
        <div style={{ width: "100%", maxWidth: "400px", height: "400px", margin: "2px auto", display: "flex", justifyContent: "center", alignItems: "center", transform: "scale(0.6)" }}>
            <Chart
                chartData={windData.chartData}
                columns={windData.columns}
                responsive
                legendGap={20}
            />
        </div>
    )
}

export default WindroseChart