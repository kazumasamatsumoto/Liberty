import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { QrCreatePageRoutingModule } from './qr-create-routing.module';
import { QrCreatePage } from './qr-create.page';

import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrCreatePageRoutingModule,
    NgxQRCodeModule,
  ],
  declarations: [QrCreatePage]
})
export class QrCreatePageModule {}
