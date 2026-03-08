import { remove } from '../../models/testResultsModel.js';

export const removeTestResult = async (req, res) => {
  const { id } = req.params;

  await remove(+id);

  return res
    .status(200)
    .json({ message: 'Resultado de exame removido com sucesso!' });
};
