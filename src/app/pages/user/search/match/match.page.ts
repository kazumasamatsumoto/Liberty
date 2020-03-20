import { NavParamsService } from './../../../../services/nav-params.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { ChatRoomsService } from './../../../../services/chat-rooms.service';
import { AdminUserServiceService } from './../../../../services/admin-user-service.service';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-match',
  templateUrl: './match.page.html',
  styleUrls: ['./match.page.scss'],
})
export class MatchPage implements OnInit {

  user; // マッチ相手
  adminUser; // 自分
  userIds = [];
  status: number;

  constructor(
    public navParamsService: NavParamsService,
    public router: Router,
    public db: AngularFirestore,
    private chatRoomService: ChatRoomsService,
    private adminUserService: AdminUserServiceService
  ) { }

  ngOnInit() {
    this.user = this.navParamsService.get().user;
    this.adminUser = this.adminUserService.currentUser;
  }

  goToApprovalPage() {
    console.log('test');
    // this.router.navigateByUrl('/search/approval');
    this.createChatRoom();
  }

  // chat_roomsのドキュメントを作成
  public async createChatRoom() {
    // firebase.firestoreを使用するangularfireでキャストする方法がわからない
    // DocumentReferenceの型を使う理由(必ずユニークIDになるので)検索とかでユニークIDを使うときはDocumentReferenceを使った方がいい
    const userRef = firebase.firestore().collection('users').doc(this.user.id);
    const adminUserRef = firebase.firestore().collection('users').doc(this.adminUser.id);

    const now = new Date();
    const status = 0;
    const userIds = [
      userRef, // 相手のuser.id (usersのドキュメントid)
      adminUserRef // 自分のadminUser.id (usersのドキュメントid)
    ];
    const adminUserIds = [
      this.user.guardianRef, // 相手のガーディアンのid (users.guadianRefという書き方でフィールドのguadianRefが取得できる)
      this.adminUser.guardianRef // 自分のガーディアンのid
    ];
    console.log('tag');
    this.chatRoomService.addChatRooms(status, userIds, adminUserIds).then((value) => {
      const uid = value.id;
      // レファレンスは4つ必要
      // チャットルームの作成には4人の承認が必要
      this.db.collection(`chat_rooms/${uid}/user_chat_rooms/`).doc(this.user.id)
        .set({
          user: {ref: userRef},
          status: 1
      });
      this.db.collection(`chat_rooms/${uid}/user_chat_rooms/`).doc(this.adminUser.id)
        .set({
          user: {ref: adminUserRef},
          status: 1
      });
      this.db.collection(`chat_rooms/${uid}/user_chat_rooms/`).doc(this.user.guardianRef.id)
        .set({
          user: {ref: this.user.guardianRef},
          status: 0
      });
      this.db.collection(`chat_rooms/${uid}/user_chat_rooms/`).doc(this.adminUser.guardianRef.id)
        .set({
          user: {ref: this.adminUser.guardianRef},
          status: 0
      });
    });

  }

}
