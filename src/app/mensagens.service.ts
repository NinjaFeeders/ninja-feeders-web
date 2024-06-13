import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MensagensService {
  private baseUrl = 'http://localhost:8000';

  constructor(private http:HttpClient,private router:Router) { }

  registerMsgService(msg:string) {

    console.log(msg," chegando no metodo registerMsgService do serviço MensagensService")
    return this.http.post<any>(`${this.baseUrl}/mensgens`, {msg});
  }

}
