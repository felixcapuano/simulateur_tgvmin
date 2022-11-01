import { Stack, Item } from '@mui/material';

const TravelsList = ({ travels = [] }) => {
  const travelsItems = travels.map((t, index) => {
    return (
      <li key={index}>
        {t.departureDateTime +
          ' -> ' +
          t.originName +
          ' > ' +
          t.destinationName}
      </li>
    );
  });

  return <ul>{travelsItems}</ul>;
};

export default TravelsList;
