import { AdminUserServiceService } from 'src/app/services/admin-user-service.service';
import { NavParamsService } from './../../../../services/nav-params.service';
import { ChatRoomsService } from './../../../../services/chat-rooms.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalController, IonContent } from '@ionic/angular'; // 追加
import { StampModalPage } from './stamp-modal/stamp-modal.page'; // 追加
import { IonRouterOutlet } from '@ionic/angular'; // 追加


@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.page.html',
  styleUrls: ['./chat-room.page.scss'],
})
export class ChatRoomPage implements OnInit {
  @ViewChild(IonContent, {static: true}) content: IonContent;
  chatRoom;
  userRef;
  adminUser;
  isFirstLoad = false;

  public talkList: Observable<any[]>;

  constructor(
    public chatRoomsService: ChatRoomsService,
    public navParamsService: NavParamsService,
    public modalController: ModalController, // 追加
    private routerOutlet: IonRouterOutlet, // 追加
    private adminUserService: AdminUserServiceService
  ) { }

  ngOnInit() {
    this.chatRoom = this.navParamsService.get();
    this.chatRoomsService.getTalks(this.chatRoom.id).subscribe((data: any) => {
      this.talkList = data; // talksのドキュメント全部（作成順に並んでいる）
    });
    this.adminUser = this.adminUserService.currentUser;
    this.userRef = this.adminUserService.getUserRef(this.adminUser.id);
    console.log(this.chatRoom.id);
    console.log(this.talkList);
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.content.scrollToBottom(0).then(() => {
        this.isFirstLoad = true;
      });
    }, 100);
  }

  // 追加
  async presentModal() {
    const modal = await this.modalController.create({
      component: StampModalPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });
    // モーダルのデータを受け取ることができる
    modal.onDidDismiss().then(res => {
      if (res && res.data) {
        const adminUser = this.adminUserService.currentUser;
        this.userRef = this.adminUserService.getUserRef(adminUser.id);
        console.log(res);
        console.log(res.data);
        // chatRoomId: string, userRef: any, user: any, stamp: any
        // this.chatRoom.id
        console.log('chatRoomId', this.chatRoom.id);
        console.log('userRef', this.userRef);
        console.log('adminUser', adminUser);
        console.log('res.data.stamp', res.data.stamp);
        this.chatRoomsService.addTalks(this.chatRoom.id, this.userRef, adminUser.top_image.path, res.data.stamp);
      }
    });
    return await modal.present();
  }
}
