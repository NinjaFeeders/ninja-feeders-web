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
    
- ![alt text](https://github.com/NinjaFeeders/ninja-feeders-web/blob/master/src/assets/img_readme/visualizar_msg_semregistroelogin.png?raw=tru "Title")
- <img "https://github.com/NinjaFeeders/ninja-feeders-web/blob/master/src/assets/img_readme/img_aplicacao/visualizar_msg_semregistroelogin.png?raw=true"/>


#
- **Registro e Login:**
  - **Registro:** Para participar ativamente na rede, o usuário deve se registrar, fornecendo as informações necessárias.
- ![alt text](https://github.com/NinjaFeeders/ninja-feeders-web/blob/master/src/assets/img_readme/registro.png?raw=true "Title")
  - 
#
  - **Login:** Após o registro, o usuário faz login para acessar todas as funcionalidades da rede.
- ![alt text](https://github.com/NinjaFeeders/ninja-feeders-web/blob/master/src/assets/img_readme/login.png?raw=true "Title")

#
- **Interação com Mensagens:**
  - **Envio de Mensagens:** Usuários logados podem enviar mensagens públicas ou privadas.
    - **Mensagens Públicas:** Visíveis para todos os membros da rede, independentemente de serem amigos ou não.
    - **Mensagens Privadas:** Visíveis apenas para amigos do usuário que enviou a mensagem.
   
    
- ![alt text](https://github.com/NinjaFeeders/ninja-feeders-web/blob/master/src/assets/img_readme/postar_msg.png?raw=true "Title")

#
  - **Like e Dislike:** Usuários logados podem curtir ou não curtir mensagens públicas. Podem curtir ou não curtir as mensagens privadas desde que tenham sido postadas por si mesmos ou por seus amigos.
  
- ![alt text](https://github.com/NinjaFeeders/ninja-feeders-web/blob/master/src/assets/img_readme/like%20deslike.png?raw=true "Title")
#
- **Sistema de Amizade:**
  - **Enviar Solicitação de Amizade:** Usuários logados podem enviar solicitações de amizade para outros membros.
- ![alt text](https://github.com/NinjaFeeders/ninja-feeders-web/blob/master/src/assets/img_readme/add_amizade.png?raw=true "Title")
#
- **Receber Solicitações de Amizade:** Usuários podem receber solicitações de amizade de outros membros. As solicitações de amizades aparecerão em um popup no topo da tela quando o usuário a quem foi solicitado fizer login.
  - **Aceitar ou Recusar Solicitações:** Cada solicitação de amizade recebida pode ser aceita ou recusada.
- ![alt text](https://github.com/NinjaFeeders/ninja-feeders-web/blob/master/src/assets/img_readme/aceitar_ou_recusar_amizade.png?raw=true "Title")

  - **Visualização de Mensagens Privadas:** Somente amigos podem visualizar as mensagens privadas uns dos outros.

### 3. Experiência do Usuário:
#
- **Usuário Não Logado:**
  - Tem acesso limitado, podendo apenas visualizar as últimas mensagens públicas postadas.
  - Não pode interagir com as mensagens ou enviar novas mensagens.
- ![alt text](https://github.com/NinjaFeeders/ninja-feeders-web/blob/master/src/assets/img_readme/usuario_nao_logado.png?raw=true "Title")


- **Usuário Logado:**
  - Tem acesso total às funcionalidades da rede.
  - Pode interagir com mensagens públicas, enviar mensagens (públicas ou privadas) e gerenciar suas amizades.
- ![alt text](https://github.com/NinjaFeeders/ninja-feeders-web/blob/master/src/assets/img_readme/usuario_logado.png?raw=true "Title")

