import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MensagensService } from '../mensagens.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  msg:string="";
  likes:number=0;
  deslikes:number=0;
  autor:string="";

  constructor(private mensagensService:MensagensService,private autorMSG:AuthService, private router:Router) { }

  ngOnInit() {
  }

  registerMsgComp() {
    
    // Verificação dos campos obrigatórios
    if (!this.msg) {
      console.error('Todos os campos são obrigatórios.');
      return;
    }

  console.log(this.msg, " chegando na classe login-register do componente login-register")

    this.autor = this.autorMSG.getUsername();
    console.log("nome de usuario chegou em footer",this.autor);
  this.mensagensService.registerMsgService(this.msg,this.autor).subscribe(
    response => {
      console.log('Mensagem registrado com sucesso', response);
      this.router.navigate(['']); // Navega para a tela de login após o registro
      this.msg = ""
    },
    error => {
      console.error('Erro ao registrar usuário', error);
    }
  );
}

}
