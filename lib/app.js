import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import stapiController from './controllers/stapi-controller.js';

const app = express();

app.use(express.json());

app.use('/api/v1/trek_characters', stapiController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
