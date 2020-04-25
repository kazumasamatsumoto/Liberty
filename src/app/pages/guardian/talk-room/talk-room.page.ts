import { GuardianService } from './../../../services/guardian.service';
import { AdminUserServiceService } from 'src/app/services/admin-user-service.service';
import { ChatRoomsService } from './../../../services/chat-rooms.service';
import { NavParamsService } from './../../../services/nav-params.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/firestore';


@Component({
  selector: 'app-talk-room',
  templateUrl: './talk-room.page.html',
  styleUrls: ['./talk-room.page.scss'],
})
export class TalkRoomPage implements OnInit {
  guadianUser; // ガーディアンユーザ自身
  userRef; // ガーディアンユーザのuserRef

  public chatRoomList;

  constructor(
    public router: Router,
    public adminUserService: AdminUserServiceService,
    public navParamsService: NavParamsService,
    public chatRoomsService: ChatRoomsService,
    public guardianService: GuardianService
  ) { }

  ngOnInit() {
    // 自分自身のユーザーIDを取得する
    this.guadianUser = this.guardianService.currentUser;
    this.userRef = this.guardianService.getUserRef(this.guadianUser.id);
    this.chatRoomsService.getApprovalListForGuardian(this.userRef).subscribe(async (chatRooms: any) => {
      for (const chatRoom of chatRooms) {
        const userImages: any = [];
        for (const ref of chatRoom.userRefs) {
          const doc = await ref.get();
          const user = await doc.data();
          userImages.push(user.top_image.path);
        }
        chatRoom.userImages = userImages;
      }
      this.chatRoomList = chatRooms;
    });
    console.log(this.chatRoomList);
  }

  chatRoomUser(chatRoom) {
    this.navParamsService.set(chatRoom);
    this.router.navigateByUrl('/talk-room/chat-room');
  }
}
