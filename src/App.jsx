import "./App.css";
import "./css/weathercard.css"
import CurrentWeatherCard from "./components/CurrentWeatherCard";
import HistoryCard from "./components/HistoryCard";
import ForecastCard from "./components/ForecastCard";

function App() {
  return (
    <>
      <header>
        <h1>Weather App</h1>
      </header>
      <main>
        <CurrentWeatherCard/>
        <HistoryCard/>
        <ForecastCard/>
      </main>
    </>
  )
}

export default App;
