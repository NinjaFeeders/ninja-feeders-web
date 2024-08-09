import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of,BehaviorSubject } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';


interface Friends{
  id:number;
  user_name:string;
  user_id:number;
  friend_id:number;
  status:string;
  created_at:string;
  updated_at:string;
}


@Injectable({
  providedIn: 'root'
})
export class FriendService {
  friends:Friends[]=[];
  // amigos:any[]= [];

  // n:string;
  // u_i:number;
  // f_i:number;
  
  private apiUrl = 'http://localhost:8000/api';

  // observavel para mudar o estado do botão de solicitar amizade



  constructor(private http: HttpClient,
              private userAuth:AuthService) {
               
               }

  


    
  solicitarAmizade(user_name: string, user_id: number, friend_id: number,user_name_friend_id:string): Observable<any> {
    return this.getFriendsEspecific(user_name, user_id, friend_id).pipe(
      switchMap(data => {
        this.friends = data;
        console.log("Friends: ", this.friends);
       
        if(user_id == friend_id ){ // aqui é verificado se a solicitaçã de amizade esta sendo enviada para si mesmo
          alert(`${user_name} id: ${user_id} você não pode adicionar a si mesmo como amigo! `);
          return of(null);
        }else{
          if (this.friends.length > 0) { // data.user_id é o 
            this.friends.map(friend => {
              alert(`o user_name: ${user_name_friend_id} já é seu amigo,\n ou esta com solicitação Pendente`);
            });
            // Retornando um Observable vazio ou qualquer outro Observable para completar o fluxo
            return of(null);
          } else if (this.friends.length == 0) {
            console.log(`solicitação de amizade para id ${friend_id} chegou no serviço friendService`);
            console.log(`${user_id} usuario que solicitou amizade`);
            return this.http.post<any>(`${this.apiUrl}/friends`, { user_name, user_id, friend_id });
          }

        }
  
       
      }),
      catchError(error => {
        console.error('Error occurred:', error);
        return of(null);
      })
    );
  }

  

  getPendingRequests(friend_id:number): Observable<any> { // pegar as requisições de amizade  pendente 
   return this.http.post<any>(`${this.apiUrl}/friends/pending`,{friend_id}); // eu sou o friend_id    
  }

  aceitarAmizade(id: number, user_id: number,friend_id:number): Observable<any> {
    return this.http.put(`${this.apiUrl}/friends/accept`, {id,user_id,friend_id});
  }

  rejeitarAmizade(requestId: number, user_id:number,friend_id:number): Observable<any> {
    console.log("requestId chegou em serviceFriends", requestId);
    console.log("id de user solicitante chegou em serviceFriends", user_id);
    console.log("id amigo solicitado chegou em friendService", friend_id);

    return this.http.post<any>(`${this.apiUrl}/friends/reject`, {requestId,user_id,friend_id });
  }

  getFriends(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/friends/list`);
  }

  getFriendsEspecific(user_name:string, user_id:number,friend_id:number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/friends/list/especific`,{user_name,user_id,friend_id});
  }

  
}
