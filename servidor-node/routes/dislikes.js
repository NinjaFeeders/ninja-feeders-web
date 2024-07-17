const express = require('express');
const { connectToDatabase, disconnectFromDatabase } = require('../database');
const router = express.Router();

router.put('/dislikes', (req, res) => {
  const dbconnection = connectToDatabase();
  const { idmsg, isLike, id_user, likes_status } = req.body;

  if (!idmsg || !id_user) {
    return res.status(400).json({ error: 'ID da mensagem ou ID do usuário não fornecido.' });
  }

   if(isLike==false){ // DESLIKE---------------------------------------------------------------------------
  
    // pesquisa na tabela user_likes pra saber se existe algum registro de algum user que tenha dado like ou dislike
  const checkUser_likes = 'SELECT * FROM user_likes WHERE user_id = ? AND msg_id = ?';
  dbconnection.query(checkUser_likes, [id_user, idmsg], (err, resultsDeslike) => {
    if (err) {
      console.error('Erro ao verificar Deslike:', err);
      res.status(500).json({ error: 'Erro ao verificar Deslike.' });
      disconnectFromDatabase(dbconnection);
      return;
    }

    if (resultsDeslike.length === 0) {//se o reusutado da pesquisa na tabela retornar uma quantidade de registros
                                      //  === 0 significa que o usuario nunca deu like ou deslike na mensgen que ele esta interagindo, 
                                      // sendo assim sera criado um registro de interação para esse usuario onde as proximas 
                                      // interações para esse registro vinculado a este user e esta msg especificos, apenas alternara
                                      // o status para 'like' 'deslike' e 'anulado'
      const addLike = 'INSERT INTO user_likes (user_id, msg_id, like_status) VALUES (?, ?, ?)';
      dbconnection.query(addLike, [id_user, idmsg, isLike ? 'like' : 'dislike'], (err) => {
        if (err) {
          console.error('Erro ao registrar Deslike:', err);
          res.status(500).json({ error: 'Erro ao registrar Deslike.' });
          disconnectFromDatabase(dbconnection);
          return;
        }

        // atualizar o contador de deslike na tabela mensgens, iniciando assim a interação na tabela user_likes e mensgens
        const updateLikes = `UPDATE mensgens SET deslikes = deslikes + 1 WHERE id = ?`;
        dbconnection.query(updateLikes, [idmsg], (err) => {
          if (err) {
            console.error('Erro ao atualizar contador de Deslike:', err);
            res.status(500).json({ error: 'Erro ao atualizar contador de Deslike.' });
            disconnectFromDatabase(dbconnection);
            return;
          }

          res.status(200).json({ message: `Deslike registrado com sucesso para a mensagem de ID ${idmsg}` });
          disconnectFromDatabase(dbconnection);
        });
      });
    } else { // quando ja existir um registro user_likes para interação entre uma determinado registro de mensagens 
             // nesse caso o user_like esta com estatus 'dislike', e  quer anular o deslike clicando novamente no botão de dislike, anula o dislike sem dar likes
      let userDeslike = resultsDeslike[0];
      if (userDeslike.like_status === 'dislike') {
        const removeLike = `UPDATE user_likes SET like_status = ? WHERE id = ?`;
        const anular_like = 'anulado';
        dbconnection.query(removeLike, [anular_like, userDeslike.id], (err) => {
          if (err) {
            console.error('Erro ao reverter Deslike:', err);
            res.status(500).json({ error: 'Erro ao reverter Deslike.' });
            disconnectFromDatabase(dbconnection);
            return;
          }

          const atualizaContLikeMensgens = `UPDATE mensgens SET deslikes = deslikes - 1 WHERE id = ?`;
          dbconnection.query(atualizaContLikeMensgens, [idmsg], (err) => {
            if (err) {
              console.error('Erro ao atualizar contador de Deslike:', err);
              res.status(500).json({ error: 'Erro ao atualizar contador de Deslike.' });
              disconnectFromDatabase(dbconnection);
              return;
            }

            res.status(200).json({ message: `Deslike revertido com sucesso para a mensagem de ID ${idmsg}` });
            disconnectFromDatabase(dbconnection);
          });
        });
       } else if (userDeslike.like_status === 'anulado') { // usuario ja deu deslike ja anulou e agora quer registrar deslike novamente, 
         const reativarLike = `UPDATE user_likes SET like_status = ? WHERE id = ?`;
         const reativar_like = 'dislike';
        dbconnection.query(reativarLike, [reativar_like, userDeslike.id], (err) => {
          if (err) {
            console.error('Erro ao reativar Deslike:', err);
            res.status(500).json({ error: 'Erro ao reativar Deslike.' });
            disconnectFromDatabase(dbconnection);
            return;
          }

          const atualizaContLikeMensgens = `UPDATE mensgens SET deslikes = deslikes + 1 WHERE id = ?`;
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
       }else{// user deu um like, e agora ele quer dar deslike, no caso do codigo desse scopo
            // so vai entrar aqui se o status não for nem dislike e nem anulado, ou seja so se for 'like'
            // nese caso o estatus vai mudar para deslike, vai ser decrementado o like e incrementado o deslike
        const likeParaDeslike = `UPDATE user_likes SET like_status = ? WHERE id = ?`;
        const deslike_para_like = 'dislike';
        dbconnection.query(likeParaDeslike, [deslike_para_like, userDeslike.id], (err) => {
          if (err) {
            console.error('Erro ao reativar like:', err);
            res.status(500).json({ error: 'Erro ao reativar like.' });
            disconnectFromDatabase(dbconnection);
            return;
          }

           // Decrementar like
          const atualizaContDeslikeMensgens = `UPDATE mensgens SET likes = likes - 1 WHERE id = ?`;
          dbconnection.query(atualizaContDeslikeMensgens, [idmsg], (err) => {
            if (err) {
              console.error('Erro ao atualizar contador de likes:', err);
              res.status(500).json({ error: 'Erro ao atualizar contador de likes.' });
              disconnectFromDatabase(dbconnection);
              return;
            }
             // Incrementar deslikes
          const atualizaContLikeMensgens = `UPDATE mensgens SET deslikes = deslikes + 1 WHERE id = ?`;
          dbconnection.query(atualizaContLikeMensgens, [idmsg], (err) => {
            if (err) {
              console.error('Erro ao atualizar contador de likes:', err);
              res.status(500).json({ error: 'Erro ao atualizar contador de likes.' });
              disconnectFromDatabase(dbconnection);
              return;
            }           
          });

            res.status(200).json({ message: `Deslike incrementado  com sucesso\ like decrementado com sucesso\n para a mensagem de ID ${idmsg}` });
            disconnectFromDatabase(dbconnection);
          });
        });
       }
    }
  });
 
}
});

module.exports = router;
