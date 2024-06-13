import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedersMsgComponent } from './feeders-msg/feeders-msg.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegisterUserComponent } from './register-user/register-user.component';

const routes: Routes = [
  {path:"header",component:HeaderComponent},
  {path:"",component:FeedersMsgComponent},
  {path:"login",component:LoginComponent},
  {path:"registeruser",component:RegisterUserComponent},
  {path:"footer",component:FooterComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
