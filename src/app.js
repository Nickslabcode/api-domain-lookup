import express from 'express';
import apiRouter from './routes/apiRouter.js'

const app = express();
const port = 3000;

app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
})