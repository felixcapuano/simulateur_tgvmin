import {
  Select,
  Input,
  Stack,
  TextField,
  MenuItem,
  Button,
} from '@mui/material';
import { useReducer } from 'react';
import moment from 'moment';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

const initForm = {
  startDateTime: moment(),
  endDateTime: moment('11:59', 'hh:mm'),
  origin: 'PARIS (intramuros)',
  destination: 'VALENCE TGV RHONE-ALPES SUD',
};

const JourneyForm = ({ onSubmit, stationsArray = [] }) => {
  const [form, setForm] = useReducer((state, { target }) => {
    return { ...state, [target.name]: target.value };
  }, initForm);

  const stationsOptions = stationsArray.map((station) => {
    return (
      <MenuItem value={station} key={station}>
        {station}
      </MenuItem>
    );
  });

  const dtPickerHandler = (name) => (value) =>
    setForm({ target: { value, name } });

  return (
    <Stack
      direction='row'
      spacing={2}
      style={{ marginBottom: '5px', marginTop: '5px' }}
      display='flex'
    >
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <MobileDateTimePicker
          value={form.startDateTime}
          onChange={dtPickerHandler('startDateTime')}
          renderInput={(params) => <TextField {...params} />}
        />
        <MobileDateTimePicker
          value={form.endDateTime}
          onChange={dtPickerHandler('endDateTime')}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <Select value={form.origin} onChange={setForm} name='periodEnd'>
        {stationsOptions}
      </Select>
      <Select value={form.destination} onChange={setForm} name='destination'>
        {stationsOptions}
      </Select>
      <Button onClick={() => onSubmit(form)}>Submit</Button>
    </Stack>
  );
};

export default JourneyForm;
