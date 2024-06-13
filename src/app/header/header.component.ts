import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username:string;
  isLoggedIn: boolean;
  constructor(private authService:AuthService) { }

  ngOnInit() {
    // Recupera o nome de usuário do localStorage
    this.username = this.authService.getUsername();
    this.isLoggedIn = this.authService.isAuthenticated(); // se estiver autenticado o valor de isloggedin sera true, se não sera false

  }

  logout(){
    this.authService.logout();
    this.isLoggedIn = false;
    this.username = null;
  }

  
    
}
