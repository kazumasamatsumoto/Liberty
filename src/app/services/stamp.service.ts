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
    {src: 'assets/images/stamps/time.png'},
    {src: 'assets/images/stamps/animals/Group12.png'},
    {src: 'assets/images/stamps/animals/Group13.png'},
    {src: 'assets/images/stamps/animals/Group14.png'},
    {src: 'assets/images/stamps/animals/Group15.png'},
    {src: 'assets/images/stamps/animals/Group16.png'},
    {src: 'assets/images/stamps/animals/Group17.png'},
    {src: 'assets/images/stamps/animals/Group18.png'},
    {src: 'assets/images/stamps/animals/Group19.png'},
    {src: 'assets/images/stamps/animals/Group20.png'},
    {src: 'assets/images/stamps/animals/Group21.png'},
    {src: 'assets/images/stamps/animals/Group22.png'},
    {src: 'assets/images/stamps/animals/Group23.png'},
    {src: 'assets/images/stamps/animals/Group24.png'},
    {src: 'assets/images/stamps/animals/Group25.png'},
    {src: 'assets/images/stamps/animals/Group26.png'},
    {src: 'assets/images/stamps/animals/Group27.png'},
    {src: 'assets/images/stamps/animals/Group28.png'},
    {src: 'assets/images/stamps/animals/Group29.png'},
    {src: 'assets/images/stamps/animals/Group30.png'},
    {src: 'assets/images/stamps/animals/Group31.png'},
    {src: 'assets/images/stamps/animals/Group32.png'},
    {src: 'assets/images/stamps/animals/Group33.png'},
    {src: 'assets/images/stamps/animals/Group34.png'},
    {src: 'assets/images/stamps/animals/Group35.png'},
    {src: 'assets/images/stamps/animals/Group36.png'},
    {src: 'assets/images/stamps/animals/Group37.png'},
    {src: 'assets/images/stamps/animals/Group38.png'},
    {src: 'assets/images/stamps/animals/Group39.png'},
    {src: 'assets/images/stamps/animals/Group40.png'},
    {src: 'assets/images/stamps/animals/Group41.png'},
    {src: 'assets/images/stamps/animals/Group42.png'},
    {src: 'assets/images/stamps/animals/Group43.png'},
    {src: 'assets/images/stamps/animals/Group44.png'},
    {src: 'assets/images/stamps/animals/Group45.png'},
    {src: 'assets/images/stamps/animals/Group46.png'},
    {src: 'assets/images/stamps/animals/Group47.png'},
    {src: 'assets/images/stamps/animals/Group48.png'},
    {src: 'assets/images/stamps/animals/Group49.png'},
    {src: 'assets/images/stamps/animals/Group50.png'},
    {src: 'assets/images/stamps/animals/Group51.png'},
    {src: 'assets/images/stamps/animals/Group52.png'},
    {src: 'assets/images/stamps/animals/Group53.png'},
    {src: 'assets/images/stamps/animals/Group54.png'},
    {src: 'assets/images/stamps/animals/Group55.png'},
    {src: 'assets/images/stamps/animals/Group56.png'},
    {src: 'assets/images/stamps/animals/Group57.png'},
    {src: 'assets/images/stamps/animals/Group58.png'},
    {src: 'assets/images/stamps/animals/Group59.png'},
    {src: 'assets/images/stamps/animals/Group60.png'},
    {src: 'assets/images/stamps/animals/Group61.png'},
    {src: 'assets/images/stamps/animals/Group62.png'},
    {src: 'assets/images/stamps/animals/Group63.png'},
    {src: 'assets/images/stamps/animals/Group64.png'},
    {src: 'assets/images/stamps/animals/Group65.png'},
    {src: 'assets/images/stamps/animals/Group66.png'},
    {src: 'assets/images/stamps/animals/Group67.png'},
    {src: 'assets/images/stamps/animals/Group68.png'},
    {src: 'assets/images/stamps/animals/Group69.png'},
    {src: 'assets/images/stamps/animals/Group70.png'},
    {src: 'assets/images/stamps/animals/Group71.png'},
    {src: 'assets/images/stamps/animals/Group72.png'},
    {src: 'assets/images/stamps/animals/Group73.png'},
    {src: 'assets/images/stamps/animals/Group74.png'},
    {src: 'assets/images/stamps/animals/Group75.png'},
    {src: 'assets/images/stamps/animals/Group76.png'},
    {src: 'assets/images/stamps/animals/Group77.png'},
    {src: 'assets/images/stamps/animals/Group78.png'},
    {src: 'assets/images/stamps/animals/Group79.png'},
  ];
  constructor() { }

  getStamps(): Stamp[] {
    return this.stamps;
    // Firebaseを使う時にはここをいじる
  }
}
