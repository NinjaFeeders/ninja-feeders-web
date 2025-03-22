// esse é um serviço que inicia o servidor automaticamente
// esse serviço precisa do seguinte modulo instalado na pasta do servidor node: npm install node-windows
// apos a instalação do modulo, e do codigo implementado nesse arquivo, deve ser executado o seguinte comando
// para execultar o script que instalara oa serviço no windows.
// codigo pra executar o script: node service.js  
// lembrando que service.js foi o nome dado ao arquivo em que aqui estamos implementando o script
// apos a instalação do serviço devemos ir em serviços do windows encontrar serviço que criamos no nosso caso: MeuServicoNode
// clicar nele com o direito do mause, clicar em propriedade e segue a instrução abaixo:
/**
 * Configurar as Ações de Recuperação:

Você verá opções como "Primeira falha", "Segunda falha" e "Falha Subsequente". Cada uma dessas opções permite configurar uma ação específica para a falha correspondente.
Para configurar o serviço para reiniciar automaticamente após falhas, você pode selecionar a opção "Reiniciar o serviço" em todas as caixas de seleção de ação para as falhas desejadas (Primeira falha, Segunda falha e Falha Subsequente).
Aplicar as Configurações:

Após configurar as ações desejadas, clique em "Aplicar" e depois em "OK" para salvar as configurações.
 * 
 */ 

const Service = require('node-windows').Service;

// Cria um novo objeto de serviço
const svc = new Service({
  name: 'ServidorNodeAtualmenteEmExecucao',
  description: 'Servidor Node.js iniciado automaticamente',
  // o caminho abaixo é usado no ambiente de desenvolvimento, é onde esta a pasta servidor-node com o script server.js
  //script: 'D:\\angeloProjeto\\restoredHome_angular\\testes\\restoredHouse\\servidor-node\\server.js', // Caminho correto do seu script
  // o caminho abaixo é usado no ambiente de produção, é onde esta a pasta servidor-node com o script server.js
  script: 'C:\\inetpub\\wwwroot\\servidor-node\\server.js',
  // Define a opção para reiniciar automaticamente em caso de falha
  restart: {
    period: 60000, // 1 minuto em milissegundos
    times: 3 // Número de tentativas de reinício
  }
});

// Escuta o evento de "install" para iniciar o serviço assim que for instalado
svc.on('install', function() {
  svc.start();
});

// Instala o serviço
svc.install();
