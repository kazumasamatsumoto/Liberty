import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QrCreatePage } from './qr-create.page';

describe('QrCreatePage', () => {
  let component: QrCreatePage;
  let fixture: ComponentFixture<QrCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrCreatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QrCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
