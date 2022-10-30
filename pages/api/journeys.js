import axios from 'axios';
import getConfig from 'next/config';
import moment from 'moment';

const { publicRuntimeConfig } = getConfig();

const baseUrl =
  publicRuntimeConfig.TGVMAX_BASE_URL + publicRuntimeConfig.TGVMAX_SEARCH_PATH;

export default async (req, res) => {
  if (req.method == 'GET') {
    try {
      const origin = req.query.origin;
      const destination = req.query.destination;

      const datetimeStart = moment(
        req.query.date + ' ' + req.query.periodStart,
        'YYYY-MM-DD HH:mm',
        true
      ).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS);
      const datetimeEnd = moment(
        req.query.date + ' ' + req.query.periodEnd,
        'YYYY-MM-DD HH:mm',
        true
      ).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS);

      const url = `${baseUrl}/${origin}/${destination}/${datetimeStart}/${datetimeEnd}`;

      const response = await axios.get(url);

      return res.status(200).json({ data: response.data });
    } catch (error) {
      console.error(error);
      return res.status(503);
    }
  }

  return res.status(404);
};
