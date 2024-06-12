import { Injectable } from '@angular/core';
import{HttpClient}from '@angular/common/http';
import{Router}from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8000';
  private tokenKey = 'authToken';
  private usernameKey = 'authUsername';



  constructor(private http:HttpClient,private router:Router) { }

  register(nome: string,username:string, password: string) { // registrar usuario

    console.log(nome,"chegando no metodo register do serviço AuthService")
    return this.http.post<any>(`${this.baseUrl}/usersregister`, { nome,username,password });
  }

  login(username: string, password: string): Observable<any> { // fazer login
    console.log("chegando no metodo login de authService",username, password,)
    return this.http.post<any>(`${this.baseUrl}/login`, {username,password}).pipe(
      tap({
        next: (res) => {
          this.setToken(res.token);
          this.setUsername(res.userLogin); // Armazena o nome de usuário no localStorage
        },
        error: (error) => {
          // Tratar erro, se necessário
        },
        complete: () => {
          // Lógica a ser executada após a conclusão, se necessário
        }
      })

    )
     
  }

 

  setToken(token: string) { // sua função é armazenar o token de autenticação no localstorage do navegador
    console.log("chegando no metodo login de setToken",token)
      localStorage.setItem(this.tokenKey, token);
      console.log("chegando no metodo login de setToken",localStorage);
  }
  setUsername(userLogin:string){ // armazena o nome de usuario para ser recuperado e usado para exibir o nome de usuario logado, ou para persistir no registro de msg, com autor da msg
    localStorage.setItem(this.usernameKey,userLogin);
  }

  getToken(): string { // sua função é retornar o localstorage, Recupera o token de autenticação do localStorage.
    return localStorage.getItem(this.tokenKey);
    
  }

  getUsername():string{
    return localStorage.getItem(this.usernameKey);
  }

  isAuthenticated(): boolean {
    // Implemente a lógica para verificar se o usuário está autenticado
    // Você pode usar localStorage, sessionStorage ou outros métodos de armazenamento para isso
    return !!localStorage.getItem(this.tokenKey);
  }

  logout() { //fazer logout, encerrar sessão
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.usernameKey);
    this.router.navigate([''])
  }
}


