import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class MensagensService {
  private baseUrl = 'http://localhost:8000';

  constructor(private http:HttpClient,private router:Router) { }

  registerMsgService(tituloMsg:string,msg:string,autor:string) {
    console.log(autor," autor chegando no metodo registerMsbService do serviço MensagensService ");
    console.log(tituloMsg," titulo chegando no metodo registerMsbService do serviço MensagensService ");
    console.log(msg," corpo chegando no metodo registerMsgService do serviço MensagensService")
    return this.http.post<any>(`${this.baseUrl}/mensgens`, {tituloMsg, msg,autor});
  }

  getAllmessage(){
    console.log("enviando solicitação para recuperar mensagens");
    return this.http.get<any[]>(`${this.baseUrl}/mensgens`);
  }


  likeMsg(idmsg:number,isLike:boolean){
    console.log(`id da msg do like chegou no serviço ${idmsg} ${isLike}`)
   
    
    return this.http.put<any>(`${this.baseUrl}/likes`,{idmsg,isLike});
  }

  
}
