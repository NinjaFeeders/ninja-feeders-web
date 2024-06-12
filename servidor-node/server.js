// const express = require('express');
// const app = express();
// const port = 3000;


// const connection = require('./database'); // esse codigo inicia a conexão com o db, importando a conexão com o dB do arquivo database.js


// // Rota de exemplo
// app.get('/', (req, res) => {
//   res.send('Servidor Node.js rodando com sucesso!');
// });

// // Iniciar o servidor
// app.listen(port, () => {
//   console.log(`Servidor Node.js rodando em http://localhost:${port}`);
// });


const express = require('express'); //Framework para construir a aplicação web.
const cors = require('cors'); // Importe o módulo cors Middleware para permitir requisições de diferentes origens. O CORS (Cross-origin Resource Sharing) é um mecanismo usado para adicionar cabeçalhos HTTP que informam aos navegadores para permitir que uma aplicação Web seja executada em uma origem e acesse recursos de outra origem diferente.
const bcrypt = require('bcryptjs'); // Biblioteca para hashing de senhas.
const jwt = require('jsonwebtoken'); // Biblioteca para gerar tokens JWT.
const path = require('path'); // Módulo para lidar com caminhos de arquivos e diretórios.
//const connection = require('./database'); //Configuração da conexão com o banco de dados MySQL.
const https = require('https');
const app = express();
const port =8000;

const { connectToDatabase, disconnectFromDatabase } = require('./database'); // importa a conexão e desconexão com o DB


const SECRET_KEY = '1234'; // Coloque uma chave secreta segura aqui

//criar instanciar da conexão e desconexão com o DB 

// para encerrar a conexão é so chamar o metodo  disconnectFromDatabase(); e passar a instancia da conexão como parametro pra ele, que o mesmo encerrara a conexão


// configuração  do cabeçalho "Permissions-Polyce"
app.use((req, res, next) => {
  res.setHeader('Permissions-Policy', 'accelerometer=(), camera=(), microphone=(), geolocation=(), gyroscope=(), magnetometer=(), payment=(), usb=()');
  next();
});

 // configure CORS
//  const corsOptions = {
//    origin: ['https://jairocesar.pessoal.ws/'],
//   optionsSuccessStatus: 200
//  };

app.use(cors());
app.use(express.json());





// Rota para registrar um novo usuário da rede social ninja feeders OK
//*****************************************************************************************************
app.post('/usersregister', async (req, res) => {

  const dbconnection = connectToDatabase();
  const { nome,username, password } = req.body;

  if (!nome || !username || !password ) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' }); // valida a obrigatoriedade de dados
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const sqlInsert = 'INSERT INTO `users` (nome,username,password) VALUES (?, ?,?)';
  dbconnection.query(sqlInsert, [nome,username, hashedPassword], (error, result) => {
    if (error) {
      console.error('Erro ao registrar usuário:', error);
      return res.status(500).json({ message: 'Erro ao registrar usuário.' });
    }else{
      res.status(201).json({ message: 'Usuário registrado com sucesso.' });
    }
    disconnectFromDatabase(dbconnection);
  });
});

// rota para obter todos usuarios

app.get('/users', (req, res) => {
  const dbconnection = connectToDatabase(); // abre a conexão com o DB
const sql = 'SELECT * FROM `users`';

dbconnection.query(sql, (err, results) => {
  console.log(sql);
  if (err) {
    console.error('Erro ao recuperar mensagens:', err);
    res.status(500).json({ error: 'Erro ao recuperar mensgens.' });
    return;
  }else{
    console.log("requisição Get mensagens entregue ao destino");
  }

 
  res.status(200).json(results);
  disconnectFromDatabase(dbconnection); // fecha a conexão com o dB
});

});


//***************************************************************************************************** */

// Middleware para verificar o token JWT para controle de sessão apos login de usuario

const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res.status(401).send({ message: 'Acesso negado!' });
  }

  try {
    const verified = jwt.verify(token, SECRET_KEY);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send({ message: 'Token inválido!' });
  }
};

//Rota para login de usuário
app.post('/login', (req, res) => {

  const dbconnection = connectToDatabase();
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  }

  const sqlSelect = 'SELECT * FROM `users` WHERE username = ?';
  dbconnection.query(sqlSelect, [username], async (error, results) => {
    if (error) {
      console.error('Erro ao buscar usuário:', error);
      return res.status(500).json({ message: 'Erro ao buscar usuário.' });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: 'Usuário não encontrado.' });
    }

    const user = results[0]; // aqui tem o retorno da pesquisa do login, se a pesquisa  encontrou os dados do usuario informado, esses dados serão armazenados aqui 
    const validPassword = await bcrypt.compare(password, user.password);
    const userLogin = user.username; // recuperando o nome de usuario apos login
    if (!validPassword) {
      return res.status(400).json({ message: 'Senha incorreta.' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    console.log("retorno do token vindo pelo servidor",token);
    console.log("retorno do nome de usuario vindo do servidor", userLogin);

    res.json({ token,userLogin });
  });

  disconnectFromDatabase(dbconnection);
 });

 





// Rota para registrar uma nova mensagem OK
app.post('/mensgens', (req, res) => {
  console.log("informações de cadastro chegando no servidor com sucesso");
  const dbconnection = connectToDatabase();
//likes, deslikes, autor
//|| !likes || !deslikes || !autor
  const { msg} = req.body;

  if (!msg ) { // verifica se todos os valores foram fornecido, se não: retorna uma msg reclamando para prencher todos os campos 
    res.status(400).json({ error: 'Todos os campos devem ser fornecidos.' });
    return;
  }

  const sql = 'INSERT INTO `mensgens` (msg) VALUES (?)';
  dbconnection.query(sql, [msg], (err, results) => {
    if (err) {
      console.error('Erro ao inserir feedback:', err);
      res.status(500).json({ error: 'Erro ao inserir feedback.' });
      return;
    }else{
    res.status(201).json({ message: 'mensgem registrada com sucesso!' });
    }
    disconnectFromDatabase(dbconnection);
  });

      
});


 // Rota para obter todos as mensgens
    app.get('/mensgens', (req, res) => {
      const dbconnection = connectToDatabase(); // abre a conexão com o DB
    const sql = 'SELECT * FROM `mensgens`';
   
    dbconnection.query(sql, (err, results) => {
      console.log(sql);
      if (err) {
        console.error('Erro ao recuperar mensagens:', err);
        res.status(500).json({ error: 'Erro ao recuperar mensgens.' });
        return;
      }else{
        console.log("requisição Get mensagens entregue ao destino");
      }

     
      res.status(200).json(results);
      disconnectFromDatabase(dbconnection); // fecha a conexão com o dB
    });
    
  });

  


 // Rota para deletar um feedback
// app.delete('/feedback/:id', (req, res) => {
//   const dbconnection = connectToDatabase();
//   const feedbackId = req.params.id;

//   const sql = 'DELETE FROM `feedback` WHERE id = ?';
//   dbconnection.query(sql, [feedbackId], (err, results) => {
//     if (err) {
//       console.error('Erro ao excluir feedback:', err);
//       res.status(500).json({ error: 'Erro ao excluir feedback.' });
//       return;
//     }else{
//     res.status(200).json({ message: 'Feedback excluído com sucesso!' });
//     }
//     disconnectFromDatabase(dbconnection);
//   });
// });

  


// Rota de exemplo
app.get('/', (req, res) => {
  res.send(`app get rota de exemplo: Servidor Node.js para ninjafeeders rodando com sucesso! no localhost por ip: ${port}`);
});


// Middleware para servir arquivos estáticos da aplicação Angular
app.use(express.static(path.join(__dirname,'angular')));

// Rota padrão que redireciona para o index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,'angular', 'index.html'));
});


// Iniciar o servidor essa msg aparece no log do terminal
app.listen(port, () => {
  console.log(` metodo listen() Servidor Node.js par ninjafeeders rodando em http:localhost:${port}`);
});
