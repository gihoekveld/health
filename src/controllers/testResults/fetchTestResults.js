import {
  findMany,
  testResultHistoryQuerySchema,
} from '../../models/testResultsModel.js';

export const fetchTestResults = async (req, res) => {
  const { from, to, metricIds } = testResultHistoryQuerySchema.parse(req.query);

  const tests = await findMany({ from, to, metricIds });

  return res.status(200).json({ tests });
};
