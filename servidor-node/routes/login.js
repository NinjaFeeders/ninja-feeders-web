const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { connectToDatabase, disconnectFromDatabase } = require('../database');
const router = express.Router();

const SECRET_KEY = '1234'; // Coloque uma chave secreta segura aqui

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

router.post('/login', (req, res) => {
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

    const user = results[0];
    const validPassword = await bcrypt.compare(password, user.password);
    const userLogin = user.username;
    let id_user = user.id;

    if (!validPassword) {
      return res.status(400).json({ message: 'Senha incorreta.' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ token, userLogin, id_user });
  });

  disconnectFromDatabase(dbconnection);
});

module.exports = { router, authenticateJWT };
