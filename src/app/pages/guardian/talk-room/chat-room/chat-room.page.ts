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
    this.chatRoom = this.navParamsService.get();
    console.log('tag', '');
    console.log(this.chatRoom);
    this.chatRoomsService.getTalks(this.chatRoom.id).subscribe((data: any) => {
      this.talkList = data; // talksのドキュメント全部（作成順に並んでいる）
    });
    this.userRef = this.chatRoom.userRefs[0];
    // this.adminUser = this.guardianService.currentUser;
    // this.userRef = this.adminUserService.getUserRef(this.adminUser.id);
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
}
