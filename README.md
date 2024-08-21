# Projeto: Ninjafeeders

Trata-se de um quadro de mensagens com aspectos sociais, semelhante a outras redes sociais, mas com requisitos simplificados. Esse sistema compõe um quadro de mensagens, semelhante à listagem de publicações de uma rede social.

Cada mensagem possui um título de 72 caracteres e um corpo de 280 caracteres.

A mensagem marcada como privada antes de ser enviada terá sua visibilidade definida como privada. Já a mensagem que o usuário não marcar como privada na hora de enviar, automaticamente será definida como pública e todos os membros da rede poderão visualizar e interagir com ela.

## Apresentação da Rede Social Ninjafeeders

### 1. Visão Geral:
Ninjafeeders é uma rede social com o front-end construído em Angular (HTML, CSS, Bootstrap, TypeScript) e o back-end em Node.js (JavaScript), onde os usuários podem compartilhar mensagens, interagir com outros membros, formar amizades, e postar mensagens públicas e privadas.

#
### 2. Funcionalidades Principais:

- **Acesso Inicial:**
  - **Visualização de Mensagens (Sem Cadastro/Logado):** Ao acessar a página inicial do Ninjafeeders, qualquer usuário pode visualizar as três últimas mensagens postadas na rede. No entanto, essas mensagens são apenas para leitura; sem login, não é possível interagir com elas (dar like, dislike ou enviar novas mensagens).
    
- <img src="https://github.com/NinjaFeeders/ninja-feeders-web/blob/master/src/assets/img_readme/img_aplicacao/visualizar_msg_semregistroelogin.png?raw=true"/>


#
- **Registro e Login:**
  - **Registro:** Para participar ativamente na rede, o usuário deve se registrar, fornecendo as informações necessárias.
- <img src="https://github.com/NinjaFeeders/ninja-feeders-web/blob/master/src/assets/img_readme/img_aplicacao/registro.png?raw=true"/>
  - 
#
  - **Login:** Após o registro, o usuário faz login para acessar todas as funcionalidades da rede.
  <img src="https://github.com/NinjaFeeders/ninja-feeders-web/blob/master/src/assets/img_readme/img_aplicacao/login.png?raw=true"/>

#
- **Interação com Mensagens:**
  - **Envio de Mensagens:** Usuários logados podem enviar mensagens públicas ou privadas.
    - **Mensagens Públicas:** Visíveis para todos os membros da rede, independentemente de serem amigos ou não.
    - **Mensagens Privadas:** Visíveis apenas para amigos do usuário que enviou a mensagem.
   
    
 <img src="https://github.com/NinjaFeeders/ninja-feeders-web/blob/master/src/assets/img_readme/img_aplicacao/postar_msg.png?raw=true"/>
#
  - **Like e Dislike:** Usuários logados podem curtir ou não curtir mensagens públicas. Podem curtir ou não curtir as mensagens privadas desde que tenham sido postadas por si mesmos ou por seus amigos.
  
-  <img src="https://github.com/NinjaFeeders/ninja-feeders-web/blob/master/src/assets/img_readme/img_aplicacao/like%20deslike.png?raw=true"/>
#
- **Sistema de Amizade:**
  - **Enviar Solicitação de Amizade:** Usuários logados podem enviar solicitações de amizade para outros membros.
-  <img src="https://github.com/NinjaFeeders/ninja-feeders-web/blob/master/src/assets/img_readme/img_aplicacao/add_amizade.png?raw=true"/>
#
- **Receber Solicitações de Amizade:** Usuários podem receber solicitações de amizade de outros membros. As solicitações de amizades aparecerão em um popup no topo da tela quando o usuário a quem foi solicitado fizer login.
  - **Aceitar ou Recusar Solicitações:** Cada solicitação de amizade recebida pode ser aceita ou recusada.
 <img src="https://github.com/NinjaFeeders/ninja-feeders-web/blob/master/src/assets/img_readme/img_aplicacao/aceitar_ou_recusar_amizade.png?raw=true"/>
  - **Visualização de Mensagens Privadas:** Somente amigos podem visualizar as mensagens privadas uns dos outros.

### 3. Experiência do Usuário:
#
- **Usuário Não Logado:**
  - Tem acesso limitado, podendo apenas visualizar as últimas mensagens públicas postadas.
  - Não pode interagir com as mensagens ou enviar novas mensagens.
 <img src="https://github.com/NinjaFeeders/ninja-feeders-web/blob/master/src/assets/img_readme/img_aplicacao/usuario_nao_logado.png?raw=true"/>

- **Usuário Logado:**
  - Tem acesso total às funcionalidades da rede.
  - Pode interagir com mensagens públicas, enviar mensagens (públicas ou privadas) e gerenciar suas amizades.
 <img src="https://github.com/NinjaFeeders/ninja-feeders-web/blob/master/src/assets/img_readme/img_aplicacao/usuario_logado.png?raw=true"/>



 # Dados tecnicos:
Ferramentas e configurações  para rodar esse projeto no ambiente de Desenvolvimento

### Vs-code: 
https://code.visualstudio.com/sha/download?build=stable&os=win32-x64-user

### Angular 8.0.3:
npm install -g @angular/cli@8.0.3 

### Angular CLI 8.0.6:
npm install -g @angular/cli@8.0.6

### Node: 16.20.2
https://nodejs.org/dist/v16.20.2/win-x64/node.exe


Package                           Version
-----------------------------------------------------------
#### @angular-devkit/architect         0.800.6
#### @angular-devkit/build-angular     0.800.6
#### @angular-devkit/build-optimizer   0.800.6
#### @angular-devkit/build-webpack     0.800.6
#### @angular-devkit/core              8.0.6
#### @angular-devkit/schematics        8.0.6
#### @angular/cli                      8.0.6
#### @ngtools/webpack                  8.0.6
#### @schematics/angular               8.0.6
#### @schematics/update                0.800.6
#### rxjs                              6.4.0
#### typescript                        3.4.5
#### webpack                           4.30.0


#

na arvore da extrutura abaixo vera uma pasta o arquivo exportado do DB
	
![Alt text](https://github.com/NinjaFeeders/ninja-feeders-web/blob/master/src/assets/img_readme/img_como_rodar_aplicacao/visualizar_msg_semregistroelogin.png?raw=true "a title")

crie um banco de dados no wamp ou no xamp , com o nome “ ninjafeeders ” e import para ele a extrutura das tabelas que esta no no arquivo ninjafeeders.sql

feito isso: no termian dentro da pasta principal do projeto digite cd servidor-node para acessar a pasta do servidor node js, para inicializar o mesmo:

![Alt text](https://github.com/NinjaFeeders/ninja-feeders-web/blob/master/src/assets/img_readme/img_como_rodar_aplicacao/servidor_node.png?raw=true "a title")

para iniciar o servidor nodejs digite o comando npm start server.js, ou apenas npm start
se tudo estiver funcionando bem o resultado no terminal  sera igual o da imagem abaixo:

![Alt text](https://github.com/NinjaFeeders/ninja-feeders-web/blob/master/src/assets/img_readme/img_como_rodar_aplicacao/iniciar_servidor_node.png?raw=true "a title")

caso de algum erro certifique-se que a porta 8000 do windows esteja aberta, caso seja necessario mudar de porta: dentro da pasta do servidor-node abra o arquivo server.js e altere a porta na linha de codigo mostrada na imagem abaixo, para uma porta disponível no seu sistema, 

![Alt text](https://github.com/NinjaFeeders/ninja-feeders-web/blob/master/src/assets/img_readme/img_como_rodar_aplicacao/definir_porta_do_servidor.png?raw=true "a title")
	
ainda no arquivo server.js, note essa linha de codigo:

![Alt text](https://github.com/NinjaFeeders/ninja-feeders-web/blob/master/src/assets/img_readme/img_como_rodar_aplicacao/rota_de_exemplo.png?raw=true "a title")

abra um navegador web,  na barra de endereço digite a url: http:\\localhost:8000
 a msg do res.send( ) aparecera no navegador indicando que o servidor node esta funcionando corretamente, no navegador você tera o seguinte resultado:
	
![Alt text](https://github.com/NinjaFeeders/ninja-feeders-web/blob/master/src/assets/img_readme/img_como_rodar_aplicacao/teste_no_navegador.png?raw=true "a title")

ainda dentro do servidor-node dentro da pasta route, você tem os endpoints, que é onde chegara as requisições para o DB, 

![Alt text](https://github.com/NinjaFeeders/ninja-feeders-web/blob/master/src/assets/img_readme/img_como_rodar_aplicacao/servidor_node_pasta_router.png?raw=true "a title")

abrindo esses arquivos você tera acesso aos endpoints,  que nos possibilita fazer alguns teste pra ver a comunicão com o DB, por exemplo: dentro do arquivo messages.js, temos o seguinte:

![Alt text](https://github.com/NinjaFeeders/ninja-feeders-web/blob/master/src/assets/img_readme/img_como_rodar_aplicacao/endpoint_mensgens.png?raw=true "a title")
	
se irmos no navegador e digitar aquela url que testamos antes mais o prefixo de rota /api mais o nome do end point, teremos a seguinte url **http:\\localhost:8000\api\mensgens** , se colocarmos no navegador e dar enter, teremos o seguinte resultado:

![Alt text](https://github.com/NinjaFeeders/ninja-feeders-web/blob/master/src/assets/img_readme/img_como_rodar_aplicacao/teste_endpoint.png?raw=true "a title")

ele nos retorna todos os dados recuperado pela requisição dessa rota,  isso nos garante que até aqui tudo funcionou como deveria.


Até aqui iniciamos o backend da nossa aplicação.

Iniciando o front end da aplicação:

no terminal do vs code, dentro da pasta do projeto ninja-feeders-web:

![Alt text](https://github.com/NinjaFeeders/ninja-feeders-web/blob/master/src/assets/img_readme/img_como_rodar_aplicacao/iniciar_front_end.png?raw=true "a title")

digite ng serve

devemos ter esse resultado:

![Alt text](https://github.com/NinjaFeeders/ninja-feeders-web/blob/master/src/assets/img_readme/img_como_rodar_aplicacao/abrintdo_aplicacao.png?raw=true "a title")

até aqui tudo correu bem, segure o control, e click com o botão esquerdo do mouse, na url:
**http://localhost:4200**

e o resultado devera ser esse:

![Alt text](https://github.com/NinjaFeeders/ninja-feeders-web/blob/master/src/assets/img_readme/img_como_rodar_aplicacao/aplicacao_aberta.png?raw=true "a title")

pronto! Basta se registrar, fazer login e poderá testar a aplicação

