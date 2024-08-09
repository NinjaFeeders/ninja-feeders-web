import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FriendService } from '../friend.service';



interface Users{
  
  username:string;
  id: number; // Adiciona o campo ID para associar com o backend
  isFriend: boolean; // Adiciona o campo isFriend para determinar o estado da amizade
}

interface Friends{
  id:number;
  user_name:string;
  user_id:number;
  friend_id:number;
  status:string;
  created_at:string;
  updated_at:string;
}


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})



export class UserListComponent implements OnInit {
  @Input() isMenuExpanded: boolean;

  membrosDaRede:Users[]=[];
  user_id_logado:number;
  user_name_id_logado:string;
  isConectedAsFriend:boolean=false;
  statusConectionUsers:string="Add amigo?";
  colorButton:string="bg-info"
  friend_id:number;
  friends:Friends[]=[]; // para implementar o desfazer amizade e implementar a alternancia do botão de add para remover
  statusFriend:string;

  


  constructor( 
    private listUsers:AuthService,
     private router:Router, 
     private friendservice:FriendService){}

  ngOnInit(): void {
    this.loadUsers();
    this.loadAmizades();
    
  }
  

  // carregar usuario para lista-los na lista de usuarios logados na reda

  loadUsers(){
   
    this.listUsers.getAllUsers().subscribe(users =>{
      this.membrosDaRede = users; // todos os usuarios vão ser armazenado no array usersLogados
    
      });

      }

loadAmizades(){

  this.friendservice.getFriends().subscribe(requests => {

    this.friends = requests;
    this.friends.map(data =>{
      this.statusFriend = data.status;
    });
    console.log("lista de amigos chegou em loadAmizade: em user-list");
    console.log(this.friends);
    
  });
}

 // Método para navegar para a página privada com o nome do usuário
 navigateToPrivatePage(nome:string): void {
  this.router.navigate(['private-room-module',nome]);
  console.log("metodo navigateToPrivatePage() ", nome);

}



// função que fara a conexão entre os usuario logado e o usuario selecionado pelo usuario logado
addAmigo(friend_id:number,user_name:string){ // parametro do usuario que o usuario logado quer add como amigo, esse é o friend_id
  
  console.log(`${friend_id} Friend_id do template\n chegou em user-list.component.ts`);
  if(this.isConectedAsFriend==false){
      this.isConectedAsFriend = true;
      this.statusConectionUsers ="Remover";
      this.colorButton ="bg-success"

    /** na perspectiva de quem manda solicitaçã ode amizade eu logado sou o user_id  */
      this.user_id_logado = Number(this.listUsers.getIdUser()); // id na tab users do user que esta fazendo a solicitação de amizade
      /** o user_id manda na solicitação o seu user_name */
    
      this.user_name_id_logado = this.listUsers.getUsername(); // user name da tabela user, do user que esta fazendo a solicitação de amizade
      console.log(`${friend_id} é o id do usuario  que o usuario logado quee add como amigo `);
      console.log(`${this.user_id_logado} é o id do usuario logado atualmente`);
      console.log(`${this.user_name_id_logado} é o nome de usuario que esta solicitando amizade`);

      /**
       * quem envia a solicitação de amizade é sempre o user_id
       * quem recebe, recusa , aceita, e tem solicitação pendente é sempre o friend_id
       * sendo assim um usuario quelquer, dependendo da perspectiva, ele é:
       * user_id, se solicita amizade
       * friend_id, se é solicitado como amigo
       */
      const user_name_friend_id = user_name;
      this.friendservice.solicitarAmizade(this.user_name_id_logado,this.user_id_logado, friend_id,user_name_friend_id).subscribe(response => {
        console.log(response);
      });

  }else if(this.isConectedAsFriend == true){

           this.isConectedAsFriend = false;
        this.statusConectionUsers="Add amizade"
        this.colorButton ="bg-warning"
    

   
  }
}

// atualizarAmizade(friend_id: number, isFriend: boolean){
//   const user = this.membrosDaRede.find(u => u.id === friend_id);
//   if(user){
//     user.isFriend=isFriend;
//   }
// }

desfazerAmizade(){

}
  

}
