import { ChatRoomsService } from './../../../../../services/chat-rooms.service';
import { StampService, Stamp } from './../../../../../services/stamp.service';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-stamp-modal',
  templateUrl: './stamp-modal.page.html',
  styleUrls: ['./stamp-modal.page.scss'],
})
export class StampModalPage implements OnInit {
  // serviceで作成したインターフェースのクラスを引用できる
  stamps: Stamp[] = [];

  constructor(
    public modalController: ModalController,
    public stampService: StampService,
    public chatRoomsService: ChatRoomsService
  ) { }

  ngOnInit() {
    this.stamps = this.stampService.getStamps();
  }


  // モーダルでのデータの渡し方
  dismiss() {
    this.modalController.dismiss();
  }

  addTalk(stamp) {
    this.modalController.dismiss({
      stamp
    });
  }

}
