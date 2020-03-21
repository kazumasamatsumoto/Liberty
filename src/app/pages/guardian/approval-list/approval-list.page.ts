import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { GuardianService } from './../../../services/guardian.service';
import { ChatRoomsService } from './../../../services/chat-rooms.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-approval-list',
  templateUrl: './approval-list.page.html',
  styleUrls: ['./approval-list.page.scss'],
})
export class ApprovalListPage implements OnInit {

  guadianUser; // ガーディアンユーザ自身
  userRef; // ガーディアンユーザのuserRef

  public approvallist: Observable<any[]>;

  constructor(
    private router: Router,
    public guardianService: GuardianService,
    public chatRoomsService: ChatRoomsService
    ) { }

  ngOnInit() {
    this.guadianUser = this.guardianService.currentUser;
    this.userRef = this.guardianService.getUserRef(this.guadianUser.id);
    console.log(this.guadianUser);
    console.log(this.userRef);
    this.approvallist = this.chatRoomsService.getApplovalList(this.userRef);
    // const userRef = firebase.firestore().collection('users').doc()
  }

  approvalUser() {
    this.router.navigateByUrl('/approval-list/approval');
  }

}
