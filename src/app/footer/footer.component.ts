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

  // variavel para fazer a contagem de caracteres da entrada de dados na text area
  contagenCaractere:number=0;

  constructor(private mensagensService:MensagensService,private autorMSG:AuthService, private router:Router) { }

  ngOnInit() {
  }

  registerMsgComp() {
    
    // Verificação dos campos obrigatórios
    if (!this.msg) { 
      console.error('Todos os campos são obrigatórios.');
      alert("é obrigatorio ao menos uma palavra no campo mensagem");
      return;
    }

  console.log(this.msg, " chegando na classe login-register do componente login-register")

    this.autor = this.autorMSG.getUsername();
    console.log("nome de usuario chegou em footer",this.autor);

    let titulomsg = this.msg.split('\n')[0]; // separamos a  primeira linha da msg para separar o titulo da msg
    if(titulomsg.length > 72){// subtrair os primeiros 72 caracteres da primeira linha da msg
      titulomsg = titulomsg.substring(0,72) +'...';
    }

    const mensageMsg = this.msg // mensagem completa
      console.log(`titulo = ${titulomsg} \n mensagem = ${mensageMsg} \n autor = ${this.autor}`);
  this.mensagensService.registerMsgService(titulomsg,mensageMsg,this.autor).subscribe(
    
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


contCaractereTextArea(){
  this.contagenCaractere = this.msg.length;
}

}
