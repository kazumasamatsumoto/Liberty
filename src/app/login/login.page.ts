import { IS_GURDIAN } from '../../config-test';
import { Component, OnInit } from '@angular/core';
// import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: Observable<firebase.User>;
  showGuardian: boolean;
  showUser: boolean;
  qrData = '';
  scannedCode = null;
  elementType: 'url' | 'canvas' | 'img' = 'canvas';

  email: string;
  password: string;

  constructor(private angularFireAuth: AngularFireAuth,
              private storage: Storage,
              private db: AngularFirestore,
              private router: Router,
              private barcodeScanner: BarcodeScanner,
              public alertController: AlertController
     ) { }

  // uidを取得する
  // あればFirestoreの情報を取得合致すればトップページに遷移
  // なければログイン
  // uidをローカルストレージに保存
  // 最初に呼ばれる関数
  ngOnInit() {
    // わかりやすく一つの関数にまとめたよ
    this.loginAnonymously();
  }

  // まとめた関数だよ（ログイン処理）
  async loginAnonymously() {
    // ログイン情報があるかどうか（FirestoreのドキュメントIDをlocalStorageに保存してあるかどうか）

    // ローカルストレージ
    const uid = await this.storage.get('uid');
    console.log(uid);
    if (!uid) {
      this.user = this.angularFireAuth.authState;
      // firebase authにユーザが作られるのを監視する
      this.user.subscribe(u => {
        if (u) {
          console.log(u.uid);
          // u.uidをローカルストレージに保存
          this.storage.set('uid', u.uid);
          // Firestoreの情報を呼び出す
          this.checkUserData(u.uid);
        }
      });
      // 匿名ログイン
      const credential = await this.angularFireAuth.auth.signInAnonymously();
      console.log(credential.additionalUserInfo);
    } else {
      // firestoreの情報を呼び出す
      this.checkUserData(uid);
    }
  }

  // firestoreの情報を呼び出す
  async checkUserData(uid) {
    this.qrData = uid;
    const userData = await this.readUserData(uid);
    console.log('tag', userData);
    if (userData) {

      this.authRouting(userData);

    } else {
      const tmp = this.registUserData(uid);
      this.authRouting(tmp);
    }
  }

  authRouting(userData) {
    if (userData.status === 0) {
      if (userData.is_guardian) {
        this.showGuardian = true;
      } else {
        this.showUser = true;
      }
    } else {
      if (userData.is_guardian) {
        this.router.navigateByUrl('gardian-home');
      } else {
        // statusが連携ずみならtopへ
        this.router.navigateByUrl('/home');
      }
    }
  }


  registUserData(uid) {
    const userData = {
      status: 0, // 0: 未連携（ユーザーと保護者の紐付けが完了していない）
                                // 1: 連携済み（ユーザーと保護者の紐付けが完了している）
      is_guardian: IS_GURDIAN, // false: ユーザー、 true: ガーディアン
    };

    this.db.collection('users').doc(uid).set(
       userData
    );
    return userData;
  }

  async readUserData(uid: string) {
    // firestoreから情報を取得する
    const readUserDataRef = await this.db.collection('users').doc(uid).get().toPromise();
    console.log(readUserDataRef.data());
    return readUserDataRef.data();
  }


  scanCode() {
    this.barcodeScanner.scan().then(
      barcodeData => {
        this.scannedCode = barcodeData;
      }
    );
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: '注意',
      subHeader: 'ユーザ連携について',
      message: 'そのユーザはすでに連携しています',
      buttons: ['OK']
    });

    await alert.present();
  }
}
