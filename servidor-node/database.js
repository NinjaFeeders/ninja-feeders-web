const mysql = require('mysql');

// conexão que é iniciada apenas quando o metodo get post put delete, que faz a requisição for chamado

// conexão para publicação
const createConnection = () => {
  return mysql.createConnection({
    host: 'localhost',
        user: 'root',
        password:'',
        database:'ninjafeeders',
        port: 3307, // essa definição de porta é importante, para usar o DB do wampserver, isso não é necessario para o xamp
    connectTimeout: 10000 // Tempo limite para a conexão em milissegundos (opcional)
  });
};

const connectToDatabase = () => {
  const connection = createConnection();
  console.log('Criando conexão com o banco de dados...');
  connection.connect(err => {
    if (err) {
      console.error('Erro ao conectar ao banco de dados:', err);
      throw err;
    }
    console.log('Conexão com o banco de dados estabelecida.');
  });
  return connection;
};

const disconnectFromDatabase = (connection) => {
  if (connection) {
    connection.end(err => {
      if (err) {
        console.error('Erro ao desconectar do banco de dados:', err);
      } else {
        console.log('Conexão com o banco de dados encerrada.');
      }
    });
  }
};

module.exports = {connectToDatabase, disconnectFromDatabase
};

