# WeatherApp frontend

Frontend for displaying weather measurements and data built using React and Javascript.

This project is deployed on Github Pages:

https://ryhma-red-ohjelmistoprojekti-2.github.io/s24RyhmaREDfrontend/

Third party components and libraries used in this project:

React Data Table Component

- https://www.npmjs.com/package/react-data-table-component
- Used in this project to display weather forecast data.

React Konva Library
- https://konvajs.org/ 
- Used in this project to draw airport runways and wind direction arrow.

Recharts Library
- https://recharts.org/en-US/ 
- Used in this project to display wind direction and speed history data.

Windrose Chart Component
- https://www.npmjs.com/package/@eunchurn/react-windrose
- Used in this project to display wind direction and speed data.

Public APIs currently in use:

Norwegian Meteorological Institute "Tafmetar 1.0" api to get metars for 3 airports

- https://api.met.no/weatherapi/tafmetar/1.0/documentation

- Airport metars:

  EFHK: Helsinki-Vantaa Airport (Finland), 
  EFTU: Turku Airport (Finland), 
  EFTP: Tampere-Pirkkala Airport (Finland)

Norwegian Meteorological Institute "Locationforecast 2.0" api to get hourly forecasts for a specified place

- https://api.met.no/weatherapi/locationforecast/2.0/documentation

Components:

Charts:

AirportChart.jsx

- Draws a visual representation of given airport runways and their angles.
- Draws visual arrow showing wind direction.

ForecastTable.jsx:

- Table for displaying forecast for a chosen location.

WeatherHistoryChart.jsx

- LineChart showing history for wind direction, speed and wind gusts.

WindroseChart.jsx

- Windrose Chart for showing wind direction history.

Main Charts:

CurrentWeatherCard.jsx

- Card component showing latest weather measurement information. Also works as a layout housing AirportCard.jsx and METARCard.jsx card components.

ForecastCard.jsx

- Card component that provides the layout for ForecastTable.jsx component.

HistoryCard.jsx

- Card component that provides the layout for WeatherhistoryChart.jsx and WindroseChart.jsx components.

Sub Cards:

AirportCard.jsx

- Card component that provides the layout for AirportChart.jsx component.

METARCard.jsx

- Card component displaying latest METARS.