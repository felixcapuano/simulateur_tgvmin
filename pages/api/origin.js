import axios from 'axios';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const url =
  publicRuntimeConfig.TGVMAX_BASE_URL + publicRuntimeConfig.TGVMAX_ORIGIN_PATH;

export default async (req, res) => {
  if (req.method == 'GET') {
    try {
      const { data } = await axios.get(url);

      return res.status(200).json({ origins: data });
    } catch (error) {
      console.error(error);
      return res.status(503);
    }
  }
  return res.status(404);
};
