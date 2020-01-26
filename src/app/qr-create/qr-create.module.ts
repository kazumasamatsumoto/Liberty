import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrCreatePageRoutingModule } from './qr-create-routing.module';

import { QrCreatePage } from './qr-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrCreatePageRoutingModule
  ],
  declarations: [QrCreatePage]
})
export class QrCreatePageModule {}
