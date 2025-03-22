const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path'); // Módulo para lidar com caminhos de arquivos e diretórios.
//const port = 3307; // porta para o wampserver
const port = 8000;  // porta para o xamp e outros servidores
//const port = 3000;  // porta para o xamp e outros servidores


const usersRoutes = require('./routes/users');
const { router: loginRoutes, authenticateJWT } = require('./routes/login');
const messagesRoutes = require('./routes/messages');
const likesRoutes = require('./routes/likes');
const dislikesRoutes = require('./routes/dislikes');
const friendsRoutes = require('./routes/friends');

app.use(cors());
app.use(express.json());

app.use('/api', usersRoutes);
app.use('/api', loginRoutes);
app.use('/api', /* authenticateJWT,*/ messagesRoutes); // o codigo comentado serve para fazer controle rota
app.use('/api', /* authenticateJWT,*/  likesRoutes);
app.use('/api',dislikesRoutes);
app.use('/api', friendsRoutes);




// Rota de exemplo que aparece no teste do navegador resposta do teste de url no ambiente de desenvolvimento
// app.get('/', (req, res) => {
//   res.send(` Servidor Node.js rota de texte:  para ninjafeeders rodando com sucesso! no localhost na porta: ${port}`);
// });

// Rota de exemplo que aparece no teste do navegador resposta do teste de url no ambiente de produção

app.get('/', (req, res) => {
  res.send(` Servidor Node.js rota de texte:  para ninjafeeders rodando com sucesso! no localhost--server--Localweb na porta: ${port}`);
});

// Middleware para servir arquivos estáticos da aplicação Angular
app.use(express.static(path.join(__dirname, 'angular')));

// // Rota padrão que redireciona para o index.html
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'angular', 'index.html'));
// });

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
