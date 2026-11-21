require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./src/config/db');
const routes = require('./src/routes');
const { notFound, errorHandler } = require('./src/middleware/errors');

const app = express();
app.use(cors());
app.use(express.json());
app.get('/api/health', async (req, res) => {
  const ok = await pool.checkConnection();
  res.status(ok ? 200 : 503).json({ status: ok ? 'ok' : 'database unavailable' });
});
app.use('/api', routes);
app.use(notFound);
app.use(errorHandler);

// Never crash on unexpected errors
process.on('unhandledRejection', (e) => console.error('Unhandled rejection:', e.message));
process.on('uncaughtException', (e) => console.error('Uncaught exception:', e.message));

const port = process.env.PORT || 5000;
app.listen(port, async () => {
  console.log(`API running on http://localhost:${port}`);
  await pool.checkConnection(); // logs the result; server keeps running either way
});
