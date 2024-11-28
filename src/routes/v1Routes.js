import express from 'express';
import cdnCheckHandler from '../handlers/cdnCheck.handler.js';

const router = express.Router();

router.get('/wp-check', (req, res) => {
  res.send(req.path);
})

router.get('/cdn-check', cdnCheckHandler);

export default router;