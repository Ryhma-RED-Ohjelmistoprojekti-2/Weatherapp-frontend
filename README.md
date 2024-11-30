# WeatherApp frontend

## 1. Members of the team:

Erkki Tiili
- E-mail: erkki.tiili@myy.haaga-helia.fi
- Github account: https://github.com/Textiili

Ilari Koikkalainen
- E-mail:
- Github account:

Oskari Aho
- E-mail:
- Github account:

Kaj Jansson
- E-mail: kaj.jansson@myy.haaga-helia.fi
- Github account: https://github.com/KajFromHH

Johannes Haapanen
- E-mail:
- Github account:

Joel Borenius
- E-mail:
- Github account:

Rasmus Haapalainen
- E-mail:
- Github account:

## 2. Introduction

This is a frontend for displaying weather measurements and data built using React and Javascript.

Project deployment url: https://ryhma-red-ohjelmistoprojekti-2.github.io/Weatherapp-frontend/

![Functional_weatherapp_site](https://github.com/user-attachments/assets/b3d5492c-5591-4c59-bd48-8b12e73065bc)

Picture 01: Picture 01: The visual UI of weatherapp. The screenshot was taken on Saturday, 30 November 2024, via Mozilla Firefox browser.

## 3. Third party components and libraries

Third party components and libraries used in this project:

React Data Table Component

- https://www.npmjs.com/package/react-data-table-component
- Used in this project to display weather forecast data.

React Konva Library
- https://konvajs.org/ 
- Used in this project to draw airport runways as well as windbag and arrow showing current wind direction.

Recharts Library
- https://recharts.org/en-US/ 
- Used in this project to display wind direction and speed history data.

Windrose Chart Component
- https://www.npmjs.com/package/@eunchurn/react-windrose
- Used in this project to display wind direction and speed data.

Public APIs currently in use:

Norwegian Meteorological Institute "Tafmetar 1.0" api to get metars for 3 airports.

- https://api.met.no/weatherapi/tafmetar/1.0/documentation

- Airport metars:

  EFHK: Helsinki-Vantaa Airport (Finland), 
  EFTU: Turku Airport (Finland), 
  EFTP: Tampere-Pirkkala Airport (Finland)

Norwegian Meteorological Institute "Locationforecast 2.0" api to get hourly forecasts for a specified place.

- https://api.met.no/weatherapi/locationforecast/2.0/documentation

## 4. Descriptions of each components (Javascripts & Enviroment variables)

<ins>**Charts**</ins>

AirportChart.jsx

- Draws a visual representation of given airport runways and their angles.
- Draws visual arrow and windbag showing wind direction.

ForecastTable.jsx:

- Table for displaying forecast for a chosen location.

WeatherHistoryChart.jsx

- LineChart showing history for wind direction, speed and wind gusts.

WindroseChart.jsx

- Windrose Chart for showing wind direction history.

<ins>**Main Cards**</ins>:

CurrentWeatherCard.jsx

- Card component showing latest weather measurement information. Also works as the layout housing AirportCard.jsx and METARCard.jsx card components.

ForecastCard.jsx

- Card component that provides the layout for ForecastTable.jsx component.

HistoryCard.jsx

- Card component that provides the layout for WeatherHistoryChart.jsx and WindroseChart.jsx components.

<ins>**Sub Cards**</ins>:

AirportCard.jsx

- Card component that provides the layout for AirportChart.jsx component.

METARCard.jsx

- Card component displaying latest METARS.

<ins>**Environment Variables**</ins>:

VITE_ANGLES

- Sets the runway angle(s) based on which AirportChart.jsx draws the visual representation of the runway(s) for an airport.
- Example format: 04/22,12/30

VITE_TITLE

- Sets the header text for the application.

VITE_LOCATION_LATITUDE

- Sets the latitude of the location for the weather forecast in ForecastTable.jsx.

VITE_LOCATION_LONGITUDE

- Sets the longitude of the location for the weather forecast in ForecastTable.jsx.

## 5. Additional info about frontend
For more additional info about frontend can be read via following links:

a) https://github.com/Ryhma-RED-Ohjelmistoprojekti-2/Weatherapp-documents/blob/d51a03c526b987cb1740cf9b24a8509a2c512024/Frontend-Weatherapp-Components.md

b) https://github.com/Ryhma-RED-Ohjelmistoprojekti-2/Weatherapp-documents/blob/d51a03c526b987cb1740cf9b24a8509a2c512024/Manual-for-frontend.md
