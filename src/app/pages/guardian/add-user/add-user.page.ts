import { NavParamsService } from './../../../services/nav-params.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.page.html',
  styleUrls: ['./add-user.page.scss'],
})
export class AddUserPage implements OnInit {
  isOpen = false;


  constructor(
    public alertController: AlertController,
    public db: AngularFirestore,
    public router: Router,
    private qrScanner: QRScanner,
    public navParamsService: NavParamsService
  ) { }

  ngOnInit() {
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

  async　manualScan() {
    // ここで手動入力での実装を書く
    const alert = await this.alertController.create({
      header: '追加するユーザIDを入力',
      inputs: [
        {
          name: 'name1',
          type: 'text',
          placeholder: 'IDを入力'
        }
      ],
      buttons: [
        {
          text: '追加',
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
