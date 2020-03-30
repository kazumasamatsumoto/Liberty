import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

// インターフェースの型もexportできる
export interface Stamp {
  src: string; // URL
  type?: string; // 動画か画像か判断するための情報
  category?: string; // 感情のカテゴリー
}

@Injectable({
  providedIn: 'root'
})


export class StampService {

  /**
   * スタンプ一覧を取得する
   */
  public stamps: Stamp[] = [
    {src: 'assets/images/stamps/hands.png'},
    {src: 'assets/images/stamps/headphone.png'},
    {src: 'assets/images/stamps/heart.png'},
    {src: 'assets/images/stamps/time.png'}
  ];
  constructor() { }

  getStamps(): Stamp[] {
    return this.stamps;
    // Firebaseを使う時にはここをいじる
  }
}
