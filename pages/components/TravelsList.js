import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';

const TravelsList = ({ travels = [] }) => {
  const columns = [
    { field: 'departureDate', headerName: 'Departure Date', width: 100 },
    { field: 'origin', headerName: 'Origin', width: 400 },
    { field: 'destination', headerName: 'Destination', width: 400 },
    { field: 'departureTime', headerName: 'Departure Time', width: 60 },
    { field: 'arrivalTime', headerName: 'Arrival Time', width: 60 },
    { field: 'availableSeatsCount', headerName: 'Free seats', width: 60 },
  ];

  const data = travels.map(
    (
      {
        arrivalDateTime,
        availableSeatsCount,
        departureDateTime,
        destinationName,
        originName,
      },
      index
    ) => ({
      id: index,
      departureDate: moment(departureDateTime).format('YYYY-MM-DD'),
      origin: originName,
      destination: destinationName,
      departureTime: moment(departureDateTime).format('HH:mm'),
      arrivalTime: moment(arrivalDateTime).format('HH:mm'),
      availableSeatsCount: availableSeatsCount,
    })
  );

  return (
    <DataGrid
      columns={columns}
      rows={data}
      pageSize={10}
      rowLength={100}
      rowsPerPageOptions={[10]}
    />
  );
};

export default TravelsList;
