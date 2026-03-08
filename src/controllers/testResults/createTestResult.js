import { create, testResultSchema } from '../../models/testResultModel.js';

export const createTestResult = async (req, res) => {
  const { date, tests } = testResultSchema.parse(req.body);

  const testResult = await create(date, tests);

  return res.status(201).json(testResult);
};
