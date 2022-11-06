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

      const startDateTimeFmt = moment(req.query.startDateTime).format(
        moment.HTML5_FMT.DATETIME_LOCAL_SECONDS
      );
      const endDateTimeFmt = moment(req.query.endDateTime).format(
        moment.HTML5_FMT.DATETIME_LOCAL_SECONDS
      );

      const url = `${baseUrl}/${origin}/${destination}/${startDateTimeFmt}/${endDateTimeFmt}`;

      const response = await axios.get(url);

      return res.status(200).json({ travels: response.data });
    } catch (error) {
      console.error(error);
      return res.status(503);
    }
  }

  return res.status(404);
};
