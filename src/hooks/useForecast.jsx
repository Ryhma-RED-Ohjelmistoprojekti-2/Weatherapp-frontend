import { useContext } from "react";
import { ForecastContext } from "../context/ForecastContext";

export const useForecast = () => {
  return useContext(ForecastContext);
};
