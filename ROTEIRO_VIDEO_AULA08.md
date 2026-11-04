# Roteiro do vídeo — Aula 08 Back-end

Vídeo sugerido: 3 a 5 minutos. Cada integrante deve participar com a própria voz.

> Substitua os nomes pelos integrantes reais do grupo.

## Integrante 1 — Back-end e arquitetura cliente-servidor

"Olá, somos o grupo do projeto SOS Emergência. Nesta etapa estamos iniciando o Back-end do nosso projeto integrador. O Back-end é a parte responsável pelo processamento das requisições, pelas regras da aplicação e pelo fornecimento dos dados por meio de uma API. No nosso projeto, o navegador ou aplicação front-end funciona como cliente e envia requisições HTTP para o servidor Node.js com Express. O servidor recebe essas requisições, identifica o endpoint e responde com dados em JSON e códigos de status HTTP. Nesta Aula 08 estamos trabalhando com a estrutura inicial da API; os dados ainda ficam em memória e poderão ser ligados a um banco de dados em uma etapa posterior."

## Integrante 2 — Verbos HTTP e endpoints

"Agora vou apresentar os verbos HTTP e os endpoints do SOS Emergência. O GET é usado para consultar dados, como em GET /api/contatos, que lista os contatos, e GET /api/contatos/1, que busca um contato pelo ID. O POST é usado para criar dados, como POST /api/contatos, que cadastra um novo contato. Também criamos endpoints para usuários e solicitações SOS. A API utiliza códigos de status, como 200 para uma consulta realizada com sucesso, 201 quando um registro é criado e 404 quando o recurso não é encontrado. A tabela completa desses endpoints está no README do backend."

## Integrante 3 — Servidor Express e GET

"Agora vou mostrar o servidor funcionando. Primeiro entramos na pasta backend e executamos npm install para instalar as dependências. Depois usamos npm start. O terminal mostra a mensagem 'Servidor SOS Emergência rodando na porta 3000'. Com o servidor funcionando, podemos acessar http://localhost:3000/api/contatos no navegador. Essa rota responde com JSON contendo os contatos cadastrados. Também podemos testar http://localhost:3000/api/contatos/1 para consultar um contato específico pelo ID."

## Integrante 4 — GitHub e commits

"Por fim, vamos mostrar o repositório público no GitHub. O projeto está organizado com frontend e backend. Na pasta backend temos package.json, server.js e README.md. No histórico de commits é possível identificar os commits realizados pelos integrantes do grupo. Cada integrante deve fazer pelo menos um commit utilizando a própria conta do GitHub, com nome e e-mail configurados no Git. Essa etapa é importante porque a atividade exige que os integrantes apareçam no histórico de commits."

## Encerramento

"Com isso, concluímos a primeira versão do Back-end do SOS Emergência, utilizando Node.js, Express, NPM, HTTP, endpoints e respostas JSON. Nas próximas etapas poderemos evoluir a API e integrar um banco de dados."
