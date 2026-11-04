const sos = require('../models/sosModel');
async function list(req, res, next) {
  try { return res.status(200).json(await sos.listByUser(req.auth.id_usuario)); }
  catch (error) { return next(error); }
}
async function create(req, res, next) {
  try { return res.status(201).json(await sos.create(req.auth.id_usuario, req.body)); }
  catch (error) { return next(error); }
}
module.exports = { list, create };
