const Joi = require('joi');

const registroSchema = Joi.object({
  nome: Joi.string().trim().min(2).max(120).required(),
  telefone: Joi.string().trim().min(8).max(20).required(),
  email: Joi.string().trim().email().max(150).required(),
  senha: Joi.string().min(4).max(72).required(),
}).required();

const loginSchema = Joi.object({
  login: Joi.string().trim().min(1).max(150).optional(),
  email: Joi.string().trim().email().max(150).optional(),
  senha: Joi.string().min(1).max(72).required(),
}).or('login', 'email').required();

const contatoSchema = Joi.object({
  nome: Joi.string().trim().min(2).max(120).required(),
  telefone: Joi.string().trim().min(8).max(20).required(),
  parentesco: Joi.string().trim().min(2).max(60).required(),
}).required();

const sosSchema = Joi.object({
  mensagem: Joi.string().trim().min(3).max(1000).required(),
  latitude: Joi.number().min(-90).max(90).allow(null).optional(),
  longitude: Joi.number().min(-180).max(180).allow(null).optional(),
}).required();

module.exports = { registroSchema, loginSchema, contatoSchema, sosSchema };
