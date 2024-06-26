import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-msg-private-room',
  templateUrl: './msg-private-room.component.html',
  styleUrls: ['./msg-private-room.component.css']
})
export class MsgPrivateRoomComponent implements OnInit {
  username: string;

  // possivel solução para atualizar o estado do compoennte
  private routeSub: Subscription;


  constructor(private route: ActivatedRoute) { }



  ngOnInit() {
    // this.username = this.route.snapshot.paramMap.get('username'); esse metodo tambpem possibilita capturar o parametro de rota e armazena-lo em uma variavel
    this.routeSub = this.route.params.subscribe(params =>{
      this.username=params['username'];
    })
    this.usuarioSelecionado();

  }
    
      usuarioSelecionado(){
        console.log(this.username);
      }

      ngOnDestroyer(){
        if(this.routeSub){
          this.routeSub.unsubscribe();
        }
      }
 

}
