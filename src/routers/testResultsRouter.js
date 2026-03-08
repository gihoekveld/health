import express from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated.js';
import { createTestResult } from '../controllers/testResults/createTestResult.js';
import { updateTestResult } from '../controllers/testResults/updateTestResult.js';
import { removeTestResult } from '../controllers/testResults/removeTestResult.js';
import { fetchTestResultsHistory } from '../controllers/testResults/fetchTestResultsHistory.js';

const router = express.Router();

router.use(ensureAuthenticated);
router.get('/', fetchTestResultsHistory);
router.post('/', createTestResult);
router.put('/:id', updateTestResult);
router.delete('/:id', removeTestResult);

export default router;
