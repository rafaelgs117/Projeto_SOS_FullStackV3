# Aula 12 — checklist de demonstração

1. **Joi / 400:** no Postman, `POST /api/contatos` com Bearer Token e Body `{}`. Mostrar `400` e detalhes da validação.
2. **Cadastro / hash:** mostrar `POST /registro` com usuário de teste e depois a coluna `senha_hash` no pgAdmin.
3. **Conta Luna:** executar `npm run seed:luna`; mostrar no pgAdmin que `senha_hash` é um hash bcrypt, não a senha `1234`.
4. **Login / JWT:** `POST /login` com `{"login":"luna","senha":"1234"}`; mostrar `200` e o token.
5. **Rota protegida sem token:** `GET /api/privado` sem Authorization → `401`.
6. **Rota protegida com token:** Authorization → Bearer Token → colar JWT → `200`.
7. Mostrar README e commits de cada integrante no GitHub. Todos devem participar da narração do vídeo de 3–5 minutos.

> Não publicar `.env` nem usar a senha `1234` em ambiente real.
