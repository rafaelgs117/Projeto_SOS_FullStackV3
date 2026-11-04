const db = require('../../db');

async function listByUser(userId) {
  const result = await db.query(
    `SELECT id_sos, id_usuario, mensagem, latitude, longitude, status, data_hora
     FROM solicitacoes_sos WHERE id_usuario = $1 ORDER BY id_sos`,
    [userId]
  );
  return result.rows;
}
async function create(userId, body) {
  const result = await db.query(
    `INSERT INTO solicitacoes_sos (id_usuario, mensagem, latitude, longitude)
     VALUES ($1, $2, $3, $4)
     RETURNING id_sos, id_usuario, mensagem, latitude, longitude, status, data_hora`,
    [userId, body.mensagem, body.latitude ?? null, body.longitude ?? null]
  );
  return result.rows[0];
}
module.exports = { listByUser, create };
