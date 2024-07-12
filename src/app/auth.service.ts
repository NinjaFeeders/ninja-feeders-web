import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8000/api';
  private tokenKey = 'authToken';
  private usernameKey = 'authUsername';
  private idUserKey = 'authIduser'; // Chave para armazenar o ID do usuário no localStorage

  // Observable para emitir e monitorar mudanças no estado de autenticação e no nome de usuário
  private isAuthenticatedSubject: BehaviorSubject<boolean>;
  private usernameSubject: BehaviorSubject<string>;

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem(this.tokenKey);
    const username = localStorage.getItem(this.usernameKey);
    // const idUser = localStorage.getItem(this.idUserKey); // Recupera o ID do usuário do localStorage (se existir)
    this.isAuthenticatedSubject = new BehaviorSubject<boolean>(!!token);
    this.usernameSubject = new BehaviorSubject<string>(username);
  }

  get isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  get username$(): Observable<string> {
    return this.usernameSubject.asObservable();
  }

  register(nome: string, username: string, password: string) {
    return this.http.post<any>(`${this.baseUrl}/usersregister`, { nome, username, password });
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, { username, password }).pipe(
      tap({
        next: (res) => {
          console.log('Response from server:', res); // Verifica a resposta do servidor
          this.setToken(res.token);
          this.setUsername(res.userLogin); // Armazena o nome de usuário no localStorage
          this.setIdUser(res.id_user); // Armazena o ID do usuário no localStorage

          console.log('ID do usuário no AuthService:', res.id_user); // Verifica se o ID do usuário está correto

          this.isAuthenticatedSubject.next(true);
          this.usernameSubject.next(res.userLogin); // Atualiza o observable
        },
        error: (error) => {
          // Tratar erro, se necessário
          console.error('Erro no login:', error);
        },
        complete: () => {
          // Lógica a ser executada após a conclusão, se necessário
        }
      })
    );
  }

  getAllUsers() {
    return this.http.get<any[]>(`${this.baseUrl}/users`);
  }

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  setUsername(userLogin: string) {
    localStorage.setItem(this.usernameKey, userLogin);
  }

  setIdUser(id: string) {
    localStorage.setItem(this.idUserKey, id);
  }

  getToken(): string {
    return localStorage.getItem(this.tokenKey);
  }

  getUsername(): string {
    return localStorage.getItem(this.usernameKey);
  }

  getIdUser(): string {
    return localStorage.getItem(this.idUserKey);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.usernameKey);
    localStorage.removeItem(this.idUserKey); // Remove o ID do usuário ao fazer logout
    this.isAuthenticatedSubject.next(false);
    this.usernameSubject.next(null);
    this.router.navigate(['']);
  }
}
