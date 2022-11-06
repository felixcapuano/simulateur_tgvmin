import styles from '../styles/Home.module.css';

import getConfig from 'next/config';
import { useCallback, useState } from 'react';
import axios from 'axios';

import Grid from '@mui/material/Unstable_Grid2';
import JourneyForm from './components/JourneyForm';
import JourneysTree from './components/JourneysTree';
import TravelsList from './components/TravelsList';
import * as R from 'rambda';
import moment from 'moment';

const { publicRuntimeConfig } = getConfig();

const url =
  publicRuntimeConfig.TGVMAX_BASE_URL + publicRuntimeConfig.TGVMAX_ORIGIN_PATH;

export async function getServerSideProps() {
  let data = [];
  try {
    const response = await axios.get(url);
    data = response.data;
  } catch (error) {
    console.error(error);
  }
  return { props: { data } };
}
const id = 0;

const Home = ({ data }) => {
  const [journeys, setJourneys] = useState({});
  const [travels, setTravels] = useState([]);

  const onSubmit = useCallback(async (j) => {
    // const date_key = j.date;
    // const period_key = `${j.startDateTime.form}-${j.startDateTime}`;
    // const route_key = `${j.origin}-${j.destination}`;

    // const new_journey = {
    //   [date_key]: {
    //     [period_key]: {
    //       [route_key]: { id: keyB64 },
    //       id: id++,
    //     },
    //     id: id++,
    //   },
    //   id: id++,
    // };

    // setJourneys((journeys) => R.mergeDeepRight(new_journey, journeys));

    const params = {
      origin: j.origin,
      destination: j.destination,
      startDateTime: j.startDateTime.format(),
      endDateTime: j.endDateTime.format(),
    };
    const data = [];
    try {
      const response = await axios.get('/api/travels', { params });
      data = new Array(...response.data.travels);
    } catch {
      console.error('cannot fetch data');
      return;
    }

    const keyB64 = window.btoa(Object.values(params).join('-'));
    data.forEach((d) => (d.id = keyB64));

    setTravels((travels) => {
      const newTravels = travels.filter((t) => t.id !== keyB64);
      return newTravels.concat(data);
    });
  });

  return (
    <Grid container className={styles.container}>
      <Grid md={12} display='flex' justifyContent='center' alignItems='center'>
        <JourneyForm onSubmit={onSubmit} stationsArray={data} />
      </Grid>
      <Grid md={2}>{/* <JourneysTree journeys={journeys} /> */}</Grid>
      <Grid md={10} style={{ height: '80vh' }}>
        <TravelsList travels={travels} />
      </Grid>
    </Grid>
  );
};

export default Home;
