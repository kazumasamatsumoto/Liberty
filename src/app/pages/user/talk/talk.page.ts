import { Observable } from 'rxjs';
import { AdminUserServiceService } from 'src/app/services/admin-user-service.service';
import { Router } from '@angular/router';
import { NavParamsService } from './../../../services/nav-params.service';
import { ChatRoomsService } from './../../../services/chat-rooms.service';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-talk',
  templateUrl: './talk.page.html',
  styleUrls: ['./talk.page.scss'],
})
export class TalkPage implements OnInit {
  adminUser;
  userRef;

  public chatRoomList;

  constructor(
    public router: Router,
    public adminUserService: AdminUserServiceService,
    public navParamsService: NavParamsService,
    public chatRoomsService: ChatRoomsService
  ) { }

  ngOnInit() {
    this.adminUser = this.adminUserService.currentUser;
    this.userRef = this.adminUserService.getUserRef(this.adminUser.id);
    this.chatRoomsService.getApprovalListForUser(this.userRef).subscribe(async (chatRooms: any) => {
      for (const chatRoom of chatRooms) {
        // userRefsを取得して
        const userImages: any = [];
        /**
         * chatRoomの中のuserRefsを取得して
         * for文で繰り返し処理を行い
         * それぞれのrefからusersのドキュメントを取得
         * user.top_image.pathでpathを取得
         */
        for (const ref of chatRoom.userRefs) {
          const doc = await ref.get();
          const user = await doc.data();
          console.log(user);
          userImages.push(user.top_image.path);
        }
        console.log(userImages);
        chatRoom.userImages = userImages;
      }
      this.chatRoomList = chatRooms;
    });
    console.log(this.chatRoomList);
  }

  chatRoomUser(chatRoom) {
    this.navParamsService.set(chatRoom);
    this.router.navigateByUrl('/talk/chat-room');
    //
  }

}
