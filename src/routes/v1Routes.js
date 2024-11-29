import express from 'express';
import cdnCheckHandler from '../handlers/cdnCheck.handler.js';
import wpCheckHandler from '../handlers/wpCheck.handler.js';

const router = express.Router();

router.get('/wp-check', wpCheckHandler)

router.get('/cdn-check', cdnCheckHandler);

export default router;