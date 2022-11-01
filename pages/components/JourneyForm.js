import { useFormik } from 'formik';
import moment from 'moment';

const initForm = {
  date: moment().format('YYYY-MM-DD'),
  origin: 'PARIS (intramuros)',
  destination: 'VALENCE TGV RHONE-ALPES SUD',
  periodStart: moment().format('HH:mm'),
  periodEnd: moment('23:59', 'HH:mm').format('HH:mm'),
};

const JourneyForm = ({ onSubmit, stationsArray = [] }) => {
  const formik = useFormik({
    initialValues: initForm,
    onSubmit: onSubmit,
    validate: (values) => {
      const errors = {};
      return errors;
    },
  });

  const stationsOptions = stationsArray.map((station) => {
    return (
      <option value={station} key={station}>
        {station}
      </option>
    );
  });

  const dateInput = {
    name: 'date',
    type: 'date',
    onChange: formik.handleChange,
    value: formik.values.date,
  };
  const originSelect = {
    name: 'origin',
    onChange: formik.handleChange,
    value: formik.values.origin,
  };
  const destinationSelect = {
    name: 'destination',
    onChange: formik.handleChange,
    value: formik.values.destination,
  };
  const periodStartInput = {
    name: 'periodStart',
    type: 'time',
    onChange: formik.handleChange,
    value: formik.values.periodStart,
  };
  const periodEndInput = {
    name: 'periodEnd',
    type: 'time',
    onChange: formik.handleChange,
    value: formik.values.periodEnd,
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <input {...dateInput} />
        <input {...periodStartInput} />
        <input {...periodEndInput} />
        <select {...originSelect}>{stationsOptions}</select>
        <select {...destinationSelect}>{stationsOptions}</select>
        <input type='submit' />
      </form>
    </div>
  );
};

export default JourneyForm;
