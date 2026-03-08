import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from './routers/userRouter.js';
import authRouter from './routers/authRouter.js';
import { notFound } from './controllers/notFound.js';
import { onError } from './middlewares/onError.js';
import { logger } from './middlewares/logger.js';

const app = express();
const port = process.env.PORT || 3333;

app.use(logger);
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use('/user', userRouter);
app.use('/auth', authRouter);

app.use(notFound);
app.use(onError);

app.listen(port, () => {
  console.log(`API disponível em http://localhost:${port} 🚀`);
});
