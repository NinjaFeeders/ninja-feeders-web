import { Injectable } from '@angular/core';
import{HttpClient}from '@angular/common/http';
import{Router}from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';  // implementar observable para emitir e monitorar mudanças no estado de authenticação e no nome de usuario
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8000';
  private tokenKey = 'authToken';
  private usernameKey = 'authUsername';

  // implementar observable para emitir e monitorar mudanças no estado de authenticação e no nome de usuario
  private isAuthenticatedSubject: BehaviorSubject<boolean>;
  private usernameSubject: BehaviorSubject<string>;


  constructor(private http:HttpClient,private router:Router) { 
    const token = localStorage.getItem(this.tokenKey);
    const username = localStorage.getItem(this.usernameKey);
    this.isAuthenticatedSubject = new BehaviorSubject<boolean>(!!token);
    this.usernameSubject = new BehaviorSubject<string>(username);

  }

  get isAuthenticated$():Observable<boolean> {
    // Implemente a lógica para verificar se o usuário está autenticado
    // Você pode usar localStorage, sessionStorage ou outros métodos de armazenamento para isso
    //return !!localStorage.getItem(this.tokenKey);
    return this.isAuthenticatedSubject.asObservable();
  }

  get username$():Observable<string>{
    //return localStorage.getItem(this.usernameKey);
    return this.usernameSubject.asObservable();
  }

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

          this.isAuthenticatedSubject.next(true);
          this.usernameSubject.next(res.userLogin);
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
  getAllUsers(){
    console.log("enviando solicitação para recuperar usuarios cadastrados");
    return this.http.get<any[]>(`${this.baseUrl}/users`);
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

  
  getUsername(): string {
    return localStorage.getItem(this.usernameKey);
  }

  

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  logout() { //fazer logout, encerrar sessão
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.usernameKey);
    this.isAuthenticatedSubject.next(false);
    this.usernameSubject.next(null);
    this.router.navigate([''])
  }
}


