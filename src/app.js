import express from 'express';
import cors from 'cors';
import wpCheckHandler from './handlers/wpCheck.handler.js';
import cdnCheckHandler from './handlers/cdnCheck.handler.js';

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://domain-lookup.nikola-nenovski.info',
    ],
    methods: ['GET'],
    allowedHeaders: ['Content-Type'],
  })
);

app.get('/api/v1/wp-check', wpCheckHandler);

app.get('/api/v1/cdn-check', cdnCheckHandler);

export default app;
