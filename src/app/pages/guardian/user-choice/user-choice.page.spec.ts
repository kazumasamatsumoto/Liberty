import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserChoicePage } from './user-choice.page';

describe('UserChoicePage', () => {
  let component: UserChoicePage;
  let fixture: ComponentFixture<UserChoicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserChoicePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserChoicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
