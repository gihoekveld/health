import express from 'express';
import { registerUser } from '../controllers/users/registerUser.js';
import { changeUserName } from '../controllers/users/changeUserName.js';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated.js';

const router = express.Router();

router.post('/', registerUser);
router.use(ensureAuthenticated);
router.patch('/name', changeUserName);

export default router;
