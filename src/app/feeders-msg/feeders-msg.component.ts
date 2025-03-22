import { Component, OnInit, Input } from '@angular/core';
import { stringify } from 'querystring';
import { AuthService } from '../auth.service';
import { MensagensService } from '../mensagens.service';
import { Friend } from '../models/model_friends';
import { Message } from '../models/model_messages';




@Component({
  selector: 'app-feeders-msg',
  templateUrl: './feeders-msg.component.html',
  styleUrls: ['./feeders-msg.component.css']
})
export class FeedersMsgComponent implements OnInit {
  messages: Message[] = []; // atribuimos o array messages  o tipo da interface Messages, assim nos modelamos(definimos uma tipagem)
  // para cada propriedade que armazenaremos no array messages,  significa que messages será um array de objetos do tipo Message.

  friends: Friend[] = []; // usado para recuperar os amigos

  // usados na implementação da paginação 
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 0;


  // usadao para implementação do like e deslikes
  idUserDandoLike: number;
  isLike: boolean;
  like_status: string;

  // usado para contrair e expandir a msg
  expandedMessages: boolean[] = [];
  pontuacaoGeral: number;
  isUserLoggedin: boolean = false;

  // usado para formatar a data de registro da msg
  dateFormated: Date;



  constructor(private listMSG: MensagensService, private listUsers: AuthService) { }

  ngOnInit(): void {
    // ****************
    this.listMSG.novaMensagem$.subscribe(newMessage => {
      if (newMessage) {
        this.loadMSG();
        this.getfriend();
        this.messages.unshift(newMessage); // Adicionar nova mensagem no início da lista
        // this.totalPages = Math.ceil(this.messages.length / this.itemsPerPage);
        // this.expandedMessages = new Array(this.messages.length).fill(false);
      }
    });
    this.loadMSG();
    this.getfriend();  // carregada apenad para fim de testes
  }


  loadMSG() {
    /** 
     *  O código está garantindo que o usuário atual veja:
        Todas as mensagens públicas.
        Suas próprias mensagens.
        Mensagens dos amigos com base em uma lista de amigos.
     */
    this.isUserLoggedin = this.listUsers.isAuthenticated();
    const userId = Number(this.listUsers.getIdUser());

    if (this.isUserLoggedin) {


      this.listMSG.getUserFriends(userId).subscribe(friends => {
        this.friends = friends;
        console.log(`userId em loadMSG ${userId}`);
        this.listMSG.getAllmessage().subscribe(data => {
          this.messages = data.filter(message => message.visibilidade_msg === 'public' || (userId === message.autor_id) ||
            this.friends.some(friend =>
              (friend.user_id === userId && friend.friend_id === message.autor_id) ||
              (friend.user_id === message.autor_id && friend.friend_id === userId)
            )
          )
            .sort((a, b) => new Date(b.criada_em).getTime() - new Date(a.criada_em).getTime()) // ordena as msg pela mantendo no topo da lista a postagem mais recente           
          this.updateMessageScores(); // Calcula a pontuação de cada mensagem.    
          this.moveTopMessageToTop(); // Identifica a mensagem com a maior pontuação e a move para o topo 
          this.scheduleTopMessageCheck(); // Verifica a cada 2 horas se a mensagem de maior pontuação mudou e, se sim, atualiza a lista.

          this.totalPages = Math.ceil(this.messages.length / this.itemsPerPage);
        });
      });
    } else { // carrega apenas as 3 mensagens publicas  mais recente
      this.listMSG.getAllmessage().subscribe(data => {
        this.messages = data
          .filter(message => message.visibilidade_msg === 'public')
          .sort((a, b) => new Date(b.criada_em).getTime() - new Date(a.criada_em).getTime())
          .slice(0, 3); // a lisata de msg sera limitada as 3 ultimas msg registrada, se o usr estiver logado essa linha de codigo sera ignorada

        this.totalPages = Math.ceil(this.messages.length / this.itemsPerPage);
        this.expandedMessages = new Array(this.messages.length).fill(false);
      });
    }

  }


  updateMessageScores() { // Calcula a pontuação de cada mensagem.
    this.messages.forEach((data, index) => {
      data.pontos = data.likes - data.deslikes; // Calcula a pontuação da mensagem
      this.expandedMessages[index] = data.pontos >= 0; // Expande ou contrai a mensagem
    });
  }

  moveTopMessageToTop() { // Identifica a mensagem com a maior pontuação e a move para o topo 
    if (this.messages.length > 0) {
      let topMessageIndex = 0; 
      let maxPontos = this.messages[0].pontos;

      // Encontrar a mensagem com a maior pontuação
      for (let i = 1; i < this.messages.length; i++) {
        if (this.messages[i].pontos > maxPontos) {
          topMessageIndex = i;
          maxPontos = this.messages[i].pontos;
        }
      }
      // Se a mensagem de maior pontuação não estiver no topo, mova-a para o topo
      if (topMessageIndex > 0) {
        const topMessage = this.messages.splice(topMessageIndex, 1)[0];
        this.messages.unshift(topMessage); // Move a mensagem de maior pontuação para o topo do array messages[]

        // Reordenar o array expandedMessages para sincronizar com a nova ordem de messages
        const movedExpansionState = this.expandedMessages.splice(topMessageIndex, 1)[0];
        this.expandedMessages.unshift(movedExpansionState); // Move o estado de expansão da mensagem de maior pontuação para o topo
      }
    }
  }

  scheduleTopMessageCheck() { // Verifica a cada 2 horas se a mensagem de maior pontuação mudou e, se sim, atualiza a lista.
    setInterval(() => {
      this.moveTopMessageToTop();
    }, 1 * 60 * 60 * 1000); // A cada 2 horas
  }





  // paginação das mensagens

  get paginatedMessages(): Message[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.messages.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if ((this.currentPage * this.itemsPerPage) < this.messages.length) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  getMessageIndex(paginatedIndex: number): number {
    return (this.currentPage - 1) * this.itemsPerPage + paginatedIndex;
  }

  // expandir e contrai msg __________inicio____________________________
  toggleExpand(index: number): void {
    this.expandedMessages[index] = !this.expandedMessages[index];
  }


  isExpanded(index: number): boolean {
    return this.expandedMessages[index];
  }
  // expandir e contrai msg __________fim____________________________



  // funcionalidade de dar like(goste) e dislike(não gostei)

  like(idmsg: number) { // toogle like anular o like

    this.isLike = true;
    this.like_status = 'like';
    this.idUserDandoLike = Number(this.listUsers.getIdUser()); // Id do usuario logado acessivel nesse componente, para prencher o campo id_user "chave estrangeira" na tabela user_likes
    console.log(`ID user acessivel no componente feeders-msg: ${this.idUserDandoLike}`)
    this.listMSG.likeMsg(idmsg, this.isLike, this.idUserDandoLike, this.like_status).subscribe(
      response => {
        console.log('Response from server:', response);
        console.log(`Response message: ${response.message}`);
        // atualizar localmente o controlador de likes
        const message = this.messages.find(msg => msg.id == idmsg);
        if (message) {
          message.likes++
        }
        this.loadMSG(); // chamando aqui o metodo que carraga as msg, ele recarrega as msg e atualiza as informações
      },
      error => {
        console.error('Erro ao enviar like:', error);
      }
    );
    console.log(`id da msg chegou no .ts: ${idmsg}`);



  }

  deslike(idmsg: number) { // toogle deslike e anular o deslike
    this.isLike = false;
    this.like_status = 'dislike';
    this.idUserDandoLike = Number(this.listUsers.getIdUser()); // Id do usuario logado acessivel nesse componente, para prencher o campo id_user "chave estrangeira" na tabela user_likes

    this.listMSG.likeMsg(idmsg, this.isLike, this.idUserDandoLike, this.like_status).subscribe(
      response => {
        console.log(`Response from server: ${response.message}`);
        // Atualizar localmente o contador de deslikes

        const message = this.messages.find(msg => msg.id == idmsg);
        if (message) {
          message.deslikes--;
        }
        this.loadMSG();

      }, error => {
        console.error('Erro ao enviar deslike:', error);
      }
    )
  }




  getfriend() {
    const id = Number(this.listUsers.getIdUser()); // 
    console.log(`getFriend: ${id} `);
    console.log(typeof id);
    this.listMSG.getUserFriends(id).subscribe(data => {
      this.friends = data;

      this.friends.forEach(data => {


        console.log(`getFriend : ${data.friend_id}`)
      })
    })
  }
}
