import { Component, OnInit } from '@angular/core';
import { AdminUserServiceService } from 'src/app/services/admin-user-service.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-top-user',
  templateUrl: './top-user.page.html',
  styleUrls: ['./top-user.page.scss'],
})
export class TopUserPage implements OnInit {
  item = 'assets/images/users_image/chat_1.png';
  adminUser;

  constructor(
    public adminUserService: AdminUserServiceService,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.setUser();
  }

  async setUser() {
    const userId = await this.storage.get('uid');
    this.adminUserService.getUser(userId);
    console.log(userId);
    // この時点でuserIdすでにセットされているので他のページで呼ぶときはthis.adminUserService.currentUserでOK
  }

}
