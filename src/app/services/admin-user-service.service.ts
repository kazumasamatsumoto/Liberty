import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
interface User {
    id: string;
    status: number; // 0: 未連携（ユーザーと保護者の紐付けが完了していない）
                    // 1: 連携済み（ユーザーと保護者の紐付けが完了している）
    is_guardian: boolean; // false: ユーザー、 true: ガーディアン
    guardian: {
      ref: any;
    };
    top_image: {
      path: string;  // イメージのパス(Firebase Storageにおいた)
      ref: any;
    };
  }

@Injectable({
  providedIn: 'root'
})
export class AdminUserServiceService {
  // 管理しているユーザの取得
  // そのユーザのトップイメージの設定
  // 画像の追加
  public currentUser: User;

  constructor(
    private db: AngularFirestore
  ) { }

  topImageChange(photo) {
    this.db.collection('users').doc(this.currentUser.id).update({top_image: {path: photo.url}}); // ガーディアン側
    this.currentUser.top_image.path = photo.url;
  }

  async getUser(userId) {
    const doc = await this.db.collection('users').doc<User>(userId).valueChanges().pipe(take(1)).toPromise();
    this.currentUser = doc;
    this.currentUser.id = userId; // 整理してまとめる
  }

  getUserRef(userId) {
    const userRef = firebase.firestore().collection('users').doc(userId);
    return userRef;
  }

}
