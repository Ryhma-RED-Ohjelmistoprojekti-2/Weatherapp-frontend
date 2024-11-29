import "./App.css";
import "./css/cards.css";
import CurrentWeatherCard from "./components/main-cards/CurrentWeatherCard";
import HistoryCard from "./components/main-cards/HistoryCard";
import ForecastCard from "./components/main-cards/ForecastCard";
import { WeatherProvider } from "./context/WeatherContext";
import { ForecastProvider } from "./context/ForecastContext";
import React from "react";

function App() {
  //Title or name of the airport. It is saved as environment variable in .env file.
  const title = import.meta.env.VITE_TITLE;

  return (
    <>
      <header>
        <h1 className="titleResponsive" alt="Title of weatherapp">
          {title}
        </h1>
      </header>
      <main>
        <WeatherProvider>
          <CurrentWeatherCard />
          <HistoryCard />
        </WeatherProvider>
        <ForecastProvider>
          <ForecastCard />
        </ForecastProvider>
      </main>
      <footer>
        &copy; {new Date().getFullYear()} Ryhma-RED-Ohjelmistoprojekti-2
        <a
          className="footer-link"
          target="_blank"
          href="https://github.com/Ryhma-RED-Ohjelmistoprojekti-2/Weatherapp-frontend"
        >
          Project Github Repository
        </a>
      </footer>
    </>
  );
}

export default App;
