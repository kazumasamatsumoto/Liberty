import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TalkRoomPage } from './talk-room.page';

describe('TalkRoomPage', () => {
  let component: TalkRoomPage;
  let fixture: ComponentFixture<TalkRoomPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TalkRoomPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TalkRoomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
