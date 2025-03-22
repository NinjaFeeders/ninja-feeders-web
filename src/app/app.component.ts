import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isMenuExpanded = false;

// Método chamado quando o evento eventEmmitter vindo do header é escultado no component pai do header que é o app.compnent.ts
toggleMenu() { /** essa função altera o valor da propriedade isMenuExpanded criada aqui nesse component 
                   inicialmente ela é false: e quando essa função é chamada, é atribuido a ela o seu valor "negado" que é "true":
                   como ela é um propriedade do tipo booleano, ela tem somente dois valores possiveis, true ou false:
                   se no momento que ela for false, o user clicar no botão ela ficara valendo true, do contrario ela valera false
                   e a cada vez que esse valor for alterado o seu valor atual, esse valor estara sendo sempre enviado para um componente filho
                   chamado user-list.component que recebe essa propriedade atraves do @input  */
  this.isMenuExpanded = !this.isMenuExpanded;
  this.toggleBodyScroll();
}

// Adiciona ou remove a classe que impede a rolagem no body
toggleBodyScroll() {
  if (this.isMenuExpanded) {
    document.body.classList.add('no-scroll');
  } else {
    document.body.classList.remove('no-scroll');
  }
}
  


  

  



}
