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
const port = 8000;

const { connectToDatabase, disconnectFromDatabase } = require('./database'); // importa a conexão e desconexão com o DB
const { stringify } = require('querystring');


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
  const { nome, username, password } = req.body;

  if (!nome || !username || !password) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' }); // valida a obrigatoriedade de dados
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const sqlInsert = 'INSERT INTO `users` (nome,username,password) VALUES (?, ?,?)';
  dbconnection.query(sqlInsert, [nome, username, hashedPassword], (error, result) => {
    if (error) {
      console.error('Erro ao registrar usuário:', error);
      return res.status(500).json({ message: 'Erro ao registrar usuário.' });
    } else {
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
    } else {
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
    let id_user = user.id;
    if (!validPassword) {
      return res.status(400).json({ message: 'Senha incorreta.' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    console.log("retorno do token vindo pelo servidor", token);
    console.log("retorno do id vindo pelo servidor", id_user);
    console.log("retorno do nome de usuario vindo do servidor", userLogin);

    res.json({ token, userLogin,id_user });
  });

  disconnectFromDatabase(dbconnection);
});







// Rota para registrar uma nova mensagem OK
app.post('/mensgens', (req, res) => {
  console.log("informações de cadastro chegando no servidor com sucesso");
  const dbconnection = connectToDatabase();
  //likes, deslikes, autor
  //|| !likes || !deslikes || !autor
  const { msg, autor, tituloMsg } = req.body;
  console.log(autor, "chegou na rota de msg do servidor");

  if (!tituloMsg || !msg || !autor) { // verifica se todos os valores foram fornecido, se não: retorna uma msg reclamando para prencher todos os campos 
    res.status(400).json({ error: 'Todos os campos devem ser fornecidos.' });
    return;
  }

  const sql = 'INSERT INTO `mensgens` (msg,autor,titulomsg) VALUES (?,?,?)';
  dbconnection.query(sql, [msg, autor, tituloMsg], (err, results) => {
    if (err) {
      console.error('Erro ao inserir feedback:', err);
      res.status(500).json({ error: 'Erro ao inserir feedback.' });
      return;
    } else {
      res.status(201).json({ message: 'mensgem registrada com sucesso!', autor });
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
    } else {
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


// Rota para registrar os likes e deslikes no DB OK
// app.put('/likes', (req, res) => {
//   console.log("like chegando no servidor com sucesso");
//   const { idmsg, isLike } = req.body;

//   console.log(idmsg, "id da msg chegou na rota de like do servidor");

//   const dbconnection = connectToDatabase();

//   // verificar o campo like no DB
//   const checkLike = 'SELECT * FROM mensgens WHERE id = ?';
//   dbconnection.query(checkLike, [idmsg], (checkLikeErr, checkLikeResult) => {
//     if (checkLikeErr) {
//       console.error('Erro ao verificar o registro:', checkLikeErr);
//       res.status(500).json({ error: 'Erro ao verificar o registro' });
//     }
//     // a partir daqui o existe like registrado e agora vamos apenas atualizar 
//     // Registro encontrado, obter os valores atuais de likes e deslikes
//     const currentLikes = checkLikeResult[0].likes;

//     if (isLike == true) { // se atender essa condição sera incrementado um like
//       // Corrigir a sintaxe SQL para atualização de likes

//       if (currentLikes === null || currentLikes === 0) { // inicia currentLike ===null
//         const insertLike = 'INSERT INTO mensgens(likes)VALUE(?) WHERE id = ?';

//         dbconnection.query(insertLike, [1, idmsg], (err, res) => {
//           if (err) {
//             console.error('Erro ao inserir like:', err);
//             res.status(500).json({ error: 'Erro ao inserir like.' });
//             return;
//           } else {
//             res.status(201).json({ message: `Like contabilizado e somado com sucesso para a msg de id ${idmsg}` });
//           }

//         });

//       } // fim currentLike === null




//     } // fim do islike == true
//     disconnectFromDatabase(dbconnection);
//   });
// });

app.put('/likes', (req, res) => {
  const { idmsg, isLike } = req.body;

  const dbconnection = connectToDatabase();

  // Verificar se a mensagem com o id especificado existe na tabela mensgens
  const checkMsgQuery = 'SELECT * FROM mensgens WHERE id = ?';
  dbconnection.query(checkMsgQuery, [idmsg], (checkMsgErr, checkMsgResult) => {
    if (checkMsgErr) {
      console.error('Erro ao verificar a mensagem:', checkMsgErr);
      res.status(500).json({ error: 'Erro ao verificar a mensagem' });
      disconnectFromDatabase(dbconnection);
      return;
    } // verificaççao do registro da msg relacionado ao id OK

    // O CODIGO ABAIXO FAZ UMA VERIFICAÇÃO INTERESSANTE CASO NÃO HAJA UMA MSG REGISTRADA COM O ID INFORMADO, POREM É DIFICIL DESSE ID NÃO EXISTIR UMA VEZ QUE 
    // O MESMO VEM DE UMA LISTAGEM DA MESMAS MENSAGENS QUE ESTAMOS CHECANDO
    // if (checkMsgResult.length === 0) {
    //   res.status(404).json({ error: 'Mensagem não encontrada' });
    //   disconnectFromDatabase(dbconnection);
    //   return;
    // }

    // Mensagem encontrada, verificar o valor atual de likes
    const currentLikes = checkMsgResult[0].likes; // campo like relacionado ao id informado, armazenado na const cuureenlikes
    console.log(`para o id ${idmsg} foi enconstrado ${currentLikes} likes`)

    const currentDesLike = checkMsgResult[0].deslikes; // quantida de deslike recuperada no dB
    console.log(`para i id ${idmsg} foi enconstrado ${currentDesLike} deslikes`)
   
   
    if (isLike === true) { // inplementa os likes
      // Se for um like, verificar se precisa inserir o primeiro like ou incrementar
      if (currentLikes === null || currentLikes === 0) { // verifica se existe algum valor no campo like
        // Se likes for null ou 0, inserir o primeiro like
        const sql_insertLike = 'UPDATE mensgens SET likes = 1 WHERE id = ?';
        dbconnection.query(sql_insertLike, [idmsg], (insertErr, insertResult) => {
          if (insertErr) {
            console.error('Erro ao inserir o primeiro like:', insertErr);
            res.status(500).json({ error: 'Erro ao inserir o primeiro like' });
          } else {
            res.status(201).json({ message: `Primeiro like registrado com sucesso para a mensagem de id ${idmsg}` });
          }
          disconnectFromDatabase(dbconnection);
        });
      } else { // Se já existe likes, incrementar o valor atual
       
        const sql_addmaislike = 'UPDATE mensgens SET likes = likes + 1 WHERE id = ?';
        dbconnection.query(sql_addmaislike, [idmsg], (incrementErr, incrementResult) => {
          if (incrementErr) {
            console.error('Erro ao incrementar o like:', incrementErr);
            res.status(500).json({ error: 'Erro ao incrementar o like' });
          } else {
            res.status(200).json({ message: `Like incrementado com sucesso para a mensagem de id ${idmsg}` });
          }
          disconnectFromDatabase(dbconnection);
        });
      }
    } else if(isLike === false) { // aqui começa a implementação do deslike
     

      if (currentDesLike === null || currentDesLike === 0) { // verifica se existe algum valor no campo like
        // Se likes for null ou 0, inserir o primeiro like
        const sql_insertDeslike = 'UPDATE mensgens SET  deslikes= 1 WHERE id = ?';
        dbconnection.query(sql_insertDeslike, [idmsg], (insertErr) => {
          if (insertErr) {
            console.error('Erro ao inserir o primeiro deslike:', insertErr);
            res.status(500).json({ error: 'Erro ao inserir o primeiro deslike' });
          } else {
            res.status(201).json({ message: `Primeiro deslike registrado com sucesso para a mensagem de id ${idmsg}` });
          }
          disconnectFromDatabase(dbconnection);
        });
        console.log(`codigo comentado`);
      }else{
        const sql_addDeslikes = 'UPDATE mensgens SET deslikes = deslikes + 1 WHERE id = ?';
        dbconnection.query(sql_addDeslikes, [idmsg], (incrementErr, incrementResult) => {
          if (incrementErr) {
            console.error('Erro ao incrementar o deslike:', incrementErr);
            res.status(500).json({ error: 'Erro ao incrementar o deslike' });
          } else {
            res.status(200).json({ message: `desLike incrementado com sucesso para a mensagem de id ${idmsg}` });
          }
          disconnectFromDatabase(dbconnection);
        });
      }
     
    }
  });
});



// Rota de exemplo
app.get('/', (req, res) => {
  res.send(`app get rota de exemplo: Servidor Node.js para ninjafeeders rodando com sucesso! no localhost por ip: ${port}`);
});


// Middleware para servir arquivos estáticos da aplicação Angular
app.use(express.static(path.join(__dirname, 'angular')));

// Rota padrão que redireciona para o index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'angular', 'index.html'));
});


// Iniciar o servidor essa msg aparece no log do terminal
app.listen(port, () => {
  console.log(` metodo listen() Servidor Node.js par ninjafeeders rodando em http:localhost:${port}`);
});
