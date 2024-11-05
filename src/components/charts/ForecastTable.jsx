import DataTable from "react-data-table-component";
import { useForecast } from "../../hooks/useForecast";

// Import weather icons
import clearsky_day from './weatherIcons/clearsky_day.png';
import clearsky_night from './weatherIcons/clearsky_night.png';
import fair_day from './weatherIcons/fair_day.png';
import fair_night from './weatherIcons/fair_night.png';
import partlycloudy_day from './weatherIcons/partlycloudy_day.png';
import partlycloudy_night from './weatherIcons/partlycloudy_night.png';
import cloudy from './weatherIcons/cloudy.png';
import lightrainshowers_day from './weatherIcons/lightrainshowers_day.png';
import lightrainshowers_night from './weatherIcons/lightrainshowers_night.png';
import rainshowers_day from './weatherIcons/rainshowers_day.png';
import rainshowers_night from './weatherIcons/rainshowers_night.png';
import heavyrainshowers_day from './weatherIcons/heavyrainshowers_day.png';
import heavyrainshowers_night from './weatherIcons/heavyrainshowers_night.png';
import fog from './weatherIcons/fog.png';

// Function to get icon based on the weather symbol_code and time of day
const getWeatherIcon = (symbolCode, isDaytime) => {
    // Map the symbol codes from your data to local icon variables
    const iconMap = {
        "clearsky": isDaytime ? clearsky_day : clearsky_night,
        "fair": isDaytime ? fair_day : fair_night,
        "partlycloudy": isDaytime ? partlycloudy_day : partlycloudy_night,
        "cloudy": cloudy,
        "lightrainshowers": isDaytime ? lightrainshowers_day : lightrainshowers_night,
        "rainshowers": isDaytime ? rainshowers_day : rainshowers_night,
        "heavyrainshowers": isDaytime ? heavyrainshowers_day : heavyrainshowers_night,
        "fog": fog,
        // Add more mappings based on your CSV
    };

    return iconMap[symbolCode] || clearsky_day; // Default to a sunny day icon if no match
};

// Helper function to determine if it’s day or night
const isDaytime = (date) => {
    const hour = new Date(date).getHours();
    return hour >= 6 && hour < 18; // Define day as between 6 AM and 6 PM
};


const ForecastTable = () => {
	const { forecastData } = useForecast();

	if (!forecastData || forecastData.length === 0) {
		return <p>There are no records to display</p>;
	}


	const columns = [
		{
			name: "Time",
			selector: (row) => {// Create a Date object
				const date = new Date(row.time);

				// Specify options for Finnish date and hour formatting
				const options = {
					timeZone: "Europe/Helsinki",
					year: "numeric",
					month: "2-digit",
					day: "2-digit",
					hour: "2-digit",
					hour12: false,  // Use 24-hour format
				};

				// Format date in Finnish time and desired format
				const formattedDate = new Intl.DateTimeFormat("fi-FI", options).format(date);
				return formattedDate

				console.log(formattedDate);
			}
		},
		{
			name: "T",
			selector: (row) => row.data.instant.details.air_temperature + "°"
		},
		{
			name: "Hum, Dp",
			selector: (row) => row.data.instant.details.relative_humidity + "%, "
				+ row.data.instant.details.dew_point_temperature + "°"
		},
		{
			name: "Wind",
			selector: (row) => row.data.instant.details.wind_from_direction + "°, "
				+ row.data.instant.details.wind_speed + "m/s"
		},
		{
            name: "Weather",
            cell: (row) => {
                const daytime = isDaytime(row.time);
                return (
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <img 
                            src={getWeatherIcon(row.data.next_1_hours.summary.symbol_code, daytime)} 
                            alt={row.data.next_1_hours.summary.symbol_code} 
                            style={{ width: 24, height: 24, marginRight: 8 }}
                        />
                        <span>{row.data.next_1_hours.summary.symbol_code}</span>
                    </div>
                );
            }
        }
	];


	return (
		<DataTable
			columns={columns}
			data={forecastData}
			title="7-Day Forecast for Helsinki"
			responsive={true}
		/>
	);
};

export default ForecastTable;
