import { Component, OnInit,Input } from '@angular/core';
import { MensagensService } from '../mensagens.service';


interface Message {
  id:number;
  msg: string;
  like: number;
  deslike:number
  author: string;
}



@Component({
  selector: 'app-feeders-msg',
  templateUrl: './feeders-msg.component.html',
  styleUrls: ['./feeders-msg.component.css']
})
export class FeedersMsgComponent implements OnInit  {

  

 

  messages:Message[] = [];
  autorDaMensagem:any;
  currentPage = 1;
  itemsPerPage = 5;
  totalPages=0;
 
  expandedMessages: boolean[] = [];

  constructor(private listMSG:MensagensService){}

  ngOnInit(): void {
    this.loadMSG()
  }

  loadMSG() {

    console.log('Recuperando feedbacks do serviço...');

    this.listMSG.getAllmessage().subscribe(data => {
        
      this.messages = data;
      this.totalPages = Math.ceil(this.messages.length/this.itemsPerPage);
      this.expandedMessages = new Array(this.messages.length).fill(false);
      },     
      error => {
        console.error('Erro ao recuperar feedbacks:', error);
      });
     this.messages.forEach(
      item => {
          this.autorDaMensagem=item.author;
      }      
     )
     console.log(this.autorDaMensagem);
  }

  
   
  get paginatedMessages(): Message[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.messages.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if ((this.currentPage * this.itemsPerPage) < this.messages.length) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  toggleExpand(index: number): void {
    this.expandedMessages[index] = !this.expandedMessages[index];
  }

  isExpanded(index: number): boolean {
    return this.expandedMessages[index];
  }

  getMessageIndex(paginatedIndex: number): number {
    return (this.currentPage - 1) * this.itemsPerPage + paginatedIndex;
  }




}
