import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhotoSelectionPageRoutingModule } from './photo-selection-routing.module';

import { PhotoSelectionPage } from './photo-selection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhotoSelectionPageRoutingModule
  ],
  declarations: [PhotoSelectionPage]
})
export class PhotoSelectionPageModule {}
