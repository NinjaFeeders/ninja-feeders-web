const express = require('express');
const { connectToDatabase, disconnectFromDatabase } = require('../database');
const router = express.Router();

router.post('/mensgens', (req, res) => {
  const dbconnection = connectToDatabase();
  const { msg, autor, tituloMsg,likes,deslikes } = req.body;

  if (!tituloMsg || !msg || !autor) {
    res.status(400).json({ error: 'Todos os campos devem ser fornecidos.' });
    return;
  }

  const sql = 'INSERT INTO `mensgens` (msg,likes,deslikes,autor,titulomsg) VALUES (?,?,?,?,?)';
  dbconnection.query(sql, [msg,likes,deslikes, autor, tituloMsg], (err, results) => {
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

router.get('/mensgens', (req, res) => {
  const dbconnection = connectToDatabase();
  const sql = 'SELECT * FROM `mensgens`';

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
