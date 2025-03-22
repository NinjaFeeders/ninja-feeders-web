import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
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
  autor_id:number;
  visibilit_msg:string = "public";
  isPrivate:boolean = false;

  // variavel para fazer a contagem de caracteres da entrada de dados na text area
  @Input() contagenCaractere:number=0;
  

  constructor(private mensagensService:MensagensService,private autorMSG:AuthService ,private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }

  registerMsgComp() {

    this.autor = this.autorMSG.getUsername(); // add o user logado na variavel autor, pois esse user logado sera o autor da msg que ele vai enviar
   if(!this.autor){ // o user logado é o autor da msg que sera registrada, se ele não estiver logado, sera solicitado que faça login
    alert("Somente usuarios logados podem enviar mensagem \n se ainda não for membro da rede faça seu registro em 'register' ");

   }else{

    // Verificação dos campos obrigatórios
    if (!this.msg) { 
      console.error('Todos os campos são obrigatórios.');
      alert("é obrigatorio ao menos uma palavra no campo mensagem");
      return;
    }

    console.log(this.msg, " chegando na classe login-register do componente login-register")

    
    console.log("nome de usuario chegou em footer",this.autor);

    // separa o titulo da msg, pegando até os primeiros 72 caracteres da mensagem original
    let titulomsg = this.msg.split('\n')[0]; // separamos a  primeira linha da msg para separar o titulo da msg
    if(titulomsg.length > 72){// subtrair os primeiros 72 caracteres da primeira linha da msg
      titulomsg = titulomsg.substring(0,72) +'...';
    }else{// extrai o titulo menor que 72 caractere e add '...' no
      titulomsg = titulomsg.substring(0,titulomsg.length) +'...';
    }

    // mensagem completa
    const mensageMsg = this.msg 
    
    // visibilidade da msg
    this.visibilit_msg = this.isPrivate ?'private':'public'; // Define a visibilidade da mensagem 
    const visibilidade_msg = this.visibilit_msg;

      console.log(`titulo = ${titulomsg} \n mensagem = ${mensageMsg} \n autor = ${this.autor}`);

      // separ o id do autor da msg
      this.autor_id = Number(this.autorMSG.getIdUser());
      // chama o serviço de registro de msg, passando para o metodo de registro, a msg, o autor o id a visibilidade e o titulo, para registro da msg
  this.mensagensService.registerMsgService(mensageMsg,this.autor, this.autor_id,visibilidade_msg,titulomsg).subscribe(
  
    response => {
      console.log('Mensagem registrado com sucesso', response);
      console.log("visibilidade: ", visibilidade_msg , "chegou em registeMessage()");
      this.mensagensService.emitNovaMensagem(response);
      this.msg = ""
      this.isPrivate=false
    },
    error => {
      console.error('Erro ao registrar usuário', error);
    }
  );

   } 
   
    
  
 
}

/** a função abaixo é responsavel pela contagem de caractere digitado pelo usuario no text area
 * essa função incrementa a propriedade contagenCaractere, e cada mudança que acontece nessa variavel 
 * é refletida na label abaixo do botaão de enviar mensagens
 */
contCaractereTextArea(){
  setTimeout(() => {
    this.contagenCaractere = this.msg.length;
  }, 10);
}

}
