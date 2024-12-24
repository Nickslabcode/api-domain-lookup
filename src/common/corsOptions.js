export const corsOptions = Object.freeze({
  origin: [
    'http://localhost:5173',
    'https://domain-lookup.nikola-nenovski.info',
  ],
  methods: ['GET'],
  allowedHeaders: ['Content-Type'],
});
