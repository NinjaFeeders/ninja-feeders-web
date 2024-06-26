import { Routes, RouterModule } from '@angular/router';
import { MsgPrivateRoomComponent } from './msg-private-room/msg-private-room.component';

const routes: Routes = [
  {  
    path:":username",component:MsgPrivateRoomComponent
  },
];

export const MsgPrivateRoomRoutes = RouterModule.forChild(routes);
