import express from 'express';

const router = express.Router();

router.get('/wp-check', (req, res) => {
  res.send(req.path);
})

export default router;