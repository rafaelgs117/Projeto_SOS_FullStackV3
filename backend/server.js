require('dotenv').config();
const app = require('./src/app');
const db = require('./db');

const PORT = Number(process.env.PORT || 3000);

async function start() {
  try {
    await db.query('SELECT 1');
    console.log('Conexão com PostgreSQL estabelecida.');
    app.listen(PORT, () => console.log(`SOS Emergência API ouvindo na porta ${PORT}`));
  } catch (error) {
    console.error('Falha ao conectar ao PostgreSQL:', error.message);
    process.exit(1);
  }
}
if (require.main === module) start();
module.exports = app;
