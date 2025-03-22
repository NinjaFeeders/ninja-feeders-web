<?php

// Função para criar a conexão com o banco de dados
function createConnection() {
    // Conexão para ambiente de produção
    /*
    $host = 'ninjafeeders.mysql.dbaas.com.br';
    $user = 'ninjafeeders';
    $password = 'A@ZuyTc256E';
    $database = 'ninjafeeders';
    */

    // Conexão para ambiente de desenvolvimento
    $host = 'ninjafeeders2.mysql.dbaas.com.br';
    $user = 'ninjafeeders2';
    $password = 'K474r1n@';
    $database = 'ninjafeeders2';

    // Conectar ao banco de dados
    $connection = new mysqli($host, $user, $password, $database);

    // Verificar se a conexão foi bem-sucedida
    if ($connection->connect_error) {
        die('Erro ao conectar ao banco de dados: ' . $connection->connect_error);
    }
    
    // Configurar o tempo limite para a conexão
    $connection->options(MYSQLI_OPT_CONNECT_TIMEOUT, 10);

    return $connection;
}

// Função para conectar ao banco de dados
function connectToDatabase() {
    $connection = createConnection();
    echo 'Criando conexão com o banco de dados...<br>';
    return $connection;
}

// Função para desconectar do banco de dados
function disconnectFromDatabase($connection) {
    if ($connection) {
        $connection->close();
        echo 'Conexão com o banco de dados encerrada.<br>';
    }
}

// Exemplo de uso das funções
$connection = connectToDatabase();
// Realizar operações no banco de dados...
disconnectFromDatabase($connection);
