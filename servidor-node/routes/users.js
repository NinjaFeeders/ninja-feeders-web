const express = require('express');
const bcrypt = require('bcryptjs');
const { connectToDatabase, disconnectFromDatabase } = require('../database');
const { async } = require('rxjs/internal/scheduler/async');
const router = express.Router();

router.post('/usersregister', async (req, res) => {
  const dbconnection = connectToDatabase();
  const { nome, username, password } = req.body;

  if (!nome || !username || !password) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  }

  // verificar se o nome de usuario "username" informado existe, lembrando que o nome de usuario é unico
  // se user existir registrado na tabela users, o usuario que esta fazendo o registro sera informado que o nome de usuario ja existe
  // usuario que esta fazendo o registro tera que criar outro nome de usuario que ainda não exista na tabela users

  const checkUsernameQuery = 'SELECT * FROM `users` WHERE `username` = ?';
  dbconnection.query(checkUsernameQuery,[username], async(error,results)=>{
    if(error){
      console.error('Erro ao verificar nome de usuário:', error);
      disconnectFromDatabase(dbconnection);
      return res.status(500).json({ message: 'Erro ao verificar nome de usuário.' });
    }
    if(results.length > 0 ){
      disconnectFromDatabase(dbconnection);
      return res.status(400).json({message: 'Nome de usuário já existe.'});
    
    }else{
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
    }
  
    
    
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
