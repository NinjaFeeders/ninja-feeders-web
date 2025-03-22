const express = require('express');
const { connectToDatabase, disconnectFromDatabase } = require('../database');
const router = express.Router();
const { authenticateJWT } = require('./login');

// Enviar solicitação de amizade
router.post('/friends', (req, res) => {
    console.log("requisição ",req.body)
    const dbconnection = connectToDatabase();
    const {user_name, user_id,friend_id,user_name_friend_id } = req.body;
  
    if (!user_name,!user_id,!friend_id) {
         return res.status(400).json({ message: 'O ID do amigo é obrigatório.' });
    }

    const insertFriends = 'INSERT INTO friends (user_name,user_id,friend_name, friend_id) VALUES (?,?,?,?)'; // 
    console.log(user_id, "e", friend_id,"chegour no end pint");
    dbconnection.query(insertFriends, [user_name,user_id,user_name_friend_id,friend_id], (error, result) => {
        if (error) {
            console.log(user_id, "e", friend_id,"chegour no end pint");
            console.error('Erro ao enviar solicitação de amizade:', error);
            return res.status(500).json({ message: 'Erro ao enviar solicitação de amizade.' });
        } else {
            res.status(201).json({ message: 'Solicitação de amizade enviada com sucesso.' });
        }
        disconnectFromDatabase(dbconnection);
    });
});

// notificação para o usuario a quem foi feito uma solicitação de amizade

// solicitação de amizade pendentes
router.post('/friends/pending', (req, res) => {
    const dbconnection = connectToDatabase();
    const {friend_id} = req.body;
    console.log("user_id chegou no end point friends/pending", friend_id);

    const sqlSelectPending = 'SELECT * FROM friends WHERE friend_id = ? AND status = "Pendente"';
    dbconnection.query(sqlSelectPending,[friend_id], (error, results) => { // eu sou o friend_id
        if (error) {
            console.error('Erro ao recuperar solicitações pendentes:', error);
            return res.status(500).json({ message: 'Erro ao recuperar solicitações pendentes.' });
        }
       
        res.status(200).json(results);
        disconnectFromDatabase(dbconnection);
    });
});

// estatus de amizade, se é amgigo ou se esta com solicitação pendente

router.post('/friend/status', (req, res) => {
    console.log('/friend/status');
    const dbconnection = connectToDatabase();
    const { friend_id, user_id } = req.body;
    
    const sqlstatus = `
        SELECT status 
        FROM friends 
        WHERE (user_id = ? AND friend_id = ?) 
           OR (user_id = ? AND friend_id = ?)
    `;
    
    dbconnection.query(sqlstatus, [user_id, friend_id, friend_id, user_id], (error, results) => {
        if (error) {
            console.error('Erro ao recuperar status da amizade:', error);
            disconnectFromDatabase(dbconnection); // Desconectar imediatamente em caso de erro
            return res.status(500).json({ message: 'Erro ao recuperar status da amizade.' });
        }

        if (results.length > 0) {
            res.status(200).json({ status: results[0].status }); // Retornar apenas o campo "status"
        } else {
            res.status(404).json({ message: 'Amizade não encontrada.' }); // Caso não tenha resultados
        }

        disconnectFromDatabase(dbconnection); // Desconectar após a resposta
    });
});



// Aceitar solicitação de amizade
router.put('/friends/accept', (req, res) => {
    const dbconnection = connectToDatabase();
    const { id, user_id,friend_id } = req.body;

    const sqlUpdate = 'UPDATE friends SET status = ? WHERE id = ? AND user_id = ? AND friend_id = ?';
    dbconnection.query(sqlUpdate, ['Amigos', id, user_id,friend_id], (error, result) => {
        if (error) {
            console.error('Erro ao aceitar solicitação de amizade:', error);
            return res.status(500).json({ message: 'Erro ao aceitar solicitação de amizade.' });
        } else {
            res.status(200).json({ message: 'Solicitação de amizade aceita com sucesso.' });
        }
        disconnectFromDatabase(dbconnection);
    });
});

// Rejeitar solicitação de amizade
router.post('/friends/reject', (req, res) => {
    const dbconnection = connectToDatabase();
    const { requestId,user_id,friend_id } = req.body;

    const sqlUpdate ='DELETE FROM friends WHERE id = ? AND user_id = ? AND friend_id = ?';
    dbconnection.query(sqlUpdate, [requestId,user_id,friend_id], (error, result) => {
        if (error) {
            console.error('Erro ao rejeitar solicitação de amizade:', error);
            return res.status(500).json({ message: 'Erro ao rejeitar solicitação de amizade.' });
        } else {
            res.status(200).json({ message: 'Solicitação de amizade rejeitada.' });
        }
        disconnectFromDatabase(dbconnection);
        
    });
});

// Listar amizades do usuário
router.get('/friends/list', (req, res) => {
    
    const dbconnection = connectToDatabase();

    const sqlSelect = 'SELECT * FROM friends';
    dbconnection.query(sqlSelect,  (error, results) => {
        if (error) {
            console.error('Erro ao recuperar amizades:', error);
            res.status(500).json({ message: 'Erro ao recuperar amizades.' });
            return;
        }
        res.status(200).json(results);
        disconnectFromDatabase(dbconnection);
    });
});

// Listar amizades especifica  do usuário, este end point não esta em uso
router.post('/friends/list/especific', (req, res) => {
    const dbconnection = connectToDatabase();
    const {user_name, user_id,friend_id} = req.body;
    const SelectFriendEspecific = 'SELECT * FROM friends WHERE user_name = ? AND user_id = ? AND friend_id = ? ';
    dbconnection.query(SelectFriendEspecific,[user_name, user_id,friend_id],  (error, results) => {
        if (error) {
            console.error('Erro ao recuperar amizades:', error);
            res.status(500).json({ message: 'Erro ao recuperar amizades.' });
            return;
        }
        res.status(200).json(results);
        disconnectFromDatabase(dbconnection);
    });
});


// amigos do user logado

// Adicione este endpoint no arquivo de rotas de amigos
router.get('/friends/myFriends/:user_id', (req, res) => {
   
    const dbconnection = connectToDatabase();
    const { user_id } = req.params;
    console.log(`Ops! user id ${user_id} no end point /friends/myFriends/:user_id `);
    const sqlSelect = `
    SELECT friend_id, user_id
    FROM friends
    WHERE (user_id = ? OR friend_id = ?) AND status = 'Amigos'
    `;
    dbconnection.query(sqlSelect, [user_id,user_id], (error, results) => {
        if (error) {
            console.error('Erro ao recuperar amigos:', error);
            return res.status(500).json({ message: 'Erro ao recuperar amigos.' });
        }
        console.log(results)
        res.status(200).json(results);
       
        disconnectFromDatabase(dbconnection);
    });
});


module.exports = router;
