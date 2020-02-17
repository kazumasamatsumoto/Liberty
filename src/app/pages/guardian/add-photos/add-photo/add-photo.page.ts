import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AdminUserServiceService } from 'src/app/services/admin-user-service.service';

@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.page.html',
  styleUrls: ['./add-photo.page.scss'],
})
export class AddPhotoPage implements OnInit {
  adminUser;

  constructor(
    private router: Router,
    public adminUserService: AdminUserServiceService
    ) { }

  ngOnInit() {
    this.adminUser = this.adminUserService.currentUser;
    console.log(this.adminUser);
  }

}
