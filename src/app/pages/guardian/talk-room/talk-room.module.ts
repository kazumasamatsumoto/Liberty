import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TalkRoomPageRoutingModule } from './talk-room-routing.module';

import { TalkRoomPage } from './talk-room.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TalkRoomPageRoutingModule
  ],
  declarations: [TalkRoomPage]
})
export class TalkRoomPageModule {}
