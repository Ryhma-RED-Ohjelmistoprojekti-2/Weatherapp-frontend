import "./App.css";
import "./css/cards.css"
import CurrentWeatherCard from "./components/main-cards/CurrentWeatherCard";
import HistoryCard from "./components/main-cards/HistoryCard";
import ForecastCard from "./components/main-cards/ForecastCard";
import { WeatherProvider } from "./utils/WeatherContext";

function App() {
  
  //Title or name of the airport. It is saved as environment variable in .env file.
  const title = import.meta.env.VITE_TITLE;

  return (
    <WeatherProvider>
      <header>
        <h1 className="titleResponsive" alt="Title of weatherapp">
          {title}
        </h1>
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
