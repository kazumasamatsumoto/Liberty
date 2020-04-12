import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { NetworkService } from '../../../../services/network.service';
import { AdminUserServiceService } from 'src/app/services/admin-user-service.service';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';

const RESULT = 'result';

@Component({
  selector: 'app-photo-selection',
  templateUrl: './photo-selection.page.html',
  styleUrls: ['./photo-selection.page.scss'],
})
export class PhotoSelectionPage implements OnInit {
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
    public router: Router
  ) { }

  ngOnInit() {
    this.adminUser = this.adminUserService.currentUser;
    console.log(this.adminUser);
    this.photolist = this.network.getPhotos(this.adminUser.id);
  }

  public previewPhoto(event) {
    const file = event.target.files[0];
    this.reader.onload = ((e) => {
      this.imageSrc = e.target[RESULT];
      this.isSelected = true;
      this.uploadPhoto();
    });
    this.reader.readAsDataURL(file);
  }

  public async uploadPhoto() {
    if (!this.imageSrc) {
      alert('写真を選択してください');
    } else {
      const now = new Date();
      // tslint:disable-next-line:max-line-length
      const filename = 'eventname_' + this.adminUser.id + '_' + now.getHours() + now.getMinutes() + now.getSeconds() + now.getMilliseconds();
      this.network.uploadPhoto(this.imageSrc, filename, this.adminUser.id).then((value) => {
      });
    }
  }

  public clickPlus() {
    document.getElementById('photo-upload').click();
  }

  async presentActionSheet(photo) {
    const actionSheet = await this.actionSheetController.create({
      header: 'メニュー',
      buttons: [{
        text: '削除',
        role: 'destructive',
        handler: () => {
          console.log(photo.id);
          this.network.deletePhoto(photo.id, this.adminUser.id);
        }
      }, {
        text: 'トップ画に設定する',
        handler: () => {
          this.adminUserService.topImageChange(photo);
          this.router.navigateByUrl('/add-photo');
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

}
