import { create, testResultSchema } from '../../models/testResultsModel.js';

export const createTestResult = async (req, res) => {
  const { date, testResults } = testResultSchema.parse(req.body);

  const test = await create(date, testResults);

  return res.status(201).json({ test });
};
