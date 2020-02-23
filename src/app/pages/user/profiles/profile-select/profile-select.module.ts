import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileSelectPageRoutingModule } from './profile-select-routing.module';

import { ProfileSelectPage } from './profile-select.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileSelectPageRoutingModule
  ],
  declarations: [ProfileSelectPage]
})
export class ProfileSelectPageModule {}
