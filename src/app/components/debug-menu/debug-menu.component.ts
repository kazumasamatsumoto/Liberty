import { DEBUG } from './../../../config-test';
import { AngularFireAuth } from '@angular/fire/auth';
import { Storage } from '@ionic/storage';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { AdminUserServiceService } from './../../services/admin-user-service.service';
import { NetworkService } from './../../services/network.service';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit, Input } from '@angular/core';




const RESULT = 'result';

@Component({
  selector: 'app-debug-menu',
  templateUrl: './debug-menu.component.html',
  styleUrls: ['./debug-menu.component.scss'],
})
export class DebugMenuComponent implements OnInit {
  debug = DEBUG;
  public imageSrc: any;
  public isSelected: boolean;
  @Input() value: number;
  private reader = new FileReader();
  adminUser;

  public photolist: Observable<{createdAt: Date, name: string, url: string}[]>;


  constructor(
    private network: NetworkService,
    public adminUserService: AdminUserServiceService,
    public actionSheetController: ActionSheetController,
    private db: AngularFirestore,
    public alertController: AlertController,
    public storage: Storage,
    private angularFireAuth: AngularFireAuth,
  ) { }

  ngOnInit() {}

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'メニュー',
      buttons: [{
        text: 'ログアウト',
        handler: () => {
          this.logout();
        }
      }, {
        text: 'ユーザ切り替え',
        handler: async () => {
          console.log('ユーザ切り替え');
          const alert = await this.alertController.create({
              header: 'Prompt!',
              inputs: [
                {
                  name: 'name1',
                  type: 'text',
                  placeholder: 'Placeholder 1'
                }
              ],
              buttons: [
                {
                  text: 'Cancel',
                  role: 'cancel',
                  cssClass: 'secondary',
                  handler: () => {
                    console.log('Confirm Cancel');
                  }
                }, {
                  text: 'Ok',
                  handler: (data) => {
                    console.log(data);
                    if (data.name1) {
                      this.storage.set('uid', data.name1);
                    }
                    setTimeout(() => {
                      location.href = '/';
                    }, 50);
                  }
                }
              ]
            });
          await alert.present();
          // adminuserのトップイメージを変更する
          // photoに変更する
        }
      }, {
        text: 'キャンセル',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  async logout() {
    console.log('ログアウト');
    await this.storage.remove('uid');
    // AngularFire サインアウトメソッド
    this.angularFireAuth.auth.signOut();
    setTimeout(() => {
      location.href = '/';
    }, 1000);
  }

}
