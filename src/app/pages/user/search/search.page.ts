import { ChatRoomsService } from './../../../services/chat-rooms.service';
import { NavParamsService } from './../../../services/nav-params.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { Storage } from '@ionic/storage';
import { AdminUserServiceService } from 'src/app/services/admin-user-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  users: any = [];
  userRef;

  constructor(
    private db: AngularFirestore,
    private storage: Storage,
    public router: Router,
    public adminUserService: AdminUserServiceService,
    public navParamsService: NavParamsService,
    public chatRoomsService: ChatRoomsService
  ) { }

  ngOnInit() {
    this.userList();
  }

  // ユーザー一覧取得
  async userList() {
    const uid = await this.storage.get('uid');
    console.log(uid);

    // userListを取得する条件はis_guardianがfalseのみ
    const userList = this.db.collection('users', ref => ref.where('is_guardian', '==', false)).get()
      .subscribe(snapshot => {
      if (snapshot.empty) {
        console.log('No matching documents');
        return;
      }
      snapshot.forEach((doc) => {
        console.log(doc.id);
        const userData = doc.data();
        userData.id = doc.id;
        /**
         * すでにマッチしているIDを取得
         */
        if (userData.id !== uid) {
          this.users.push(userData);
        }
        console.log(doc.id, '=>', userData);
        console.log(this.users);
      });
    });
    console.log(userList);
  }

  async goToMatchPage(user) {
    // adminUserServiceの中に書き込む処理
    // すでにステータスが1の場合チャットルームに遷移する
    const adminUser = this.adminUserService.currentUser;
    const userRef = this.adminUserService.getUserRef(adminUser.id); // 自分
    const otherUserRef = this.adminUserService.getUserRef(user.id); // 相手
    this.chatRoomsService.getChatRoom(userRef, otherUserRef).subscribe((data: any) => {
      console.log(data);
      if (data && data.length > 0) {
        this.navParamsService.set(data[0]); // data[0] chat-roomのドキュメント
        this.router.navigateByUrl('/talk/chat-room');
      } else {
        this.navParamsService.set({ user });
        this.router.navigateByUrl('/search/match');
      }
    });
  }

}
