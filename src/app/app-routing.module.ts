import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedersMsgComponent } from './feeders-msg/feeders-msg.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { MsgPrivateRoomModule } from './msg-private-room/msg-private-room.module';
import { MsgPrivateRoomComponent } from './msg-private-room/msg-private-room/msg-private-room.component';
import { RegisterUserComponent } from './register-user/register-user.component';

const routes: Routes = [
  { path: "header", component: HeaderComponent },
  { path: "", component: FeedersMsgComponent },
  {path:"feeders-msg",component:FeedersMsgComponent},
  { path: "login", component: LoginComponent },
  { path: "registeruser", component: RegisterUserComponent },
  { path: "footer", component: FooterComponent },
  
  { // aqui temos a implementação de uma rota com lazy load,
    path: "private-room-module",// nome da rota
    loadChildren: () => import('./msg-private-room/msg-private-room.module')
      .then(module => module.MsgPrivateRoomModule)
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
