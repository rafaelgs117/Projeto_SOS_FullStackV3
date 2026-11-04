const db = require('../../db');

async function findByEmail(email) {
  const result = await db.query(
    `SELECT id_usuario, nome_completo, email, telefone, senha_hash, ativo
     FROM usuarios WHERE lower(email) = $1 LIMIT 1`,
    [email]
  );
  return result.rows[0] || null;
}
async function create({ nome, telefone, email, senhaHash }) {
  const result = await db.query(
    `INSERT INTO usuarios (nome_completo, telefone, email, senha_hash, ativo)
     VALUES ($1, $2, $3, $4, TRUE)
     RETURNING id_usuario, nome_completo, telefone, email, ativo, criado_em`,
    [nome, telefone, email, senhaHash]
  );
  return result.rows[0];
}
async function findPublicById(id) {
  const result = await db.query(
    `SELECT id_usuario, nome_completo, email, telefone
     FROM usuarios WHERE id_usuario = $1`,
    [id]
  );
  return result.rows[0] || null;
}
async function listCurrent(id) {
  const result = await db.query(
    `SELECT id_usuario, nome_completo, email, telefone, ativo
     FROM usuarios WHERE id_usuario = $1`,
    [id]
  );
  return result.rows;
}
module.exports = { findByEmail, create, findPublicById, listCurrent };
