import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { Storage } from '@ionic/storage';
import { AdminUserServiceService } from 'src/app/services/admin-user-service.service';



@Component({
  selector: 'app-user-choice',
  templateUrl: './user-choice.page.html',
  styleUrls: ['./user-choice.page.scss'],
})
export class UserChoicePage implements OnInit {
  adminUsers: any = [];

  constructor(
    private db: AngularFirestore,
    private storage: Storage,
    public router: Router,
    public adminUserService: AdminUserServiceService
    ) { }

  ngOnInit() {
    this.userList();
  }
// ユーザ一覧取得
  async userList() {
    const uid = 'CyjOXo3C5TNFDYqUR6qtHdY09hF2';
    console.log(uid);
    const userList = this.db.collection(`users/${uid}/admin`).get()
    .subscribe(snapshot => {
      if (snapshot.empty) {
        console.log('No matching documents.');
        return;
      }
      snapshot.forEach((doc) => {
        doc.data().ref.get().then((userRef) => {
          const userData = userRef.data();
          userData.id = userRef.id;
          this.adminUsers.push(userData);
          console.log(doc.id, '=>', userData);
          console.log(this.adminUsers);
          });
      });
    });
    console.log(userList);
  }

  adminSet(adminUser) {
    // adminUserServiceの中に書き込む処理
    this.adminUserService.currentUser = adminUser;
    this.router.navigateByUrl('/add-photo');
  }

}
