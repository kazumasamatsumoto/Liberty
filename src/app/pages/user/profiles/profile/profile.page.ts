import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminUserServiceService } from 'src/app/services/admin-user-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  adminUser;

  constructor(
    private router: Router,
    public adminUserService: AdminUserServiceService
  ) { }

  ngOnInit() {
    this.adminUser = this.adminUserService.currentUser;
  }

}
