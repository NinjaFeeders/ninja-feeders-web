const express = require('express');
const { connectToDatabase, disconnectFromDatabase } = require('../database');
const router = express.Router();

router.put('/likes', (req, res) => {
  const dbconnection = connectToDatabase();
  const { idmsg, isLike, id_user, likes_status } = req.body;

  if (!idmsg || !id_user) {
    return res.status(400).json({ error: 'ID da mensagem ou ID do usuário não fornecido.' });
  }

  const checkQuery = 'SELECT * FROM user_likes WHERE user_id = ? AND msg_id = ?';
  dbconnection.query(checkQuery, [id_user, idmsg], (err, resultsLike) => {
    if (err) {
      console.error('Erro ao verificar like:', err);
      res.status(500).json({ error: 'Erro ao verificar like.' });
      disconnectFromDatabase(dbconnection);
      return;
    }

    if (resultsLike.length === 0) {
      const addLike = 'INSERT INTO user_likes (user_id, msg_id, like_status) VALUES (?, ?, ?)';
      dbconnection.query(addLike, [id_user, idmsg, isLike ? 'like' : 'dislike'], (err) => {
        if (err) {
          console.error('Erro ao registrar like:', err);
          res.status(500).json({ error: 'Erro ao registrar like.' });
          disconnectFromDatabase(dbconnection);
          return;
        }

        const updateLikes = `UPDATE mensgens SET likes = likes + 1 WHERE id = ?`;
        dbconnection.query(updateLikes, [idmsg], (err) => {
          if (err) {
            console.error('Erro ao atualizar contador de likes:', err);
            res.status(500).json({ error: 'Erro ao atualizar contador de likes.' });
            disconnectFromDatabase(dbconnection);
            return;
          }

          res.status(200).json({ message: `Like registrado com sucesso para a mensagem de ID ${idmsg}` });
          disconnectFromDatabase(dbconnection);
        });
      });
    } else {
      let userLike = resultsLike[0];
      if (userLike.like_status === 'like') {
        const removeLike = `UPDATE user_likes SET like_status = ? WHERE id = ?`;
        const anular_like = 'anulado';
        dbconnection.query(removeLike, [anular_like, userLike.id], (err) => {
          if (err) {
            console.error('Erro ao reverter like:', err);
            res.status(500).json({ error: 'Erro ao reverter like.' });
            disconnectFromDatabase(dbconnection);
            return;
          }

          const atualizaContLikeMensgens = `UPDATE mensgens SET likes = likes - 1 WHERE id = ?`;
          dbconnection.query(atualizaContLikeMensgens, [idmsg], (err) => {
            if (err) {
              console.error('Erro ao atualizar contador de likes:', err);
              res.status(500).json({ error: 'Erro ao atualizar contador de likes.' });
              disconnectFromDatabase(dbconnection);
              return;
            }

            res.status(200).json({ message: `Like revertido com sucesso para a mensagem de ID ${idmsg}` });
            disconnectFromDatabase(dbconnection);
          });
        });
      } else if (userLike.like_status === 'anulado') {
        const reativarLike = `UPDATE user_likes SET like_status = ? WHERE id = ?`;
        const reativar_like = 'like';
        dbconnection.query(reativarLike, [reativar_like, userLike.id], (err) => {
          if (err) {
            console.error('Erro ao reativar like:', err);
            res.status(500).json({ error: 'Erro ao reativar like.' });
            disconnectFromDatabase(dbconnection);
            return;
          }

          const atualizaContLikeMensgens = `UPDATE mensgens SET likes = likes + 1 WHERE id = ?`;
          dbconnection.query(atualizaContLikeMensgens, [idmsg], (err) => {
            if (err) {
              console.error('Erro ao atualizar contador de likes:', err);
              res.status(500).json({ error: 'Erro ao atualizar contador de likes.' });
              disconnectFromDatabase(dbconnection);
              return;
            }

            res.status(200).json({ message: `Like reativado com sucesso para a mensagem de ID ${idmsg}` });
            disconnectFromDatabase(dbconnection);
          });
        });
      }
    }
  });
});

module.exports = router;
