import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Importe o FormsModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeedersMsgComponent } from './feeders-msg/feeders-msg.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { HttpClientModule } from '@angular/common/http';// Importação do HttpClientModule
import { MsgSelectTypeMessageModule } from './msg-select-type-message/msg-select-type-message.module';
import { MsgPrivateRoomComponent } from './msg-private-room/msg-private-room/msg-private-room.component';
import { UserListComponent } from './user-list/user-list.component';
import { CommonModule } from '@angular/common';
//import { MsgPrivateRoomModule } from './msg-private-room/msg-private-room.module';


@NgModule({
  declarations: [
    AppComponent,
    FeedersMsgComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterUserComponent,
    UserListComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MsgSelectTypeMessageModule,
    CommonModule
    //MsgPrivateRoomModule  como estamos usango lazy loadin pra esse modulo não precisamos importa-lo  aqui

  ],
  exports:[
    FeedersMsgComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
