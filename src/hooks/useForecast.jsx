import { useContext } from "react";
import { ForecastContext } from "../utils/ForecastContext";

export const useForecast = () => {
  return useContext(ForecastContext);
};
