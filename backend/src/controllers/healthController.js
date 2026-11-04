const db = require('../../db');
function home(req, res) {
  return res.status(200).json({
    projeto: 'SOS Emergência',
    mensagem: 'API publicada e disponível.',
    versao: '13.0.0',
  });
}
async function health(req, res, next) {
  try {
    await db.query('SELECT 1');
    return res.status(200).json({ api: 'ok', banco: 'conectado' });
  } catch (error) { return next(error); }
}
module.exports = { home, health };
