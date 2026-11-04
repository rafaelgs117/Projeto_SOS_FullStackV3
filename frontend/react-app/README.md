# Front-end React — SOS Emergência (Aula 13)

## Local
1. Copie `.env.example` para `.env`.
2. Configure `VITE_API_URL=http://localhost:3000`.
3. Execute `npm install` e `npm run dev`.

## Publicação
Configure `VITE_API_URL` com a URL pública do Web Service no Render, por exemplo `https://sos-emergencia-api.onrender.com` (sem `/api` no final), e faça o build/deploy.

O token e usuário são compartilhados por `AuthContext` (`createContext`, `Provider`, `useContext`). O login recebe JWT e navega para a aplicação com `useNavigate`. Rotas sem sessão são direcionadas a `/login`. A tela de contatos apresenta os registros retornados pela API usando `map`.
