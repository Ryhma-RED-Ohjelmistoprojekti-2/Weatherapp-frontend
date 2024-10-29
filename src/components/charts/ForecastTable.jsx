import DataTable from 'react-data-table-component';
import { useWeather } from '../../hooks/UseWeather';

// Function to format the date from YYYY-MM-DD to DD-MM-YYYY
const formatDate = (dateString) => {
	const [year, month, day] = dateString.split('-');
	return `${day}-${month}-${year}`;
};

// Function to map weather codes to descriptions
const getWeatherDescription = (weatherCode) => {
	switch (weatherCode) {
		case 0: return "Clear sky";
		case 1: return "Mainly clear";
		case 2: return "Partly cloudy";
		case 3: return "Overcast";
		case 45: return "Fog";
		case 51: return "Drizzle";
		case 53: return "Light rain";
		case 61: return "Rain";
		case 63: return "Heavy rain";
		case 80: return "Showers";
		case 95: return "Thunderstorms";
		case 99: return "Severe thunderstorms";
		default: return "Unknown weather condition";
	}
};

const ForecastTable = () => {

	const { forecastData } = useWeather();

	if (!forecastData || forecastData.length === 0) {
		return <p>There are no records to display</p>;
	}

	const columns = [
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

export default ForecastTable
