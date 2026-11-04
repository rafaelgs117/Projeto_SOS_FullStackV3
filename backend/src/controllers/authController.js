const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const users = require('../models/userModel');

async function register(req, res, next) {
  const { nome, telefone, email, senha } = req.body;
  try {
    const senhaHash = await bcrypt.hash(senha, 10);
    const usuario = await users.create({
      nome, telefone, email: email.toLowerCase(), senhaHash,
    });
    return res.status(201).json({
      mensagem: 'Usuário registrado com segurança.',
      usuario,
    });
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({ mensagem: 'Telefone ou e-mail já cadastrado.' });
    }
    return next(error);
  }
}

async function login(req, res, next) {
  const senha = req.body.senha;
  let loginValue = (req.body.email || req.body.login || '').trim().toLowerCase();
  if (!loginValue.includes('@')) loginValue = `${loginValue}@sos.local`;
  try {
    const usuario = await users.findByEmail(loginValue);
    if (!usuario || !usuario.ativo || !usuario.senha_hash) {
      return res.status(401).json({ mensagem: 'Login ou senha inválidos.' });
    }
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha_hash);
    if (!senhaCorreta) {
      return res.status(401).json({ mensagem: 'Login ou senha inválidos.' });
    }
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ mensagem: 'JWT_SECRET não configurado.' });
    }
    const expiresIn = process.env.JWT_EXPIRES_IN || '1h';
    const token = jwt.sign(
      { id_usuario: usuario.id_usuario, email: usuario.email, nome: usuario.nome_completo },
      process.env.JWT_SECRET,
      { expiresIn }
    );
    return res.status(200).json({
      mensagem: 'Login realizado com sucesso.',
      token,
      tipo: 'Bearer',
      expiresIn,
      usuario: {
        id_usuario: usuario.id_usuario,
        nome_completo: usuario.nome_completo,
        email: usuario.email,
      },
    });
  } catch (error) {
    return next(error);
  }
}
module.exports = { register, login };
