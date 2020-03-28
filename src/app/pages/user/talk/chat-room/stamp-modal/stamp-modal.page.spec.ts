import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StampModalPage } from './stamp-modal.page';

describe('StampModalPage', () => {
  let component: StampModalPage;
  let fixture: ComponentFixture<StampModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StampModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StampModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
