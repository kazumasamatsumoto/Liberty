import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TopUserPageRoutingModule } from './top-user-routing.module';

import { TopUserPage } from './top-user.page';

import { DebugMenuComponentModule } from './../../../components/debug-menu/debug-menu.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopUserPageRoutingModule,
    DebugMenuComponentModule
  ],
  declarations: [TopUserPage]
})
export class TopUserPageModule {}
