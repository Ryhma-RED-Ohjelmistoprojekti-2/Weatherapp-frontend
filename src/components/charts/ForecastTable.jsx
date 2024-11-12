import DataTable from "react-data-table-component";
import { useForecast } from "../../hooks/useForecast";

const ForecastTable = () => {
	const { forecastData } = useForecast();

	const formatDate = (row) => {
		const date = new Date(row.time);

		const englishWeekDayOption = { weekday: 'long' };
		const dayName = date.toLocaleDateString('en-US', englishWeekDayOption);

		const dateOptions = {
			timeZone: "Europe/Helsinki",
			month: "2-digit",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
			hour12: false,
		};

		const formattedDate = new Intl.DateTimeFormat("fi-FI", dateOptions).format(date);
		return `${dayName.slice(0, 3)} ${formattedDate.replace("klo", " ")}`;

		
	};

	const columns = [
		{
			name: "Time",
			selector: (row) => formatDate(row),
			width: "135px",
		},
		{
			name: "Temp",
			selector: (row) => row.data.instant.details.air_temperature + "°C",
			width: "65px"
		},
		{
			name: "Wind",
			selector: (row) => row.data.instant.details.wind_from_direction + "°, " +
				row.data.instant.details.wind_speed + " m/s"
		}
	];

	return (
		<DataTable
			columns={columns}
			data={forecastData}
			responsive={true}
		/>
	);

};

export default ForecastTable;
