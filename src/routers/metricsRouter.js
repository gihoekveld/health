import express from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated.js';
import { fetchMetrics } from '../controllers/metrics/fetchMetrics.js';
import { createMetric } from '../controllers/metrics/createMetric.js';
import { updateMetric } from '../controllers/metrics/updateMetric.js';
import { removeMetric } from '../controllers/metrics/removeMetric.js';

const router = express.Router();

router.use(ensureAuthenticated);
router.get('/', fetchMetrics);
router.post('/', createMetric);
router.put('/:id', updateMetric);
router.delete('/:id', removeMetric);

export default router;
