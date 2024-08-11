const express = require('express');
const { connectToDatabase, disconnectFromDatabase } = require('../database');
const router = express.Router();

// inserir um registro de uma msg
router.post('/mensgens', (req, res) => { 
  const dbconnection = connectToDatabase();
  const { msg,likes,deslikes,autor,autor_id,visibilidade_msg, tituloMsg } = req.body;

  if (!tituloMsg || !msg || !autor) {
    res.status(400).json({ error: 'Todos os campos devem ser fornecidos.' });
    return;
  }

  const sql = 'INSERT INTO `mensgens` (msg,likes,deslikes,autor,autor_id,visibilidade_msg,titulomsg) VALUES (?,?,?,?,?,?,?)';
  dbconnection.query(sql, [msg,likes,deslikes, autor,autor_id,visibilidade_msg, tituloMsg], (err, results) => {
    if (err) {
      console.error('Erro ao inserir mensagem:', err);
      res.status(500).json({ error: 'Erro ao inserir mensagem.' });
      return;
    } else {
      res.status(201).json({ message: 'Mensagem registrada com sucesso!', autor });
    }
    disconnectFromDatabase(dbconnection);
  });
});

// listar as msg registradas
router.get('/mensgens', (req, res) => {
  const dbconnection = connectToDatabase();
  const sql = 'SELECT * FROM `mensgens` ORDER BY `id` DESC ';

  dbconnection.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao recuperar mensagens:', err);
      res.status(500).json({ error: 'Erro ao recuperar mensagens.' });
      return;
    }
    res.status(200).json(results);
    disconnectFromDatabase(dbconnection);
  });
});

module.exports = router;
