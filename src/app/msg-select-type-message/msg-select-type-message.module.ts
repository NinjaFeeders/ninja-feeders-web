import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsgSelectTypeMessageComponent } from './msg-select-type-message/msg-select-type-message.component';

@NgModule({
  declarations: [MsgSelectTypeMessageComponent],
  imports: [ CommonModule],
  exports:[
    MsgSelectTypeMessageComponent
  ]
})
export class MsgSelectTypeMessageModule { }
