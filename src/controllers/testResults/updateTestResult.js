import { update, testResultSchema } from '../../models/testResultsModel.js';

export const updateTestResult = async (req, res) => {
  const { id } = req.params;
  const { date, testResults } = testResultSchema.parse(req.body);

  const test = await update(+id, date, testResults);

  return res.status(200).json({ test });
};
