import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function WeatherHistoryChart({ weatherData }) {

    const data = weatherData.slice(-7).map(({ time, avgWindSpeed, windDirection }) => ({
        time: `${time.slice(0, 2)}:${time.slice(2, 4)}:${time.slice(4, 6)}`,
        speed: avgWindSpeed,
        direction: windDirection
    }));

    return (
        <ResponsiveContainer width="100%" height={300} style={{ marginTop: "15px" }}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                {/* X-akseli ajalle */}
                <XAxis dataKey="time" />

                {/* Ensimmäinen Y-akseli tuulen nopeudelle (vasemmalla puolella) */}
                <YAxis
                    yAxisId="left"
                    label={{ value: "Wind Speed", angle: -90, position: "insideBottomLeft", offset: 25 }}
                />

                {/* Toinen Y-akseli tuulen suunnalle (oikealla puolella) */}
                <YAxis
                    yAxisId="right"
                    orientation="right"
                    label={{ value: "Wind Direction", angle: -90, position: "insideRight", offset: 10 }}
                    domain={[0, 360]} // Tuulen suunta 0-360 astetta
                />

                <Tooltip />
                <Legend />

                {/* Tuulen nopeuden viiva */}
                <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="speed"
                    stroke="#00b8ff"
                    name="Wind Speed"
                    activeDot={{ r: 8 }}
                />

                {/* Tuulen suunnan viiva */}
                <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="direction"
                    stroke="#f300ff"
                    name="Wind Direction (°)"
                />
            </LineChart>
        </ResponsiveContainer>
    );
}