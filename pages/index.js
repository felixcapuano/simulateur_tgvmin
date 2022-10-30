import styles from '../styles/Home.module.css';

import getConfig from 'next/config';
import { useCallback, useState } from 'react';
import JourneyForm from './components/JourneyForm';
import axios from 'axios';
import { Chip } from '@mui/material';

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
const key = 0;

export default function Search({ data }) {
  const [journeys, setJourneys] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  const onSubmit = useCallback(async (journey) => {
    key += 1;
    setJourneys((journeys) => [
      ...journeys,
      {
        ...journey,
        key: key,
        title: `${journey.origin} > ${journey.destination} ${journey.date} from ${journey.periodStart} to ${journey.periodEnd}`,
      },
    ]);
    await updateSearchResult(key, journey);
  });

  const removeJourney = async (journeyToDelete) => {
    setJourneys((journeys) =>
      journeys.filter((journey) => journeyToDelete.key != journey.key)
    );
  };

  const updateSearchResult = async (key, journey) => {
    const response = await axios.get('/api/journeys', {
      params: journey,
    });
  };

  const journeysChips = journeys.map((journey) => (
    <Chip
      label={journey.title}
      key={journey.key}
      onDelete={async () => await removeJourney(journey)}
    />
  ));

  return (
    <div className={styles.container}>
      <JourneyForm onSubmit={onSubmit} stationsArray={data} />
      {journeysChips}
      {/* <JourneysDisplay journeys={journeys} /> */}
    </div>
  );
}
