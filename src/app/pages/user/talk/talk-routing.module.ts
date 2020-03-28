import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TalkPage } from './talk.page';

const routes: Routes = [
  {
    path: '',
    component: TalkPage
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
export class TalkPageRoutingModule {}
