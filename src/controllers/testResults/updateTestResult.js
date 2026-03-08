import { update, testResultSchema } from '../../models/testResultsModel.js';

export const updateTestResult = async (req, res) => {
  const { id } = req.params;
  const { date, tests } = testResultSchema.parse(req.body);

  const testResult = await update(+id, date, tests);

  return res.status(200).json(testResult);
};
