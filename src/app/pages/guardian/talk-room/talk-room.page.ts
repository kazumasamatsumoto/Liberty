import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-talk-room',
  templateUrl: './talk-room.page.html',
  styleUrls: ['./talk-room.page.scss'],
})
export class TalkRoomPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
