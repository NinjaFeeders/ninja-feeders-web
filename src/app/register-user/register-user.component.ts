import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  nome: string = '';
  username:string='';
  password: string = '';

  constructor(private authService: AuthService,private router:Router) { }

  ngOnInit() {
  }

  register() {
    
      // Verificação dos campos obrigatórios
      if (!this.nome || !this.username || !this.password) {
        console.error('Todos os campos são obrigatórios.');
        return;
      }

    console.log(this.nome," ", this.username,  " ",this.password, " chegando na classe login-register do componente login-register")


    this.authService.register(this.nome,this.username, this.password).subscribe(
      response => {
        console.log('Usuário registrado com sucesso', response);
        this.router.navigate(['/login']); // Navega para a tela de login após o registro
      },
      error => {
        console.error('Erro ao registrar usuário', error);
      }
    );
  }

}
