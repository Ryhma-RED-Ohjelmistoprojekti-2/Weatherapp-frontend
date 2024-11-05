import DataTable from "react-data-table-component";
import { useForecast } from "../../hooks/useForecast";

const ForecastTable = () => {
	const { forecastData } = useForecast();

	const formatDate = (row) => {
		const date = new Date(row.time);

		const options = {
			timeZone: "Europe/Helsinki",
			month: "2-digit",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
			hour12: false,
		};

		const formattedDate = new Intl.DateTimeFormat("fi-FI", options).format(date);
		return formattedDate.replace("klo", " ");
	};

	const columns = [
		{
			name: "Time",
			selector: (row) => formatDate(row),
			width: "100px",
		},
		{
			name: "T",
			selector: (row) => row.data.instant.details.air_temperature + "°",
			width: "60px"
		},
		{
			name: "Hum, Dp",
			selector: (row) => row.data.instant.details.relative_humidity + "%, " +
				row.data.instant.details.dew_point_temperature + "°",
			width: "100px"
		},
		{
			name: "Wind",
			selector: (row) => row.data.instant.details.wind_from_direction + "°, " +
				row.data.instant.details.wind_speed
		}
	];

	if (!forecastData) {
		return <p>There are no records to display</p>;
	} else {
		return (
			<DataTable
				columns={columns}
				data={forecastData}
				responsive={true}
			/>
		);
	}
};

export default ForecastTable;
