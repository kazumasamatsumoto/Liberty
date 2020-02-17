import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VerificationPhotoPage } from './verification-photo.page';

describe('VerificationPhotoPage', () => {
  let component: VerificationPhotoPage;
  let fixture: ComponentFixture<VerificationPhotoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationPhotoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VerificationPhotoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
