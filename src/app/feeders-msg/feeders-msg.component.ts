import { Component, OnInit, Input } from '@angular/core';
import { stringify } from 'querystring';
import { AuthService } from '../auth.service';
import { MensagensService } from '../mensagens.service';


interface Message {
  id: number;
  titulomsg: string;
  msg: string;
  likes: number;
  deslikes: number
  autor: string;
  criada_em:Date;
  pontos: number;
  visibilidade_msg:string;
}




@Component({
  selector: 'app-feeders-msg',
  templateUrl: './feeders-msg.component.html',
  styleUrls: ['./feeders-msg.component.css']
})
export class FeedersMsgComponent implements OnInit {
  messages: Message[] = []; // atribuimos o array messages  o tipo da interface Messages, assim nos modelamos(definimos uma tipagem)
  // para cada propriedade que armazenaremos no array messages,  significa que messages será um array de objetos do tipo Message.

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
  dateFormated:Date;

  constructor(private listMSG: MensagensService, private listUsers: AuthService) { }

  ngOnInit(): void {
    // ****************
    this.listMSG.novaMensagem$.subscribe(newMessage => {
      if (newMessage) {
        this.loadMSG();
        this.messages.unshift(newMessage); // Adicionar nova mensagem no início da lista
        // this.totalPages = Math.ceil(this.messages.length / this.itemsPerPage);
        // this.expandedMessages = new Array(this.messages.length).fill(false);
      }
    });
    this.loadMSG();
  }


  loadMSG() {

    console.log('Recuperando mensgens dos usuarios...');

    this.listMSG.getAllmessage().subscribe(data => {
      this.isUserLoggedin = this.listUsers.isAuthenticated(); // a função isAutenticated retorn um true se o usuario tiver logado
      console.log("autenticated: ", this.isUserLoggedin)
      if (!this.isUserLoggedin) { // se o usuario não estiver logado:
        data = data.filter(message => message.visibilidade_msg ==='public')// filtra as msg pela visibilidade === public
                   .sort((a,b)=>new Date(b.criada_em).getTime() -new Date(a.criada_em).getTime()) // essa linha Faz com que o array de mensagens seja ordenado de modo que as mensagens mais recentes apareçam primeiro. Ela converte as datas de criação das mensagens para milissegundos e as compara para determinar a ordem. pesquise sobre o metodo sort() para saber mais
                   .slice(0, 3); // a lisata de msg sera limitada as 3 ultimas msg registrada, se o usr estiver logado essa linha de codigo sera ignorada
         
      }
      this.messages = data;
      console.log("LoadMSG add msg do DB\n no array messages\n tipado com a interface Message[] ", this.messages);
      // o codigo envolvido nos + e = é apenas um teste de captura da quantidade de like e deslike, para implementar o puntuação geral da msg
      //++++++++++++++++++++++++====================++++++++++++++++++++++++++++++++====================================
      this.messages.forEach((data, index) => { // percorre o array de messages e implementa a PG da msg em cada index
        data.pontos = data.likes - data.deslikes; // aqui eu implemento a pontuação geral da msg, que ficara armazena n propriedade pontos da interface message
        // console.log("LoadMSG add likes do DB\n em uma variavel", data.pontos, " id ", data.id);

        // expandedMessages armazena um valor true ou false: Expande ou contrai a Msg
        this.expandedMessages[index] = data.pontos >= 0 ? true : false; // Se data.pontos for maior ou igual a zero:  a expressão expandedMessages[index] na posição do index retorna true, do contrario false.
      //   if(data.pontos >=0){
      //     this.expandedMessages[index]=true;
      //   }else{
      //     this.expandedMessages[index]= false;
      //   }
       })
      //++++++++++++++++++++++++====================++++++++++++++++++++++++++++++++====================================
      this.totalPages = Math.ceil(this.messages.length / this.itemsPerPage);
    },
      error => {
        console.error('Erro ao recuperar feedbacks:', error);
      });


  }



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

  like(idmsg: number) { // toogle like deslike

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

  deslike(idmsg: number) {
    this.isLike = false;
    this.like_status = 'dislike';
    this.idUserDandoLike = Number(this.listUsers.getIdUser()); // Id do usuario logado acessivel nesse componente, para prencher o campo id_user "chave estrangeira" na tabela user_likes

    this.listMSG.likeMsg(idmsg, this.isLike, this.idUserDandoLike, this.like_status).subscribe(
      response => {
        console.log(`Response from server: ${response.message}`);
        // Atualizar localmente o contador de deslikes

        const message = this.messages.find(msg => msg.id == idmsg);
        if (message) {
          message.deslikes++;
        }
        this.loadMSG();

      }, error => {
        console.error('Erro ao enviar deslike:', error);
      }
    )
  }

  // pointsOfMessages(likeTotal:number, deslikeTotal:number):number{
  //   return this.pontosDaMensgem = likeTotal-deslikeTotal;

  // }
}
