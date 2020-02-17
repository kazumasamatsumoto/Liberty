import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-user',
  templateUrl: './top-user.page.html',
  styleUrls: ['./top-user.page.scss'],
})
export class TopUserPage implements OnInit {
  item = 'assets/images/users_image/chat_1.png';

  constructor() { }

  ngOnInit() {
  }

}
