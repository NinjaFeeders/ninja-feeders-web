const express = require('express');
const bcrypt = require('bcryptjs');
const { connectToDatabase, disconnectFromDatabase } = require('../database');
const router = express.Router();

router.post('/usersregister', async (req, res) => {
  const dbconnection = connectToDatabase();
  const { nome, username, password } = req.body;

  if (!nome || !username || !password) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
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

router.get('/users', (req, res) => {
  const dbconnection = connectToDatabase();
  const sql = 'SELECT * FROM `users`';

  dbconnection.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao recuperar usuários:', err);
      res.status(500).json({ error: 'Erro ao recuperar usuários.' });
      return;
    }
    res.status(200).json(results);
    disconnectFromDatabase(dbconnection);
  });
});

module.exports = router;
