// Crie um novo componente chamado NotificationComponent
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FriendService } from '../friend.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  pendingRequests: any[] = [];
  friend_id: number; // id do usuario que registrou a solicitação de amizade

  constructor(private friendService: FriendService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadPendingRequests();
  }

  
  loadPendingRequests(): void {
    this.friend_id = Number(this.authService.getIdUser()); // eu sou o friend_id
    console.log(this.friend_id);
    /**
     * o codigo abaixo vai enviar um requisição para listar as solicitações de amizade para 
     * o usuario logado atualmente, que se recebeu alguma solicitação de amizade, foi indereçado a ele como 
     * ele sendo o friend_id, da perspecitva do user que solicitou a amizade que na tabela friend ele é identificado
     * como o user_id
     */
    this.friendService.getPendingRequests(this.friend_id).subscribe(requests => {

      this.pendingRequests = requests;

      console.log("requisições pendente chegou no componente notification");
      console.log(this.pendingRequests);
      
    });

    console.log(this.pendingRequests)

  }

  acceptRequest(requestId: number,user_id:number): void {
    this.friend_id = Number(this.authService.getIdUser());
    console.log("requestId chegou em aceptRequest", requestId);
    console.log("id de user solicitante chegou em aceptRequest", user_id);
    console.log("id amigo solicitado chegou em rejectRequest", this.friend_id );
    this.friendService.aceitarAmizade(requestId,user_id,this.friend_id).subscribe(response => {
      this.pendingRequests = this.pendingRequests.filter(request => request.id !== requestId);
    });
  }

  rejectRequest(requestId: number,user_id:number): void { // o requestId é o id do registro da solicitação de amizade, e o user id é o usuario que registrou a solicitação de amizade
    this.friend_id = Number(this.authService.getIdUser());
    console.log("requestId chegou em rejectRequest", requestId);
    console.log("id de user solicitante chegou em rejectRequest", user_id);
    console.log("id amigo solicitado chegou em rejectRequest", this.friend_id );
    
    this.friendService.rejeitarAmizade(requestId,user_id,this.friend_id).subscribe(response => {
      this.pendingRequests = this.pendingRequests.filter(request => request.id !== requestId);
      console.log(`request id ${requestId}, userId ${user_id}`);
    });
  }
 
}
