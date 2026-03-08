import express from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated.js';
import { createTestResult } from '../controllers/testResults/createTestResult.js';

const router = express.Router();

router.use(ensureAuthenticated);
router.post('/', createTestResult);

export default router;
