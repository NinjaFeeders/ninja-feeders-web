import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';



interface Users{
  
  username:string;

}


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})



export class UserListComponent implements OnInit {
  @Input() isMenuExpanded: boolean;

  usersLogados:Users[]=[];
  userSelect:any;
  isConectedAsFriend:boolean=false;
  statusConectionUsers:string="Conectar";
  colorButton:string="bg-warning"

  


  constructor( private listUsers:AuthService, private router:Router){}

  ngOnInit(): void {
    this.loadUsers();
    
  }
  

  // carregar usuario para lista-los na lista de usuarios logados na reda

  loadUsers(){
   
    this.listUsers.getAllUsers().subscribe(users =>{
      this.usersLogados = users; // todos os usuarios vão ser armazenado no array usersLogados
      })
}

 // Método para navegar para a página privada com o nome do usuário
 navigateToPrivatePage(nome:string): void {
  this.router.navigate(['private-room-module',nome]);
  console.log("metodo navigateToPrivatePage() ", nome);

}

// função que fara a conexão entre os usuario logado e o usuario selecionado pelo usuario logado

conectarAoUser(user:string){
  if(this.isConectedAsFriend == false){
      this.isConectedAsFriend = true;
      this.statusConectionUsers="Conectar";
      this.colorButton ="bg-danger"
  }else if(this.isConectedAsFriend == true){
    this.isConectedAsFriend = false;
    this.statusConectionUsers="Desconectar"
    this.colorButton ="bg-success"
  }


}
  

}
