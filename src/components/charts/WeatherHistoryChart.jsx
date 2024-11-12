import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useWeather } from "../../hooks/useWeather";

export default function WeatherHistoryChart() {
  const { weatherData } = useWeather();

  //tämä on on vain testausta varten, käytä oikeasti weatherData -muuttujaa
  const testWeatherHistoryData = [
    {
      id: 1,
      temperature: 15,
      humidity: 70,
      barometricPressure: 1015,
      windDirection: 180,
      avgWindSpeed: 5,
      maxWindSpeed: 12,
      rainfallOneHour: 0,
      rainfallTwentyFourHour: 2,
      time: "1200",
      date: "20241110",
    },
    {
      id: 2,
      temperature: 16,
      humidity: 65,
      barometricPressure: 1012,
      windDirection: 190,
      avgWindSpeed: 4,
      maxWindSpeed: 10,
      rainfallOneHour: 0,
      rainfallTwentyFourHour: 3,
      time: "1300",
      date: "20241110",
    },
    {
      id: 3,
      temperature: 20,
      humidity: 60,
      barometricPressure: 1010,
      windDirection: 200,
      avgWindSpeed: 6,
      maxWindSpeed: 15,
      rainfallOneHour: 1,
      rainfallTwentyFourHour: 5,
      time: "1400",
      date: "20241110",
    },
  ];

  const data = testWeatherHistoryData.slice(-7).map(({ time, avgWindSpeed, windDirection }) => ({
    time: `${time.slice(0, 2)}:${time.slice(2, 4)}:${time.slice(4, 6)}`,
    speed: avgWindSpeed,
    direction: windDirection,
    windGust: windDirection - 50, //ei ole windGustia erikseen niin jotain näkyviin väliaikaisesti
  }));

  return (
    <ResponsiveContainer
      width="100%"
      height={300}
      style={{ marginTop: "15px" }}
    >

      <LineChart data={data}>
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
            value: "Wind Direction",
            angle: -90,
            position: "insideRight",
            offset: 50,
          }}
          domain={[0, 360]}
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
