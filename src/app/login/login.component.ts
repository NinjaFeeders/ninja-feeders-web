import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:string ="";
  password: string = "";
  errorMessage: string;
  constructor(private authService:AuthService,private router:Router) { }


  ngOnInit() {
  }

  login() {
    this.authService.login(this.username, this.password).subscribe(
      
      () => {
        console.log(this.username, this.password)
        this.router.navigate(['']);
      },
      (error) => {
        this.errorMessage = error.error.message;
      }
    );
  }

}
