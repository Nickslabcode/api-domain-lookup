import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello to DomainLookup!');
})

app.get('/wp-check', (req, res) => {
  res.send(`Method: ${req.method}, Endpoint: ${req.path}`);
})

app.listen(port, () => {
  console.log(`App started on port ${port} -> http://localhost:${port}`);
});
