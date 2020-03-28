import { NavParamsService } from './../../../../services/nav-params.service';
import { ChatRoomsService } from './../../../../services/chat-rooms.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { StampModalPage } from './stamp-modal/stamp-modal.page';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.page.html',
  styleUrls: ['./chat-room.page.scss'],
})
export class ChatRoomPage implements OnInit {

  chatRoom;

  public talkList: Observable<any[]>;

  constructor(
    public chatRoomsService: ChatRoomsService,
    public navParamsService: NavParamsService,
    public modalController: ModalController
  ) { }

  ngOnInit() {
    this.chatRoom = this.navParamsService.get();
    this.talkList = this.chatRoomsService.getTalks(this.chatRoom.id);
    console.log(this.chatRoom.id);
    console.log(this.talkList);
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: StampModalPage,
      showBackdrop: true
    });
    return await modal.present();
  }
}
