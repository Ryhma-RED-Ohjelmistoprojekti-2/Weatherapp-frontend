import DataTable from "react-data-table-component";
import { useForecast } from "../../hooks/useForecast";

// Function to format the date from YYYY-MM-DD to DD-MM-YYYY
const formatDate = (dateString) => {
	const [year, month, day] = dateString.split("-");
	return `${day}-${month}-${year}`;
};

// Function to map weather codes to descriptions
const getWeatherDescription = (weatherCode) => {
	switch (weatherCode) {
		case 0:
			return "Clear sky";
		case 1:
			return "Mainly clear";
		case 2:
			return "Partly cloudy";
		case 3:
			return "Overcast";
		case 45:
			return "Fog";
		case 51:
			return "Drizzle";
		case 53:
			return "Light rain";
		case 61:
			return "Rain";
		case 63:
			return "Heavy rain";
		case 80:
			return "Showers";
		case 95:
			return "Thunderstorms";
		case 99:
			return "Severe thunderstorms";
		default:
			return "Unknown weather condition";
	}
};

const ForecastTable = () => {
	const { forecastData } = useForecast();

	if (!forecastData || forecastData.length === 0) {
		return <p>There are no records to display</p>;
	}

	/* 	const columns = [
		  {
			  name: 'Date',
			  selector: row => formatDate(row.applicable_date),
			  sortable: true,
		  },
		  {
			  name: 'Max Temperature (°C)',
			  selector: row => row.max_temp.toFixed(1),
			  sortable: true,
		  },
		  {
			  name: 'Min Temperature (°C)',
			  selector: row => row.min_temp.toFixed(1),
			  sortable: true,
		  },
		  {
			  name: 'Precipitation (mm)',
			  selector: row => row.precipitation.toFixed(1),
			  sortable: true,
		  },
		  {
			  name: 'Weather',
			  selector: row => getWeatherDescription(row.weather_code),
			  sortable: true,
		  },
	  ]; */

	//nää on tässä vaa sen takii placeholderina ettei sovellus kaadu
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
		}
	];

	const data = [
		{
			id: 1,
			title: "Beetlejuice",
			year: "1988",
		},
		{
			id: 2,
			title: "Ghostbusters",
			year: "1984",
		},
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
