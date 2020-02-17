import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PhotoSelectionPage } from './photo-selection.page';

describe('PhotoSelectionPage', () => {
  let component: PhotoSelectionPage;
  let fixture: ComponentFixture<PhotoSelectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoSelectionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoSelectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
