const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const header = req.headers.authorization || '';
  const [type, token] = header.split(' ');
  if (type !== 'Bearer' || !token) {
    return res.status(401).json({ mensagem: 'Token Bearer ausente.' });
  }
  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ mensagem: 'JWT_SECRET não configurado.' });
  }
  try {
    req.auth = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ mensagem: 'Token inválido ou expirado.' });
  }
}
module.exports = authenticateToken;
