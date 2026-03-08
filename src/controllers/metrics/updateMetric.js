import { metricSchema, update } from '../../models/metricsModel.js';

export const updateMetric = async (req, res) => {
  const { id } = req.params;
  const { name, unit } = metricSchema.parse(req.body);

  const newMetric = await update(+id, { name, unit });

  return res.status(200).json({
    message: 'Métrica atualizada com sucesso!',
    metric: newMetric,
  });
};
