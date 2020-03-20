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

  constructor(
    private db: AngularFirestore,
    private storage: Storage,
    public router: Router,
    public adminUserService: AdminUserServiceService,
    public navParamsService: NavParamsService,
  ) { }

  ngOnInit() {
    this.userList();
  }

  // ユーザー一覧取得
  async userList() {
    const uid = await this.storage.get('uid');
    console.log(uid);
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
        if (userData.id !== uid) {
          this.users.push(userData);
        }
        console.log(doc.id, '=>', userData);
        console.log(this.users);
      });
    });
    console.log(userList);
  }

  goToMatchPage(user) {
    // adminUserServiceの中に書き込む処理
    this.navParamsService.set({ user });
    this.router.navigateByUrl('/search/match');
  }

}
