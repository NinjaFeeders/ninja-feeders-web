import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedersMsgComponent } from './feeders-msg/feeders-msg.component';
import { LoginComponent } from './login/login.component';
import { RegisterUserComponent } from './register-user/register-user.component';

const routes: Routes = [
  {path:"",component:FeedersMsgComponent},
  {path:"login",component:LoginComponent},
  {path:"registeruser",component:RegisterUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
