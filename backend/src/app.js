const express = require('express');
const cors = require('cors');
const healthRoutes = require('./routes/healthRoutes');
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');
const userRoutes = require('./routes/userRoutes');
const sosRoutes = require('./routes/sosRoutes');

const app = express();
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((value) => value.trim())
  : true;

app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: '1mb' }));
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

app.use(healthRoutes);
app.use(authRoutes);
app.use('/api/contatos', contactRoutes);
app.use('/api', userRoutes);
app.use('/api/sos', sosRoutes);

app.use((req, res) => res.status(404).json({ mensagem: 'Rota não encontrada.' }));
app.use((error, req, res, next) => {
  console.error('Erro na API:', error.message);
  if (res.headersSent) return next(error);
  return res.status(500).json({ mensagem: 'Erro interno da API ou do banco de dados.' });
});
module.exports = app;
