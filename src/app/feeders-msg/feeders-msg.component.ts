import { Component, OnInit,Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { MensagensService } from '../mensagens.service';


interface Message {
  id:number;
  titulomsg:string;
  msg: string;
  like: number;
  deslike:number
  autor: string;
}

interface users{
  
  username:string;
  id:number;

}



@Component({
  selector: 'app-feeders-msg',
  templateUrl: './feeders-msg.component.html',
  styleUrls: ['./feeders-msg.component.css']
})
export class FeedersMsgComponent implements OnInit  {

  

 

  messages:Message[] = [];
  usersLogados:users[]=[];
  autorDaMensagem:any;
  currentPage = 1;
  itemsPerPage = 5;
  totalPages=0;

 
  buttonLike:boolean = false;
  btnLike:string="";
  btnDeslike:string="";
  autorMsgLikeDislike:string ="";
  idStyleMsg:number;
  isLike:boolean;
  
 
 
  expandedMessages: boolean[] = [];

  constructor(private listMSG:MensagensService, private listUsers:AuthService){}

  ngOnInit(): void {
    this.loadMSG();
    this.loadUsers();
  }


  loadMSG() {

    console.log('Recuperando mensgens dos usuarios...');

    this.listMSG.getAllmessage().subscribe(data => {
        
      this.messages = data;
   
      this.totalPages = Math.ceil(this.messages.length/this.itemsPerPage); // usado para implementar o valor total de paginas para paginação
      this.expandedMessages = new Array(this.messages.length).fill(false); // usado para implementar a expanção do texto da mensagem
      },     
      error => {
        console.error('Erro ao recuperar feedbacks:', error);
      });
     this.messages.forEach(
      item => {
          this.autorDaMensagem=item.autor;
         
         
          
      }      
     )
     console.log(this.autorDaMensagem);
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

  toggleExpand(index: number): void {
    this.expandedMessages[index] = !this.expandedMessages[index];
  }

  isExpanded(index: number): boolean {
    return this.expandedMessages[index];
  }

  getMessageIndex(paginatedIndex: number): number {
    return (this.currentPage - 1) * this.itemsPerPage + paginatedIndex;
  }


  // carregar usuario para lista-los na lista de usuarios logados na reda

  loadUsers(){
   
      this.listUsers.getAllUsers().subscribe(users =>{

        this.usersLogados = users; // todos os usuarios vão ser armazenado no array usersLogados
      })
  }


  // funcionalidade de dar like(goste) e dislike(não gostei)

  like(idmsg:number){ // toogle like deslike

    this.isLike=true;
    this.listMSG.likeMsg(idmsg,this.isLike).subscribe(
      response => {
          console.log('Response from server:', response);
          console.log(`Response message: ${response.message}`);
          // atualizar localmente o controlador de likes
          const message = this.messages.find(msg =>msg.id == idmsg);
          if(message){
            message.like ++
          }
          this.loadMSG(); // chamando aqui o metodo que carraga as msg, ele recarrega as msg e atualiza as informações
      },
      error => {
          console.error('Erro ao enviar like:', error);
      }
  );
  console.log(`id da msg chegou no .ts: ${idmsg}`);
    
      
   
  }

  deslike(idmsg:number){
    this.isLike = false;
    this.listMSG.likeMsg(idmsg,this.isLike).subscribe(
      response =>{
        console.log(`Response from server: ${response.message}`);
        // Atualizar localmente o contador de deslikes

        const message = this.messages.find(msg => msg.id == idmsg);
        if(message){
          message.deslike++;
        }
        this.loadMSG();

      },error => {
        console.error('Erro ao enviar deslike:', error);
    }
    )
  }
}
