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
  userRef;
  otherUserRef;
  chatRoomTest;
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
    console.log('matchPage');
    this.user = this.navParamsService.get().user;
    this.adminUser = this.adminUserService.currentUser;
    console.log('test', this.adminUser);
  }

  goToApprovalPage() {
    this.createChatRoom();
    this.router.navigateByUrl('/search/approval');
  }

  // chat_roomsのドキュメントを作成
  public async createChatRoom() {
    // firebase.firestoreを使用するangularfireでキャストする方法がわからない
    // DocumentReferenceの型を使う理由(必ずユニークIDになるので)検索とかでユニークIDを使うときはDocumentReferenceを使った方がいい
    const userRef = firebase.firestore().collection('users').doc(this.user.id);
    const adminUserRef = firebase.firestore().collection('users').doc(this.adminUser.id);
    const status = 0;
    const userRefs = [
      userRef, // 相手のuser.id (usersのドキュメントid)
      adminUserRef // 自分のadminUser.id (usersのドキュメントid)
    ];
    const adminUserRefs = [
      this.user.guardianRef, // 相手のガーディアンのid (users.guadianRefという書き方でフィールドのguadianRefが取得できる)
      this.adminUser.guardianRef // 自分のガーディアンのid
    ];
    const userImages = [
      this.user.top_image.path,
      this.adminUser.top_image.path,
    ];
    const userIds = {
      [userRef.id]: true,
      [adminUserRef.id]: true,
      [this.user.guardianRef.id]: true,
      [this.adminUser.guardianRef.id]: true
    };
    console.log(userIds);
    console.log('tag');
    this.chatRoomService.addChatRooms(status, userIds, userRefs, adminUserRefs, userImages).then((value) => {
      const uid = value.id;
      // レファレンスは4つ必要
      this.chatRoomService.addUserChatRooms(uid, this.user.id, userRef, 1);
      this.chatRoomService.addUserChatRooms(uid, this.adminUser.id, adminUserRef, 1);
      this.chatRoomService.addUserChatRooms(uid, this.user.guardianRef.id, this.user.guardianRef, 0);
      this.chatRoomService.addUserChatRooms(uid, this.adminUser.guardianRef.id, this.adminUser.guardianRef, 0);
    });

  }

}
