import AirportCard from "../sub-cards/AirportCard";
import METARCard from "../sub-cards/METARCard";
import { useWeather } from "../../hooks/useWeather";
import METARProvider from "../../context/METARContext";

const CurrentWeatherCard = () => {

    const { currentWeather, loadingWeather, weatherError } = useWeather();

    const measurementTimeString = `${currentWeather.time.slice(0, 2)}${currentWeather.time.slice(2, 5)}`;
    const measurementDateString = `${currentWeather.date.slice(8, 10)}.${currentWeather.date.slice(5, 7)}`;


    return (
        <section className="weathercard">
            <div className="weathercard-header">
                <h2>Current Weather</h2>
            </div>
            <div className="weathercard-content">
                {
                    loadingWeather ? (
                        <p>Loading data...</p>
                    ) : weatherError ? (
                        <p style={{ color: 'black' }}>Error: {weatherError}</p>
                    ) : (
                        <article className="weathercard-content-info">
                            <p>
                                <span style={{ fontWeight: "bold", fontSize: 18 }}>Weather measured:</span> {measurementTimeString} {measurementDateString}
                            </p>
                            <p>
                                <span style={{ fontWeight: "bold", fontSize: 18 }}>Temperature:</span> {currentWeather.temperature}°C,
                                <span style={{ fontWeight: "bold", fontSize: 18 }}> Humidity:</span> {currentWeather.humidity}%
                            </p>
                            <p>
                                <span style={{ fontWeight: "bold", fontSize: 18 }}>Wind Direction:</span> {currentWeather.windDirection}°
                            </p>
                        </article>
                    )
                }

                <AirportCard />

                <METARProvider>
                    <METARCard />
                </METARProvider>

                <article className="hyperlinkStyle">
                    <a href="https://www.ilmailusaa.fi/weather-flightpath.html?location#select-area=1#textproduct-querysettings-radius=100#observation-mode=metar#id=radar#FMILang=en">
                        Airport Weather (fmi)
                    </a>
                </article>
            </div>
        </section>
    );
}

export default CurrentWeatherCard;
