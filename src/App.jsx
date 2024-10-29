import "./App.css";
import "./css/cards.css"
import CurrentWeatherCard from "./components/main-cards/CurrentWeatherCard";
import HistoryCard from "./components/main-cards/HistoryCard";
import ForecastCard from "./components/main-cards/ForecastCard";
import { WeatherProvider } from "./utils/WeatherContext";

function App() {

  return (
    <WeatherProvider>
      <header>
        <h1>Weather App</h1>
      </header>
      <main>
        <CurrentWeatherCard />
        <HistoryCard />
        <ForecastCard />
      </main>
    </WeatherProvider>
  )
}

export default App;
