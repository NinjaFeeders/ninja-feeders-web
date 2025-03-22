import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FriendService } from '../friend.service';
import { Friend } from '../models/model_friends';
import { Users } from '../models/model_user';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})


export class UserListComponent implements OnInit {
  @Input() MExpanded: boolean; // a props MExpanded é criada aqui no user-list, e atraves do @input ele é marcado como input, e recebe o valor isMenuExpanded
                                /* via property binding, que altera o seu valor, e retorna esse novo valor true ou false, para o template
                                user-list na tag assid onde  o seguinte codigo: [ngClass]="{'expanded': MExpanded} ira recebe-lo
                                hora MExpanded valera true e hora valera false, quando [ngClass]="{'expanded': MExpanded == true "menu estara expandido"}
                                quando [ngClass]="{'expanded': MExpanded == false "menu estara contraido ou colapsed"} */
  membrosDaRede: Users[] = [];
  user_id_logado: number;
  user_name_id_logado: string;
  friend_id: number;
  friends: Friend[] = []; // para implementar o desfazer amizade e implementar a alternancia do botão de add para remover
  statusFriend: string;


  constructor(
    private listUsers: AuthService,
    private router: Router,
    private friendservice: FriendService,private cdRef:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadUsers();

  }


  // carregar usuario para lista-los na lista de usuarios logados na reda

  loadUsers() {
   
    this.user_id_logado = Number(this.listUsers.getIdUser()); // Recupera o ID do usuário logado


    this.listUsers.getAllUsers().subscribe(users => {
      this.membrosDaRede = users; // todos os usuarios vão ser armazenado no array usersLogados

      this.membrosDaRede.forEach(friend =>{ /** aqui nos vamos percorrer a lista de usuario membros da rede, */
        
      
      this.friendservice.getStatusFriend(this.user_id_logado, friend.id).subscribe(status =>{ /** aqui nos vamos percorrer a lista 
        onde mostra a relação de amizade entre o user logado e o user membro da rede  em cada iteração:
         e recuperar o status da amizade entre o usuario logado e o membro da rede no mememto de cada iteração*/

          friend.sttFriends = status.status; /** a cada iteração em membros da rede, e na lista do status da amizade, 
          nos recuperamos o usuario membro da rede, e na iteração da lista de status de amizade recuperamos
          o status da amizade entre o usuario membro da rede e o user logado em cada iteração, 
          e o status da amizade ésta sendo atribuido a propriedade sttfriends de membrosDaRede,
          e assim temos o status da amizade para cada usuario com relação ao user logado, e agora 
          com ngIf iteremos sobre essas informação no template, onde sera possivel criar uma interação"não confundo com iteração"
          para mudar cor do botão, texto do botão etc, quando usuario da lista for amigao do user logado, e  */
          

          this.cdRef.detectChanges();

          
        });

              
      });
    

    });

  

  }



  // Método para navegar para a página privada com o nome do usuário
  //  navigateToPrivatePage(nome:string): void {
  //   this.router.navigate(['private-room-module',nome]);
  //   console.log("metodo navigateToPrivatePage() ", nome);

  // }



  // função que fara a conexão entre os usuario logado e o usuario selecionado pelo usuario logado
  addAmigo(friend_id: number, user_name: string) { // parametro do usuario que o usuario logado quer add como amigo, esse é o friend_id
    
    /** na perspectiva de quem manda solicitaçã de amizade eu logado sou o user_id  */
    this.user_id_logado = Number(this.listUsers.getIdUser()); // id do usuario logado que esta enviando a solicitação de amizade
    console.log(`status user_id= ${this.user_id_logado}`);
    console.log(`status friend_id= ${friend_id}`);
   
    // nome de usuario que esta logado atualmente e enviando a solicitação de amizade 
    this.user_name_id_logado = this.listUsers.getUsername(); // user name da tabela user, do user que esta fazendo a solicitação de amizade

    const user_name_friend_id = user_name; // noma de usuario a quam sera enviado a solicitação de amizade

    this.friendservice.solicitarAmizade(this.user_name_id_logado, this.user_id_logado, friend_id, user_name_friend_id).subscribe(response => {
        console.log(response);
        if(this.user_id_logado == friend_id){
          alert(`${this.user_id_logado}: não existe extatus de amizade entre vc e vc `);
        }else{
          this.recuperarStatusFrend(this.user_id_logado, friend_id);

        }
     

       
      });

       
    
  }


  // função que recupera o status da amizade para o user_id e friend_id informado
  recuperarStatusFrend( user_id:number, friend_id:number): string{
    console.log(`status user_id= ${user_id}`);
    console.log(`status friend_id= ${friend_id}`);
    // essa linha de codigo recupera o status atual da amizade
    this.friendservice.getStatusFriend(user_id,friend_id).subscribe(status =>{ 
      this.membrosDaRede.forEach(friend =>{
        if(friend.id === friend_id){
          friend.sttFriends = status.status;
          this.statusFriend = status.status;
          alert(`status: ${friend.sttFriends}`);
          console.log(`status: ${friend.sttFriends}`)
        }
      })
       // Forçar detecção de mudanças
      this.cdRef.detectChanges();
     
           alert(`status de amizade: ${this.statusFriend}`);
           console.log(`status: ${this.statusFriend}`)

    });
 
    return this.statusFriend;
  }


}
