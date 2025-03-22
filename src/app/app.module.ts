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
import { HttpClientModule } from '@angular/common/http';// Importação do HttpClientModule para importar metodo http para os serviços
import { UserListComponent } from './user-list/user-list.component';
import { CommonModule } from '@angular/common';
import { MensagensService } from './mensagens.service';
import { AuthService } from './auth.service';
import { NotificationComponent } from './notification/notification.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
    NotificationComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule

  ],
  exports:[
    FeedersMsgComponent
  ],
  providers: [
    MensagensService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
