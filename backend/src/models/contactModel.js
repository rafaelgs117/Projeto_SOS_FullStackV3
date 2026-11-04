const db = require('../../db');

async function listByUser(userId) {
  const result = await db.query(
    `SELECT id_contato, id_usuario, nome, telefone, parentesco, ativo, criado_em
     FROM contatos_emergencia WHERE id_usuario = $1 ORDER BY id_contato`,
    [userId]
  );
  return result.rows;
}
async function findByIdAndUser(id, userId) {
  const result = await db.query(
    `SELECT id_contato, id_usuario, nome, telefone, parentesco, ativo, criado_em
     FROM contatos_emergencia WHERE id_contato = $1 AND id_usuario = $2`,
    [id, userId]
  );
  return result.rows[0] || null;
}
async function create(userId, { nome, telefone, parentesco }) {
  const result = await db.query(
    `INSERT INTO contatos_emergencia (id_usuario, nome, telefone, parentesco)
     VALUES ($1, $2, $3, $4)
     RETURNING id_contato, id_usuario, nome, telefone, parentesco, ativo, criado_em`,
    [userId, nome, telefone, parentesco]
  );
  return result.rows[0];
}
async function update(id, userId, { nome, telefone, parentesco }) {
  const result = await db.query(
    `UPDATE contatos_emergencia SET nome = $1, telefone = $2, parentesco = $3
     WHERE id_contato = $4 AND id_usuario = $5
     RETURNING id_contato, id_usuario, nome, telefone, parentesco, ativo, criado_em`,
    [nome, telefone, parentesco, id, userId]
  );
  return result.rows[0] || null;
}
async function remove(id, userId) {
  const result = await db.query(
    `DELETE FROM contatos_emergencia
     WHERE id_contato = $1 AND id_usuario = $2 RETURNING id_contato`,
    [id, userId]
  );
  return result.rows[0] || null;
}
module.exports = { listByUser, findByIdAndUser, create, update, remove };
