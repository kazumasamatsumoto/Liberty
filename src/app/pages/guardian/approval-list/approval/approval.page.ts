import { Router } from '@angular/router';
import { ChatRoomsService } from './../../../../services/chat-rooms.service';
import { GuardianService } from './../../../../services/guardian.service';
import { NavParamsService } from './../../../../services/nav-params.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-approval',
  templateUrl: './approval.page.html',
  styleUrls: ['./approval.page.scss'],
})
export class ApprovalPage implements OnInit {
  approval; // 自分が保護しているユーザー
  guardianUser; // ガーディアンユーザ自身
  chatId; // チャットルームのID
  userRef;

  constructor(
    public navParamsService: NavParamsService,
    public guardianService: GuardianService,
    public chatRoomsService: ChatRoomsService,
    public router: Router
  ) { }

  ngOnInit() {
    this.approval = this.navParamsService.get();
    this.guardianUser = this.guardianService.currentUser;
    console.log(this.approval.id);
  }

  statusChange() {
    this.chatRoomsService.guardianStatusChange(this.approval.id, this.guardianUser.id);
    this.chatRoomsService.statusCheck(this.approval.id);
    this.router.navigateByUrl('/top-guardian');
  }

}
