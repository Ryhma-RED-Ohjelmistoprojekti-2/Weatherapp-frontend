import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "s24RyhmaREDfrontend", //HUOM! Editoi/poista kun testaat buildia lokaalisti jos projekti on eri niminen.
  plugins: [react()],          //Ilman tätä saattaa syntyä path-ongelmia buildissa.
});
