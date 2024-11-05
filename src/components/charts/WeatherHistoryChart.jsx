import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useWeather } from "../../hooks/UseWeather";
import { useEffect, useState, Button } from "react";

export default function WeatherHistoryChart() {
  const [testiData, setTestiData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=60.16952&lon=24.93545&appid=28c945d285c5d449440ecba5744e5767`
        );
        const data = await res.json();
        const newEntry = [
          {
            time: new Date().toLocaleTimeString().slice(0, 5), // tunnit ja minuutit
            speed: data.wind.speed,
            direction: data.wind.deg,
            windGust: data.wind.gust || 0,
          },
        ];
        setTestiData((prevData) => [...prevData, ...newEntry]);
        console.log(transformedData);
      } catch (error) {
        console.log("error fetching testdata" + error);
      }
    };
    getData();
    const intervalId = setInterval(getData, 5000); // hakee 5 sekunnivälei

    return () => clearInterval(intervalId);
  }, []);

  const { weatherData } = useWeather();

  // const data = weatherData.slice(-7).map(({ time, avgWindSpeed, windDirection }) => ({
  //     time: `${time.slice(0, 2)}:${time.slice(2, 4)}:${time.slice(4, 6)}`,
  //     speed: avgWindSpeed,
  //     direction: windDirection,
  //     windGust: windDirection - 50,
  // }));

  return (
    <ResponsiveContainer
      width="100%"
      height={300}
      style={{ marginTop: "15px" }}
    >
      <LineChart data={testiData}>
        <CartesianGrid strokeDasharray="3 3" />
        {/* X-akseli ajalle */}
        <XAxis dataKey="time" />

        {/* Ensimmäinen Y-akseli tuulen nopeudelle (vasemmalla puolella) */}
        <YAxis
          yAxisId="left"
          label={{
            value: "Wind Speed",
            angle: -90,
            position: "insideBottomLeft",
            offset: 25,
          }}
          domain={[0, 20]} // tuulen nopeus mitat
        />

        {/* Toinen Y-akseli tuulen suunnalle (oikealla puolella) */}
        <YAxis
          yAxisId="right"
          orientation="right"
          label={{
            value: "windGust",
            angle: -90,
            position: "insideRight",
            offset: 50,
          }}
          domain={[0, 25]}
        />
        {/* <YAxis
          yAxisId="right"
          orientation="right"
          label={{
            value: "Wind Gusts",
            angle: -90,
            position: "insideRight",
            offset: 50,
          }}
        /> */}

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

        {/* Tuulen suunta */}
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="direction"
          stroke="#f300ff"
          name="Wind Direction (°)"
        />
        {/* Tuulen puuskat */}
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="windGust"
          stroke="green"
          name="Wind Gusts"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
