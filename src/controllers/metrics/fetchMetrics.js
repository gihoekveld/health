import { list } from '../../models/metricModel.js';

export const fetchMetrics = async (req, res) => {
  const metrics = await list();

  return res.status(200).json({ metrics });
};
