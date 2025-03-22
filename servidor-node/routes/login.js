// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const { connectToDatabase, disconnectFromDatabase } = require('../database');
// const router = express.Router();

// const SECRET_KEY = '1234'; // Coloque uma chave secreta segura aqui

// const authenticateJWT = (req, res, next) => {
//   const token = req.header('Authorization').replace('Bearer ', '');

//   if (!token) {
//     return res.status(401).send({ message: 'Acesso negado!' });
//   }

//   try {
//     const verified = jwt.verify(token, SECRET_KEY);
//     req.user = verified;
//     next();
//   } catch (error) {
//     res.status(400).send({ message: 'Token inválido!' });
//   }
// };

// router.post('/login', (req, res) => {
//   console.log("REQUEST LOGIN",req.body);
//   const dbconnection = connectToDatabase();
//   const { username, password } = req.body;

//   console.log(username, "e", password ,"chegour no endpoint login");

//   if (!username || !password) {
//     return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
//   }

//   const sqlSelect = 'SELECT * FROM `users` WHERE username = ?';
//   dbconnection.query(sqlSelect, [username], async (error, results) => {
//     if (error) {
//       console.error('Erro ao buscar usuário:', error);
//       return res.status(500).json({ message: 'Erro ao buscar usuário.' });
//     }

//     if (results.length === 0) {
//       return res.status(400).json({ message: 'Usuário não encontrado.' });
//     }

//     const user = results[0];
//     console.log("resultado do select",user.id);
//     console.log("resultado do select",user.username);
//     console.log("resultado do select",user.password);

//     const validPassword = await bcrypt.compare(password, user.password);
//     const userLogin = user.username;
//     let id_user = user.id;

//     if (!validPassword) {
//       return res.status(400).json({ message: 'Senha incorreta.' });
//     }
   

//     const token = jwt.sign({ id:id_user, username: userLogin,  }, SECRET_KEY, { expiresIn: '1h' });
//     console.log("Token");

//     res.json({  userLogin, id_user, token });
//   });

//   disconnectFromDatabase(dbconnection);
// });

// module.exports = { router, authenticateJWT };



const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { connectToDatabase, disconnectFromDatabase } = require('../database');
const router = express.Router();

const SECRET_KEY = process.env.SECRET_KEY || '1234'; // Use variáveis de ambiente para a chave secreta

const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

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

router.post('/login', async (req, res) => {
  console.log("REQUEST LOGIN", req.body);
  const dbconnection = connectToDatabase();
  const { username, password } = req.body;

  console.log(username, "e", password, "chegou no endpoint login");

  if (!username || !password) {
    disconnectFromDatabase(dbconnection);
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  }

  const sqlSelect = 'SELECT * FROM `users` WHERE username = ?';
  dbconnection.query(sqlSelect, [username], async (error, results) => {
    if (error) {
      console.error('Erro ao buscar usuário:', error);
      disconnectFromDatabase(dbconnection);
      return res.status(500).json({ message: 'Erro ao buscar usuário.' });
    }

    if (results.length === 0) {
      disconnectFromDatabase(dbconnection);
      return res.status(400).json({ message: 'Usuário não encontrado.' });
    }

    const user = results[0];
    console.log("resultado do select", user.id);
    console.log("resultado do select", user.username);
    console.log("resultado do select", user.password);

    try {
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        disconnectFromDatabase(dbconnection);
        return res.status(400).json({ message: 'Senha incorreta.' });
      }

      const userLogin = user.username;
      const id_user = user.id;

      /** o codigo abaixo  com a função jwt.sign gera o token e 
       * não funciona com node js versão abaixo de 10
       * o mesmo esta rodando normal com a versão 14.21.3
       */
      const token = jwt.sign({ id: id_user, username: userLogin }, SECRET_KEY, { expiresIn: '1h' });
      console.log("Token gerado:", token);

      res.json({ userLogin, id_user, token });
    } catch (error) {
      console.error('Erro ao comparar senhas ou gerar token:', error);
      res.status(500).json({ message: 'Erro interno do servidor.' });
    } finally {
      disconnectFromDatabase(dbconnection);
    }
  });
});

module.exports = { router, authenticateJWT };