import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TalkRoomPage } from './talk-room.page';

const routes: Routes = [
  {
    path: '',
    component: TalkRoomPage
  },
  {
    path: 'chat-room',
    loadChildren: () => import('./chat-room/chat-room.module').then( m => m.ChatRoomPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TalkRoomPageRoutingModule {}
