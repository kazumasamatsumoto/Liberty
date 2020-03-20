import { DebugMenuComponentModule } from './../../components/debug-menu/debug-menu.component.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    NgxQRCodeModule,
    DebugMenuComponentModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
