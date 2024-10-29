import { useContext } from "react";
import { WeatherContext } from "../utils/WeatherContext";

export const useWeather = () => {
    return useContext(WeatherContext);
};
