import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

interface User {
  id: string;
  status: number; // 0: 未連携(ユーザーと保護者の紐付けが完了していない)
                  // 1: 連携済み（ユーザーと保護者の紐付けが完了している）
  is_guardian: boolean; // false: ユーザー、 true: ガーディアン
  guardian: {
    ref: any;
  };
  top_image: {
    path: string; // イメージのパス(Firebase Storageにおいた)
    ref: any;
  };
}

@Injectable({
  providedIn: 'root'
})
export class GuardianService {
  // 自分自身のユーザを取得
  // そのユーザのトップイメージの設定
  // 画像の追加

  public currentUser: User;

  constructor(
    private db: AngularFirestore
  ) { }

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
