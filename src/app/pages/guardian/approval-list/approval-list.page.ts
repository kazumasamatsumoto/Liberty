import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-approval-list',
  templateUrl: './approval-list.page.html',
  styleUrls: ['./approval-list.page.scss'],
})
export class ApprovalListPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
