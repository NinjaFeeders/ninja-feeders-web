import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Subscription } from 'rxjs';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toggleMenu: EventEmitter<void> = new EventEmitter<void>();

  username:string;
  
  isLoggedIn: boolean;

 private authSubscription:Subscription;
 private usernameSubscription:Subscription;

  constructor(private authService:AuthService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    // Recupera o nome de usuário do localStorage

    this.authSubscription = this.authService.isAuthenticated$.subscribe(isAuthenticated=>{this.isLoggedIn = isAuthenticated});
    this.usernameSubscription =this.authService.username$.subscribe(userlogado =>{this.username = userlogado});

  }

  logout(){ // encerra a cessão 
    this.authService.logout();
    this.isLoggedIn = false;
    this.username = null;
  }

  toggleMenuClicked() { // vai emitir um evento que vai ser usado para expandir e contrair o menu hamburguer, que mostra e esconde a lisata de usuarios membros da rede
    this.toggleMenu.emit();
    
  }

  ngOnDestroy() { // encerra o ciclo de vida desse componente, evita erro de vazamento de memória
    this.authSubscription.unsubscribe();
    this.usernameSubscription.unsubscribe();
  }
 
    
}
