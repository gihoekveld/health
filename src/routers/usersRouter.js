import express from 'express';
import { createUser } from '../controllers/users/createUser.js';

const router = express.Router();

router.post('/', createUser);

export default router;
