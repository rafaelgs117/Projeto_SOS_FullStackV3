# Projeto SOS Emergência — Aula 13

Projeto atualizado para o desafio Aula 13: API Node/Express publicada no Render, PostgreSQL, documentação Postman, arquitetura MVC e front-end React consumindo a API.

## Pastas
- `backend/`: API Node.js/Express organizada em MVC.
- `database/`: SQL original e migração não destrutiva da coluna `senha_hash`.
- `frontend/react-app/`: aplicação React/Vite.
- `postman/`: coleção de requisições importável no Postman.
- `DOCUMENTACAO_AULA13_POSTMAN_E_RENDER.docx`: instruções e exemplos para entrega.

## Antes de publicar
Não publique o arquivo `.env`. Crie `backend/.env` copiando `.env.example`. Configure no Render `DATABASE_URL`, `JWT_SECRET`, `JWT_EXPIRES_IN` e `CORS_ORIGIN`.

O SQL `database/sos_emergencia.sql` contém DROP TABLE e é destinado à criação inicial do banco vazio. Para banco já usado, execute somente `database/aula13_migracao.sql` depois de fazer backup.

## Render Blueprint
O arquivo `render.yaml` está na raiz do projeto e descreve o Web Service. O PostgreSQL é criado separadamente no painel do Render; depois informe sua URL na variável DATABASE_URL.
