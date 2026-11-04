const contacts = require('../models/contactModel');
const parseId = (raw) => {
  const id = Number(raw);
  return Number.isInteger(id) && id > 0 ? id : null;
};

async function list(req, res, next) {
  try { return res.status(200).json(await contacts.listByUser(req.auth.id_usuario)); }
  catch (error) { return next(error); }
}
async function getOne(req, res, next) {
  const id = parseId(req.params.id);
  if (!id) return res.status(400).json({ mensagem: 'ID inválido.' });
  try {
    const contact = await contacts.findByIdAndUser(id, req.auth.id_usuario);
    if (!contact) return res.status(404).json({ mensagem: 'Contato não encontrado.' });
    return res.status(200).json(contact);
  } catch (error) { return next(error); }
}
async function create(req, res, next) {
  try { return res.status(201).json(await contacts.create(req.auth.id_usuario, req.body)); }
  catch (error) { return next(error); }
}
async function update(req, res, next) {
  const id = parseId(req.params.id);
  if (!id) return res.status(400).json({ mensagem: 'ID inválido.' });
  try {
    const contact = await contacts.update(id, req.auth.id_usuario, req.body);
    if (!contact) return res.status(404).json({ mensagem: 'Contato não encontrado.' });
    return res.status(200).json(contact);
  } catch (error) { return next(error); }
}
async function remove(req, res, next) {
  const id = parseId(req.params.id);
  if (!id) return res.status(400).json({ mensagem: 'ID inválido.' });
  try {
    const deleted = await contacts.remove(id, req.auth.id_usuario);
    if (!deleted) return res.status(404).json({ mensagem: 'Contato não encontrado.' });
    return res.status(200).json({ mensagem: 'Contato removido do PostgreSQL.', id_contato: id });
  } catch (error) {
    if (error.code === '23503') {
      return res.status(409).json({ mensagem: 'Contato vinculado a notificações SOS; não pode ser removido.' });
    }
    return next(error);
  }
}
module.exports = { list, getOne, create, update, remove };
