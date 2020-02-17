import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-guardian',
  templateUrl: './top-guardian.page.html',
  styleUrls: ['./top-guardian.page.scss'],
})
export class TopGuardianPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
