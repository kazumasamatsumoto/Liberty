import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminUserServiceService } from './../../../../services/admin-user-service.service';
import { NavParamsService } from './../../../../services/nav-params.service';

@Component({
  selector: 'app-approval',
  templateUrl: './approval.page.html',
  styleUrls: ['./approval.page.scss'],
})
export class ApprovalPage implements OnInit {
  adminUser;
  user;

  constructor(
    private router: Router,
    public adminUserService: AdminUserServiceService,
    public navParamsService: NavParamsService,
  ) { }

  ngOnInit() {
    this.adminUser = this.adminUserService.currentUser;
    this.user = this.navParamsService.get().user;
  }

}
