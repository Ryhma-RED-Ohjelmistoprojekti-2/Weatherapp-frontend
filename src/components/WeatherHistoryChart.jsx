import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        time: '11:00',
        speed: 4,
        direction: 65,
    },
    {
        time: '11:01',
        speed: 7,
        direction: 125,
    },
    {
        time: '11:02',
        speed: 10,
        direction: 180,
    },
    {
        time: '11:03',
        speed: 8,
        direction: 150,
    },
    {
        time: '11:04',
        speed: 5,
        direction: 225,
    },
    {
        time: '11:05',
        speed: 2,
        direction: 190,
    },
    {
        time: '11:06',
        speed: 3,
        direction: 180,
    },
];

export default function WeatherHistoryChart() {
    return (
        <ResponsiveContainer width="100%" height={300}>
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