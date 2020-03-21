import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GuardianService } from './../../../services/guardian.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-top-guardian',
  templateUrl: './top-guardian.page.html',
  styleUrls: ['./top-guardian.page.scss'],
})
export class TopGuardianPage implements OnInit {

  constructor(
    private router: Router,
    public guardianService: GuardianService,
    private storage: Storage
    ) { }

  ngOnInit() {
    this.setUser();
  }

  async setUser() {
    const userId = await this.storage.get('uid');
    this.guardianService.getUser(userId);
    console.log(userId);
    // この時点でuserIdはすでにセットされているので他のページで呼ぶときはthis.guardianService.currentUserでOK
  }

}
