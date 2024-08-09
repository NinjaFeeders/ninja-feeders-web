const express = require('express');
const { connectToDatabase, disconnectFromDatabase } = require('../database');
const router = express.Router();

router.put('/likes', (req, res) => {
  const dbconnection = connectToDatabase();
  const { idmsg, isLike, id_user, likes_status } = req.body;

  if (!idmsg || !id_user) {
    return res.status(400).json({ error: 'ID da mensagem ou ID do usuário não fornecido.' });
  }

  if(isLike==true){ // LIKE--------------------------------------------------------------------
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
      if (userLike.like_status === 'like') { // se for === like vai mudar para anulado
        const removeLike = `UPDATE user_likes SET like_status = ? WHERE id = ?`;
        const anular_like = 'anulado';
        dbconnection.query(removeLike, [anular_like, userLike.id], (err) => {
          if (err) {
            console.error('Erro ao reverter like:', err);
            res.status(500).json({ error: 'Erro ao reverter like.' });
            disconnectFromDatabase(dbconnection);
            return;
          }

          // Decrementa o like
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
      } else if (userLike.like_status === 'anulado') { // mais ser for anulado volta para like
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
      }else{ // se não for  like e nem anulado, ele esta com status deslike, nesse caso vai pra like:incrementa like e decrementa deslike
        const delikeParaLike = `UPDATE user_likes SET like_status = ? WHERE id = ?`;
        const deslike_para_like = 'like';
        dbconnection.query(delikeParaLike, [deslike_para_like, userLike.id], (err) => {
          if (err) {
            console.error('Erro ao reativar like:', err);
            res.status(500).json({ error: 'Erro ao reativar like.' });
            disconnectFromDatabase(dbconnection);
            return;
          }

           // Decrementar deslike
          const atualizaContDeslikeMensgens = `UPDATE mensgens SET deslikes = deslikes - 1 WHERE id = ?`;
          dbconnection.query(atualizaContDeslikeMensgens, [idmsg], (err) => {
            if (err) {
              console.error('Erro ao atualizar contador de likes:', err);
              res.status(500).json({ error: 'Erro ao atualizar contador de likes.' });
              disconnectFromDatabase(dbconnection);
              return;
            }
             // Incrementar likes
          const atualizaContLikeMensgens = `UPDATE mensgens SET likes = likes + 1 WHERE id = ?`;
          dbconnection.query(atualizaContLikeMensgens, [idmsg], (err) => {
            if (err) {
              console.error('Erro ao atualizar contador de likes:', err);
              res.status(500).json({ error: 'Erro ao atualizar contador de likes.' });
              disconnectFromDatabase(dbconnection);
              return;
            }           
          });

            res.status(200).json({ message: `Like incrementado  com sucesso\ deslike decrementado com sucesso\n para a mensagem de ID ${idmsg}` });
            disconnectFromDatabase(dbconnection);
          });
        });
      }
    }
  });
 }//else if(isLike==false){ // DESLIKE---------------------------------------------------------------------------
  
//   const checkUser_likes = 'SELECT * FROM user_likes WHERE user_id = ? AND msg_id = ?';
//   dbconnection.query(checkUser_likes, [id_user, idmsg], (err, resultsDeslike) => {
//     if (err) {
//       console.error('Erro ao verificar Deslike:', err);
//       res.status(500).json({ error: 'Erro ao verificar Deslike.' });
//       disconnectFromDatabase(dbconnection);
//       return;
//     }

//     if (resultsDeslike.length === 0) {// usuario nunca deu like na mensgen que ele esta interagindo, 
//       const addLike = 'INSERT INTO user_likes (user_id, msg_id, like_status) VALUES (?, ?, ?)';
//       dbconnection.query(addLike, [id_user, idmsg, isLike ? 'like' : 'dislike'], (err) => {
//         if (err) {
//           console.error('Erro ao registrar Deslike:', err);
//           res.status(500).json({ error: 'Erro ao registrar Deslike.' });
//           disconnectFromDatabase(dbconnection);
//           return;
//         }

//         // atualizar o contador de deslike
//         const updateLikes = `UPDATE mensgens SET deslikes = deslikes + 1 WHERE id = ?`;
//         dbconnection.query(updateLikes, [idmsg], (err) => {
//           if (err) {
//             console.error('Erro ao atualizar contador de Deslike:', err);
//             res.status(500).json({ error: 'Erro ao atualizar contador de Deslike.' });
//             disconnectFromDatabase(dbconnection);
//             return;
//           }

//           res.status(200).json({ message: `Deslike registrado com sucesso para a mensagem de ID ${idmsg}` });
//           disconnectFromDatabase(dbconnection);
//         });
//       });
//     } else { // usuario quer anular o deslike clicando novamente no botão de like, anula o like sem dar deslikes
//       let userDeslike = resultsDeslike[0];
//       if (userDeslike.like_status === 'dislike') {
//         const removeLike = `UPDATE user_likes SET like_status = ? WHERE id = ?`;
//         const anular_like = 'anulado';
//         dbconnection.query(removeLike, [anular_like, userDeslike.id], (err) => {
//           if (err) {
//             console.error('Erro ao reverter Deslike:', err);
//             res.status(500).json({ error: 'Erro ao reverter Deslike.' });
//             disconnectFromDatabase(dbconnection);
//             return;
//           }

//           const atualizaContLikeMensgens = `UPDATE mensgens SET deslikes = deslikes - 1 WHERE id = ?`;
//           dbconnection.query(atualizaContLikeMensgens, [idmsg], (err) => {
//             if (err) {
//               console.error('Erro ao atualizar contador de Deslike:', err);
//               res.status(500).json({ error: 'Erro ao atualizar contador de Deslike.' });
//               disconnectFromDatabase(dbconnection);
//               return;
//             }

//             res.status(200).json({ message: `Deslike revertido com sucesso para a mensagem de ID ${idmsg}` });
//             disconnectFromDatabase(dbconnection);
//           });
//         });
//        } else if (userDeslike.like_status === 'anulado') { // usuario ja deu deslike, 
//          const reativarLike = `UPDATE user_likes SET like_status = ? WHERE id = ?`;
//          const reativar_like = 'dislike';
//         dbconnection.query(reativarLike, [reativar_like, userDeslike.id], (err) => {
//           if (err) {
//             console.error('Erro ao reativar Deslike:', err);
//             res.status(500).json({ error: 'Erro ao reativar Deslike.' });
//             disconnectFromDatabase(dbconnection);
//             return;
//           }

//           const atualizaContLikeMensgens = `UPDATE mensgens SET deslikes = deslikes + 1 WHERE id = ?`;
//           dbconnection.query(atualizaContLikeMensgens, [idmsg], (err) => {
//             if (err) {
//               console.error('Erro ao atualizar contador de likes:', err);
//               res.status(500).json({ error: 'Erro ao atualizar contador de likes.' });
//               disconnectFromDatabase(dbconnection);
//               return;
//             }

//             res.status(200).json({ message: `Like reativado com sucesso para a mensagem de ID ${idmsg}` });
//             disconnectFromDatabase(dbconnection);
//           });
//         });
//        }else{
//         const likeParaDeslike = `UPDATE user_likes SET like_status = ? WHERE id = ?`;
//         const deslike_para_like = 'dislike';
//         dbconnection.query(likeParaDeslike, [deslike_para_like, userDeslike.id], (err) => {
//           if (err) {
//             console.error('Erro ao reativar like:', err);
//             res.status(500).json({ error: 'Erro ao reativar like.' });
//             disconnectFromDatabase(dbconnection);
//             return;
//           }

//            // Decrementar like
//           const atualizaContDeslikeMensgens = `UPDATE mensgens SET likes = likes - 1 WHERE id = ?`;
//           dbconnection.query(atualizaContDeslikeMensgens, [idmsg], (err) => {
//             if (err) {
//               console.error('Erro ao atualizar contador de likes:', err);
//               res.status(500).json({ error: 'Erro ao atualizar contador de likes.' });
//               disconnectFromDatabase(dbconnection);
//               return;
//             }
//              // Incrementar deslikes
//           const atualizaContLikeMensgens = `UPDATE mensgens SET deslikes = deslikes + 1 WHERE id = ?`;
//           dbconnection.query(atualizaContLikeMensgens, [idmsg], (err) => {
//             if (err) {
//               console.error('Erro ao atualizar contador de likes:', err);
//               res.status(500).json({ error: 'Erro ao atualizar contador de likes.' });
//               disconnectFromDatabase(dbconnection);
//               return;
//             }           
//           });

//             res.status(200).json({ message: `Deslike incrementado  com sucesso\ like decrementado com sucesso\n para a mensagem de ID ${idmsg}` });
//             disconnectFromDatabase(dbconnection);
//           });
//         });
//        }
//     }
//   });
 
// }
});

module.exports = router;
