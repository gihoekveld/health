import { create, metricSchema } from '../../models/metricModel.js';

export const createMetric = async (req, res) => {
  const { name, unit } = metricSchema.parse(req.body);

  const metric = await create({ name, unit });

  return res.status(201).json({ metric });
};
