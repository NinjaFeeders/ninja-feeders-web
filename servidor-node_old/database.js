const mysql = require('mysql');

// //conexão para uso no local de desenvolvimento
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password:'',
//     database:'restoredhome'
//   });
  
//   //Manter a conexão viva em caso de não poder abrir e fechar a conexão manualmente
//   function keepAlive() {
//     connection.ping((err) => {
//       if (err) {
//         console.error('Erro ao enviar ping para manter a conexão viva:', err.stack);
//       } else {
//         console.log('Ping enviado para manter a conexão viva.');
//       }
//     });
//   }
  
//   // Enviar um ping a cada 15 minutos (900000 milissegundos) mantendo a conexão aberta no caso de o servidor de banco de dados ter um timeOut
//   setInterval(keepAlive, 9000);
  
//   connection.connect((err) => {
//     if (err) {
//       console.error('Erro ao conectar ao banco de dados:', err);
//       return;
//     }
//     console.log('Conexão bem-sucedida com o banco de dados MySQL.');
//   });
  
//   module.exports = connection;


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

module.exports = {
  connectToDatabase,
  disconnectFromDatabase
};

