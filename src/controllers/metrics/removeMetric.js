import { remove } from '../../models/metricsModel.js';

export const removeMetric = async (req, res) => {
  const { id } = req.params;

  await remove(+id);

  return res.status(200).json({ message: 'Métrica removida com sucesso' });
};
