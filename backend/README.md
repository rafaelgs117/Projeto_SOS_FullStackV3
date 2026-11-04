# SOS Emergência API — Aula 13

## Executar localmente
1. Copie `.env.example` para `.env` e preencha os dados do PostgreSQL.
2. Execute `npm install`.
3. No pgAdmin, execute `../database/aula13_migracao.sql` no banco existente.
4. Execute `npm run seed:luna` apenas se desejar a conta didática `luna / 1234`.
5. Execute `npm run dev`.

## Publicar no Render
- Runtime: Node.
- Root Directory: `backend` quando o repositório contém a pasta Projeto_SOS_FullStack; deixe vazio se este repositório contém diretamente os arquivos de backend.
- Build Command: `npm install`.
- Start Command: `npm start`.
- Health Check Path: `/api/health`.
- Environment: `DATABASE_URL`, `JWT_SECRET`, `JWT_EXPIRES_IN=1h`, `CORS_ORIGIN=https://SEU-FRONTEND`.
- O PostgreSQL do Render deve ser criado separadamente; copie a Internal Database URL se o serviço da API estiver no mesmo workspace/região do Render.

A API usa `DATABASE_URL` com SSL (`rejectUnauthorized: false`) no Render e as variáveis `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` localmente.

## Rotas principais
- `GET /` e `GET /api/health`
- `POST /registro`
- `POST /login`
- `GET /api/privado`
- `GET /api/me`
- `GET /api/contatos`, `GET /api/contatos/:id`
- `POST /api/contatos`, `PUT /api/contatos/:id`, `DELETE /api/contatos/:id`
- `GET /api/sos`, `POST /api/sos`

Rotas privadas exigem `Authorization: Bearer TOKEN`.
