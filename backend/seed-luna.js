require('dotenv').config();
const bcrypt = require('bcryptjs');
const db = require('./db');

async function seedLuna() {
  const hash = await bcrypt.hash('1234', 10);
  const result = await db.query(
    `INSERT INTO usuarios (nome_completo, telefone, email, senha_hash, ativo)
     VALUES ('Luna', '(00) 00000-1234', 'luna@sos.local', $1, TRUE)
     ON CONFLICT (email) DO UPDATE
       SET senha_hash = EXCLUDED.senha_hash, ativo = TRUE
     RETURNING id_usuario, nome_completo, email`,
    [hash]
  );
  console.log('Conta didática criada/atualizada:', result.rows[0]);
  console.log('Login: luna | Senha: 1234');
}
seedLuna()
  .catch((error) => { console.error(error.message); process.exitCode = 1; })
  .finally(() => db.end());
