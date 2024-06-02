import { Component, OnInit,Input } from '@angular/core';


interface Message {
  title: string;
  author: string;
  content: string;
}



@Component({
  selector: 'app-feeders-msg',
  templateUrl: './feeders-msg.component.html',
  styleUrls: ['./feeders-msg.component.css']
})
export class FeedersMsgComponent  {

  

  messages: Message[] = [
    { title: 'Public', author: 'fulano de tal', content: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.' },
    { title: 'Public', author: 'fulano de tal', content: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.' },
    { title: 'Public', author: 'fulano de tal', content: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.' },
    { title: 'Public', author: 'fulano de tal', content: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.' },
    { title: 'Public', author: 'fulano de tal', content: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.' },
    { title: 'Public', author: 'fulano de tal', content: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.' },
    { title: 'Public', author: 'fulano de tal', content: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.' },
    { title: 'Public', author: 'fulano de tal', content: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.' },
    { title: 'Public', author: 'fulano de tal', content: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.' },
    { title: 'Public', author: 'fulano de tal', content: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.' },
    { title: 'Public', author: 'fulano de tal', content: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.' },
    { title: 'Public', author: 'fulano de tal', content: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.' },
    { title: 'Public', author: 'fulano de tal', content: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.' },
    { title: 'Public', author: 'fulano de tal', content: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.' },
    { title: 'Public', author: 'fulano de tal', content: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.' },
    { title: 'Public', author: 'fulano de tal', content: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.' },
    // Adicione mais mensagens conforme necessário
  ];

  currentPage = 1;
  itemsPerPage = 5;
  totalPages = Math.ceil(this.messages.length/this.itemsPerPage);

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




}
