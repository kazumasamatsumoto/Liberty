import { NavParamsService } from './../../../services/nav-params.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.page.html',
  styleUrls: ['./add-user.page.scss'],
})
export class AddUserPage implements OnInit {

  constructor(
    public alertController: AlertController,
    public db: AngularFirestore,
    public router: Router,
    public navParamsService: NavParamsService
  ) { }

  ngOnInit() {
  }

  scanCode() {
    // ここでスキャンしたときの実装を書く
  }

  async　manualScan() {
    // ここで手動入力での実装を書く
    const alert = await this.alertController.create({
      header: 'アカウント切り替え',
      inputs: [
        {
          name: 'name1',
          type: 'text',
          placeholder: 'Placeholder 1'
        }
      ],
      buttons: [
        {
          text: 'OK',
          handler: async (data) => {
            const text = data.name1;
            console.log('Scanned something', text);
            try {
              const uidStatus = await this.db.collection('users').doc(text).get().toPromise();
              const userData = uidStatus.data();
              console.log(uidStatus);
              console.log(userData);
              if (userData.status === 0) {
                this.navParamsService.set({ text });
                this.router.navigateByUrl('/terms-of-service');
              } else {
                this.presentAlert();
              }
            } catch (e) {
              console.log('error');
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: '注意',
      message: 'そのユーザーは連携済みです',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigateByUrl('/add-user');
          }
        }
      ]
    });
    await alert.present();
  }


}
