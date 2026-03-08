import {
  findMany,
  testResultHistoryQuerySchema,
} from '../../models/testResultsModel.js';

export const fetchTestResultsHistory = async (req, res) => {
  const { from, to, metricIds } = testResultHistoryQuerySchema.parse(req.query);

  const testResults = await findMany({ from, to, metricIds });

  return res.status(200).json(testResults);
};
