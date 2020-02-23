import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NetworkService } from '../../../../services/network.service';
import { AdminUserServiceService } from 'src/app/services/admin-user-service.service';
import { ActionSheetController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

const RESULT = 'result';

@Component({
  selector: 'app-profile-select',
  templateUrl: './profile-select.page.html',
  styleUrls: ['./profile-select.page.scss'],
})
export class ProfileSelectPage implements OnInit {

  public imageSrc: any;
  public isSelected: boolean;
  private reader = new FileReader();
  adminUser;

  public photolist: Observable<{createdAt: Date, name: string, url: string}[]>;

  constructor(
    private network: NetworkService,
    public adminUserService: AdminUserServiceService,
    public actionSheetController: ActionSheetController,
    private db: AngularFirestore,
    public router: Router,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.adminUser = this.adminUserService.currentUser;
    console.log(this.adminUser);
    this.photolist = this.network.getPhotos(this.adminUser.id);
  }

  async presentActionSheet(photo) {
    this.adminUserService.topImageChange(photo);
    this.navCtrl.back();
  }

}
