import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ChatRoomPageRoutingModule } from './chat-room-routing.module';
import { ChatRoomPage } from './chat-room.page';
import { StampModalPageModule } from './stamp-modal/stamp-modal.module'; // 追加
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatRoomPageRoutingModule,
    StampModalPageModule // 追加
  ],
  declarations: [ChatRoomPage]
})
export class ChatRoomPageModule {}
