const users = require('../models/userModel');
async function me(req, res, next) {
  try {
    const user = await users.findPublicById(req.auth.id_usuario);
    if (!user) return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
    return res.status(200).json(user);
  } catch (error) { return next(error); }
}
async function list(req, res, next) {
  try { return res.status(200).json(await users.listCurrent(req.auth.id_usuario)); }
  catch (error) { return next(error); }
}
function privateRoute(req, res) {
  return res.status(200).json({
    mensagem: 'Acesso autorizado: token JWT válido.',
    usuario: { id_usuario: req.auth.id_usuario, nome: req.auth.nome, email: req.auth.email },
  });
}
module.exports = { me, list, privateRoute };
