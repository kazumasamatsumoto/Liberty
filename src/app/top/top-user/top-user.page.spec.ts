import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TopUserPage } from './top-user.page';

describe('TopUserPage', () => {
  let component: TopUserPage;
  let fixture: ComponentFixture<TopUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopUserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TopUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
