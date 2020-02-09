import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavParamsService } from '../../services/nav-params.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-terms-of-service',
  templateUrl: './terms-of-service.page.html',
  styleUrls: ['./terms-of-service.page.scss'],
})
export class TermsOfServicePage implements OnInit {

  constructor(
    public alertController: AlertController,
    private storage: Storage,
    private db: AngularFirestore,
    public navParamsService: NavParamsService,
    private router: Router,
    ) { }

  ngOnInit() {
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: '注意',
      subHeader: '利用規約',
      message: '利用規約を承認しますか？',
      buttons: [
        {
          text: 'いいえ',
          handler: () => {
            this.router.navigateByUrl('/');
          }
        },
        {
          text: 'はい',
          handler: () => {
            this.statusChange();
          }
        }
      ]
    });

    await alert.present();
  }

  async statusChange() {
    const uid = await this.storage.get('uid');
    const text = this.navParamsService.get().text;
    const uidStatus =  await this.db.collection('users').doc(text).get().toPromise();
    const guardianStatus =  await this.db.collection('users').doc(uid).get().toPromise();

    // updateの文章
    this.db.collection('users').doc(text).update({status: 1}); // ユーザー側
    this.db.collection('users').doc(uid).update({status: 1}); // ガーディアン側
    this.db.collection(`users/${uid}/admin`).doc(text).set({ ref: uidStatus.ref });
    this.db.collection('users').doc(text).set({ guardianRef: guardianStatus.ref }, { merge: true });
    this.router.navigateByUrl('/');
  }

}
