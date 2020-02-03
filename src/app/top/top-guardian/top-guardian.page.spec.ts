import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TopGuardianPage } from './top-guardian.page';

describe('TopGuardianPage', () => {
  let component: TopGuardianPage;
  let fixture: ComponentFixture<TopGuardianPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopGuardianPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TopGuardianPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
