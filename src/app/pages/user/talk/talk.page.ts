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

  public chatRoomList: Observable<any[]>;

  constructor(
    public router: Router,
    public adminUserService: AdminUserServiceService,
    public navParamsService: NavParamsService,
    public chatRoomsService: ChatRoomsService
  ) { }

  ngOnInit() {
    this.adminUser = this.adminUserService.currentUser;
    this.userRef = this.adminUserService.getUserRef(this.adminUser.id);
    console.log(this.adminUser);
    console.log(this.userRef);
    this.chatRoomList = this.chatRoomsService.getApprovalListForUser(this.userRef);
  }

  chatRoomUser(chatRoom) {
    this.navParamsService.set(chatRoom);
    this.router.navigateByUrl('/talk/chat-room');
    //
  }

}
