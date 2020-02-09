import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TalkPage } from './talk.page';

describe('TalkPage', () => {
  let component: TalkPage;
  let fixture: ComponentFixture<TalkPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TalkPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TalkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
