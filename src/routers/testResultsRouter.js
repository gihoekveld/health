import express from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated.js';
import { createTestResult } from '../controllers/testResults/createTestResult.js';
import { fetchTestResultsHistory } from '../controllers/testResults/fetchTestResultsHistory.js';

const router = express.Router();

router.use(ensureAuthenticated);
router.get('/', fetchTestResultsHistory);
router.post('/', createTestResult);

export default router;
