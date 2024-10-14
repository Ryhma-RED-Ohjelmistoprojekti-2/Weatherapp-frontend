import DataTable from 'react-data-table-component';

const columns = [
	{
		name: 'Kellonaika',
		selector: row => row.time,
	},
	{
		name: 'Lämpötila',
		selector: row => row.temperature,
	},
	{
		name: 'Kosteus',
		selector: row => row.humidity,
	},
	{
		name: 'Tuuli',
		selector: row => row.wind,
	},
];

const data = [
  	{
		id: 1,
		time: '13:00',
		temperature: '25',
        humidity: "89",
        wind: "225"
	},
    {
		id: 2,
		time: '14:00',
		temperature: '29',
        humidity: "56",
        wind: "55"
	},
]

const ForecastTable = () => {
	return (
		<DataTable
			columns={columns}
			data={data}
            title="18.10"
		/>
	);
}

export default ForecastTable