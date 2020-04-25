import { GuardianService } from './../../../../services/guardian.service';
import { AdminUserServiceService } from 'src/app/services/admin-user-service.service';
import { NavParamsService } from './../../../../services/nav-params.service';
import { ChatRoomsService } from './../../../../services/chat-rooms.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalController, IonContent } from '@ionic/angular'; // 追加

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
  otherUser;
  adminUserRef;
  otherUserRef;
  isFirstLoad = false;

  public talkList: Observable<any[]>;

  constructor(
    public chatRoomsService: ChatRoomsService,
    public navParamsService: NavParamsService,
    public modalController: ModalController, // 追加
    private adminUserService: AdminUserServiceService,
    public guardianService: GuardianService
  ) { }

  ngOnInit() {
    this.getTalk();
  }

  async getTalk() {
    this.chatRoom = this.navParamsService.get();
    this.userRef = this.chatRoom.userRefs[0];
    this.adminUserRef = this.chatRoom.userRefs[0];
    this.otherUserRef = this.chatRoom.userRefs[1];
    const docAdmin = await this.adminUserRef.get();
    const userAdmin = await docAdmin.data();
    const docOther = await this.otherUserRef.get();
    const userOther = await docOther.data();
    this.adminUser = userAdmin;
    this.otherUser = userOther;
    console.log(this.adminUser.top_image.path);

    // 順番的に後に持ってきた方が良い
    this.chatRoomsService.getTalks(this.chatRoom.id).subscribe((data: any) => {
      this.talkList = data; // talksのドキュメント全部（作成順に並んでいる）
    });
  }

  async getChatRoom() {
    this.adminUser = this.adminUserService.currentUser;
    this.userRef = this.adminUserService.getUserRef(this.adminUser.id);
    this.chatRoom = this.navParamsService.get();
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.content.scrollToBottom(0).then(() => {
        this.isFirstLoad = true;
      });
    }, 100);
  }
}
