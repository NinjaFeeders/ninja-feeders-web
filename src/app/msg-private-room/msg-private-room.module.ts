import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsgPrivateRoomComponent } from './msg-private-room/msg-private-room.component';

import { AppModule } from '../app.module';
import { AppRoutingModule } from '../app-routing.module';
import { MsgPrivateRoomRoutes } from './msg-private-room.routing';


@NgModule({
  declarations: [MsgPrivateRoomComponent],
  imports: [
    CommonModule,
    // o AppRoutingModule não é mais nescessario pois estamos usando o modulo de roteamento MsgPrivateRoomRoutes
    //AppRoutingModule, // todo modulo que trabalhar com routerLink para navegação tem que importar o modulo de roteamento, para as navegações que deseja usar
    MsgPrivateRoomRoutes //aqui estamos importando o msg-private-room.routing que é uma rota exclusiva do nosso modulo msg-private-room, e não a rota padrão do projeto, essa rota exclusiva não é carregada no carregamento do site, e sim somente quando a pagina do componente msg-private-room for chamada
  ],
  exports:[
    MsgPrivateRoomComponent
  ]
})
export class MsgPrivateRoomModule { }
