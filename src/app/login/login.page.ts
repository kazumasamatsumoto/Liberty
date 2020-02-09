import { IS_GURDIAN } from '../../config-test';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
// import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

import { AlertController } from '@ionic/angular';
import { NavParamsService } from './../services/nav-params.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isOpen = false;
  scannedData: {};
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
              private qrScanner: QRScanner,
              public alertController: AlertController,
              public navParamsService: NavParamsService
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

  // Firestoreの監視
  async firestoreWatch() {
    const uid = await this.storage.get('uid');
    const userStatus = this.db.collection('users').doc(uid).valueChanges().subscribe((data: any) => {
      console.log(data);
      if (data.status === 1) {
        this.authRouting(data);
      }
    });
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
      this.firestoreWatch();
      if (userData.is_guardian) {
        this.showGuardian = true;
      } else {
        this.showUser = true;
      }
    } else {
      if (userData.is_guardian) {
        this.router.navigateByUrl('/top-guardian');
      } else {
        // statusが連携ずみならtopへ
        this.router.navigateByUrl('/top-user');
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


  async scanCode() {
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
      if (status.authorized) {
        this.isOpen = true;
        const scanSub = this.qrScanner.scan().subscribe( async (text: string) => {
          console.log('Scanned something', text);
          try {
            const uidStatus =  await this.db.collection('users').doc(text).get().toPromise();
            const userData = uidStatus.data();
            if (userData.status === 0) {
              // userのuidをサービスにセット
              this.navParamsService.set({ text });
              // 利用規約のページに遷移
              this.router.navigateByUrl('/terms-of-service');
              this.qrScanner.hide();
              scanSub.unsubscribe();
            } else {
              this.presentAlert();
            }
          } catch (e) {
            console.log('error');
          }
        });
        this.qrScanner.show().then();

      } else if (status.denied) {
        console.log('error');
      } else {
        console.log('error2');
      }
  })
  .catch((e: any) => console.log('Error is', e));
  }

  async closeScanner() {
    try {
      const status = await this.qrScanner.destroy();
      console.log('destroy status', status);
      this.isOpen = false;
    } catch (e) {
      console.error(e);
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: '注意',
      message: 'そのユーザーは連携済みです',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigateByUrl('/');
          }
        }
      ]
    });

    await alert.present();
  }
}
