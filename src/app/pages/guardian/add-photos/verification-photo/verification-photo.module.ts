import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerificationPhotoPageRoutingModule } from './verification-photo-routing.module';

import { VerificationPhotoPage } from './verification-photo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerificationPhotoPageRoutingModule
  ],
  declarations: [VerificationPhotoPage]
})
export class VerificationPhotoPageModule {}
