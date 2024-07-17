import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class MensagensService {
  private baseUrl = 'http://localhost:8000/api';
  
  constructor(private http:HttpClient,private router:Router) { }

  registerMsgService(tituloMsg:string,msg:string,autor:string) {
    console.log(autor," autor chegando no metodo registerMsbService do serviço MensagensService ");
    console.log(tituloMsg," titulo chegando no metodo registerMsbService do serviço MensagensService ");
    console.log(msg," corpo chegando no metodo registerMsgService do serviço MensagensService")
    const likes = parseInt('0');
    const deslikes = parseInt('0');
    return this.http.post<any>(`${this.baseUrl}/mensgens`, {tituloMsg, msg,autor,likes,deslikes});
  }

  getAllmessage(){
    console.log("enviando solicitação para recuperar mensagens");
    return this.http.get<any[]>(`${this.baseUrl}/mensgens`);
  }


  likeMsg(idmsg:number,isLike:boolean,id_user:number,like_status:string){
    
    console.log(`id da msg do like, id do usuario que deu o like chegou no serviço MensagensService ${idmsg} ${isLike} ${id_user} \n like status:  ${like_status}`)
   
    if(isLike===true){
      return this.http.put<any>(`${this.baseUrl}/likes`,{idmsg,isLike,id_user,like_status});
    }else{
      return this.http.put<any>(`${this.baseUrl}/dislikes`,{idmsg,isLike,id_user,like_status});
    }
  }

  

  
}
