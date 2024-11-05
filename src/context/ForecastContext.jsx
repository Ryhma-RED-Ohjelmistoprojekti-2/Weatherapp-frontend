import { createContext, useEffect, useState } from "react";

export const ForecastContext = createContext();

export const ForecastProvider = ({ children }) => {
  const [forecastData, setForecastData] = useState([]);
  const [loadingForecast, setLoadingForecast] = useState(null);
  const [forecastError, setForecastError] = useState(null);

  useEffect(() => {
    const fetchForecastData = async () => {
      const locationLatitude = import.meta.env.VITE_LOCATION_LATITUDE;
      const locationLongitude = import.meta.env.VITE_LOCATION_LONGITUDE;

      setLoadingForecast(true);

      try {
        const response = await fetch(`https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=${locationLatitude}&lon=${locationLongitude}`);
        if (!response.ok) throw new Error("Could not fetch forecast data");
        const data = await response.json();

        //get forecasts for every other hour from the data
        const formattedData = [];
        
        for (let i = 0; i <= 28; i += 2) {
          formattedData.push(data.properties.timeseries[i]);
        }

        setForecastData(formattedData);
      } catch (error) {
        setForecastError(error.message);
      } finally {
        setLoadingForecast(false);
      }
    };
    
    fetchForecastData();
  }, []);

  const providerValue = {
    forecastData,
    loadingForecast,
    forecastError,
  };

  return (
    <ForecastContext.Provider value={providerValue}>
      {children}
    </ForecastContext.Provider>
  );
};
